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

module.exports = class KySi extends Role {
	constructor(options) {
		super({
			...{
				type: 'KySi'
			},
			...options
		});
		this.lastRevealIndex = -1;
		this.potion = {
			knightAtk: true
		
		};
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);
		this.testCommit(value, this.isAlive, this.isNotSelf);
		
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		this.potion.knightAtk = false;
		this.lastRevealIndex = value - 1;
        if (this.lastRevealIndex != -1){
        const revealedPlayer = this.game.playerManager.items[value -1]; 
        if (this.game.u_WolvesAffect(revealedPlayer.type)){
        if(!revealedPlayer.died){
        await this.game.sendMessage(
            `☀️ ${revealedPlayer.name} đã ${
                lmao[random(0, lmao.length - 1)]
            }  `
        );}
        this.game.playerManager.items[value - 1].die('KySi');
        } else {
			
            if(!this.died){
                await this.game.sendMessage(
                    `☀️ ${this.name} đã ${
                        lmao[random(0, lmao.length - 1)]
                    }  `
                );}
        this.die('KySi');
        }
    }
	}

	async onNight() {
if (this.potion.knightAtk){
		await this.timingSend({
			message:
				'⚔️ Ai là Sói ?\n❗ Nếu đâm kiếm sai bạn sẽ chết (1 lần đâm duy nhất) ❗\n⚠️ Nếu không muốn hãy nhắn "pass"\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.KYSI
		});
		return [
			await this.request(gameConfig.code.KYSI, gameConfig.timeout.KYSI)
		];
	}
	return [];

	}


};
