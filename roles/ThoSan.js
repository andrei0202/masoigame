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

module.exports = class ThoSan extends Role {
	constructor(options) {
		super({
			...{
				type: 'ThoSan'
			},
			...options
		});
		this.pinnedIndex = -1;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);

		const {name, username} = this.game.playerManager.items[value - 1];
		switch (code) {
		case gameConfig.code.THOSAN_NIGHT:
			// this.sendMessage(`🔫 Đã chọn ghim ${name}!`);
			break;
		//case gameConfig.code.THOSAN_TREOCO:
			// this.sendMessage(`🔫 Đã bắn ${name}!`);
			//break;
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		if (code == gameConfig.code.THOSAN_NIGHT) this.pinnedIndex = value - 1;
	}

	async onNight() {
	
		await this.timingSend({
			message:
				'🔫 Đêm nay ghim bắn ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.THOSAN_NIGHT
		});
		return [
			await this.request(
				gameConfig.code.THOSAN_NIGHT,
				gameConfig.timeout.THOSAN_NIGHT
			)
		];
	}

	async die(killerType) {
		await super.die();

		// //if (killerType == null) {
			// // type null = vote kill
			// if (this.pinnedIndex != -1) {
				// try {
					// this.testCommit(this.pinnedIndex);
				// } catch {
					// return;
				// }
			
			// const deadPlayer = this.game.playerManager.items[this.pinnedIndex];
			// // await this.game.sendMessage('*BẰNGGGGGGGGGGGG*');
			// // await deadPlayer.sendMessage('Bạn đã bị trúng đạn :/ \n*die');
			
			// if(!deadPlayer.died){
				// await asyncWait(2000);
				// await this.game.sendMessage(
					// `☀️ ${deadPlayer.name} đã ${
						// lmao[random(0, lmao.length - 1)]
					// }`
				// );}
			// await deadPlayer.die('ThoSan');
		// }
	// //}  else {
			if (this.pinnedIndex != -1) {
				try {
					this.testCommit(this.pinnedIndex);
				} catch {
					return;
				}
				const deadPlayer = this.game.playerManager.items[this.pinnedIndex];
				// await this.game.sendMessage('*PẰNG*');
				// await deadPlayer.sendMessage('Bạn đã bị trúng đạn :/ \n*die');
				if(deadPlayer.died) {
					console.log("This hunter player dead already so return!");
					return;
				}
				if(!deadPlayer.died){
				await asyncWait(2000);
				await this.game.sendMessage(
					`☀️ ${deadPlayer.name} đã ${
						lmao[random(0, lmao.length - 1)]
					}`
				);}
				await deadPlayer.die('ThoSan');
			} else { 
				return;
				// await asyncWait(3000);
				// if(!this.died){
				// await this.sendMessage(
				// 	'⚠️ Bạn chưa ghim ai, không thể bắn trước khi chết!'
				// );}
			}
		//}
	}
};
