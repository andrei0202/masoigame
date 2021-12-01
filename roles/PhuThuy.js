const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class PhuThuy extends Role {
	constructor(options) {
		super({
			...{
				type: 'PhuThuy'
			},
			...options
		});
		this.potion = {
			save: true,
			kill: true
		};
		this.iPlayerKilledByWolf = -1;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.PHUTHUY_CUU: {
			this.testCommit(value, ['1', '2']);
			//const {name, username} = this.game.playerManager.items[
				//this.iPlayerKilledByWolf
			//];
			// this.sendMessage(
			// 	`💉 Đã chọn ${
			// 		value == 1 ? 'CỨU SỐNG' : 'KHÔNG CỨU'
			// 	} ${name}!`
			// );
			break;
		}

		case gameConfig.code.PHUTHUY_GIET: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			// this.sendMessage(`🧪 Đã chọn giết ${name}!`);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.PHUTHUY_CUU:
			if (value == 1) this.potion.save = false;
			break;
		case gameConfig.code.PHUTHUY_GIET:
			this.potion.kill = false;
			break;
		}
	}

	async onNight() {
		const requests = [];
		if (this.type == 'PhuThuy')  {
		if (this.potion.save) {
			if (this.game.history_last()) {
				const movements = this.game.history_last().movements;
				let iPlayerKilledByWolf = this.game.u_getIPlayerKilledByWolf(movements);
				this.iPlayerKilledByWolf = iPlayerKilledByWolf;
				let iPlayerKilledBySeerWolf = -1;

				let alone = this.game.u_isAloneSeerWolf();

		if ((alone == true)){
			for (const movement of this.game.u_getMovements('SoiTienTri', movements)) {
				for (const commit of movement.data) {
					if (commit.value == null) continue;
					switch (commit.code) {
					case gameConfig.code.SOITIENTRI_VOTE:
						iPlayerKilledBySeerWolf = commit.value - 1;
						iPlayerKilledByWolf = iPlayerKilledBySeerWolf;
						break;
					}
				}
		}
	}

	let iPlayerPuppet = -1;
	for (const movement of this.game.u_getMovements('Alchemist', movements)) {
		for (const commit of movement.data) {
			if (commit.value == null) continue;
			switch (commit.code) {
			case gameConfig.code.ALCHE_PUPPET:
				iPlayerPuppet = commit.value;
				break;
			}
		}
	}
	

	if (iPlayerKilledByWolf != -1){
		if (iPlayerPuppet != -1){
		  switch (iPlayerPuppet) {
			case '1':
			  for(let i = iPlayerKilledByWolf - 1;i <= (this.game.playerManager.items.length - 1); i--){
				if (i < 0){i = this.game.playerManager.items.length - 1;}
				if(!this.game.playerManager.items[i].died){
				  iPlayerKilledByWolf = i;
				
				  break;
				}
				}
			break;
			case '2':
				for(let i = iPlayerKilledByWolf + 1; i >= 0; i++){
					if (i > this.game.playerManager.items.length - 1){i = 0;}
					if(!this.game.playerManager.items[i].died){
						iPlayerKilledByWolf = i;
				
					  break;
					}
					}
				break;
			case '3':
			console.log("Not move!");
			break;
			default:
			console.log("NO VALUE!");
			break;
		  }
		}
	  }


	// if (iPlayerPuppet != -1){
	// 	iPlayerKilledByWolf = iPlayerPuppet;
	// }

	let iPlayerKilledByDongPham = -1;
	for (const movement of this.game.u_getMovements('DongPham', movements)) {
		for (const commit of movement.data) {
			if (commit.value == null) continue;
			switch (commit.code) {
			case gameConfig.code.DONGPHAM:
				iPlayerKilledByDongPham = commit.value - 1;
				break;
			}
		}
	}


				if ( (iPlayerKilledByWolf != -1) || (iPlayerKilledByDongPham != -1) ) {
					// not tie
					if (iPlayerKilledByWolf != -1){
					 const {name, username} = this.game.playerManager.items[
					 	iPlayerKilledByWolf
					 ];
				
					await this.timingSend({
						message:
							`💉 Đêm nay ${name} bị cắn, dùng bình [cứu người] không? (1 lần duy nhất)\n` +
							`${gameConfig.symbols[1]} Có ❤️\n` +
							`${gameConfig.symbols[2]} Không 😈`,
						timing: gameConfig.timeout.PHUTHUY_CUU
					});
				}else{
					await this.timingSend({
						message:
							`💉 Đêm nay sẽ có người bị giết, dùng bình [cứu người] không? (1 lần duy nhất)\n` +
							`${gameConfig.symbols[1]} Có ❤️\n` +
							`${gameConfig.symbols[2]} Không 😈`,
						timing: gameConfig.timeout.PHUTHUY_CUU
					});
				}


					requests.push(
						await this.request(
							gameConfig.code.PHUTHUY_CUU,
							gameConfig.timeout.PHUTHUY_CUU
						)
					);
				}
			} else {
				await this.sendMessage('📍 Đêm nay không ai bị cắn!');
			}
		}
		

		if (this.potion.kill) {
			await asyncWait(1000);
			await this.timingSend({
				message:
					`🧪 Dùng ${
						requests.length > 0 ? 'thêm ' : ''
					}bình [giết người] để giết ai không? (1 lần duy nhất)\n ⚠️ Nếu không muốn giết ai hãy nhập "pass"\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.PHUTHUY_GIET
			});
			requests.push(
				await this.request(
					gameConfig.code.PHUTHUY_GIET,
					gameConfig.timeout.PHUTHUY_GIET
				)
			);
		}

	}
		return requests;
	}
};