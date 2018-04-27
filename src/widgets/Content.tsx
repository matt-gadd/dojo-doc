import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

export class Content extends WidgetBase {
	protected render() {
		const [ content ] = this.children;
		return (
			<div classes='tm-main uk-section uk-section-default'>
				<div classes='uk-container uk-container-small uk-position-relative'>
					{ content }
				</div>
			</div>
		);
	}
}

export default Content;
