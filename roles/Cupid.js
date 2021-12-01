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

module.exports = class Cupid extends Role {
	constructor(options) {
		super({
			...{
				type: 'Cupid'
			},
			...options
		});
		this.potion = {
			save: true,
			kill: true
		};
		this.iPlayerKilledByWolf = -1;
        this.firstindex = -1;
		this.checkindex = -1;
        this.secondindex = -1;
        this.pairs = [];
		this.pairscheck = [];
        this.runpairs = true;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.CUPIDFIRST: {
			this.pairscheck = value
			.split(' ')
			.slice(0, 2)
			.map(val => this.testCommit(val, this.isAlive));
			this.pairscheck = value
					.split(' ')
					.slice(0, 2);
			if (this.pairscheck.length != 2) {
				throw new Error('Vui lòng chọn đủ 2 người!');
			}
			if (this.pairscheck.length == 2 ){
			this.checkindex = this.pairscheck[0] - 1;
			this.diff(this.pairscheck[1], this.checkindex);
			}
			if (this.pairscheck.length == 2 ){
			const player1 = this.game.playerManager.items[this.pairscheck[0] - 1];
            const player2 = this.game.playerManager.items[this.pairscheck[1] - 1];
			//asyncWait(2000);
            //player1.sendMessage(`💘 Cupid ghép đôi bạn với ${player2.name}(${player2.type}) `);
            //asyncWait(2000);
            //player2.sendMessage(`💘 Cupid ghép đôi bạn với ${player1.name}(${player1.type}) `);
			
			asyncWait(1000).then(() => {
				player1.sendMessage(`💘 CUPID GHÉP ĐÔI BẠN VỚI ${player2.name}(${player2.type}) `);
				 });
			asyncWait(1000).then(() => {
				player2.sendMessage(`💘 CUPID GHÉP ĐÔI BẠN VỚI ${player1.name}(${player1.type}) `);
				});
			}
			break;
		}

		// case gameConfig.code.CUPIDSECOND: {
		// 	this.testCommit(value, this.isAlive);
		// 	this.diff(value, this.checkindex);
		// 	break;
		// }
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
			case gameConfig.code.CUPIDFIRST:
				this.pairscheck = value
					.split(' ')
					.slice(0, 2);
				this.firstindex = this.pairscheck[0] - 1;
				this.secondindex = this.pairscheck[1] - 1;
				this.pairs.push(this.firstindex);
				this.pairs.push(this.secondindex);
				break;
			
			}
	
        if (this.pairs.length == 2){
            const player1 = this.game.playerManager.items[this.pairs[0]];
            const player2 = this.game.playerManager.items[this.pairs[1]];
            await this.sendMessage(`💘 Đã ghép đôi ${player1.name} và ${player2.name} thành công!`);
            this.runpairs = false;
			
			const players = this.pairs.map(index => this.game.playerManager.items[index]);
			for (let i = 0; i < 2; i++) {
				const me = players[i];
				const waifu = players[(i + 1) % 2];
				const mePreviousDieFunction = me.die;
				me.waifu = waifu;
				me.die = async death => {
					await mePreviousDieFunction.bind(me)(death);
					// if(waifu.died) {
					// 	console.log("This waifu player dead already so return!");
					// 	return;
					// }
					//console.log(death);
					if (death !== 'SIMP'){
					if (!waifu.died) {
						
						await asyncWait(2000);
						await this.game.sendMessage(`☀️ ${waifu.name} đã ${
							lmao[random(0, lmao.length - 1)]
						}`);
						await waifu.die('SIMP');
					} else {
						console.log("This waifu player dead already so return!");
						return;
					}
				}
				// 	if(me.died) {
				// 		console.log("This me player dead already so return!");
				// 		return;
				// 	}
				// 	if (!me.died) {
				// 		await asyncWait(2000);
				// 		await this.game.sendMessage(`☀️ ${me.name} đã ${
				// 			lmao[random(0, lmao.length - 1)]
				// 		}`);
				// 		await me.die('SIMP');
						
				// }
				};
			}
        }
		
	}

	async onNight() {
		const requests = [];
		
	
		if (this.runpairs){
			
			await this.timingSend({
				message:
					`👼🏻 Chọn ghép đôi 2 người\nHướng dẫn: <người thứ nhất><dấu cách><người thứ hai>, VD: 3 1\n` +
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

		
            // await asyncWait(1000);
			// await this.timingSend({
			// 	message:
			// 		`👼🏻 Chọn ghép người thứ hai ♀️\n⛔KHÔNG CHỌN TRÙNG LẶP⛔\n` +
			// 		this.game.chat_playerList({died: false}),
			// 	timing: gameConfig.timeout.CUPIDSECOND
			// });
			// requests.push(
			// 	await this.request(
			// 		gameConfig.code.CUPIDSECOND,
			// 		gameConfig.timeout.CUPIDSECOND
			// 	)
			// );
				

		
		return requests;
	}



diff(value, checkindex){
	if(checkindex !== -1){
	if (value - 1 == checkindex){
	throw new Error('⚠️Trùng lặp! Hãy chọn người khác để ghép!');}
	}
}

};
