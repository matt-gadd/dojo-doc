'use strict';
module.exports = tsx;
tsx.displayName = 'tsx';
tsx.aliases = [];
function tsx(Prism) {
  (function(Prism) {
	var typescript = Prism.util.clone(Prism.languages.typescript);
	Prism.languages.tsx = Prism.languages.extend('jsx', typescript);
  })(Prism);
}
