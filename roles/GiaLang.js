const Role = require('./Role');
const {asyncWait, random, shuffle} = kb2abot.helpers;
const gameConfig = require('../gameConfig');
const { type } = require('os');
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

module.exports = class GiaLang extends Role {
	constructor(options) {
		super({
			...{
				type: 'GiaLang'
			},
			...options
		});
	}


	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILLGL) {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			//const {name, username} = this.game.playerManager.items[value - 1];
			// this.sendMessage(`🔥 Đã vote ${name}`);
		}
	}

	async voteKill() {
		
		await this.timingSend({
			message:
				'🔥 Chọn 1 người để vote treo cổ, bạn là Già Làng nên phiếu của bạn được tính là 2 !\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.VOTEKILLGL
		});
		return await this.request(
			gameConfig.code.VOTEKILLGL,
			gameConfig.timeout.VOTEKILLGL
		);
	}

	async die() {
		await super.die();
        let count = 0;
        for (const player of this.game.playerManager.items) {
			if (gameConfig.data[player.type].party == 1 && player != this  && !player.died && 
			player.type !== "ThoSan" && 
			player.type !== "Waller" && 
			player.type !== "OldMan" && 
			player.type !== "ChanDoi" && 
			player.type !== "BanSoi" && 
			player.type !== "DanLang" && 
			player.type !== "Lycan" && 
			player.type !== "GiaLang" &&
			player.type !== "Harlot" &&
			player.type !== "Minion" &&
			player.type !== "NhanBan"
		
			) {
				player.type = "DanLang";
                count++;
                console.log(`${count} ${player.type}`);
                
			}
		}

    }

};
