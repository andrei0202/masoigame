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

module.exports = class SoiDeThuong extends Role {
	constructor(options) {
		super({
			...{
				type: 'SoiDeThuong'
			},
			...options
		});
		this.potion = {
			cutewolf: true
		
		};

        this.cuteIndex = -1;
		
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.SOICUTE: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		case gameConfig.code.SOICUTE_VOTE: {
			this.testCommit(value, this.isAlive);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.SOICUTE:
            this.cuteIndex = value - 1;
			this.potion.cutewolf = false;
			break;
		}
	}

	async onNight() {
		const requests = [];
		if (this.type == 'SoiDeThuong')  {
            
		
			await this.timingSend({
				message:
					`🐺🥰 Chọn ai để chết cùng bạn ?\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.SOICUTE
			});
			requests.push(
				await this.request(
					gameConfig.code.SOICUTE,
					gameConfig.timeout.SOICUTE
				)
			);
		

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
                                gameConfig.code.SOICUTE_VOTE,
                                0, true
                            )
                        );
                        return requests;
                    }
                }
        }
        
        
        await this.timingSend({
            message: '🐺🥰 Đêm nay cắn ai? 💀 \n' + this.game.chat_playerList({died: false}),
            timing: gameConfig.timeout.SOICUTE_VOTE
        });
        requests.push(
            await this.request(
                gameConfig.code.SOICUTE_VOTE,
                gameConfig.timeout.SOICUTE_VOTE
            )
        );
    }


		return requests;
	}

    async die() {
		await super.die();
			if ( (this.cuteIndex != -1) && (this.type == "SoiDeThuong") ) {
				try {
					this.testCommit(this.cuteIndex);
				} catch {
					return;
				}
				const deadPlayer = this.game.playerManager.items[this.cuteIndex];
			
				if(deadPlayer.died) {
					this.cuteIndex = -1;
					return;
				}
				if(!deadPlayer.died){
				await asyncWait(2000);
				await this.game.sendMessage(
					`☀️ ${deadPlayer.name} đã ${
						lmao[random(0, lmao.length - 1)]
					}`
				);}
				await deadPlayer.die('SoiDeThuong');
                this.cuteIndex = -1;
			} else { 
				return;
				
			}
		
	}


};