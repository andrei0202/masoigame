const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class SoiBongDem extends Role {
	constructor(options) {
		super({
			...{
				type: 'SoiBongDem'
			},
			...options
		});
		this.potion = {
			transfer: true
	
		};
		
	}

	commitChecker(code, value) {
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
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
		case gameConfig.code.SOIBONGDEM:
           	this.potion.transfer = false;
			break;
		}
	}

	async voteKill() {

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
	}


	async onNight() {
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
	}


};