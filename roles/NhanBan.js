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

module.exports = class NhanBan extends Role {
	constructor(options) {
		super({
			...{
				type: 'NhanBan'
			},
			...options
		});
		this.check = {
			clone: true
		};
		this.lastCloneIndex = -1;
		this.lastProtectIndex = -1;
		this.potion = {
			save: true,
			kill: true,
			realive: true,
			beast: true,
			transfer: true,
			puppet: true,
			hypnosis: true,
			checkIdol: true,
			cutewolf: true,
			knightAtk: true,
			kysinh: true
		};
		this.lastRealiveIndex = -1;
		this.diedexist = true;
		this.iPlayerKilledByWolf = -1;
		this.pinnedIndex = -1;
		this.firstindexWaller = -1;
		this.checkindexWaller = -1;
        this.secondindexWaller = -1;
        this.pairsWaller = [];
		this.pairscheckWaller = [];
        this.runpairsWaller = false;
		this.vampireKilledIndex = -1;
		this.killedIndex = [];
		this.lastMuteIndex = -1;
		this.lastSleepIndex = -1;
		this.hypnosisIndex = -1;
		this.godlock = false;
		this.deadIDs = [];
		this.welcome = true;
		this.addGroup = true;
		this.dayPassed = 0;
		this.cuteIndex = -1;
		this.lastRevealIndex = -1;
		this.lastCrimeIndex = -1;
		this.lastCardIndex = -1;
		this.firstindexNNC = -1;
		this.checkindexNNC = -1;
        this.secondindexNNC = -1;
        this.pairsNNC = [];
		this.pairscheckNNC = [];
		this.kysinhIndex = -1;
	}

	commitChecker(code, value) {
		switch(this.type){
			case "NhanBan":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);
			switch (code) {
				case gameConfig.code.NHANBAN:
				 this.testCommit(value, this.isAlive, this.isNotSelf);
				 break;
				}
				const {name, username} = this.game.playerManager.items[value - 1];
				//this.sendMessage(`Đã chọn copy ${name}!`);
				break;

			}

			case "SoiKySinh":{
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
				break;
			}

			case "DongPham":{
				const player = this;
				player.testCommit(value, player.isAlive, player.isNotSelf);
				break;
			}


			case "NhaNgoaiCam":{
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


				break;
			}

			case "Lycan":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.LYCAN_VOTE: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			break;
		}
		case gameConfig.code.LYCAN_IDOL: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		}
				break;
			}


			case "SoiBongDem":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

        if (code == gameConfig.code.VOTEKILLSHADOW) {
                this.testCommit(value, this.isAlive, this.isNotSelf);
        }

		switch (code) {
		case gameConfig.code.SOIBONGDEM: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		case gameConfig.code.SOIBONGDEM_VOTE: {
			this.testCommit(value, this.isAlive);
			break;
		}
		}
				break;
			}


			case "Alchemist":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.ALCHE_PUPPET: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}

		case gameConfig.code.ALCHE_HYPNOSIS: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		}

				break;
			}



			case "Harlot":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);
		if (this.lastSleepIndex == value - 1) {
			throw new Error('⚠️ Không được ngủ 2 đêm với cùng 1 người chơi!');
		}
		const {name, username} = this.game.playerManager.items[value - 1];
				break;
			}

			case "ConDo":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);
        const player = this.game.playerManager.items[value - 1];
        if ( ((gameConfig.data[player.type].party) != -1) && ((gameConfig.data[player.type].party) != 2) ) {
        asyncWait(1000).then(() => {
            player.sendMessage(`💪 Bạn trở thành Đồng Phạm của Côn Đồ ${this.name} và thay hắn giết người vào đêm hôm sau!`);
             });
        asyncWait(1000).then(() => {
            this.sendMessage(`💪 ${player.name} trở thành Đồng Phạm của bạn!`);
            });
        }	
				break;
			}

			case "GiaLang":{
				if (code == gameConfig.code.VOTEKILLGL) {
					this.testCommit(value, this.isAlive, this.isNotSelf);
					//const {name, username} = this.game.playerManager.items[value - 1];
					// this.sendMessage(`🔥 Đã vote ${name}`);
				}
				break;

			}

			case "SoiThuong":{
				if (code == gameConfig.code.VOTEKILL)
				return super.commitChecker(code, value);
	
			this.testCommit(value, this.isAlive);
			const {name, username} = this.game.playerManager.items[value - 1];
			// this.sendMessage(`💀 Đã chọn cắn ${name}!`);
			break;
			}
			case "BaoVe":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive);
		if (this.lastProtectIndex == value - 1) {
			throw new Error('⚠️ Không được bảo vệ 2 lần cho cùng 1 người chơi!');
		}
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`✨ Đã chọn bảo vệ ${name}!`);
		break;

			}

			case "KySi":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);
		this.testCommit(value, this.isAlive, this.isNotSelf);
				break;
			}
			case "PhuThuy":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.PHUTHUY_CUU: {
			this.testCommit(value, ['1', '2']);
			break;
		}

		case gameConfig.code.PHUTHUY_GIET: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			// this.sendMessage(`🧪 Đã chọn giết ${name}!`);
			break;
		}
		}
		break;
			}


			case "TienTri":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isNotSelf);
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(
		// 	`🔮 Đã chọn xem role của người chơi ${name}!`
		// );
		break;
			}

			case "ThoSan":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);

		const {name, username} = this.game.playerManager.items[value - 1];
		switch (code) {
		case gameConfig.code.THOSAN_NIGHT:
			// this.sendMessage(`🔫 Đã chọn ghim ${name}!`);
			break;
		//case gameConfig.code.THOSAN_TREOCO:
			// this.sendMessage(`🔫 Đã bắn ${name}!`);
			//break;
		}

				break;
			}


			case "SoiDeThuong":{


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

				break;
			}

			case "Waller":{
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
				player1.sendMessage(`👬🏻 WALLER ĐÃ CHỌN BẠN VÀ ${player2.name}\n💡 Nếu 2 người được chọn chết hết trong khi Waller vẫn còn sống thì Waller thắng cả game! Hãy tìm ra Waller và giết nó :D`);
				 });
			asyncWait(1000).then(() => {
				player2.sendMessage(`👬🏻 WALLER ĐÃ CHỌN BẠN VÀ ${player1.name}\n💡 Nếu 2 người được chọn chết hết trong khi Waller vẫn còn sống thì Waller thắng cả game! Hãy tìm ra Waller và giết nó :D`);
				});
			}
			break;
		}
		}

				break;
			}

			case "BanSoi":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.BANSOI_VOTE: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			const {name, username} = this.game.playerManager.items[value - 1];
			//this.sendMessage(`Bạn đã chọn cắn ${name}(${username})!`);
			break;
		}
		}
				break;

			}
			case "Vampire":{
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
				break;
			}

			case "ThayDong":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

			// this.testCommit(value, this.isDead, this.isNotSelf);
        // if(code == gameConfig.code.THAYDONG) {
        //         this.testCommit(value, this.isDead);
        //         break;
        //     }
		switch (code) {
		case gameConfig.code.THAYDONG:
		 this.testCommit(value, this.isDead, this.isNotSelf);
		 break;
		}
		//  if (this.lastProtectIndex == value - 1) {
		// 	throw new Error('⚠️ Không được bảo vệ 2 lần cho cùng 1 người chơi!');
		//  }
		// const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`✨ Đã chọn bảo vệ ${name}!`);
				break;
			}

			case "VongHon":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.VONGHON_COIN: {
			this.testCommit(value, ['1', '2']);
			break;
		}

		case gameConfig.code.VONGHON_PLAYER: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			if (this.lastCardIndex == value - 1) {
				throw new Error('⚠️ Không được chơi 2 lần cùng 1 người chơi!');
			}
			break;
		}
		}
				break;
			}

			case "PhapSuCam":{
				if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);
		if (this.lastMuteIndex == value - 1) {
			throw new Error('⚠️ Không được khoá mõm 2 lần liên tục cùng 1 người!');
		}
		const {name, username} = this.game.playerManager.items[value - 1];
		// this.sendMessage(`🤐 Đã chọn khoá mõm ${name}!`);
				break;
			}

			case "SoiTienTri":{
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
				break;
			}
			default:{
				if (code == gameConfig.code.VOTEKILL) {
					this.testCommit(value, this.isAlive, this.isNotSelf);
					const {name, username} = this.game.playerManager.items[value - 1];
					// this.sendMessage(`🔥 Đã vote ${name}`);
				}
				break;
			}
		
		
		
		
		
		}
	}



	async voteKill() {
		switch(this.type){
			case "GiaLang":{
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
				break;
			}


			case "SoiBongDem":{



				if (this.type == "SoiThuong"){

					await this.timingSend({
						message:
							'🔥 Chọn 1 người để vote treo cổ\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
							this.game.chat_playerList({died: false}),
						timing: gameConfig.timeout.VOTEKILL
					});
					return await this.request(
						gameConfig.code.VOTEKILL,
						gameConfig.timeout.VOTEKILL
					);
		
		
				}


				
		if (this.type == "SoiBongDem"){

			if(this.potion.transfer){

		await this.timingSend({
			message:
				'🌑 Chọn 1 người để vote treo cổ, bạn là Sói Bóng Đêm nên phiếu của bạn được tính là 2 !\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.VOTEKILLSHADOW
		});
		return await this.request(
			gameConfig.code.VOTEKILLSHADOW,
			gameConfig.timeout.VOTEKILLSHADOW
		);
			}else{

				await this.timingSend({
					message:
						'🔥 Chọn 1 người để vote treo cổ\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
						this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.VOTEKILL
				});
				return await this.request(
					gameConfig.code.VOTEKILL,
					gameConfig.timeout.VOTEKILL
				);

			}

		}
				break;
			}




			default:{
				await this.timingSend({
					message:
						'🔥 Chọn 1 người để vote treo cổ\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
						this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.VOTEKILL
				});
				return await this.request(
					gameConfig.code.VOTEKILL,
					gameConfig.timeout.VOTEKILL
				);

				break;
			}

		}

	}








	async onNightEnd(code, value) {
		switch(this.type){

			case "NhanBan":{
				if (!value) return;
		await super.onNightEnd(code, value);
				this.lastCloneIndex = value - 1;
        const clonedPlayer = this.game.playerManager.items[this.lastCloneIndex];
				switch (code) {
					case gameConfig.code.NHANBAN:
							this.check.clone = false;
							break;
						}
						//console.log(`Cloned player: ${clonedPlayer.name}`);
						break;
			
			
			}


			case "SoiDeThuong":{

				if (!value) return;
				await super.onNightEnd(code, value);
				switch (code) {
				case gameConfig.code.SOICUTE:
					this.cuteIndex = value - 1;
					this.potion.cutewolf = false;
					break;
				}

				break;
			}


			case "Lycan":{
				// const wwAmount = this.game.playerManager.items.filter(
				// 	player => ( player.type == "SoiThuong" || player.type == "SoiTienTri" || player.type == "SoiBongDem" || player.type == "SoiDeThuong" )
				// );
				// this.dayPassed = this.dayPassed + 1;
				// console.log(this.dayPassed);
				// console.log(wwAmount.length);
				// if(  ((wwAmount.length) + 1) - (this.dayPassed) == 1  ){
				// 	await asyncWait(2000);
				// 	await this.sendMessage(
				// 		`🙆🏻‍♀️ Bạn sắp đến ngày chết, hãy cẩn thận!`
				// 	);
				// }
				// if ( this.dayPassed >= ((wwAmount.length) + 1)  ) {
				// 	if (!this.died){
				// 		await asyncWait(2000);
				// 		await this.game.sendMessage(
				// 			`☀️ ${this.name} đã ${
				// 				lmao[random(0, lmao.length - 1)]
				// 			}`
				// 		);}
				// 	this.die('Lycan');
				// }
				if (!value) return;
				await super.onNightEnd(code, value);
				switch (code) {
				case gameConfig.code.LYCAN_IDOL:
					this.potion.checkIdol = false;
					break;
		
				}
				break;
			}


			case "SoiKySinh":{
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

				break;
			}


			case "SoiBongDem":{
				if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.SOIBONGDEM:
           	this.potion.transfer = false;
			break;
		}
				break;
			}


			case "Alchemist":{
				if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.ALCHE_PUPPET:
            //this.potion.puppet = false;
			break;
		case gameConfig.code.ALCHE_HYPNOSIS:
            this.hypnosisIndex = value - 1;
			this.potion.hypnosis = false;
			break;
		}
				break;

			}


			case "Harlot":{
				if (!value) return;
		await super.onNightEnd(code, value);
		this.lastSleepIndex = value - 1;
		break;
			
			}

			case "ConDo":{
				if (!value) return;
		await super.onNightEnd(code, value);
        const player = this.game.playerManager.items[value - 1];
        if ( ((gameConfig.data[player.type].party) != -1) && ((gameConfig.data[player.type].party) != 2) ) {
        this.lastCrimeIndex = value - 1;
        //player.type = "DongPham";
        //  await player.sendMessage(`💪 Bạn đã trở thành đồng phạm của Côn Đồ ${this.name} và thay hắn giết người!\n💡 Nếu Cupid đã ghép đôi bạn trước đó, bạn sẽ không chết theo người yêu nhưng cả hai bạn vẫn có thể chiến thắng cùng nhau!`)
        //  await asyncWait(1000);
        //  await this.sendMessage(`💪 ${player.name} đã trở thành Đồng Phạm của bạn!`);
        player.onNight = async()=>{
            const requests = [];
            if (this.game.history_last()) {
	
                const movements = this.game.history_last().movements;
                    let iPlayerKilledByHarlot = this.game.u_getIPlayerKilledByHarlot(movements);
                    if (iPlayerKilledByHarlot != -1) {
                        // not tie
                        const lockedPlayer = this.game.playerManager.items[
                            iPlayerKilledByHarlot
                        ];
                        
                        if ((lockedPlayer.name == player.name) && (lockedPlayer.type == player.type)){
                            console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
                            return [
                                await player.request(
                                    gameConfig.code.DONGPHAM,
                                    0, true
                                )
                            ];
                        }
                    }

                    let iPlayerShadow = -1;
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
					
					if ((lockedPlayer.name == player.name) && (lockedPlayer.type == player.type)){
						console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
						requests.push(
							await player.request(
								gameConfig.code.DONGPHAM,
								0, true
							)
						);
						return requests;
					}

				}
    
            }

            await player.timingSend({
                message:
                    '💪 (Đồng Phạm) Đêm nay giết ai ? 💀\n' +
                    this.game.chat_playerList({died: false}),
                timing: gameConfig.timeout.DONGPHAM
            });
            return [
                await player.request(
                    gameConfig.code.DONGPHAM,
                    gameConfig.timeout.DONGPHAM
                )
            ];
        }
        player.die = async()=>{
            player.died = true;
        }
        player.voteKill = async()=>{

            await player.timingSend({
                message:
                    '🔥 Chọn 1 người để vote treo cổ\n⚠️ Random vote bằng cách nhắn "rand" !\n⚠️ Bỏ qua vote bằng cách nhắn "pass" !\n' +
                    this.game.chat_playerList({died: false}),
                timing: gameConfig.timeout.VOTEKILL
            });
            return await player.request(
                gameConfig.code.VOTEKILL,
                gameConfig.timeout.VOTEKILL
            );
        }
        // const previousPlayer = player.onNightEnd;
        // player.onNightEnd = async (code,value)=>{
        //     if (!value) return;
        //     await super.onNightEnd(code, value);
        // }
        
        player.commitChecker = (code,value)=>{
            player.testCommit(value, player.isAlive, player.isNotSelf);
        }
    } else{
        console.log('Cannot convert Wolf and Vampire!');
    }
    

				break;
			}

			case "KySi":{
				if (!value) return;
				await super.onNightEnd(code, value);
				this.potion.knightAtk = false;
				this.lastRevealIndex = value - 1;
				if (this.lastRevealIndex != -1){
				const revealedPlayer = this.game.playerManager.items[this.lastRevealIndex]; 
				if (this.game.u_WolvesAffect(revealedPlayer.type)){
				if(!revealedPlayer.died){
				await asyncWait(2000);
				await this.game.sendMessage(
					`☀️ ${revealedPlayer.name} đã ${
						lmao[random(0, lmao.length - 1)]
					}  `
				);}
				this.game.playerManager.items[this.lastRevealIndex].die('KySi');
				} else {
					
					if(!this.died){
						await asyncWait(2000);
						await this.game.sendMessage(
							`☀️ ${this.name} đã ${
								lmao[random(0, lmao.length - 1)]
							}  `
						);}
				this.die('KySi');
				}
			}
				break;
			}





			case "VongHon":{
				if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.VONGHON_COIN:
			break;
		case gameConfig.code.VONGHON_PLAYER:
			this.lastCardIndex = value - 1;
			break;
		}
				break;
			}


		
			case "BaoVe":{
				if (!value) return;
				await super.onNightEnd(code, value);
				this.lastProtectIndex = value - 1;
				break;
			}


			case "NhaNgoaiCam":{
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
				break;
			}

			case "PhuThuy":{
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
		break;
			}

			case "TienTri":{
				if (!value) return;
		await super.onNightEnd(code, value);
				break;
			
	}


	case "ThoSan":{
		if (!value) return;
		await super.onNightEnd(code, value);
		if (code == gameConfig.code.THOSAN_NIGHT) this.pinnedIndex = value - 1;
		break;


	}

	case "Waller":{
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
		break;
	}

	case "BanSoi":{
		if (!value) return;
		await super.onNightEnd(code, value);
		break;

	}

	case "Vampire":{
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
		break;
	}

	case "ThayDong":{
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
			case gameConfig.code.THAYDONG:
				this.potion.realive = false;
				break;
			}
		break;
	}

	case "PhapSuCam":{
		if (!value) return;
		await super.onNightEnd(code, value);
		this.lastMuteIndex = value - 1;
        const mutedPlayer = this.game.playerManager.items[this.lastMuteIndex]; 
		
        await this.game.sendMessage(
			`<------------------->\n☀️ ${mutedPlayer.name} đã bị cấm không được tham gia thảo luận và vote treo cổ! 🤐\n⚠️❗️❗️Nếu bạn nói bất kì từ gì trong nhóm trước khi bắt đầu buổi thảo luận sáng ngày hôm sau thì bạn sẽ chết ngay lập tức❗️❗️⚠️\n<------------------->`
        );
		break;
	}

	case "SoiTienTri":{
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
		break;
	}
	default:{
		break;
	}
		
		
		}
			
	}

	async onNight() {
		
		console.log(this.type);
		//const type = this.type;
		switch(this.type){
			case "NhanBan":{
				const requests = [];
				if(this.check.clone){
					await this.timingSend({
						message:
							'🃏 Chọn nhân bản ai?\n' +
							this.game.chat_playerList({died: false}),
						timing: gameConfig.timeout.NHANBAN
					});
					requests.push(
						await this.request(
							gameConfig.code.NHANBAN, 
							gameConfig.timeout.NHANBAN
							)
					);
				}
				return requests;
				break;

			}


			case "SoiKySinh":{
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

				break;
			}


			case "SoiBongDem":{
				const requests = [];


				if (this.type == "SoiThuong"){
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
											gameConfig.code.SOIBONGDEM_VOTE,
											0, true
										)
									);
									return requests;
								}
							}
					}
					
					await this.timingSend({
						message: '🐺🌑 Đêm nay cắn ai? 💀 \n' + this.game.chat_playerList({died: false}),
						timing: gameConfig.timeout.SOIBONGDEM_VOTE
					});
					requests.push(
						await this.request(
							gameConfig.code.SOIBONGDEM_VOTE,
							gameConfig.timeout.SOIBONGDEM_VOTE
						)
					);
				}



		if (this.type == 'SoiBongDem')  {

				
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
									gameConfig.code.SOIBONGDEM,
									0, true
								)
							);
							return requests;
						}
					}
			}


            if (this.potion.transfer) {
              
                await this.timingSend({
                    message:
                        `🌑 Khoá quyền năng của ai ? (1 lần duy nhất)\n ⚠️ Nếu không muốn sử dụng hãy nhập "pass"\n` +
                        this.game.chat_playerList({died: false}),
                    timing: gameConfig.timeout.SOIBONGDEM
                });
                requests.push(
                    await this.request(
                        gameConfig.code.SOIBONGDEM,
                        gameConfig.timeout.SOIBONGDEM
                    )
                );
            }

	}
		return requests;
				break;
			}



			case "Alchemist":{
				const requests = [];
		if (this.type == 'Alchemist')  {
            if (this.potion.puppet) {
				if (this.game.history_last()) {
					const movements = this.game.history_last().movements;
					let iPlayerKilledByWolf = this.game.u_getIPlayerKilledByWolf(movements);
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
	if ( (iPlayerKilledByWolf != -1) ) {
		await this.timingSend({
			message:
				`🔰 Danh sách người chơi 🔰\n`+
				this.game.chat_playerList({died: false})+
				`\n\n`+ 
				`🔰 Đêm nay có người bị Sói cắn, dịch chuyển vết cắn không?\n` +
				`${gameConfig.symbols[1]} ☝🏻 Lên 1\n` +
				`${gameConfig.symbols[2]} 👇🏻 Xuống 1\n`+
				`${gameConfig.symbols[3]} 🤞🏻 Không dịch`,
			timing: gameConfig.timeout.ALCHE_PUPPET
		});
                requests.push(
                    await this.request(
                        gameConfig.code.ALCHE_PUPPET,
                        gameConfig.timeout.ALCHE_PUPPET
                    )
                );
            }
		}
	}
		

		if (this.potion.hypnosis) {
			await asyncWait(1000);
			await this.timingSend({
				message:
					`😵‍💫 Thôi miên ai để chết thay bạn ? (1 lần duy nhất)\n ⚠️ Nếu không muốn sử dụng hãy nhập "pass"\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.ALCHE_HYPNOSIS
			});
			requests.push(
				await this.request(
					gameConfig.code.ALCHE_HYPNOSIS,
					gameConfig.timeout.ALCHE_HYPNOSIS
				)
			);
		}

	}
		return requests;
				
				break;
			}


			case "Harlot":{
				const requests = [];
		if (this.type == 'Harlot')  {
		await this.timingSend({
			message:
				'💃 Đêm nay ngủ với với ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.HARLOT
		});
		return [
			await this.request(gameConfig.code.HARLOT, gameConfig.timeout.HARLOT)
		];
	}

	return requests;
				break;

			}


			case "KySi":{
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
				break;
			}




			case "SoiThuong":{

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
								return [
									await this.request(
										gameConfig.code.SOITHUONG,
										0, true
									)
								];
							}
						}
					
		
				}




				await this.timingSend({
					message:
						'🐺 Đêm nay cắn ai ? 💀💀\n' +
						this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.SOITHUONG
				});
				return [
					await this.request(
						gameConfig.code.SOITHUONG,
						gameConfig.timeout.SOITHUONG
					)
				];
				break;
			}

			case "BaoVe":{
			const requests = [];
		if (this.type == 'BaoVe')  {
		await this.timingSend({
			message:
				'✨ Đêm nay bảo vệ ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.BAOVE
		});
		return [
			await this.request(gameConfig.code.BAOVE, gameConfig.timeout.BAOVE)
		];
	}
	return requests;
	break;

			}

			case "SoiDeThuong":{

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



				break;
			}




			case "PhuThuy":{
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
				break;

			}

			case "TienTri":{
				const requests = [];
				if (this.type == 'TienTri')  {
				await this.timingSend({
					message:
						'🔮 Đêm nay soi ai? \n' +
						this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.TIENTRI
				});
				return [
					await this.request(gameConfig.code.TIENTRI, gameConfig.timeout.TIENTRI)
				];
		
			}
		
			return requests;
			break;
			}


			case "DongPham":{
				const player = this;
				const requests = [];
            if (this.game.history_last()) {
	
                const movements = this.game.history_last().movements;
                    let iPlayerKilledByHarlot = this.game.u_getIPlayerKilledByHarlot(movements);
                    if (iPlayerKilledByHarlot != -1) {
                        // not tie
                        const lockedPlayer = this.game.playerManager.items[
                            iPlayerKilledByHarlot
                        ];
                        
                        if ((lockedPlayer.name == player.name) && (lockedPlayer.type == player.type)){
                            console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
                            return [
                                await player.request(
                                    gameConfig.code.DONGPHAM,
                                    0, true
                                )
                            ];
                        }
                    }

                    let iPlayerShadow = -1;
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
					
					if ((lockedPlayer.name == player.name) && (lockedPlayer.type == player.type)){
						console.log(`${lockedPlayer.name}-${lockedPlayer.type} locked ablity!`);
						requests.push(
							await player.request(
								gameConfig.code.DONGPHAM,
								0, true
							)
						);
						return requests;
					}

				}
    
            }

            await player.timingSend({
                message:
                    '💪 (Đồng Phạm) Đêm nay giết ai ? 💀\n' +
                    this.game.chat_playerList({died: false}),
                timing: gameConfig.timeout.DONGPHAM
            });
            return [
                await player.request(
                    gameConfig.code.DONGPHAM,
                    gameConfig.timeout.DONGPHAM
                )
            ];
				break;
			}


			case "ConDo":{
				const requests = [];
        if(this.lastCrimeIndex == -1){
		await this.timingSend({
			message:
				'💪 Chọn ai là đồng phạm?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.CONDO
		});
		return [
			await this.request(gameConfig.code.CONDO, gameConfig.timeout.CONDO)
		];
    }

    let newDongPham = true;
	const arrayCD = Array.from(this.game.playerManager.items);
    const arrayDP = arrayCD.filter(dongpham => 
        (!dongpham.died) &&
        (dongpham.type == "DongPham"));
    if (arrayDP.length > 0){
        newDongPham = false;
    }
    //if(this.lastCrimeIndex != -1){
        //const playerCrime = this.game.playerManager.items[this.lastCrimeIndex];
        //if (playerCrime.died){
            if(newDongPham){
            await this.timingSend({
                message:
                    '💪 Chọn ai là đồng phạm?\n' +
                    this.game.chat_playerList({died: false}),
                timing: gameConfig.timeout.CONDO
            });
            return [
                await this.request(gameConfig.code.CONDO, gameConfig.timeout.CONDO)
            ];
        }
        //}
    //}
	

	return requests;

				break;
			}

			case "ThoSan":{
				
		await this.timingSend({
			message:
				'🔫 Đêm nay ghim bắn ai?\n' +
				this.game.chat_playerList({died: false}),
			timing: gameConfig.timeout.THOSAN_NIGHT
		});
		return [
			await this.request(
				gameConfig.code.THOSAN_NIGHT,
				gameConfig.timeout.THOSAN_NIGHT
			)
		];
		break;

			}

			
			case "Waller":{
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
				break;

			}

			case "BanSoi":{
				const requests = [];
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
									gameConfig.code.BANSOI_VOTE,
									0, true
								)
							);
							return requests;
						}
					}
				
	
			}

            
			await this.timingSend({
				message: '🐺 Đêm nay cắn ai? 💀 \n' +
				this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.BANSOI_VOTE
			});
			requests.push(
				await this.request(
					gameConfig.code.BANSOI_VOTE,
					gameConfig.timeout.BANSOI_VOTE
				)
			);
		}

		return requests;
				break;

			}

			case "Vampire":{
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
				break;
			}



			case "ThayDong":{
				const requests = [];
         
    //     for (let index = 0; index < this.game.playerManager.getLength(); index++) {
	// 		const player = this.game.playerManager.items[index];
    //          if(player.died == false){
    //          return [];
    //         }
    //   }
	if (this.type == 'ThayDong')  {
		if(this.welcome){
			await asyncWait(1000);
			await fca.sendMessage("😈 WELCOME TO HELL 😈\n\n🔪 SÓI CHẾT RỒI KHÔNG ĐƯỢC LIÊN LẠC VỚI GROUP SÓI!😈😈😈\n🔪 LUẬT HOA QUẢ, VI PHẠM THÌ QUẢ TÁO ĐẾN SỚM RÁNG CHỊU HIHI😈😈😈\n\n💡Thầy Đồng sẽ được set làm admin nhóm!\n💡Mỗi buổi sáng Thầy Đồng sẽ bị kick khỏi đây, hết ngày được add vào lại!","4660462720641608");
			this.welcome = false;
		}
	// 	if (this.addGroup){
	// 	try{
	// 		await fca.addUserToGroup(this.threadID, "4660462720641608" );
	// 	}catch(e){}
	// 	await asyncWait(1000);
	// 	try{
	// 		await fca.changeAdminStatus("4660462720641608", this.threadID, true );
	// 	}catch(e){}
	// 	this.addGroup = false;
	// }
		let deadCount = 0;
	for (const player of this.game.playerManager.items){
		if (player.died){
			deadCount++;
		// 	if ( !this.deadIDs.includes(player.threadID) ) {
		// 	await asyncWait(1000);
		// 	try{
		// 	await fca.addUserToGroup(player.threadID, "4660462720641608" );
		// 	}catch(e){}
		// 	this.deadIDs.push(player.threadID);

		// }
		}
	}

       if( (this.potion.realive) && (deadCount > 0) ){
    
		await this.timingSend({
			message:
				'🌙 Đêm nay hồi sinh ai?\nKhông có ai hoặc không hồi sinh thì nhập "pass"\n' +
				this.game.chat_playerList({died: true}),
			timing: gameConfig.timeout.THAYDONG
		});
		requests.push(
			await this.request(
                gameConfig.code.THAYDONG, 
                gameConfig.timeout.THAYDONG
				)
		);
			}
}
	return requests;
				break;
			}

			case "PhapSuCam":{
				const requests = [];
				if (this.type == 'PhapSuCam')  {
				await this.timingSend({
					message:
						'🤐 Đêm nay khoá mõm ai?\n' +
						this.game.chat_playerList({died: false}),
					timing: gameConfig.timeout.PHAPSUCAM
				});
				return [
					await this.request(gameConfig.code.PHAPSUCAM, gameConfig.timeout.PHAPSUCAM)
				];
			}
		
			return requests;
				break;
			}



			case "NhaNgoaiCam":{
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
				break;
			}

			case "VongHon":{
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
								gameConfig.code.VONGHON_COIN,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_PLAYER,
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
								gameConfig.code.VONGHON_COIN,
								0, true
							)
						);
						await asyncWait(1000);
						requests.push(
							await this.request(
								gameConfig.code.VONGHON_PLAYER,
								0, true
							)
						);
						return requests;
					}

				}


		}

		await this.timingSend({
			message:
				`♥️♦️♣️♠️ Kéo bài hay dằn dơ?\n` +
				`${gameConfig.symbols[1]} 🤘 Kéo tiếp\n` +
				`${gameConfig.symbols[2]} 🤞 Dằn dơ`,
			timing: gameConfig.timeout.VONGHON_COIN
		});
                requests.push(
                    await this.request(
                        gameConfig.code.VONGHON_COIN,
                        gameConfig.timeout.VONGHON_COIN
                    )
                );
            
			await asyncWait(1000);
			await this.timingSend({
				message:
					`😈 Muốn chơi cùng ai?\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.VONGHON_PLAYER
			});
			requests.push(
				await this.request(
					gameConfig.code.VONGHON_PLAYER,
					gameConfig.timeout.VONGHON_PLAYER
				)
			);
		return requests;
				break;
			}



			case "Lycan":{
				const requests = [];



		if (this.type == "Lycan"){
			if(this.potion.checkIdol){
			await this.timingSend({
				message:
					`🙆🏻‍♀️ Chọn thần tượng của bạn ?\n⚠️ Nếu người này chết, bạn sẽ biến thành Sói\n` +
					this.game.chat_playerList({died: false}),
				timing: gameConfig.timeout.LYCAN_IDOL
			});
			requests.push(
				await this.request(
					gameConfig.code.LYCAN_IDOL,
					gameConfig.timeout.LYCAN_IDOL
				)
			);
		}
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
									gameConfig.code.LYCAN_VOTE,
									0, true
								)
							);
							return requests;
						}
					}
				
	
			}
            
			await this.timingSend({
				message: '🐺🙆🏻‍♀️ Đêm nay cắn ai? 💀 \n' + this.game.chat_playerList(),
				timing: gameConfig.timeout.LYCAN_VOTE
			});
			requests.push(
				await this.request(
					gameConfig.code.LYCAN_VOTE,
					gameConfig.timeout.LYCAN_VOTE
				)
			);
		}

		return requests;
				break;
			}



			case "SoiTienTri":{
				const requests = [];

				let alone = this.game.u_isAloneSeerWolf();
		
				// if ((alone == true) && this.type == 'SoiTienTri') {
				// 	//this.type = 'SoiThuong';
				// 	await this.sendMessage(
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

				break;
			}

			 default:{
			 	return [];
			 	break;
			 }

		}
}

