import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

const { repos } = require('../../config.json');

export class RepoMenu extends WidgetBase<{ onSelect?: any, selected: string }> {
	private _open = false;

	private _selectRepo(repo: string) {
		const { onSelect } = this.properties;
		onSelect && onSelect(repo);
	}

	private _renderRepoItems() {
		return repos.map((repo: string) => {
			return (
				<a
					onclick={ () => this._selectRepo(repo) }
					classes='dropdown-item'
					href= { `#${repo}` }
				>
					{ repo }
				</a>
			)
		});
	}

	private _toggleMenu() {
		this._open = !this._open;
		this.invalidate();
	}

	protected render() {
		const classes = [ this._open ? 'is-active' : '', 'dropdown' ];
		return (
			<div classes={ classes } onclick={ () => this._toggleMenu() }>
				<div classes='dropdown-trigger'>
					<button classes='button' aria-haspopup='true' aria-controls='dropdown-menu'>
						<span>{ this.properties.selected }</span>
						<span classes='icon is-small'>
							<i classes='fas fa-angle-down' aria-hidden='true'></i>
						</span>
					</button>
				</div>
				<div classes='dropdown-menu' id='dropdown-menu' role='menu'>
					<div classes='dropdown-content'>
						{ this._renderRepoItems() }
					</div>
				</div>
			</div>
		);
	}
}

export default RepoMenu;
