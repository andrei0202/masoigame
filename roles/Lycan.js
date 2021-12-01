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


module.exports = class Lycan extends Role {
	constructor(options) {
		super({
			...{
				type: 'Lycan'
			},
			...options
		});
		this.potion = {
			checkIdol: true
		};
		this.dayPassed = 0;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.LYCAN_VOTE: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			break;
		}
		case gameConfig.code.LYCAN_IDOL: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		// const wwAmount = this.game.playerManager.items.filter(
		// 	player => ( player.type == "SoiThuong" || player.type == "SoiTienTri" || player.type == "SoiBongDem" || player.type == "SoiDeThuong")
		// );
		

        // this.dayPassed = this.dayPassed + 1;
        // console.log(this.dayPassed);
        // console.log(wwAmount.length);
		// if(  ((wwAmount.length) + 1) - (this.dayPassed) == 1  ){
		// 	await asyncWait(1000);
		// 	await this.sendMessage(
		// 		`🙆🏻‍♀️ Bạn sắp đến ngày chết, hãy cẩn thận!`
		// 	);
		// }
        // if ( this.dayPassed >= ((wwAmount.length) + 1) ) {
        //     if (!this.died){
        //         await asyncWait(2000);
        //         await this.game.sendMessage(
		// 			`☀️ ${this.name} đã ${
		// 				lmao[random(0, lmao.length - 1)]
		// 			}`
		// 		);}
		// 	this.die('Lycan');
		// }
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.LYCAN_IDOL:
            this.potion.checkIdol = false;
			break;

		}

	}

	async onNight() {
		const requests = [];



		if (this.type == "Lycan"){
			if(this.potion.checkIdol){
			await this.timingSend({
				message:
					`🙆🏻‍♀️ Chọn thần tượng của bạn ?\n⚠️ Nếu người này chết, bạn sẽ biến thành Sói\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.LYCAN_IDOL
			});
			requests.push(
				await this.request(
					gameConfig.code.LYCAN_IDOL,
					gameConfig.timeout.LYCAN_IDOL
				)
			);
		}
	}

		
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
									gameConfig.code.LYCAN_VOTE,
									0, true
								)
							);
							return requests;
						}
					}
				
	
			}
            
			await this.timingSend({
				message: '🐺🙆🏻‍♀️ Đêm nay cắn ai? 💀 \n' + this.game.chat_playerList(),
				timing: gameConfig.timeout.LYCAN_VOTE
			});
			requests.push(
				await this.request(
					gameConfig.code.LYCAN_VOTE,
					gameConfig.timeout.LYCAN_VOTE
				)
			);
		}

		return requests;
	}
};
