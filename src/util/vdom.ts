import _select from '@dojo/test-extras/support/selector';

export function select(selector: string, target: any) {
	return _select(selector, target);
}

export function selectOne(selector: string, target: any) {
	const result = _select(selector, target);
	if (result && result.length) {
		return result[0];
	}
}

export function orphan(child: any) {
	const { parent } = child as any;
	const index = parent.children.indexOf(child);
	parent.children.splice(index, 1);
	parent.children = [ ...parent.children ];
	child.parent = undefined;
}

export function transform(target: any, transformFunc: any) {
	const { parent } = target as any;
	const replacement = transformFunc(target);
	if (parent) {
		const index = parent.children.indexOf(target);
		parent.children[index] = replacement;
		parent.children = [ ...parent.children ];
		(target as any).parent = parent;
	}
	return replacement;
}
