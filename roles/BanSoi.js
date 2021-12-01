const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class BanSoi extends Role {
	constructor(options) {
		super({
			...{
				type: 'BanSoi'
			},
			...options
		});
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.BANSOI_VOTE: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);

	}

	async onNight() {
		const requests = [];

		
        if (this.type == 'SoiThuong')  {
			// SoiThuong



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
							requests.push(
								await this.request(
									gameConfig.code.BANSOI_VOTE,
									0, true
								)
							);
							return requests;
						}
					}
				
	
			}
            
			await this.timingSend({
				message: '🐺 Đêm nay cắn ai? 💀 \n'+
				this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.BANSOI_VOTE
			});
			requests.push(
				await this.request(
					gameConfig.code.BANSOI_VOTE,
					gameConfig.timeout.BANSOI_VOTE
				)
			);
		}

		return requests;
	}
};
