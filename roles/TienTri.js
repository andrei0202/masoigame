const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class TienTri extends Role {
	constructor(options) {
		super({
			...{
				type: 'TienTri'
			},
			...options
		});
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isNotSelf);
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(
		// 	`🔮 Đã chọn xem role của người chơi ${name}!`
		// );
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		// let message = '';
		// const {name, username, type} = this.game.playerManager.items[value - 1];
		// const party = gameConfig.data[type].party 
		// //> 0 ? 'Dân Làng' : 'Sói';
		// if ((party == 1) && (this.game.playerManager.items[value - 1].type == "Lycan") ) {message = "Sói";}
		// if ((party == 1) && (this.game.playerManager.items[value - 1].type !== "Lycan")){message = "Dân làng";}
		// if ((party == -1) && (this.game.playerManager.items[value - 1].type !== "Minion")){message = "Sói";}
		// if ((party == -1) && (this.game.playerManager.items[value - 1].type == "Minion")){message = "Dân làng";}
		// if ((party == 2)){message = "Trung lập";}
	
		// await this.sendMessage(`🔮 Phe của ${name} là ${message}`);
	}

	async onNight() {
		const requests = [];
		if (this.type == 'TienTri')  {
		await this.timingSend({
			message:
				'🔮 Đêm nay soi ai? \n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.TIENTRI
		});
		return [
			await this.request(gameConfig.code.TIENTRI, gameConfig.timeout.TIENTRI)
		];

	}


	return requests;
	}

	// async die() {
	// 	await super.die();
    //     for (const player of this.game.playerManager.items) {
	// 		if (gameConfig.data[player.type].party == 1 && player != this  && !player.died && 
	// 		player.type == "NhaNgoaiCam" 
		 
	// 		) {
	// 			player.type = "TienTri";
	// 			console.log(`${player.name}-${player.type} becomes new Seer!`)
	// 		}
	// 	}

    // }


};
