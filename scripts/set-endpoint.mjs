import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function endpoint(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/mcp') {
    throw new Error('Informe uma URL HTTPS sem credenciais, query ou fragmento, com caminho /mcp.');
  }
  if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('O MCP distribuído precisa ser alcançável pelo cliente.');
  return url.href;
}

export async function configure(root, value) {
  const url = endpoint(value);
  const target = resolve(root, 'plugins/lexdb/.mcp.json');
  const config = JSON.parse(await readFile(target, 'utf8'));
  config.mcpServers.lexdb.url = url;
  await writeFile(target, JSON.stringify(config, null, 2) + '\n');
  return url;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  try {
    const url = await configure(root, process.argv[2]);
    console.log(`MCP configurado: ${url}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
