const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class Harlot extends Role {
	constructor(options) {
		super({
			...{
				type: 'Harlot'
			},
			...options
		});
		this.lastSleepIndex = -1;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);
		if (this.lastSleepIndex == value - 1) {
			throw new Error('⚠️ Không được ngủ 2 đêm với cùng 1 người chơi!');
		}
		const {name, username} = this.game.playerManager.items[value - 1];
		
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		this.lastSleepIndex = value - 1;
	}

	async onNight() {
		const requests = [];
		if (this.type == 'Harlot')  {
		await this.timingSend({
			message:
				'💃 Đêm nay ngủ với với ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.HARLOT
		});
		return [
			await this.request(gameConfig.code.HARLOT, gameConfig.timeout.HARLOT)
		];
	}

	return requests;
}
};
