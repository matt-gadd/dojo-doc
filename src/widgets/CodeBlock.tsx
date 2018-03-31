import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';

class CodeBlock extends WidgetBase {
	protected render() {
		return (
			<div classes='codeblock'>
				{ this.children }
			</div>
		);
	}
}

export default CodeBlock;
