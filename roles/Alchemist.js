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

module.exports = class Alchemist extends Role {
	constructor(options) {
		super({
			...{
				type: 'Alchemist'
			},
			...options
		});
		this.potion = {
			puppet: true,
			hypnosis: true
		};

        this.hypnosisIndex = -1;
		
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		switch (code) {
		case gameConfig.code.ALCHE_PUPPET: {
			this.testCommit(value, ['1', '2', '3']);
			break;
		}

		case gameConfig.code.ALCHE_HYPNOSIS: {
			this.testCommit(value, this.isAlive, this.isNotSelf);
			break;
		}
		}
	}

	async onNightEnd(code, value) {
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
	}

	async onNight() {
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
	}

    async die() {
		
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
		
	}


};