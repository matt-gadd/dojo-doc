import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';


const circleStyles = {
	'margin-right': '6px',
	'width': '14px',
	'height': '14px',
	'border-radius': '50px',
	'display': 'inline-block'
};

const red = {
	'background': '#FF5F56',
	'border': '0.5px solid #E0443E'
}

const orange = {
	'background': '#FFBD2E',
	'border': '0.5px solid #DEA123'
}

const green = {
	'background': '#27C93F',
	'border': '0.5px solid #1AAB29'
}

const codeBlockStyles = {
	'box-shadow': 'rgba(0, 0, 0, 0.55) 0px 20px 68px',
	'background': '#272822',
	'margin': '30px',
	'border-radius': '5px',
	'padding': '10px'
}


class CodeBlock extends WidgetBase {
	protected render() {
		const redCircle = { ...circleStyles, ...red };
		const orangeCircle = { ...circleStyles, ...orange };
		const greenCircle = { ...circleStyles, ...green };
		const container = { 'marginTop': '-5px' };
		return (
			<div classes='codeblock' styles={ codeBlockStyles }>
				<div styles={ container }>
					<div styles={ redCircle } />
					<div styles={ orangeCircle } />
					<div styles={ greenCircle } />
				</div>
				<div>
					{ this.children }
				</div>
			</div>
		);
	}
}

export default CodeBlock;