async die() {

	switch(this.type){
		case "ThoSan":{
			await super.die();
			if (this.pinnedIndex != -1) {
				try {
					this.testCommit(this.pinnedIndex);
				} catch {
					return;
				}
				const deadPlayer = this.game.playerManager.items[this.pinnedIndex];
				// await this.game.sendMessage('*PẰNG*');
				// await deadPlayer.sendMessage('Bạn đã bị trúng đạn :/ \n*die');
				if(deadPlayer.died) {
					console.log("This hunter player dead already so return!");
					return;
				}
				if(!deadPlayer.died){
				await asyncWait(2000);
				await this.game.sendMessage(
					`☀️ ${deadPlayer.name} đã ${
						lmao[random(0, lmao.length - 1)]
					}`
				);}
				await deadPlayer.die('ThoSan');
			} else { 
				return;
				// await asyncWait(3000);
				// if(!this.died){
				// await this.sendMessage(
				// 	'⚠️ Bạn chưa ghim ai, không thể bắn trước khi chết!'
				// );}
			}
		//}
		break;
		}


		case "SoiDeThuong":{

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

			break;
		}



		case "SoiThuong":{
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

			break;
		}


		case "GiaLang":{
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
			break;
		}


		case "Alchemist":{
			if ( (this.hypnosisIndex != -1) && (this.type == "Alchemist") ) {
				try {
					this.testCommit(this.hypnosisIndex);
				} catch {
					return;
				}
				const deadPlayer = this.game.playerManager.items[this.hypnosisIndex];
				// await this.game.sendMessage('*PẰNG*');
				// await deadPlayer.sendMessage('Bạn đã bị trúng đạn :/ \n*die');
				if(deadPlayer.died) {
				// 	await asyncWait(2000);
				// await this.sendMessage(
				// 	`😵‍💫 ${deadPlayer.name} đã chết vì vậy bạn không thể thôi miên để họ chết thay bạn!
				// 	`
				// );
					await super.die();
					this.hypnosisIndex = -1;
					return;
				}
				if(!deadPlayer.died){
				//console.log(`Alche-vam original ${this.game.killedIndexTemp}`);
				await this.live('Alchemist');	
				const removeItem = (arr, item) => {
					let newArray = [...arr];
					const index = newArray.findIndex((e) => e === item);
					if (index !== -1) {
					  newArray.splice(index, 1);
					  return newArray;
					}
					return newArray;
				  };
				  const curIndex = this.game.playerManager.find(
					{threadID: this.threadID},
					true
				);
				let newarr = removeItem(this.game.killedIndexTemp, curIndex );
				this.game.killedIndexTemp = newarr;
				//console.log(`Alche-vam new ${this.game.killedIndexTemp}`);
				
				await asyncWait(2000);
				await this.game.sendMessage(
					`☀️ ${deadPlayer.name} đã ${
						lmao[random(0, lmao.length - 1)]
					}`
				);
				await deadPlayer.die('Alchemist');
				await this.live('Alchemist');
			}

				
                // await asyncWait(1000);
                // await deadPlayer.sendMessage(
				// 	`😵‍💫 Bạn bị thôi miên nên chết thay cho Alchemist!
				// 	`
				// );
                
                
                this.hypnosisIndex = -1;
                

			} else { 
				await super.die();
				return;
				
			}
			break;
		}




		default:{
			this.died = true;
			break;
		}


	}


}



diff(value, checkindex){
	if(checkindex !== -1){
	if (value - 1 == checkindex){
	throw new Error('⚠️Trùng lặp! Hãy chọn 2 người khác nhau!');}
	}
}

diff2(value, checkindex){
	if(checkindex !== -1){
		if (value  == checkindex){
		throw new Error('⚠️Trùng lặp! Hãy chọn người khác!');}
		}
}

};
