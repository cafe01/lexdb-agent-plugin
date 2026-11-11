import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { configure, endpoint } from '../scripts/set-endpoint.mjs';

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
