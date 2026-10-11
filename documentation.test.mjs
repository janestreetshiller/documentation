import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const read = path => readFile(path, 'utf8');
test('Mintlify navigation and internal links resolve to documentation pages', async () => {
  const config = JSON.parse(await read('docs.json'));
  const slugs = new Set(config.navigation.tabs.flatMap(tab => tab.groups.flatMap(group => group.pages)));
  for (const slug of slugs) {
    await access(`${slug}.mdx`);
    const body = await read(`${slug}.mdx`);
    for (const match of body.matchAll(/href="\/([^"#]*)(?:#[^"]*)?"/g)) {
      await access(`${match[1]}.mdx`);
    }
    assert.doesNotMatch(body, /MINTLIFYBLOCK\d+END|class=/);
  }
  assert.match(await read('quickstart.mdx'), /https:\/\/ouros.md\/eve\/v1\/health/);
  assert.match(await read('index.mdx'), /signed-in Ouros origin/);
});
