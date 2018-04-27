import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

import { select, transform } from '../util/vdom';

export class Toc extends WidgetBase {

	private _decorate(target: any) {
		return transform(target, (node: any) => {
			const uls = select('ul', node);
			uls && uls.forEach((ul: any) => {
				ul.properties.classes = [ 'uk-nav uk-nav-default tm-nav' ];
			});
			return node;
		});
	}

	protected render() {
		const children = this._decorate(this.children);
		return (
			<div>
				{ children }
			</div>
		);
	}
}

export default Toc;
