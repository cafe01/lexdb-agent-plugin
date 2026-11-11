import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function prepareLocal(root, value = 'http://127.0.0.1:4692/mcp') {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    || url.username || url.password || url.search || url.hash || url.pathname !== '/mcp') {
    throw new Error('O perfil local exige URL de loopback, sem credenciais, query ou fragmento, com caminho /mcp.');
  }
  const target = resolve(root, '.build/local-marketplace');
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  for (const path of ['plugins', '.claude-plugin', '.agents']) await cp(resolve(root, path), resolve(target, path), { recursive: true });
  const mcpPath = resolve(target, 'plugins/lexdb/.mcp.json');
  const mcp = JSON.parse(await readFile(mcpPath, 'utf8'));
  mcp.mcpServers.lexdb.url = url.href;
  await writeFile(mcpPath, JSON.stringify(mcp, null, 2) + '\n');
  for (const platform of ['.claude-plugin', '.codex-plugin']) {
    const path = resolve(target, 'plugins/lexdb', platform, 'plugin.json');
    const manifest = JSON.parse(await readFile(path, 'utf8'));
    manifest.version += '-dev';
    await writeFile(path, JSON.stringify(manifest, null, 2) + '\n');
  }
  return target;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(await prepareLocal(fileURLToPath(new URL('../', import.meta.url)), process.argv[2]));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
