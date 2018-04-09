import { tsx } from '@dojo/widget-core/tsx';
import Map from '@dojo/shim/Map';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import process from '../util/markdown';
import { select, selectOne, orphan, transform } from '../util/vdom';

import NavBar from './NavBar';
import RepoMenu from './RepoMenu';
import Toc from './Toc';
import Content from './Content';
import CodeBlock from './CodeBlock';

const { repos, tags, defaultRepo } = require('../../config.json');

function getMarkdown(repo: string) {
	const [ tag ] = tags;
	return require(`!raw-loader!../../content/${tag}/${repo}/README.html`);
}

export class App extends WidgetBase {

	private _content: any;
	private _toc: any;
	private _selectedRepo: string;
	private _repoRenderFuncMap = new Map();

	constructor() {
		super();
		repos.forEach((repo: string) => {
			const markdown = getMarkdown(repo);
			this._repoRenderFuncMap.set(repo, process(markdown));
		});
		this._setReadme(defaultRepo);
	}

	private _setReadme(repo: string) {
		this._selectedRepo = repo;
		const renderFunc = this._repoRenderFuncMap.get(repo);
		const result = renderFunc();
		const title = selectOne('h1', result);

		if (title) {
			orphan(title);
		}

		this._toc = selectOne('a < li < ul', result);
		if (this._toc) {
			orphan(this._toc);
			const anchors = select('a[href^="#"]', this._toc);
			anchors.forEach((anchor) => {
				const href = (anchor.properties as any).href;
				const target = selectOne(`${href}`, result);
				if (target) {
					const newId = `${repo}@${target.properties.id}`;
					target.properties.classes = target.properties.classes || [];
					target.properties.classes.push('header');
					target.properties.id = newId;
					anchor.properties.href = `#${newId}`;
				}
			});
		}

		const tables = select('table', result);
		tables.forEach((table) => {
			table.properties.classes = table.properties.classes || [];
			table.properties.classes.push('table');
		});

		const codeBlocks = select('pre:has(code)', result);
		codeBlocks.forEach((codeBlock, i) => transform(codeBlock, (node: any) => {
			return (
				<CodeBlock key={ `codeblock-${i}` }>{ node }</CodeBlock>
			);
		}));


		this._content = result;
		this.invalidate();
	}

	protected render() {
		return (
			<div>
				<NavBar />
				<div classes='columns'>
					<div classes='column is-narrow is-hidden-touch' styles={ { 'position': 'fixed', 'width': '600px' } }>
						<div classes='columns'>
							<RepoMenu onSelect={ this._setReadme } selected={ this._selectedRepo } />
							<Toc>
								{ this._toc }
							</Toc>
						</div>
					</div>
					<div classes='column is-narrow is-hidden-touch' styles={ { width: '600px' }}></div>
					<Content>
						{ this._content }
					</Content>
				</div>
			</div>
		);
	}
}

export default App;
