import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { configure, endpoint } from '../scripts/set-endpoint.mjs';
import { prepareLocal } from '../scripts/prepare-local.mjs';

test('rejects endpoints that could distribute credentials or a local-only target', () => {
  for (const value of [undefined, 'http://service.example/mcp', 'https://secret@service.example/mcp',
    'https://service.example/mcp?token=x', 'https://service.example/mcp#x', 'https://service.example/api',
    'https://localhost/mcp', 'https://127.0.0.1/mcp']) assert.throws(() => endpoint(value));
});

test('reconfigures the actual package without touching its transport or adding credentials', async t => {
  const root = await mkdtemp(join(tmpdir(), 'lexdb-plugin-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'plugins/lexdb'), { recursive: true });
  const target = join(root, 'plugins/lexdb/.mcp.json');
  const initial = JSON.stringify({ mcpServers: { lexdb: { type: 'http', url: 'https://first.example/mcp' } } });
  await writeFile(target, initial);
  await assert.rejects(configure(root, 'https://secret@second.example/mcp'));
  assert.equal(await readFile(target, 'utf8'), initial);
  await configure(root, 'https://second.example/mcp');
  assert.deepEqual(JSON.parse(await readFile(target, 'utf8')), { mcpServers: { lexdb: { type: 'http', url: 'https://second.example/mcp' } } });
});

test('local development keeps the distributed endpoint intact and shares the actual skills', async t => {
  const { cp } = await import('node:fs/promises');
  const root = await mkdtemp(join(tmpdir(), 'lexdb-plugin-dev-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = new URL('../', import.meta.url);
  for (const path of ['plugins', '.claude-plugin', '.agents']) await cp(new URL(path, source), join(root, path), { recursive: true });
  const original = await readFile(join(root, 'plugins/lexdb/.mcp.json'), 'utf8');
  const result = await prepareLocal(root, 'http://127.0.0.1:4692/mcp');
  const local = JSON.parse(await readFile(join(result, 'plugins/lexdb/.mcp.json'), 'utf8'));
  assert.equal(local.mcpServers.lexdb.url, 'http://127.0.0.1:4692/mcp');
  assert.equal(await readFile(join(root, 'plugins/lexdb/.mcp.json'), 'utf8'), original);
  const skill = 'plugins/lexdb/skills/pesquisar-jurisprudencia/SKILL.md';
  assert.equal(await readFile(join(result, skill), 'utf8'), await readFile(join(root, skill), 'utf8'));
  await writeFile(join(result, 'obsolete'), 'discard me');
  await prepareLocal(root, 'http://localhost:4692/mcp');
  await assert.rejects(readFile(join(result, 'obsolete')));
  for (const url of ['http://remote.example/mcp', 'http://token@localhost:4692/mcp', 'http://localhost:4692/mcp?key=x']) {
    await assert.rejects(prepareLocal(root, url));
  }
});
