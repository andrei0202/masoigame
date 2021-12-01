const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;


const lmao = [
	'chết 💀',
	'ngủm 💀',
	'ngủm củ tỏi 💀',
	'lên thiên đàng 💀',
	'về với ông bà 💀',
	'ra đi 💀',
	'tắt thở 💀',
	'brủh brủh 💀',
	'bay màu 💀'
];

module.exports = class VongHon extends Role {
	constructor(options) {
		super({
			...{
				type: 'VongHon'
			},
			...options
		});

		this.lastCardIndex = -1;
		
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.VONGHON_COIN: {
			this.testCommit(value, ['1', '2']);
			break;
		}

		case gameConfig.code.VONGHON_PLAYER: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			if (this.lastCardIndex == value - 1) {
				throw new Error('⚠️ Không được chơi 2 lần cùng 1 người chơi!');
			}
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.VONGHON_COIN:
			break;
		case gameConfig.code.VONGHON_PLAYER:
			this.lastCardIndex = value - 1;
			break;
		}
	}

	async onNight() {
		const requests = [];


		if (this.game.history_last()) {
	
			const movements = this.game.history_last().movements;
				let iPlayerKilledByHarlot = this.game.u_getIPlayerKilledByHarlot(movements);
				let iPlayerShadow = -1;

				if (iPlayerKilledByHarlot != -1) {
					// not tie
					const lockedPlayer = this.game.playerManager.items[
						iPlayerKilledByHarlot
					];
					
					if ((lockedPlayer.name == this.name) && (lockedPlayer.type == this.type)){
						console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_COIN,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_PLAYER,
								0, true
							)
						);
						
						return requests;
					}
				}

				for (const movement of this.game.u_getMovements('SoiBongDem', movements)) {
					for (const commit of movement.data) {
						if (commit.value == null) continue;
						switch (commit.code) {
						case gameConfig.code.SOIBONGDEM:
							iPlayerShadow = commit.value - 1;
							break;
						}
					}
			}

				if(iPlayerShadow != -1){
					// not tie
					const lockedPlayer = this.game.playerManager.items[
						iPlayerShadow
					];
					
					if ((lockedPlayer.name == this.name) && (lockedPlayer.type == this.type)){
						console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_COIN,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_PLAYER,
								0, true
							)
						);
						return requests;
					}

				}


		}

		await this.timingSend({
			message:
				`♥️♦️♣️♠️ Kéo bài hay dằn dơ?\n` +
				`${gameConfig.symbols[1]} 🤘 Kéo tiếp\n` +
				`${gameConfig.symbols[2]} 🤞 Dằn dơ`,
			timing: gameConfig.timeout.VONGHON_COIN
		});
                requests.push(
                    await this.request(
                        gameConfig.code.VONGHON_COIN,
                        gameConfig.timeout.VONGHON_COIN
                    )
                );
            
			await asyncWait(1000);
			await this.timingSend({
				message:
					`😈 Muốn chơi cùng ai?\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.VONGHON_PLAYER
			});
			requests.push(
				await this.request(
					gameConfig.code.VONGHON_PLAYER,
					gameConfig.timeout.VONGHON_PLAYER
				)
			);
		return requests;
	}


};