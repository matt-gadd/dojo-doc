import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

const { repos } = require('../../config.json');

export class RepoMenu extends WidgetBase<{ onSelect?: any, selected: string }> {
	private _selectRepo(repo: string) {
		const { onSelect } = this.properties;
		onSelect && onSelect(repo);
	}

	private _renderRepoItems() {
		const { selected } = this.properties;
		return repos.map((repo: string) => {
			return (
				<li>
					<a
						onclick={ () => this._selectRepo(repo) }
						classes={ selected === repo ? 'is-active' : '' }
						href= { `#${repo}` }
					>
						{ repo }
					</a>
				</li>
			)
		});
	}

	protected render() {
		return (
			<div classes='column is-narrow' styles={ { width: '250px' } }>
				<div classes='box'>
					<aside classes='menu'>
						<ul classes='menu-list'>
							{ this._renderRepoItems() }
						</ul>
					</aside>
				</div>
			</div>
		);
	}
}

export default RepoMenu;
