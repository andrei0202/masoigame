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

module.exports = class SoiKySinh extends Role {
	constructor(options) {
		super({
			...{
				type: 'SoiKySinh'
			},
			...options
		});
		

        this.kysinhIndex = -1;
        this.potion = {
			kysinh: true
			
		};
		
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.SOIKYSINH_VOTE: {
			this.testCommit(value, this.isAlive);
			break;
		}

		case gameConfig.code.SOIKYSINH: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.SOIKYSINH_VOTE:
            //this.potion.puppet = false;
			break;
		case gameConfig.code.SOIKYSINH:
            this.kysinhIndex = value - 1;
			this.potion.kysinh = false;
            this.type = "SoiThuong";
			break;
		}
	}

	async onNight() {
		const requests = [];
		if (this.type == 'SoiThuong') {

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
                        gameConfig.code.SOIKYSINH_VOTE,
                        0, true
                    )
                );
                return requests;
            }
        }
    

}

await this.timingSend({
    message: '🐺👾 Đêm nay cắn ai? 💀 \n'+
	this.game.chat_playerList({died: false}),
    timing: gameConfig.timeout.SOIKYSINH_VOTE
});
requests.push(
    await this.request(
        gameConfig.code.SOIKYSINH_VOTE,
        gameConfig.timeout.SOIKYSINH_VOTE
    )
);

        } 
            
		
if (this.type == "SoiKySinh"){
		if (this.potion.kysinh) {
			await asyncWait(1000);
			await this.timingSend({
				message:
					`🐺👾 Chọn ký sinh ai ? (1 lần duy nhất)\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.SOIKYSINH
			});
			requests.push(
				await this.request(
					gameConfig.code.SOIKYSINH,
					gameConfig.timeout.SOIKYSINH
				)
			);
		}

	}

		return requests;
	}

    async die() {
		
			if ( (this.kysinhIndex != -1) ) {
				try {
					this.testCommit(this.kysinhIndex);
				} catch {
					return;
				}
				const deadPlayer = this.game.playerManager.items[this.kysinhIndex];
				// await this.game.sendMessage('*PẰNG*');
				if(deadPlayer.died) {
					await super.die();
					this.kysinhIndex = -1;
					return;
				}
				if(!deadPlayer.died){
				await this.live('SoiKySinh');
                await asyncWait(1000);
                await this.game.sendMessage(`🐺👾 Sói Ký Sinh ${this.name} không chết :D`);
                await this.live('SoiKySinh');
			}

			} else { 
				await super.die();
				return;
				
			}
		
	}


};