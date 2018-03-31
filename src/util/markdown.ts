import { v, isVNode } from '@dojo/widget-core/d';

const unified = require('unified');
const markdown = require('remark-parse');
const toc = require('remark-toc');
const normalizeHeadings = require('remark-normalize-headings');
const remark2rehype = require('remark-rehype');
const strip = require('remark-strip-badges');
const highlight = require('rehype-highlight');
const slug = require('rehype-slug');
const toH = require('hast-to-hyperscript');

const process = unified()
	.use(markdown)
	.use(strip)
	.use(normalizeHeadings)
	.use(toc)
	.use(remark2rehype)
	.use(slug)
	.use(highlight, { ignoreMissing: true })

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
