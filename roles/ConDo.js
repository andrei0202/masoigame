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

module.exports = class ConDo extends Role {
	constructor(options) {
		super({
			...{
				type: 'ConDo'
			},
			...options
		});
		this.lastCrimeIndex = -1;
	}

	commitChecker(code, value) {
		if (code == gameConfig.code.VOTEKILL)
			return super.commitChecker(code, value);

		this.testCommit(value, this.isAlive, this.isNotSelf);
        const player = this.game.playerManager.items[value - 1];
        if ( ((gameConfig.data[player.type].party) != -1) && ((gameConfig.data[player.type].party) != 2) && ((gameConfig.data[player.type].party) != 6) ) {
        asyncWait(1000).then(() => {
            player.sendMessage(`💪 Bạn trở thành Đồng Phạm của Côn Đồ ${this.name} và thay hắn giết người vào đêm hôm sau!`);
             });
        asyncWait(1000).then(() => {
            this.sendMessage(`💪 ${player.name} trở thành Đồng Phạm của bạn!`);
            });
        }
    
	}

	async onNightEnd(code, value) {
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
    

    }
	

	async onNight() {
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
}
};
