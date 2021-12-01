const Role = require('./Role');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class Minion extends Role {
	constructor(options) {
		super({
			...{
				type: 'Minion'
			},
			...options
		});
	}
};
