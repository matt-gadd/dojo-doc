import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

export class Content extends WidgetBase {
	protected render() {
		const [ content ] = this.children;
		return (
			<div classes='column'>
				<div classes='box'>
					{ content }
				</div>
			</div>
		);
	}
}

export default Content;
