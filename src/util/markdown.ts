import { v, isVNode } from '@dojo/widget-core/d';

const unified = require('unified');
const toH = require('hast-to-hyperscript');
const rehype = require('rehype-parse');

const process = unified()
	.use(rehype, { fragment: true });

export default (content: string) => {
	let key = 0;
	const node = process.parse(content);
	const result = process.runSync(node);
	return () => {
		key = 0;
		return toH((tag: string, props: any = {}, children: any[] = []) => {
			if (props.className) {
				props.classes = props.className.split(' ');
				delete props.className;
			}
			props.key = key++;
			const vNode = v(tag, props, children);
			if (vNode.children) {
				vNode.children.forEach((child: any) => {
					if (isVNode(child)) {
						(child as any).parent = vNode;
					}
				});
			}
			return vNode;
		}, result);
	}
}
