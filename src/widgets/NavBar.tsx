import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

export class NavBar extends WidgetBase {
	protected render() {
		return (
			<nav classes='navbar is-fixed-top' role='navigation' aria-label='main navigation' styles={ { background: 'black' } }>
				<div classes='navbar-brand'>
					<a classes='navbar-item' href='https://dojo.io'>
						<img src='https://dojo.io/images/logos/dojo2-logo-white.svg' height='48px' width='110px' />
					</a>
				</div>
			</nav>
		);
	}
}

export default NavBar;
