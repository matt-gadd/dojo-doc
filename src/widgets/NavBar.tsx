import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

export class NavBar extends WidgetBase {
	protected render() {
		return (
			<div uk-sticky="media: 960"
				role='navigation'
				aria-label='main navigation'
				styles={ { background: 'black' } }
			>
				<div classes='uk-container uk-container-expand'>
					<nav classes='uk-navbar'>
						<div classes='uk-navbar-left'>
							<a classes='navbar-item' href='https://dojo.io'>
								<img src='https://dojo.io/images/logos/dojo2-logo-white.svg' height='48px' width='110px' />
							</a>
						</div>
						<div classes='uk-navbar-right'>
							{ ...this.children }
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

export default NavBar;
