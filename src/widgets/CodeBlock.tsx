import { tsx } from '@dojo/widget-core/tsx';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import Intersection from '@dojo/widget-core/meta/Intersection';

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
		const isShell = (this.children[0] as any).children[0].properties.classes.indexOf('language-shell') !== -1;
		const play = this.meta(Intersection).get('root').isIntersecting;
		const redCircle = { ...circleStyles, ...red };
		const orangeCircle = { ...circleStyles, ...orange };
		const greenCircle = { ...circleStyles, ...green };
		const container = { 'marginTop': '-5px' };
		if (!isShell) {
		return (
			<div classes='codeblock' styles={ codeBlockStyles } key='root'>
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
		} else {
		return (
			<div classes='codeblock' styles={ codeBlockStyles } key='root'>
				<div styles={ container }>
					<div styles={ redCircle } />
					<div styles={ orangeCircle } />
					<div styles={ greenCircle } />
				</div>
				<div innerHTML={
					`<asciinema-player font-size="small" cols="120" rows="14" theme="monokai" ${play ? "autoplay" : "" } src="../../src/example2.cast"></asciinema-player>`
				}>
				</div>
			</div>
		);
		}
	}
}

export default CodeBlock;
