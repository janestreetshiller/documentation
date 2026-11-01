# Documentation site

A Mintlify documentation starter. The repository currently contains placeholder introduction and quickstart pages, not finished product documentation.

Edit `index.mdx` and `quickstart.mdx` for the content, and `docs.json` for branding and navigation. Read [AGENTS.md](AGENTS.md) for the writing conventions.

[Mintlify starter quickstart](https://starter.mintlify.com/quickstart)

## AI-assisted writing

Set up your AI coding tool to work with Mintlify:

```bash
npx skills add https://mintlify.com/docs
```

This command installs Mintlify's documentation skill for your configured AI tools like Claude Code, Cursor, Windsurf, and others. The skill includes component reference, writing standards, and workflow guidance.

See [Mintlify’s AI tools guides](https://mintlify.com/docs/ai-tools) for tool-specific setup.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview your documentation changes locally. To install, use the following command:

```
npm i -g mint
```

Run the following command at the root of your documentation, where your `docs.json` is located:

```
mint dev
```

View your local preview at `http://localhost:3000`.

## Publishing changes

Install the Mintlify GitHub app from your [dashboard](https://dashboard.mintlify.com/settings/organization/github-app) to propagate changes from your repo to your deployment. With that integration configured, pushes to the default branch trigger deployment. The repository alone does not establish that a live site is connected.

## Need help?

### Troubleshooting

- If your dev environment isn't running: Run `mint update` to ensure you have the most recent version of the CLI.
- If a page loads as a 404: Make sure you are running in a folder with a valid `docs.json`.

### Resources
- [Mintlify documentation](https://mintlify.com/docs)
