import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = new URL('../', import.meta.url);
const websiteRoot = pathToFileURL(resolve(process.argv[2] || '../ouros-md-landing') + '/');
const { pricing } = await import(new URL('site/pricing.mjs', websiteRoot));
const read = path => readFile(new URL(path, websiteRoot), 'utf8');
const write = async (path, body) => {
  const url = new URL(path, root);
  await mkdir(new URL('.', url), { recursive: true });
  await writeFile(url, body);
};
const decode = text => text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, key) => {
  if (key.startsWith('#')) return String.fromCodePoint(parseInt(key.slice(key[1] === 'x' ? 2 : 1), key[1] === 'x' ? 16 : 10));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[key] ?? entity;
});
const convert = html => {
  if (html.includes('id="docs-recovery-form"')) return '<p>Read the recovery checks below, or use the <a href="https://ouros.md/docs/troubleshooting#recovery">interactive recovery helper on the Ouros website</a>. It previews routing and filters checks without executing your input.</p>';
  html = html.replace('href="/docs/troubleshooting#recovery"', 'href="https://ouros.md/docs/troubleshooting#recovery"');
  const blocks = [];
  let body = html.replace(/<div class="codeblock"><div class="docs-code-header"><span>([\s\S]*?)<\/span><\/div><pre><code>([\s\S]*?)<\/code><\/pre><\/div>/g, (_, title, code) => {
    const language = title.startsWith('JavaScript') ? 'javascript' : title.startsWith('JSON') ? 'json' : title === 'Terminal' ? 'bash' : 'text';
    blocks.push(`\n\n\`\`\`${language}\n${decode(code)}\n\`\`\`\n\n`);
    return `MINTLIFYBLOCK${blocks.length - 1}END`;
  });
  body = body.replace(/\n/g, ' ').replace(/href="\/([^" ]*)"/g, (_, target) => {
    if (target === 'docs' || target.startsWith('docs#')) return `href="/index${target.slice(4)}"`;
    if (target.startsWith('docs/')) return `href="/${target.slice(5)}"`;
    return `href="https://ouros.md/${target}"`;
  })
    .replace(/\bclass=/g, 'className=')
    .replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  return body.replace(/MINTLIFYBLOCK(\d+)END/g, (_, index) => blocks[Number(index)]).split('\n').map(line => line.trimEnd()).join('\n');
};
const app = JSON.parse(await read('documentation/docs-app-guides.json'));
const gateway = JSON.parse(await read('documentation/docs-gateway-guides.json'));
const pages = [...app, ...gateway,
  { ...app.find(page => page.slug === 'app/cli'), slug: 'cli' },
  { ...app.find(page => page.slug === 'app/troubleshooting'), slug: 'troubleshooting' }];
for (const page of pages) {
  const body = page.sections.map(section => `<h2 id="${section.id}">${section.title}</h2>\n\n${convert(section.html)}`).join('\n\n');
  await write(`${page.slug}.mdx`, `---\ntitle: ${JSON.stringify(page.title)}\ndescription: ${JSON.stringify(page.description)}\n---\n\n${body}\n`);
}
await write('index.mdx', `---\ntitle: "Ouros documentation"\ndescription: "Install Ouros on your Mac, or integrate with the Gateway API."\n---\n\n<CardGroup cols={2}>\n<Card title="Install Ouros" href="/app/install">Check compatibility and download the Mac app.</Card>\n<Card title="Your first action" href="/app/first-action">Open the bar and find an app or file.</Card>\n<Card title="Gateway quickstart" href="/quickstart">Check service health and account access.</Card>\n<Card title="Plans and usage" href="/pricing">Understand subscriptions and optional credits.</Card>\n</CardGroup>\n\n<Note>Gateway examples that use a browser session must run on the signed-in Ouros origin. Signing in to the documentation does not authorize API requests.</Note>\n`);
await write('pricing.mdx', `---\ntitle: "Plans and usage"\ndescription: "Free, Pro and Enterprise, with optional usage credits purchased separately."\n---\n\n${pricing.plans.map(plan => `## ${plan.name}\n\n${plan.amount === null ? 'Custom pricing agreed with sales.' : `$${plan.amount}${plan.period ? ' USD per month' : ''}.`}\n\n${plan.features.map(feature => `- ${feature}`).join('\n')}\n\n[${plan.cta.label}](https://ouros.md${plan.cta.href})`).join('\n\n')}\n\n## Optional usage credits\n\n${pricing.allowance} ${pricing.topups}\n\nBuy $20, $40, $60 or $80 as a one-time purchase. $1 buys $1 of credit. Confirm current checkout availability in [Billing](https://ouros.md/dashboard#/billing).\n`);
await write('docs.json', JSON.stringify({
  $schema: 'https://mintlify.com/docs.json', theme: 'mint', name: 'Ouros',
  logo: { light: '/logo/light.svg', dark: '/logo/dark.svg' }, favicon: '/favicon.svg',
  colors: { primary: '#666666', light: '#f4f0e5', dark: '#191919' },
  navbar: { links: [{ label: 'Website', href: 'https://ouros.md/home' }, { label: 'Pricing', href: 'https://ouros.md/pricing' }], primary: { type: 'button', label: 'Dashboard', href: 'https://ouros.md/dashboard' } },
  navigation: { tabs: [
    { tab: 'Ouros app', groups: [{ group: 'Start here', pages: ['index', ...app.map(page => page.slug)] }] },
    { tab: 'Gateway API', groups: [{ group: 'Integration', pages: gateway.map(page => page.slug) }, { group: 'Plans and support', pages: ['pricing', 'cli', 'troubleshooting'] }] }
  ] }
}, null, 2) + '\n');
