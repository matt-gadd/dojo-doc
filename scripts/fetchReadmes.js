const fs = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');
const unified = require('unified');
const markdown = require('remark-parse');
const toc = require('remark-toc');
const normalizeHeadings = require('remark-normalize-headings');
const remark2rehype = require('remark-rehype');
const strip = require('remark-strip-badges');
const highlight = require('rehype-highlight');
const slug = require('rehype-slug');
const html = require('rehype-stringify');
const refractor = require('refractor');
const rehypePrism = require('@mapbox/rehype-prism');

refractor.register(require('refractor/lang/jsx'));
refractor.register(require('./tsx'));

const process = unified()
	.use(markdown)
	.use(strip)
	.use(normalizeHeadings)
	.use(toc)
	.use(remark2rehype)
	.use(slug)
	/*.use(highlight, { ignoreMissing: true })*/
	.use(rehypePrism, { ignoreMissing: true })
	.use(html)
	.processSync;

async function getReadme(repo, tag) {
	const url =`https://unpkg.com/@dojo/${repo}@${tag}/README.md`;
	const path = `${__dirname}/../content/${tag}/${repo}/README.html`;
	const response = await fetch(url, {
		headers: { Accept: 'text/html' }
	});
	const text = await response.text();
	fs.outputFileSync(path, process(text));
	console.log(`${url} -> ${path}`);
}

config.tags = config.tags || [ 'latest' ];

const readmes = config.tags.reduce((arr, tag) => {
	const items = config.repos.map((repo) => {
		return { repo, tag };
	});
	return [ ...arr, ...items ];
}, []);

Promise.all(readmes.map(({ repo, tag }) => getReadme(repo, tag)));


