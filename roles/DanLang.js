const Role = require('./Role');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class DanLang extends Role {
	constructor(options) {
		super({
			...{
				type: 'DanLang'
			},
			...options
		});
	}
};
