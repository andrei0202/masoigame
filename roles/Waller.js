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

module.exports = class Waller extends Role {
	constructor(options) {
		super({
			...{
				type: 'Waller'
			},
			...options
		});
		
        this.firstindexWaller = -1;
		this.checkindexWaller = -1;
        this.secondindexWaller = -1;
        this.pairsWaller = [];
		this.pairscheckWaller = [];
        this.runpairsWaller = true;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.CUPIDFIRST: {
			this.pairscheckWaller = value
			.split(' ')
			.slice(0, 2)
			.map(val => this.testCommit(val, this.isAlive, this.isNotSelf));
			this.pairscheckWaller = value
					.split(' ')
					.slice(0, 2);
			if (this.pairscheckWaller.length != 2) {
				throw new Error('Vui lòng chọn đủ 2 người!');
			}
			if (this.pairscheckWaller.length == 2 ){
			this.checkindexWaller = this.pairscheckWaller[0] - 1;
			this.diff(this.pairscheckWaller[1], this.checkindexWaller);
			}
			if (this.pairscheckWaller.length == 2 ){
			const player1 = this.game.playerManager.items[this.pairscheckWaller[0] - 1];
            const player2 = this.game.playerManager.items[this.pairscheckWaller[1] - 1];
			
			asyncWait(1000).then(() => {
				player1.sendMessage(`👬🏻 WALLER ĐÃ CHỌN BẠN VÀ MỘT NGƯỜI KHÁC!\n💡 Nếu 2 người được chọn chết hết trong khi Waller vẫn còn sống thì Waller thắng cả game! Hãy tìm ra Waller và giết nó :D`);
				 });
			asyncWait(1000).then(() => {
				player2.sendMessage(`👬🏻 WALLER ĐÃ CHỌN BẠN VÀ MỘT NGƯỜI KHÁC!\n💡 Nếu 2 người được chọn chết hết trong khi Waller vẫn còn sống thì Waller thắng cả game! Hãy tìm ra Waller và giết nó :D`);
				});
			}
			break;
		}
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
			case gameConfig.code.CUPIDFIRST:
				this.pairscheckWaller = value
					.split(' ')
					.slice(0, 2);
				this.firstindexWaller = this.pairscheckWaller[0] - 1;
				this.secondindexWaller = this.pairscheckWaller[1] - 1;
				this.pairsWaller.push(this.firstindexWaller);
				this.pairsWaller.push(this.secondindexWaller);
				break;
			
			}
	
        if (this.pairsWaller.length == 2){
            const player1 = this.game.playerManager.items[this.pairsWaller[0]];
            const player2 = this.game.playerManager.items[this.pairsWaller[1]];
            await this.sendMessage(`👬🏻 Đã chọn ${player1.name} và ${player2.name} thành công!`);
            this.runpairsWaller = false;	
        }
		
	}

	async onNight() {
		const requests = [];
		
	
		if (this.runpairsWaller){
			
			await this.timingSend({
				message:
					`👬🏻 Chọn 2 người\nHướng dẫn: <người thứ nhất><dấu cách><người thứ hai>, VD: 3 1\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.CUPIDFIRST
			});
			requests.push(
				await this.request(
					gameConfig.code.CUPIDFIRST,
					gameConfig.timeout.CUPIDFIRST
				)
			);
				}

		return requests;
	}



diff(value, checkindex){
	if(checkindex !== -1){
	if (value - 1 == checkindex){
	throw new Error('⚠️Trùng lặp! Hãy chọn người khác!');}
	}
}

};
