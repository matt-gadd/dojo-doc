import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

const { repos } = require('../../config.json');

export class RepoMenu extends WidgetBase<{ onSelect?: any, selected: string }> {

	private _selectRepo(repo: string) {
		const { onSelect } = this.properties;
		onSelect && onSelect(repo);
	}

	private _renderRepoItems() {
		return repos.map((repo: string) => {
			return (
				<li>
					<a
						onclick={ () => this._selectRepo(repo) }
						href= { `#${repo}` }
					>
						{ repo }
					</a>
				</li>
			)
		});
	}

	protected render() {
		const { selected } = this.properties;
		return (
			<div styles={ { margin: '10px' } }>
				<button classes="uk-button uk-button-default" type="button">{ selected }</button>
				<div uk-dropdown="pos: bottom-left">
					<ul classes="uk-nav uk-dropdown-nav">
						{ this._renderRepoItems() }
					</ul>
				</div>
			</div>
		);
	}
}

export default RepoMenu;
