const Role = require('./Role');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class ChanDoi extends Role {
	constructor(options) {
		super({
			...{
				type: 'ChanDoi'
			},
			...options
		});
	}
};
