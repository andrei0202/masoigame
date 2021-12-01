const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class BaoVe extends Role {
	constructor(options) {
		super({
			...{
				type: 'BaoVe'
			},
			...options
		});
		this.lastProtectIndex = -1;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive);
		if (this.lastProtectIndex == value - 1) {
			throw new Error('⚠️ Không được bảo vệ 2 lần cho cùng 1 người chơi!');
		}
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`✨ Đã chọn bảo vệ ${name}!`);
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		this.lastProtectIndex = value - 1;
	}

	async onNight() {
		const requests = [];
		if (this.type == 'BaoVe')  {
		await this.timingSend({
			message:
				'✨ Đêm nay bảo vệ ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.BAOVE
		});
		return [
			await this.request(gameConfig.code.BAOVE, gameConfig.timeout.BAOVE)
		];
	}

	return requests;
}
};
