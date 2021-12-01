const Role = require('./Role');
const gameConfig = require('../gameConfig');
const {asyncWait, random, shuffle} = kb2abot.helpers;

module.exports = class ThayDong extends Role {
	constructor(options) {
		super({
			...{
				type: 'ThayDong'
			},
			...options
		});

        this.potion = {
			realive: true
		};
		 this.lastRealiveIndex = -1;
         this.diedexist = true;
		 this.iPlayerCloned = -1;
		this.deadIDs = [];
		this.welcome = true;
		this.addGroup = true;

	}

	commitChecker(code, value) {
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
	}

	async onNightEnd(code, value) {
		if (!value) return;
		await super.onNightEnd(code, value);
		switch (code) {
         case gameConfig.code.THAYDONG:
			this.potion.realive = false;
			break;
    }

}

	async onNight() {
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
    }
};
