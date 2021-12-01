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

module.exports = class NhaNgoaiCam extends Role {
	constructor(options) {
		super({
			...{
				type: 'NhaNgoaiCam'
			},
			...options
		});
		
	
        this.firstindexNNC = -1;
		this.checkindexNNC = -1;
        this.secondindexNNC = -1;
        this.pairsNNC = [];
		this.pairscheckNNC = [];

	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.NGOAICAM: {
			this.pairscheckNNC = value
			.split(' ')
			.slice(0, 2)
			.map(val => this.testCommit(val, this.isAlive));
			this.pairscheckNNC = value
					.split(' ')
					.slice(0, 2);
			if (this.pairscheckNNC.length != 2) {
				throw new Error('Vui lòng chọn đủ 2 người!');
			}
			if (this.pairscheckNNC.length == 2 ){
			this.checkindexNNC = this.pairscheckNNC[0] - 1;
			this.diff(this.pairscheckNNC[1], this.checkindexNNC);
			}
			if (this.pairscheckNNC.length == 2 ){
			const player1 = this.game.playerManager.items[this.pairscheckNNC[0] - 1];
            const player2 = this.game.playerManager.items[this.pairscheckNNC[1] - 1];
			
			}
			break;
		}

		
		}
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
			case gameConfig.code.NGOAICAM:
				this.pairsNNC = [];
				this.pairscheckNNC = value
					.split(' ')
					.slice(0, 2);
				this.firstindexNNC = this.pairscheckNNC[0] - 1;
				this.secondindexNNC = this.pairscheckNNC[1] - 1;
				this.pairsNNC.push(this.firstindexNNC);
				this.pairsNNC.push(this.secondindexNNC);
				break;
			
			}
	
        if (this.pairsNNC.length == 2){
            const player1 = this.game.playerManager.items[this.pairsNNC[0]];
            const player2 = this.game.playerManager.items[this.pairsNNC[1]];
          
			const checkngoaicam = (ptype) => {
				let usedKill = false;
				let soithuong = -1;
				let dongpham = -1;
				let kysi = -1;
				let phuthuy_giet = -1;
				let vampire = -1;
				let vampirekill = -1;
				let vonghon = -1;
				let vonghon_coin = -1;
				let thosan_night = -1;
				let alche_hypnosis = -1;


				if (this.game.history_last()) {
					const movements = this.game.history_last().movements;
					const checkMovements = (type, codeg) =>{
						let changeValue = -1;
						for (const movement of this.game.u_getMovements(type, movements)) {
						for (const commit of movement.data) {
							if (commit.value == null) continue;
							switch (commit.code) {
							case codeg:
								changeValue = commit.value - 1;
								//console.log(changeValue);
								return changeValue;
								break;
							
							}
						}
				}
				//console.log(changeValue);
				return changeValue;
			}
				
					switch (ptype) {
						case "PhuThuy":
							phuthuy_giet = checkMovements(ptype, gameConfig.code.PHUTHUY_GIET);
							if (phuthuy_giet != -1){
								usedKill = true;
							}
						break;
						case "ThoSan":
							thosan_night = checkMovements(ptype, gameConfig.code.THOSAN_NIGHT);
							if (thosan_night != -1){
								usedKill = true;
							}
						break;
						case "Alchemist":
							alche_hypnosis = checkMovements(ptype, gameConfig.code.ALCHE_HYPNOSIS);
							if (alche_hypnosis != -1){
								usedKill = true;
							}
						break;

						case "SoiThuong":
							let arr = [];
							//soithuong = this.game.u_getIPlayerKilledByWolf(movements);
							arr.push(this.game.u_getIPlayerKilledByWolf(movements));
							arr.push(checkMovements(ptype, gameConfig.code.SOITIENTRI_VOTE));
							arr.push(checkMovements(ptype, gameConfig.code.BANSOI_VOTE));
							arr.push(checkMovements(ptype, gameConfig.code.LYCAN_VOTE));
							arr.push(checkMovements(ptype, gameConfig.code.SOIBONGDEM_VOTE));
							arr.push(checkMovements(ptype, gameConfig.code.SOICUTE_VOTE));
							arr.push(checkMovements(ptype, gameConfig.code.SOIKYSINH_VOTE));

							for(let i = 0; i < arr.length; i++) {
								soithuong = arr[i];
								if (soithuong != -1){
									usedKill = true;
								}
							}
						break;
						case "KySi":
							kysi = checkMovements(ptype, gameConfig.code.KYSI);
							if (kysi != -1){
								usedKill = true;
							}
						break;
						case "DongPham":
							dongpham = checkMovements(ptype, gameConfig.code.DONGPHAM);
							if (dongpham != -1){
								usedKill = true;
							}
						break;
						case "Vampire":
							vampire = checkMovements(ptype, gameConfig.code.VAMPIRE);
							vampirekill = checkMovements(ptype, gameConfig.code.VAMPIREKILL);
							
							if ((vampire != -1) && (vampirekill != -1) && (vampirekill != 1)){
								usedKill = true;
							}
						break;
						case "VongHon":
							vonghon = checkMovements(ptype, gameConfig.code.VONGHON_PLAYER);
							vonghon_coin = checkMovements(ptype, gameConfig.code.VONGHON_COIN);
							if ((vonghon != -1) && (vonghon_coin != -1)){
								usedKill = true;
							}
						break;
						default:
							break;
						
					}
					
					return usedKill;
					
		
			}	


		}
			const players = this.pairsNNC.map(index => this.game.playerManager.items[index]);
			const checkWaller = (arr1, arr2) => {
				const [smallArray, bigArray] =
				  arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];
				return smallArray.some(c => bigArray.includes(c));
			  };
			for (let i = 0; i < 2; i++) {
				const me = players[i];
				const waifu = players[(i + 1) % 2];

				if (checkngoaicam(me.type) ||  checkngoaicam(waifu.type)  ){
					await asyncWait(1000);
						this.sendMessage(`🚨🚨🚨 Một trong hai người có khả năng đã giết người vào đêm qua!${checkWaller(this.pairsNNC,this.game.pairsWaller)?'\n👬🏻 Waller có thể đã chọn 1 trong 2 người':''}`);
						break;
				}else{
					await asyncWait(1000);
					this.sendMessage(`✅✅✅ Không có ai có khả năng giết người vào đêm qua!${checkWaller(this.pairsNNC,this.game.pairsWaller)?'\n👬🏻 Waller có thể đã chọn 1 trong 2 người':''}`);
					break;
				}
				
				
			}
        }
		
	}

	async onNight() {
		const requests = [];
		// const findseer = this.game.playerManager.items.filter(
		// 	player => ( (player.type == "TienTri") && (!player.died) )
		// );

		// let alone = false;

		// if ((findseer.length <= 0)){
		// 	alone = true;
		// }
		if(this.type == "NhaNgoaiCam"){
			await this.timingSend({
				message:
					`⚜️🔮 Chọn soi 2 người\nHướng dẫn: <người thứ nhất><dấu cách><người thứ hai>, VD: 3 1\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.NGOAICAM
			});
			requests.push(
				await this.request(
					gameConfig.code.NGOAICAM,
					gameConfig.timeout.NGOAICAM
				)
			);
				}
				
				

		return requests;
	}



diff(value, checkindex){
	if(checkindex !== -1){
	if (value - 1 == checkindex){
	throw new Error('⚠️Trùng lặp! Hãy chọn hai người khác nhau!');}
	}
}

};
