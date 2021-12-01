const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class SoiThuong extends Role {
	constructor(options) {
		super({
			...{
				type: 'SoiThuong'
			},
			...options
		});
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive);
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`💀 Đã chọn cắn ${name}!`);
	}

	async onNight() {

		if (this.game.history_last()) {
	
			const movements = this.game.history_last().movements;
				let iPlayerKilledByHarlot = this.game.u_getIPlayerKilledByHarlot(movements);
				if (iPlayerKilledByHarlot != -1) {
					// not tie
					const lockedPlayer = this.game.playerManager.items[
						iPlayerKilledByHarlot
					];
					
					if ((lockedPlayer.name == this.name) && (lockedPlayer.type == this.type)){
						console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
						return [
							await this.request(
								gameConfig.code.SOITHUONG,
								0, true
							)
						];
					}
				}
			

		}
	
		await this.timingSend({
			message:
				'🐺 Đêm nay cắn ai ? 💀💀\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.SOITHUONG
		});
		return [
			await this.request(
				gameConfig.code.SOITHUONG,
				gameConfig.timeout.SOITHUONG
			)
		];
	}
};
