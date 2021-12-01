const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class Vampire extends Role {
	constructor(options) {
		super({
			...{
				type: 'Vampire'
			},
			...options
		});

        this.vampireKilledIndex = -1;
		this.godlock = false;
		
	}


	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

            switch (code) {
                case gameConfig.code.VAMPIRE:
                 this.testCommit(value, this.isAlive, this.isNotSelf);
				 if (this.game.killedIndexTemp.length > 0){
				 for (let i = 0; i < this.game.killedIndexTemp.length; i++){
					this.diff((value-1), this.game.killedIndexTemp[i]);
				 } 
				}
                 break;
				 case gameConfig.code.VAMPIREKILL:
					this.testCommit(value, ['1', '2']);
					break;
				 
                }
		//const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`💀 Đã chọn cắn ${name}!`);
	}

    async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
        this.vampireKilledIndex = value - 1;
		let deadmode = false;
        switch (code) {
            case gameConfig.code.VAMPIRE:
                break;
			case gameConfig.code.VAMPIREKILL:
			if (value == 1) deadmode = true;
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
								gameConfig.code.VAMPIRE,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VAMPIREKILL,
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
								gameConfig.code.VAMPIRE,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VAMPIREKILL,
								0, true
							)
						);
						this.godlock = true;
						return requests;
					}

				}


		}

		if (this.godlock){
			requests.push(
				await this.request(
					gameConfig.code.VAMPIRE,
					0, true
				)
			);
			await asyncWait(1000);
			requests.push(
				await this.request(
					gameConfig.code.VAMPIREKILL,
					0, true
				)
			);
			return requests;
		}



		let msg = '';
		if(this.game.killedIndexTemp.length > 0){
		for (let i = 0; i < this.game.killedIndexTemp.length; i++){
			msg += `${gameConfig.symbols[this.game.killedIndexTemp[i] + 1]}  `
		}
	}
		await this.timingSend({
			message:
				'🧛🏻‍♂️ Đêm nay Vampire cắn ai (người bị cắn sẽ mang dấu ấn ma cà rồng) ? 💀\n' +
				`Số thứ tự những người đã mang dấu ấn: ${msg}\n\n` +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.VAMPIRE
		});

        requests.push(
            await this.request(
                gameConfig.code.VAMPIRE,
                gameConfig.timeout.VAMPIRE
            )
        );
		await asyncWait(1000);
		await this.timingSend({
			message:
				'🧛🏻‍♂️ Có muốn kích hoạt DEADMODE ? 💀💀\n(Có để giết người liền, Không để dồn một lần)\n' +
				`${gameConfig.symbols[1]} Có 😈 \n` +
			 		`${gameConfig.symbols[2]} Không ♥`,
			 	timing: gameConfig.timeout.VAMPIREKILL
			 });
		 const data = await this.request(
			 	gameConfig.code.VAMPIREKILL,
			 	gameConfig.timeout.VAMPIREKILL
			 );
			 requests.push(data); 


		return requests;
	}




diff(value, checkindex){
	if(checkindex !== -1){
		if (value  == checkindex){
		throw new Error('⚠️Trùng lặp! Hãy chọn người khác!');}
		}
}



};



