const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class SoiTienTri extends Role {
	constructor(options) {
		super({
			...{
				type: 'SoiTienTri'
			},
			...options
		});
		this.potion = {
			beast: true
		
		};
	}
	
	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		 case gameConfig.code.SOITIENTRI_RESIGN:
		 	this.testCommit(value, ['1', '2']);
		 	//if (value == 1) 
			 	//console.log("Beast mode!");
		 		//this.sendMessage('🐺 Sẽ biến về Sói Thường sau đêm nay');
		 	break;
		case gameConfig.code.SOITIENTRI_SEER: {
			this.testCommit(value, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			//this.sendMessage(`Bạn đã chọn xem role của ${name}(${username})!`);
			break;
		}
		case gameConfig.code.SOITIENTRI_VOTE: {
			this.testCommit(value, this.isAlive);
			const {name, username} = this.game.playerManager.items[value - 1];
			//this.sendMessage(`Bạn đã chọn cắn ${name}(${username})!`);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);

		switch (code) {
		 case gameConfig.code.SOITIENTRI_RESIGN:
		// 	if (value == 1) this.type = 'SoiThuong';
		if (value == 1) this.potion.beast = false;
		 	break;
		case gameConfig.code.SOITIENTRI_SEER: {
			const {name, username, type} = this.game.playerManager.items[value - 1];
			const party = gameConfig.data[type].party > 0 ? 'Dân Làng' : 'Sói';
			await this.sendMessage(`🔮 Role của ${name} là ${type}\n\n🐺🔮Người này cũng đã bị bạn phù phép, Tiên Tri sẽ soi ra người này là Sói!`);
			break;
		}
		}
	}

	async onNight() {
		const requests = [];



		let alone = this.game.u_isAloneSeerWolf();
		

		// if ((alone == true) && this.type == 'SoiTienTri') {
		// 	//this.type = 'SoiThuong';
		// 	//await this.sendMessage(
		// 		'🐺 Bạn sẽ cắn người vì Sói Thường đã chết hết!\n⚠️BẮT BUỘC CHỌN CÙNG 1 NGƯỜI 2 LẦN(NẾU CÓ), NẾU KHÔNG SẼ KHÔNG CẮN ĐƯỢC!⚠️'
		// 	);
		// }

		if ((alone == false) && this.type == 'SoiTienTri') {
			if (this.potion.beast){
			 await this.timingSend({
			 	message:
			 		'🌙 Có muốn hú để tăng sức mạnh tối đa cho bầy Sói không ? (1 lần duy nhất trong game)\n' +
			 		`${gameConfig.symbols[1]} Có 🐺😈\n` +
			 		`${gameConfig.symbols[2]} Không ♥`,
			 	timing: gameConfig.timeout.SOITIENTRI_RESIGN
			 });
			 const data = await this.request(
			 	gameConfig.code.SOITIENTRI_RESIGN,
			 	gameConfig.timeout.SOITIENTRI_RESIGN
			 );
			 requests.push(data);
			}
				asyncWait(1000);
				await this.timingSend({
					message: '🔮 Đêm nay soi ai? \n' + this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.SOITIENTRI_SEER
				});
				requests.push(
					await this.request(
						gameConfig.code.SOITIENTRI_SEER,
						gameConfig.timeout.SOITIENTRI_SEER
					)
				);
			
		} 
		if ((alone == true) && this.type == 'SoiTienTri') {



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
									gameConfig.code.SOITIENTRI_VOTE,
									0, true
								)
							);
							return requests;
						}
					}
				
	
			}
	




			// SoiThuong
			await this.timingSend({
				message: '🐺 Đêm nay cắn ai? 💀\n⚠️LƯU Ý!! BẮT BUỘC CHỌN CÙNG 1 NGƯỜI 2 LẦN(NẾU CÓ), NẾU KHÔNG SẼ KHÔNG CẮN ĐƯỢC!⚠️\n' + this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.SOITIENTRI_VOTE
			});
			requests.push(
				await this.request(
					gameConfig.code.SOITIENTRI_VOTE,
					gameConfig.timeout.SOITIENTRI_VOTE
				)
			);
		}

		return requests;
	}
};
