const fs = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

async function getReadme(repo, tag) {
	const url =`https://unpkg.com/@dojo/${repo}@${tag}/README.md`;
	const path = `${__dirname}/../content/${tag}/${repo}/README.md`;
	const response = await fetch(url, {
		headers: { Accept: 'text/html' }
	});
	const text = await response.text();
	fs.outputFileSync(path, text);
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


