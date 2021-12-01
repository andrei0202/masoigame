const fs = require('fs');
const path = require('path');
const deepExtend = require('deep-extend');
const { kill } = require('process');
let gameConfig;
const cfgPath = path.join(__dirname, 'gameConfig.js');
const cfgExPath = path.join(__dirname, 'gameConfig.example.js');
if (!fs.existsSync(cfgPath)) {
	fs.writeFileSync(cfgPath, fs.readFileSync(cfgExPath));
} else {
	gameConfig = deepExtend(require(cfgExPath), require(cfgPath));
}
const roles = loader(path.join(__dirname, 'roles'));
const { asyncWait, random, shuffle } = kb2abot.helpers;


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


const lmao3 = [
	'Đừng thấy hoa nở mà ngỡ mùa xuân về nha quý dzị!',
	'Dĩ dzãng dơ dzáy dễ gì giấu giếm.',
	'Chỉ có người trong cuộc mới hiểu người trong kẹt!',
	'Đừng đánh tráo khái niệm và tạm ứng niềm tin.',
	'Im lặng là vàng còn tôi nói ra tôi mới là kim cương!',
	'Sự thật thì luôn luôn đơn giản nhưng people make it complicated, nên là mình cứ enjoy cái moment này thoi',
	'Bao nhiêu lâu nữa thì bán được 1 tỷ gói mè?? Trả Lời.',
	'Mèo méo meo mèo meo con mèo ngu ngốc đáng yêu ngọt ngào cute phô mai que xin chào cả nhà.',
	'Ơ mây zing gút chóp em.',
	'Dinh, quay xe!',
	'Mình có thời gian tĩnh lại, ở một mình nhiều hơn. Throw back những gì đã xảy ra trong suốt khoảng thời gian rất là dài',
	'Mình sẽ tương tác với mọi người nhiều hơn và có cái hoạt activities nào thì sẽ show cho mọi người',
	'Minion tố sói ra mặt',
	'Đêm đầu chưa có clue gì hết phù thuỷ ném bình trúng tiên tri',
	'Thầy đồng hồi sinh Sói',
	'Sói tự cắn mình',
	'Thằng khờ khai role xong bị vote xong thắng',
	'Bảo vệ, Thợ Săn vô giành Tiên Tri',
	'Sói tưởng Tiên Tri là Minion nên inbox',
	'Đổi bot Sói ko nhận đc role để timeout, la lên xong bị vote'
];

const lmao2 = [
	'Em mời mn ăn panna cotta',
	'Không có người iu ăn panna có chủ tiệm iu pạnnà',
	'Panna cotta ngon ngọt như bồ bạn á',
	'Mukbang panna để được múc n bang pạnnà',
	'Panna cotta cho 20/10 nha cả nhà iu'
];



const lmaojoin = [
	' ❤️ ',
	' 🧡 ',
	' 💛 ',
	' 💚 ',
	' 💜 ',
	' 💙 ',
	' 🖤 ',
	' 💖 ',
	' 💝 ',
	' 💘 '
];

module.exports = class MasoiGame extends kb2abot.schemas.Game {
	constructor(options = {}) {
		super({
			...options,
			...{
				name: 'Ma Sói'

			}
		});


		if (!this.isGroup) {
			throw new Error('Không thể tạo game masoi trong tin nhắn riêng tư!');
		}

		if (options.param == "custom") {
			this.setup = [];
			this.amount = parseInt(options.slice.length);
			this.slice = options.slice;
			for (var i = 0; i < this.slice.length; i++) {
				if ((this.slice[i] <= 0) || ((this.slice[i]) > 26) || (isNaN(this.slice[i]))) {
					throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nNhắn 'role ma sói' để xem thêm hướng dẫn!\nVD: /game masoi custom 1 7 7");
					break;
				}
			}

			for (var i = 0; i < this.slice.length; i++) {
				switch (this.slice[i]) {
					case '1':
						this.setup.push("SoiThuong");
						break;
					case '2':
						this.setup.push("SoiTienTri");
						break;
					case '3':
						this.setup.push("BaoVe");
						break;
					case '4':
						this.setup.push("TienTri");
						break;
					case '5':
						this.setup.push("PhuThuy");
						break;
					case '6':
						this.setup.push("ThoSan");
						break;
					case '7':
						this.setup.push("DanLang");
						break;
					case '8':
						this.setup.push("GiaLang");
						break;
					case '9':
						this.setup.push("Waller");
						break;
					case '10':
						this.setup.push("ThayDong");
						break;
					case '11':
						this.setup.push("Minion");
						break;
					case '12':
						this.setup.push("Lycan");
						break;
					case '13':
						this.setup.push("ChanDoi");
						break;
					case '14':
						this.setup.push("PhapSuCam");
						break;
					case '15':
						this.setup.push("BanSoi");
						break;
					case '16':
						this.setup.push("Vampire");
						break;
					case '17':
						this.setup.push("NhanBan");
						break;
					case '18':
						this.setup.push("Harlot");
						break;
					case '19':
						this.setup.push("Alchemist");
						break;
					case '20':
						this.setup.push("SoiBongDem");
						break;
					case '21':
						this.setup.push("SoiDeThuong");
						break;
					case '22':
						this.setup.push("KySi");
						break;
					case '23':
						this.setup.push("ConDo");
						break;
					case '24':
						this.setup.push("VongHon");
						break;
					case '25':
						this.setup.push("NhaNgoaiCam");
						break;
					case '26':
						this.setup.push("SoiKySinh");
						break;

					default:
						throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nNhắn 'role ma sói' để xem thêm hướng dẫn!\nVD: /game masoi custom 1 7 7");
						break;
				}

			}

			function getOccurrence(array, value) {
				return array.filter((v) => (v === value)).length;
			}
			if (
				(getOccurrence(this.setup, "BaoVe") > 1) ||
				(getOccurrence(this.setup, "SoiTienTri") > 1) ||
				(getOccurrence(this.setup, "Vampire") > 1) ||
				(getOccurrence(this.setup, "NhanBan") > 1) ||
				(getOccurrence(this.setup, "Waller") > 1) ||
				(getOccurrence(this.setup, "PhapSuCam") > 1) ||
				(getOccurrence(this.setup, "BanSoi") > 1) ||
				(getOccurrence(this.setup, "ThayDong") > 1) ||
				(getOccurrence(this.setup, "GiaLang") > 1) ||
				(getOccurrence(this.setup, "PhuThuy") > 1) ||
				(getOccurrence(this.setup, "TienTri") > 1) ||
				(getOccurrence(this.setup, "Lycan") > 1) ||
				(getOccurrence(this.setup, "Harlot") > 1) ||
				(getOccurrence(this.setup, "Alchemist") > 1) ||
				(getOccurrence(this.setup, "SoiBongDem") > 1) ||
				(getOccurrence(this.setup, "SoiDeThuong") > 1) ||
				(getOccurrence(this.setup, "KySi") > 1) ||
				(getOccurrence(this.setup, "ConDo") > 1) ||
				(getOccurrence(this.setup, "VongHon") > 1) ||
				(getOccurrence(this.setup, "NhaNgoaiCam") > 1) ||
				(getOccurrence(this.setup, "SoiKySinh") > 1)


			) {
				throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nChỉ các role sau được xuất hiện nhiều lần trong một game:\nSói Thường, Thợ Săn, Dân làng, Minion, Chán Đời");
			}
			//  if ((getOccurrence(this.setup,"SoiThuong") < 1 )){
			// 	throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nKhông có Sói sao chơi, còn cái nịt :D");

			//  }


			if (this.setup.length < 2) throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nNhắn 'role ma sói' để xem thêm hướng dẫn!\nVD: /game masoi custom 1 7 7");



		}
		else {
			this.amount = parseInt(options.param);
			this.checkparam3 = parseInt(options.param3);
			if (this.checkparam3 > -1) throw new Error("( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè he ^^\nNhắn 'role ma sói' để xem thêm hướng dẫn!\nVD: /game masoi custom 1 7 7");
			if (isNaN(this.amount) || (!options.param)) {
				throw new Error(
					'( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nVui lòng nhập đúng định dạng /game masoi <số lượng người chơi> <bảng role(1 hoặc 2)>'
				);
			}
			this.setrole = parseInt(options.paramset);
			if (isNaN(this.setrole) || (this.setrole > 2) || (this.setrole < 1) || (!options.paramset)) {
				throw new Error(
					`( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nVui lòng nhập đúng định dạng /game masoi <số lượng người chơi> <bảng role(1 hoặc 2)>`
				);
			}
			if (!gameConfig.setup[this.amount])
				throw new Error(
					'( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nKhông tìm thấy setup với số lượng người chơi ' + this.amount
				);
			if (!gameConfig.setup2[this.amount])
				throw new Error(
					'( \\ _ / )\n( • - • )\n(>🧠<)\nBạn làm rơi não nè ^^\nKhông tìm thấy setup với số lượng người chơi ' + this.amount
				);
			if (this.setrole == 1) {
				this.setup = gameConfig.setup[this.amount];
			}
			else if (this.setrole == 2) {
				this.setup = gameConfig.setup2[this.amount];
			}

		}
		this.state = new kb2abot.helpers.State(['settingUp', 'done']);
		this.playerManager = new kb2abot.helpers.Manager();
		this.history = [];
		this.forceEnd = false;
		this.sentInstruction = false;
		this.tannerwin = false;
		this.couplewin = false;
		this.vampirewin = false;
		this.minionwin = false;
		this.firstindexWaller = -1;
		this.secondindexWaller = -1;
		this.pairs = [];
		this.couplewinTuQuy = false;
		this.eldercheck = true;
		this.killedIndex = [];
		this.indexvamp = -1;
		this.checkindexvamp = -1;
		this.ghostwin = false;
		this.iPlayerCloned = -1;
		this.realive = true;
		this.lastRealiveIndex = -1;
		this.killedIndexTemp = [];
		this.imutedPlayer = -1;
		this.iPlayerSleepByHarlot = -1;
		this.originalArr = [];
		this.message2 = '';
		this.iReplacePlayer = -1;
		this.activeReplace = false;
		this.iHangedPlayer = -1;
		this.notTransfer = true;
		this.iPlayerIdol = -1;
		this.openReplace = false;
		this.byevoteKill = false;
		this.openPaci = false;
		this.iPaciPlayer = -1;
		this.canPaci = true;
		this.isKnight = false;
		this.iWolfKnight = -1;
		this.welcome = true;
		this.iPlayerChanDoi = -1;
		this.chandoicheck = true;
		this.phanboi = false;
		this.indexPhanBoi = -1;
		this.iPlayerMutedBySpellCaster = -1;
		this.allowBaoVe = true;
		this.iPlayerHarlotArray = [];
		this.cupidmode = false;
		this.isBeginGame = false;
		this.pairsWaller = [];
		this.pairscheckWaller = [];
	}

	async clean() {
		await super.clean();
		this.forceEnd = true;
		for (const player of this.playerManager.items) {
			player.commit(null);
		}
	}

	// ---------------------------------------------------------------------------

	async onMessage(message, reply) {
		if (!this.participants.includes(message.senderID) && this.state.is('done'))
			return;
		await super.onMessage(message, reply);

		if (message.body.toLowerCase() == 'end!') {
			if (message.senderID == this.masterID) {
				await asyncWait(2000);
				await kb2abot.gameManager.clean(this.threadID);
				await reply('😥 Đã dọn dẹp trò chơi😭😭😭');
			} else {
				await asyncWait(1000);
				await reply('😌 Chỉ có chủ tạo game mới có thể end!🥴');
			}
		}

		const curState = 'state_' + this.state.getCurrent();
		if (this[curState].constructor.name == 'AsyncFunction')
			await this[curState](message, reply);
		else this[curState](message, reply);
	}

	// ---------------------------------------------------------------------------

	// --> chat utilities
	chat_playerList(filter = {}) {
		let text = '';
		for (let index = 0; index < this.playerManager.getLength(); index++) {
			const player = this.playerManager.items[index];

			let pass = true;
			for (const key in filter) {
				if (player[key] !== filter[key]) {
					pass = false;
					break;
				}
			}

			if (pass)
				text +=
					`${gameConfig.symbols[index + 1]} ${player.name} ` + `${player.died ? ' - DEAD 💀' : ''}\n`;
		}
		return text;
	}


	chat_deadplayerList(filter = {}) {
		let text = '';
		for (let index = 0; index < this.playerManager.getLength(); index++) {
			const player = this.playerManager.items[index];

			let pass = true;
			for (const key in filter) {
				if (player[key] !== filter[key]) {
					pass = false;
					break;
				}
			}

			if (pass)
				text +=
					`${gameConfig.symbols[index + 1]} ${player.name}(${player.type}) ` + `${player.died ? ' 💀' : ''}\n`;
		}
		return text;
	}

	chat_des(type) {
		const roleData = gameConfig.data[type];
		return (
			`✅ BẠN LÀ ${type.toUpperCase()}!\n` +
			`❓ ${roleData.description}\n` +
			`⚠️ ${roleData.note}`
			// // `Lời khuyên: ${roleData.advice}\n`+
			// '📍ĐANG GỌI ROLE THEO THỨ TỰ\n'+
			// '🔜VUI LÒNG ĐỢI...'
		);
	}

	async chat_sendStatus(threadID = this.threadID) {
		await this.sendMessage(
			`Còn sống 😚\n${this.chat_playerList({ died: false })}`,
			threadID
		);
	}
	async chat_sendStatusDead(threadID = this.threadID) {
		await this.sendMessage(
			`Đã chết 💀\n${this.chat_deadplayerList({ died: true })}`,
			threadID
		);
	}
	// <-- chat utilities

	// ---------------------------------------------------------------------------

	//  --> state function
	async state_settingUp(message) {
		// if (!this.sentInstruction) {
		// 	this.sentInstruction = true;
		// 	// await this.sendMessage(
		// 	// 	'Nhắn "meplay" để vào game \n Nếu muốn kết thúc game thì nhắn "end!"'
		// 	// );
		// 	await this.sendMessage('Số người sẵn sàng: 1/' + this.amount);
		// }

		if ((message.body.split(' ').slice(0, 1) == ".plus")) {
			const listuid = Object.keys(message.mentions);
			const uid = Object.keys(message.mentions)[0];
			const name = message.mentions[Object.keys(message.mentions)[0]];
			if (!uid) {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Bạn chưa tag người nào!`);
			} else if (listuid.length > 1) {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Hãy thêm từng người một!`);
			} else if (this.amount == this.participants.length) {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã đủ số lượng người chơi! Hãy thêm role và thử lại!`);
			}
			else if ((!this.participants.includes(uid)) && (uid !== fca.getCurrentUserID())) {
				this.participants.push(uid);
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã thêm ${name} vào game!`);
			} else {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Người này đã ready!`);
			}

		}

		if ((message.body.split(' ').slice(0, 1) == ".minus")) {
			const listuid = Object.keys(message.mentions);
			const uid = Object.keys(message.mentions)[0];
			const name = message.mentions[Object.keys(message.mentions)[0]];
			if (message.senderID != '100010310568952') {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Nạp lần đầu để sử dụng tính năng này! :D`);
			}
			else if (!uid) {
				// await asyncWait(1000);
				// await this.sendMessage(`🐺 Bạn chưa tag người nào!`);
				this.participants = this.participants.filter(player => player != '100010310568952')
				await asyncWait(1000);
				await this.sendMessage(`🐺 Andrei đã rời khỏi game!`);
			}

			else if (listuid.length > 1) {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Hãy bỏ từng người một!`);
			}
			else if ((this.participants.includes(uid))) {
				this.participants = this.participants.filter(player => player != uid)
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã bỏ ${name} ra khỏi game!`);
			} else {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Người này chưa tham gia game!`);
			}

		}



		if (message.body.toLowerCase() == 'slotcount') {
			await asyncWait(1000);
			await this.sendMessage(`🎮 Số lượng: ${this.participants.length}/${this.amount}🤤`);
		}
		if (message.body.toLowerCase() == '.player') {
			await asyncWait(1000);
			console.log(this.participants);
		}


		if (message.body.toLowerCase() == 'bumpbot') {
			await asyncWait(1000);
			await this.sendMessage('⚠️ Hãy nhắn tin riêng với tui! Bump Bump Bump!!!');
		}

		if (message.body.toLowerCase() == '.edit') {
			await asyncWait(1000);
			await this.sendMessage(`🐺Lệnh chỉnh sửa bảng role:\n\n👉Tạo bảng mới: .addnew 1 7 7\n👉Thêm role: .add SoiBongDem\n👉Xoá role: .remove SoiBongDem\n\n💡Vui lòng nhập đúng cú pháp, đúng định dạng tên role!`);
		}
		if (message.body.toLowerCase() == '.allrole') {
			await asyncWait(1000);
			await this.sendMessage(`${this.allRole()}`);
		}
		if (message.body.toLowerCase() == '.phanboion') {
			this.phanboi = true;
			await asyncWait(1000);
			await this.sendMessage(`👺 Phản bội mode ON!\n\n💡 Tự động chọn ngẫu nhiên một người chơi làm Kẻ Phản Bội!\n💡 Không cần biết Kẻ Phản Bội phe nào, nếu hắn là một trong hai người cuối cùng sống sót thì chiến thắng!\n💡 Game chỉ kết thúc khi Kẻ Phản Bội đã chết!`);

		}
		if (message.body.toLowerCase() == '.phanboioff') {
			this.phanboi = false;
			await asyncWait(1000);
			await this.sendMessage(`👺 Phản bội mode OFF!`);

		}

		if (message.body.toLowerCase() == '.cupidon') {
			if (!this.setup.includes("Cupid")) {
				this.cupidmode = true;
				await asyncWait(1000);
				await this.sendMessage(`💘 Cupid mode ON!\n\n💡 Tự động chọn ngẫu nhiên hai người chơi làm cặp đôi!\n💡 Điều kiện thắng và cách chơi giống như Cupid bình thường!`);
			}
		}

		if (message.body.toLowerCase() == '.cupidoff') {
			this.cupidmode = false;
			await asyncWait(1000);
			await this.sendMessage(`💘 Cupid mode OFF!`);

		}


		if (message.body.split(' ').slice(0, 1) == ".addnew") {

			let checkTrue = true;
			let slice = message.body.split(' ').slice(1);
			let tempSetup = [];
			if (message.body.split(' ').slice(0, 1).length == 1) {
				checkTrue = false;
			}
			for (var i = 0; i < slice.length; i++) {
				if ((slice[i] > 0) && ((slice[i]) <= 26) && (isNaN(slice[i]) == false)) {
					switch (slice[i]) {
						case '1':
							tempSetup.push("SoiThuong");
							break;
						case '2':
							tempSetup.push("SoiTienTri");
							break;
						case '3':
							tempSetup.push("BaoVe");
							break;
						case '4':
							tempSetup.push("TienTri");
							break;
						case '5':
							tempSetup.push("PhuThuy");
							break;
						case '6':
							tempSetup.push("ThoSan");
							break;
						case '7':
							tempSetup.push("DanLang");
							break;
						case '8':
							tempSetup.push("GiaLang");
							break;
						case '9':
							tempSetup.push("Waller");
							break;
						case '10':
							tempSetup.push("ThayDong");
							break;
						case '11':
							tempSetup.push("Minion");
							break;
						case '12':
							tempSetup.push("Lycan");
							break;
						case '13':
							tempSetup.push("ChanDoi");
							break;
						case '14':
							tempSetup.push("PhapSuCam");
							break;
						case '15':
							tempSetup.push("BanSoi");
							break;
						case '16':
							tempSetup.push("Vampire");
							break;
						case '17':
							tempSetup.push("NhanBan");
							break;
						case '18':
							tempSetup.push("Harlot");
							break;
						case '19':
							tempSetup.push("Alchemist");
							break;
						case '20':
							tempSetup.push("SoiBongDem");
							break;
						case '21':
							tempSetup.push("SoiDeThuong");
							break;
						case '22':
							tempSetup.push("KySi");
							break;
						case '23':
							tempSetup.push("ConDo");
							break;
						case '24':
							tempSetup.push("VongHon");
							break;
						case '25':
							tempSetup.push("NhaNgoaiCam");
							break;
						case '26':
							tempSetup.push("SoiKySinh");
							break;
						default:
							checkTrue = false;
							break;
					}
				} else {
					checkTrue = false;
				}
			}

			function getOccurrence(array, value) {
				return array.filter((v) => (v === value)).length;
			}
			if (
				(getOccurrence(tempSetup, "BaoVe") > 1) ||
				(getOccurrence(tempSetup, "SoiTienTri") > 1) ||
				(getOccurrence(tempSetup, "Vampire") > 1) ||
				(getOccurrence(tempSetup, "NhanBan") > 1) ||
				(getOccurrence(tempSetup, "Waller") > 1) ||
				(getOccurrence(tempSetup, "PhapSuCam") > 1) ||
				(getOccurrence(tempSetup, "BanSoi") > 1) ||
				(getOccurrence(tempSetup, "ThayDong") > 1) ||
				(getOccurrence(tempSetup, "GiaLang") > 1) ||
				(getOccurrence(tempSetup, "PhuThuy") > 1) ||
				(getOccurrence(tempSetup, "TienTri") > 1) ||
				(getOccurrence(tempSetup, "Lycan") > 1) ||
				(getOccurrence(tempSetup, "Harlot") > 1) ||
				(getOccurrence(tempSetup, "Alchemist") > 1) ||
				(getOccurrence(tempSetup, "SoiBongDem") > 1) ||
				(getOccurrence(tempSetup, "SoiDeThuong") > 1) ||
				(getOccurrence(tempSetup, "KySi") > 1) ||
				(getOccurrence(tempSetup, "ConDo") > 1) ||
				(getOccurrence(tempSetup, "VongHon") > 1) ||
				(getOccurrence(tempSetup, "NhaNgoaiCam") > 1) ||
				(getOccurrence(tempSetup, "SoiKySinh") > 1)

			) {
				checkTrue = false;
			}
			//  if (tempSetup.length < 3){
			// 	 checkTrue = false;
			//  }
			console.log(checkTrue);
			if (checkTrue == true) {
				this.setup = tempSetup;
				this.amount = this.setup.length;
				await asyncWait(1000);
				await this.sendMessage(`✅ Đã TẠO thành công!\n\n✨ Bảng role hiện tại:\n${this.allRole()}\n\n🎮 Số lượng hiện tại: ${this.participants.length}/${this.amount}🤤\n\n${(this.participants.length == this.amount) ? '🔥 Đã đủ số lượng, nhắn "startgame" để bắt đầu trò chơi!' : '❌ Setup không phù hợp, hãy thêm người chơi hoặc bỏ bớt role!'}`);
			} else {
				await asyncWait(1000);
				await this.sendMessage(`🐺 KHÔNG HỢP LỆ!❌\n\n👉 Nhắn 'role ma sói' để xem mã role!\n\n💡 Ví dụ: .addnew 1 7 7\n\n💡 Các role sau được xuất hiện nhiều lần trong một game:\nSói Thường, Thợ Săn, Dân làng, Minion, Chán Đời `);
				checkTrue = true;
			}

		}



		if (message.body.split(' ').slice(0, 1) == ".add") {

			let value = message.body.split(' ').slice(1, 2);
			//console.log(value);
			//console.log(newarr);

			function isValidAdd(arr, value) {
				function getOccurrence(array, value) {
					return array.filter((v) => (v === value)).length;
				}
				if ((value == "ThoSan" || value == "SoiThuong" || value == "ChanDoi" || value == "Minion" || value == "DanLang")) {
					return true;
				}
				if ((!arr.includes(value))) {
					return true;
				}
				if ((arr.includes(value))) {
					return false;
				}
				// if (  ( (value == "NhanBan") && ((getOccurrence(this.setup,"ConDo")) > 0) ) ||
				// 		( (value == "ConDo") && ((getOccurrence(this.setup,"NhanBan")) > 0) )

				// ){
				// 	return "duplicated";
				// }

			}
			if (gameConfig.arrange.includes(value.toString())) {

				if (isValidAdd(this.setup, value.toString())) {
					this.setup.push(value.toString());
					this.amount = this.setup.length;
					await asyncWait(1000);
					await this.sendMessage(`✅ Đã THÊM role ${value.toString()} thành công!\n\n✨ Bảng role hiện tại:\n${this.allRole()}\n\n🎮 Số lượng hiện tại: ${this.participants.length}/${this.amount}🤤\n\n${(this.participants.length == this.amount) ? '🔥 Đã đủ số lượng, nhắn "startgame" để bắt đầu trò chơi!' : '❌ Setup không phù hợp, hãy thêm người chơi hoặc bỏ bớt role!'}`);
					// console.log(this.setup);
					// console.log(this.amount);
				} else {
					await asyncWait(1000);
					await this.sendMessage(`🐺 Chỉ các role sau được xuất hiện nhiều lần trong một game:\n👉 Sói Thường, Thợ Săn, Dân làng, Minion, Chán Đời`);
				}
			} else {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã xảy ra lỗi, thử lại với tên role đúng định dạng!\n\n💡 Ví dụ:\n👉 .add SoiThuong\n👉 .add TienTri\n👉 .add SoiBongDem`);
				// console.log(this.setup);
				// console.log(this.amount);
			}
		}




		if ((message.body.split(' ').slice(0, 1) == ".remove") && (this.participants.length !== this.amount)) {
			const removeItem = (arr, item) => {
				let newArray = [...arr];
				const index = newArray.findIndex((e) => e === item);
				if (index !== -1) {
					newArray.splice(index, 1);
					return newArray;
				}
			};
			let value = message.body.split(' ').slice(1, 2);
			//console.log(value);
			let newarr = removeItem(this.setup, value.toString());
			//console.log(newarr);
			if ((typeof newarr !== "undefined")) {
				this.setup = newarr;
				this.amount = this.setup.length;
				await asyncWait(1000);
				await this.sendMessage(`✅ Đã XOÁ role ${value.toString()} thành công!\n\n✨ Bảng role hiện tại:\n${this.allRole()}\n\n🎮 Số lượng hiện tại: ${this.participants.length}/${this.amount}🤤\n\n${(this.participants.length == this.amount) ? '🔥 Đã đủ số lượng, nhắn "startgame" để bắt đầu trò chơi!' : '❌ Setup không phù hợp không phù hợp, hãy thêm người chơi hoặc bỏ bớt role!'}`);
				// console.log(this.setup);
				// console.log(this.amount);
			} else {
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã xảy ra lỗi, thử lại với tên role đúng định dạng!\n\n💡 Ví dụ:\n👉 .remove SoiThuong\n👉 .remove TienTri\n👉 .remove SoiBongDem`);
				// console.log(this.setup);
				// console.log(this.amount);
			}
		} else if ((message.body.split(' ').slice(0, 1) == ".remove") && (this.participants.length == this.amount)) {
			await asyncWait(1000);
			await this.sendMessage(`🐺 Đã đủ số lượng người chơi ${this.participants.length}/${this.amount}, bạn chỉ có thể thêm role!`);
		}

		if ((
			message.body.toLowerCase() == 'ready' &&
			this.participants.length < this.amount &&
			this.u_addParticipant(message.senderID)) || ((message.body.toLowerCase() == 'startgame') && (this.isBeginGame == false))
		) {

			if (this.participants.length == this.amount) {
				this.isBeginGame = true;
				await asyncWait(1000);
				await this.sendMessage(`🐺 Đã đủ ${this.amount} người chơi, bắt đầu vào game...`);
				shuffle(this.participants);
				this.state.next();
				const infos = await kb2abot.helpers.fca.getUserInfo(this.participants);
				shuffle(this.setup);
				for (let i = 0; i < this.participants.length; i++) {
					await asyncWait(1000);
					const participantID = this.participants[i];
					await asyncWait(1000);
					const info = infos[participantID];
					await asyncWait(1000);
					const player = this.playerManager.add(
						new roles[this.setup[i]]({
							game: this,
							name: info.name || '<chưa add fr>',
							username:
								kb2abot.helpers.fca.getUsername(info.profileUrl) ||
								'<chưa add fr>',
							threadID: participantID,
							gameID: this.id
						})
					);
					await asyncWait(1000);
					this.sendMessage(this.chat_des(player.type), player.threadID);
				}

				this.originalArr = Array.from(this.playerManager.items);


				for (const player2 of this.originalArr) {

					const { name, username, type } = player2;
					this.message2 += `🎭 ${name} - ${type}\n`;

				}
				const wws = this.u_getAllWolves();
				let names = [];

				for (const ww of wws) {
					const { name, type } = ww;
					names.push(`${name}(${type})`);
				}
				for (const ww of wws) {
					const { name, type } = ww;
					// await this.sendMessage('Bạn ở phe Sói🐺', ww.threadID);

					if (names.length > 1) {
						await asyncWait(2000);
						await this.sendMessage(
							`Cùng phe Sói 🐺 ${names
								.filter(n => n != name)
								.join(
									',  '
								)}\n👋 Hãy liên hệ với họ để teamwork tốt nhé!\n❗️❗️SÓI VÀ MINION KHÔNG ĐƯỢC LIÊN LẠC NHAU❗️❗️`,
							ww.threadID
						);
					}
				}


				const nns = this.u_getAllMinion();
				let namem = [];
				for (const nn of nns) {
					const { name, type } = nn;
					namem.push(`${name}(${type})`);
				}
				const mms = this.playerManager.items.filter(e => e.type == 'Minion');
				for (const mm of mms) {
					const { name, type } = mm;
					// await this.sendMessage('Bạn ở phe Sói🐺', mm.threadID);
					if (namem.length > 1)
						await asyncWait(2000);
					await this.sendMessage(
						`Cùng phe Sói 🐺 ${namem
							.filter(n => n != name)
							.join(
								',  '
							)}\n❗️❗️CÁC MINION KHÔNG ĐƯỢC LIÊN LẠC VÀ CHO SÓI BIẾT MÌNH LÀ MINION NHÉ❗️❗️`,
						mm.threadID
					);

				}

				if (this.phanboi) {
					let indexPhanBoi = -1;
					indexPhanBoi = random(0, this.playerManager.items.length - 1);
					//console.log(`Index ke phan boi la ${indexPhanBoi}`);
					if (indexPhanBoi != -1) {
						this.indexPhanBoi = indexPhanBoi;
						const playerPhanBoi = this.playerManager.items[indexPhanBoi];
						await asyncWait(1000);
						await playerPhanBoi.sendMessage(`👺 Bạn là Kẻ Phản Bội!\n👺 Không cần biết bạn phe nào, nếu bạn là một trong hai người sống sót cuối cùng thì bạn chiến thắng!`);

					}
				}

				if (this.cupidmode) {
					const createCouple = () => {
						let pairss = [];
						let player1 = -1;
						let player2 = -1;
						while (player1 == player2) {
							player1 = random(0, this.playerManager.items.length - 1);
							player2 = random(0, this.playerManager.items.length - 1);
						}

						pairss.push(player1);
						pairss.push(player2);

						return pairss;
					}

					this.pairs = createCouple();

					if (this.pairs.length == 2) {
						const player1 = this.playerManager.items[this.pairs[0]];
						const player2 = this.playerManager.items[this.pairs[1]];
						console.log(`Auto Cupid: ${player1.name} and ${player2.name}`);
						player1.sendMessage(`💘 AUTO CUPID GHÉP ĐÔI BẠN VỚI ${player2.name}(${player2.type})`);
						asyncWait(1000);
						player2.sendMessage(`💘 AUTO CUPID GHÉP ĐÔI BẠN VỚI ${player1.name}(${player1.type}) `);



						const players = this.pairs.map(index => this.playerManager.items[index]);
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
								if (death !== "SIMP") {
									if (!waifu.died) {
										await asyncWait(2000);
										await this.sendMessage(`☀️ ${waifu.name} đã ${lmao[random(0, lmao.length - 1)]
											}`);
										await waifu.die('SIMP');
									} else {
										console.log("This waifu player dead already so return!");
										return;
									}
								}
							};
						}

					}


				}




				let balanceScore = 0;
				for (const role of this.setup) {
					balanceScore += gameConfig.data[role].score;
				}
				// await this.sendMessage('Điểm cân bằng: ' + balanceScore);

				//await this.sendMessage(
				//'🎯 Role: \n' +
				//gameConfig.arrange.filter(r => this.setup.includes(r)).join(' 👉 ')
				//);
				// await this.u_timingSend({
				// 	message: '🎯 Role: \n' +
				// 		this.setup.join(lmaojoin[random(0, lmao.length - 1)]) + '\n' + '🎯 BẮT ĐẦU SAU',
				// 	timing: gameConfig.timeout.DELAY_STARTGAME,
				// 	left: false
				// });
				await asyncWait(2000);
				await this.u_timingSend({
					message: `🎅🏻 LÀNG SÓI CÀ HẨY 🧚🏻‍♀️✨ 🎅🏻\n\n🎯 Role\n\n${this.allRole()}\n\n🔰 Thứ tự gọi \n\n${gameConfig.arrange.filter(r => this.setup.includes(r)).join(' 👉 ')}\n\n🙆‍♂️ NGƯỜI CHƠI 🙆‍♂️\n\n${this.chat_playerList({ died: false })}\n\n👺 Kẻ Phản Bội: ${this.phanboi ? 'CÓ' : 'KHÔNG'}\n\n💘 Auto Cupid: ${this.cupidmode ? 'CÓ' : 'KHÔNG'}\n\n🎯 GAME BẮT ĐẦU SAU`,
					timing: gameConfig.timeout.DELAY_STARTGAME,
					left: false
				});
				// await this.sendMessage(
				// 	'Danh sách lệnh (không cần prefix):\n===GROUP===\n1."help": Xem role của mình!\n2."status": Tình trạng các người chơi còn sống\n===PRIVATE===\n1."pass": Bỏ qua lượt'
				// );
				await asyncWait(gameConfig.timeout.DELAY_STARTGAME);
				this.start(message);
			} else {
				//fca.addUserToGroup(message.senderID, "4660462720641608" );
				await asyncWait(2000);
				//await this.sendMessage(`🎃 ${lmao2[random(0, lmao2.length - 1)]}🤓\n\n🎮 ${this.participants.length}/${this.amount}🤤\n\n🎮Beta release: Sói Bóng Đêm, Alchemist!`);
				await fca.setMessageReaction('😍', message.messageID);


			}
		}
	}

	async state_done(message, reply) {
		if (message.body.toLowerCase() != 'end!') {
			const player = this.playerManager.find({ threadID: message.senderID });
			if (this.imutedPlayer != -1) {
				if (message.isGroup) {
					if ((message.body.split('').length > 0) && (message.body.toLowerCase() !== "phepthuatwinx")) {
						const player = this.playerManager.items[this.imutedPlayer];

						if ((message.senderID) == (player.threadID)) {

							if (player.died) {
								console.log("This spellcaster player dead already so return!");
								this.imutedPlayer = -1;
							}
							if (!player.died) {
								await asyncWait(1000);
								await this.sendMessage(
									`☀️ ${player.name} đã ${lmao[random(0, lmao.length - 1)]
									}\n\n🤐 Ai kêu nói nhiều ? 👉🏻👈🏻`
								);
								player.die("PhapSuCam");
							}

							this.imutedPlayer = -1;
						}


					}
				}
			}
			if (this.allowBaoVe) {
				if (this.iReplacePlayer != -1) {
					if (this.openReplace) {
						if (this.iHangedPlayer != -1) {
							if (message.isGroup) {
								if (message.body.toLowerCase() == 'phepthuatwinx') {
									const player = this.playerManager.items[this.iReplacePlayer];
									if (((message.senderID) == (player.threadID))) {
										//if(this.iHangedPlayer !== this.iReplacePlayer) {
										this.activeReplace = true;

									}
								}
							}
						}
					}
				}
			}
			if (this.canPaci) {
				if (this.iPaciPlayer != -1) {
					if (this.openPaci) {
						if (message.body.toLowerCase() == 'soikute') {
							const player = this.playerManager.items[this.iPaciPlayer];

							if (((message.senderID) == (player.threadID))) {
								this.byevoteKill = true;
								this.canPaci = false;
								var array = [];
								for (let i = 1; i <= this.playerManager.items.length; i++) {
									const party = gameConfig.data[this.playerManager.items[i - 1].type].party;
									if ((this.playerManager.items[i - 1].died == false) &&
										(party != -1)
									) {
										array.push(i);
									}
								}

								var randomValue = array[random(0, array.length - 1)];
								if ((randomValue - 1) != -1) {
									const rolePlayer = this.playerManager.items[randomValue - 1];
									await asyncWait(1000);
									await this.sendMessage(`🐺🥰 Sói Dễ Thương lật bài role của ${rolePlayer.name} là ${rolePlayer.type}!\n🥰🥰 Làng bỏ qua phiên treo cổ vì Sói dễ thương🥰`);
								}
								player.type = "SoiThuong";


							}
						}
					}
				}
			}


			switch (message.body.toLowerCase()) {
				case 'help':
					await asyncWait(2000);
					await this.sendMessage(this.chat_des(player.type), message.senderID);
					break;
				case 'status':
					await asyncWait(2000);
					await this.chat_sendStatus(message.threadID);
					break;
				case 'deadstatus':
					if (this.playerManager.items.length >= 12) {
						await asyncWait(2000);
						await this.chat_sendStatusDead(message.threadID);
					}
					break;
				case 'bumpbot':
				   	await asyncWait(2000);
				   	await this.sendMessage('⚠️ Hãy nhắn tin riêng với tui! Bump Bump Bump!!!');
				   	break;
				// case 'allrole':
				// 	await asyncWait(3000);
				// 	await this.sendMessage('https://docs.google.com/document/d/19jNoaIJL_kRukeeN2ooOUe6cDe5_GeikqkcCQUX9yHM/edit');
				// 	break;
				// case 'night':
				// 	await asyncWait(3000);
				// 	await this.sendMessage('⚠️ CÓ THẤY ĐÊM RỒI KO MÀ LÌ VẬY ? LÀM TASK ĐI CHỨ NÓI CLG NÓI DỮ DZÃY ? ⚠️');
				// 	break;
				case 'allrole':
					await asyncWait(3000);
					await this.sendMessage(`🎯 Role: \n\n${this.allRole()}\n\n🔰 Thứ tự gọi: \n\n${gameConfig.arrange.filter(r => this.setup.includes(r)).join(' 👉 ')}`);
					break;
				// case 'day':
				// 	await asyncWait(3000);
				// 	await this.sendMessage('⚠️ TỤI BÂY THÍCH IM KHÔNG ? :) CHƠI CHI MÀ IM QUÁ ZAY ? ⚠️');
				// 	break;
				// case 'fukdead':
				// 	await asyncWait(3000);
				// 	await this.sendMessage('⚠️ CÒN LƯU LUYẾN CLG ? CHẾT RỒI MÀ MẮC CLG NÓI QUÀI ZAY ? ⚠️');
				// 	break;
				// case 'calldong':
				// 	var indexdong = -1;
				// 	for(var i = 0, len = this.playerManager.items.length; i < len; i++) {
				// 	if (this.playerManager.items[i].type == "ThayDong" && !this.playerManager.items[i].died ) {
				// 	indexdong = i;
				// 	break;
				// 				}}			
				// 	if (indexdong != -1) {	
				// 		const dongPlayer = this.playerManager.items[indexdong];
				// 		await asyncWait(2000);
				// 		await dongPlayer.sendMessage('⚠️ Đồng ơi inbox làm nhiệm vụ đi chứ làm clg mà vô dụng quá vậy ? ⚠️');
				// 	}
				// 	const cloneSetup = Array.from(this.setup);
				// 	shuffle(cloneSetup);
				// 	var finddong = cloneSetup.filter(function(e, index, arr){

				// 		if (e == "ThayDong")
				// 				return e;
				// 	});
				// 	if (finddong.length == 1){
				// 		await asyncWait(2000);
				// 		await this.sendMessage('⚠️ ĐỒNG ƠI INBOX LÀM NHIỆM VỤ ĐI CHỨ LÀM CLG MÀ VÔ DỤNG QUÁ VẬY ? ⚠️');
				// 		break;
				// 	}else{
				// 		await asyncWait(2000);
				// 		await this.sendMessage('⚠️ LÀM GÌ CÓ ĐỒNG MÀ CALL CALL ? CÓ ĐIÊN KHUM ? ⚠️');
				// 		break;
				// 		}
			}
			if (!message.isGroup)
				this.playerManager
					.find({ threadID: message.senderID })
					.onMessage(message, reply);
		}
	}
	// <-- state function

	// ---------------------------------------------------------------------------

	// --> core
	async start() {
		const task = new kb2abot.helpers.State(['onNight', 'onMorning', 'onVote']);
		while (!this.u_isEnd() && !this.forceEnd) {
			await this[task.getCurrent()]();
			if (task.isEnd()) {
				task.reset();
			} else {
				task.next();
			}
		}
		// await this.sendMessage('Trò chơi kết thúc!');
		//await this.sendMessage(
		//`🔶 Phe ${this.u_getWinner(true)} thắng!! 🔶`
		//);

		// await this.sendMessage(
		// 	'Như chúng ta đã biết, vai trò của từng người là: . . .'
		// );


		let message = '';
		for (const player of this.playerManager.items) {

			const { name, username, type } = player;
			message += `🎭 ${name} - ${type}\n`;

		}


		if (message != this.message2) {
			await asyncWait(2000);
			await this.sendMessage(`🔴 Phe ${this.u_getWinner(true)} đã chiến thắng!!\n\n` + '⚡ HIỆN TẠI ⚡\n' + message + '\n\n' + '✨ BAN ĐẦU ✨\n' + this.message2);
		} else {
			await asyncWait(2000);
			await this.sendMessage(`🔴 Phe ${this.u_getWinner(true)} đã chiến thắng!!\n\n` + '⚡ BẢNG ROLE ⚡\n' + message);

		}
		await kb2abot.gameManager.clean(this.threadID);
		let threadInfo = await fca.getThreadInfo("4660462720641608");
		if ((threadInfo.participantIDs !== undefined)) {
			if (threadInfo.participantIDs.length > 0) {
				for (const id of threadInfo.participantIDs) {
					if (id !== "100058202486347" &&
						id !== "100030005404401" &&
						id !== "100051511562440"
					) {
						await asyncWait(1000);
						try {
							await fca.removeUserFromGroup(id, threadInfo.threadID);
						}
						catch (e) { }

					}
				}
			}
		}
		// await this.sendMessage('Đã dọn dẹp trò chơi!');
		//&& id !== "100010310568952"
	}

	async onNight() {
		const historyPart = {
			time: 'night',
			movements: []
		};
		this.history.push(historyPart);
		for (const type of gameConfig.arrange) {
			const groupPromise = [];
			const callPromiseQueueIndex = []; // thu tu call index player trong groupPromise
			for (let i = 0; i < this.playerManager.getLength(); i++) {
				const player = this.playerManager.items[i];
				if (player.type == type && !player.died) {
					callPromiseQueueIndex.push(i);
					await asyncWait(2000);
					groupPromise.push(player.onNight());
				}
			}
			if (groupPromise.length > 0) {
				const res = await Promise.all(groupPromise);
				for (let i = 0; i < callPromiseQueueIndex.length; i++) {
					const indexPlayer = callPromiseQueueIndex[i];
					const player = this.playerManager.items[indexPlayer];
					historyPart.movements.push({
						indexPlayer,
						type: player.type,
						data: res[i]
					});
				}
			}
		}
	}

	async onMorning() {
		const movements = this.history_last().movements;

		let iPlayerKilledByWolf = this.u_getIPlayerKilledByWolf(movements),
			iPlayerKilledByWitch = -1;
		let iPlayerKilledBySeerWolf = -1;
		let iPlayerSawBySeerWolf = -1;
		let iPlayerSawBySeer = -1;
		let beastmode = false;
		let tempiPlayerKilledByWolf = -1;
		let iPlayerSleepByHarlot = this.u_getIPlayerKilledByHarlot(movements);


		this.iPlayerSleepByHarlot = iPlayerSleepByHarlot;
		if (this.iPlayerSleepByHarlot != -1) {
			this.iPlayerHarlotArray.push(this.iPlayerSleepByHarlot);
		}

		let alone = this.u_isAloneSeerWolf();


		if ((alone == false)) {

			for (const movement of this.u_getMovements('SoiTienTri', movements)) {
				for (const commit of movement.data) {
					if (commit.value == null) continue;
					switch (commit.code) {
						case gameConfig.code.SOITIENTRI_RESIGN:
							if (commit.value == '1') beastmode = true;
							break;
						case gameConfig.code.SOITIENTRI_SEER:
							iPlayerSawBySeerWolf = commit.value - 1;
							break;
					}
				}
			}

		}


		if ((alone == true)) {
			for (const movement of this.u_getMovements('SoiTienTri', movements)) {
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



		if (iPlayerKilledByWolf != -1) {
			tempiPlayerKilledByWolf = iPlayerKilledByWolf;
		}



		let iPlayerKilledByDongPham = -1;

		for (const movement of this.u_getMovements('DongPham', movements)) {
			const commit = movement.data[0];
			if (commit.value == null) continue;
			iPlayerKilledByDongPham = commit.value - 1;
			if (iPlayerKilledByDongPham == iPlayerKilledByWolf) {
				iPlayerKilledByDongPham = -1;
			}
		}



		let iPlayerKilledByVampire = -1;


		for (const movement of this.u_getMovements('Vampire', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.VAMPIRE:
						iPlayerKilledByVampire = commit.value - 1;
						break;
					case gameConfig.code.VAMPIREKILL:
						break;
				}

			}
		}



		if ((iPlayerKilledByVampire) != -1) {
			const harlotPlayer = this.playerManager.items[iPlayerKilledByVampire];
			if ((harlotPlayer.type == "Harlot") && (iPlayerSleepByHarlot != -1)) {
				iPlayerKilledByVampire = -1;
			}

		}


		if ((iPlayerKilledByVampire) != -1) {
			const vamvictim = this.playerManager.items[iPlayerKilledByVampire];
			if (vamvictim.type == "GiaLang") {
				iPlayerKilledByVampire = -1;
			}
		}





		if (iPlayerKilledByVampire != -1) {
			if (iPlayerKilledByVampire == iPlayerSleepByHarlot) {
				var indexharlot = -1;

				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "Harlot" && !this.playerManager.items[i].died) {
						indexharlot = i;
						break;
					}
				}
				if (indexharlot != -1) {

					this.killedIndexTemp.push(indexharlot);
				}

			}
		}



		if ((iPlayerKilledByVampire) != -1) {
			this.killedIndexTemp.push(iPlayerKilledByVampire);
		}




		if (this.iPlayerCloned == -1) {
			for (const movement of this.u_getMovements('NhanBan', movements)) {
				for (const commit of movement.data) {
					if (commit.value == null) continue;
					switch (commit.code) {
						case gameConfig.code.NHANBAN:
							this.iPlayerCloned = commit.value - 1;
							break;
					}
				}
			}
		}

		if (this.iPlayerIdol == -1) {
			for (const movement of this.u_getMovements('Lycan', movements)) {
				for (const commit of movement.data) {
					if (commit.value == null) continue;
					switch (commit.code) {
						case gameConfig.code.LYCAN_IDOL:
							this.iPlayerIdol = commit.value - 1;
							break;
					}
				}
			}
		}



		for (const movement of this.u_getMovements('Waller', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.CUPIDFIRST:
						this.pairscheckWaller = commit.value
							.split(' ')
							.slice(0, 2);
						this.firstindexWaller = this.pairscheckWaller[0] - 1;
						this.secondindexWaller = this.pairscheckWaller[1] - 1;
						this.pairsWaller.push(this.firstindexWaller);
						this.pairsWaller.push(this.secondindexWaller);
						break;
				}
			}
		}


		let iPlayerPuppet = -1;
		for (const movement of this.u_getMovements('Alchemist', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.ALCHE_PUPPET:
						iPlayerPuppet = commit.value;
						break;
				}
			}
		}


		if (iPlayerKilledByWolf != -1) {
			if (iPlayerPuppet != -1) {
				switch (iPlayerPuppet) {
					case '1':
						for (let i = iPlayerKilledByWolf - 1; i <= (this.playerManager.items.length - 1); i--) {
							if (i < 0) { i = this.playerManager.items.length - 1; }
							if (!this.playerManager.items[i].died) {
								iPlayerKilledByWolf = i;
								tempiPlayerKilledByWolf = i;
								break;
							}
						}
						break;
					case '2':
						for (let i = iPlayerKilledByWolf + 1; i >= 0; i++) {
							if (i > this.playerManager.items.length - 1) { i = 0; }
							if (!this.playerManager.items[i].died) {
								iPlayerKilledByWolf = i;
								tempiPlayerKilledByWolf = i;
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
		// 	tempiPlayerKilledByWolf = iPlayerPuppet;
		// }


		if ((iPlayerKilledByWolf != -1)) {
			const harlotPlayer = this.playerManager.items[iPlayerKilledByWolf];
			if ((harlotPlayer.type == "Harlot") && (iPlayerSleepByHarlot != -1)) {
				iPlayerKilledByWolf = -1;
			}
		}

		if ((iPlayerKilledByDongPham != -1)) {
			const harlotPlayer = this.playerManager.items[iPlayerKilledByDongPham];
			if ((harlotPlayer.type == "Harlot") && (iPlayerSleepByHarlot != -1)) {
				iPlayerKilledByDongPham = -1;
			}
		}




		if (iPlayerKilledByWolf != -1) {
			const vampirePlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (vampirePlayer.type == "Vampire") { iPlayerKilledByWolf = -1 };
		}
		if (iPlayerKilledByWolf != -1) {
			const vampirePlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (vampirePlayer.type == "ConDo") { iPlayerKilledByWolf = -1 };
		}
		if (iPlayerKilledByWolf != -1) {
			const vampirePlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (vampirePlayer.type == "VongHon") { iPlayerKilledByWolf = -1 };
		}

		if ((iPlayerKilledByWolf != -1) || (iPlayerKilledByDongPham != -1)) {
			for (const movement of this.u_getMovements('BaoVe', movements)) {
				const commit = movement.data[0];
				if (commit.value == null) continue;
				if (commit.value - 1 == iPlayerKilledByWolf) iPlayerKilledByWolf = -1;
				if (commit.value - 1 == iPlayerKilledByDongPham) iPlayerKilledByDongPham = -1;
			}
		}





		for (const movement of this.u_getMovements('PhuThuy', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.PHUTHUY_CUU:
						if (commit.value == '1') {
							iPlayerKilledByWolf = -1;
							iPlayerKilledByDongPham = -1;
						}
						break;
					case gameConfig.code.PHUTHUY_GIET:
						iPlayerKilledByWitch = commit.value - 1;
						if (iPlayerKilledByWitch == iPlayerKilledByWolf)
							iPlayerKilledByWolf = -1;
						break;
				}
			}
		}

		let iPlayerTransferedByShadow = -1;
		for (const movement of this.u_getMovements('SoiBongDem', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.SOIBONGDEM:
						iPlayerTransferedByShadow = commit.value - 1;
						break;
				}
			}
		}
		if (iPlayerTransferedByShadow != -1) {
			const playerTransfer = this.playerManager.items[iPlayerTransferedByShadow];
			if ((playerTransfer.type == "TienTri") ||
				(playerTransfer.type == "PhuThuy") ||
				(playerTransfer.type == "PhapSuCam") ||
				(playerTransfer.type == "Alchemist") ||
				(playerTransfer.type == "ThayDong") ||
				(playerTransfer.type == "DongPham") ||
				(playerTransfer.type == "ConDo") ||
				(playerTransfer.type == "Vampire") ||
				(playerTransfer.type == "VongHon") ||
				(playerTransfer.type == "NhaNgoaiCam")
			) {
				if (iPlayerTransferedByShadow == iPlayerKilledByWolf) iPlayerKilledByWolf = -1;
				if (iPlayerTransferedByShadow == iPlayerKilledByDongPham) iPlayerKilledByDongPham = -1;
				if (iPlayerTransferedByShadow == iPlayerKilledByWitch) iPlayerKilledByWitch = -1;

			}


		}

		if (iPlayerKilledByWolf != -1) {
			const chandoiPlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (chandoiPlayer.type == "ChanDoi" && (this.chandoicheck)) {
				this.iPlayerChanDoi = iPlayerKilledByWolf;
				iPlayerKilledByWolf = -1;
				this.chandoicheck = false;
			}
		}


		if (iPlayerKilledByWolf != -1) {
			const gialangPlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (gialangPlayer.type == "GiaLang" && (this.eldercheck)) {
				iPlayerKilledByWolf = -1;
				this.eldercheck = false;
				gialangPlayer.sendMessage(`👨🏻‍🦳 Bạn vừa bị Sói cắn và còn sống!`);
			}
		}

		if ((iPlayerKilledByDongPham) != -1) {
			const dpvictim = this.playerManager.items[iPlayerKilledByDongPham];
			if (dpvictim.type == "GiaLang") {
				iPlayerKilledByDongPham = -1;
			}
		}

		if (iPlayerKilledByWolf != -1) {
			const bansoiPlayer = this.playerManager.items[iPlayerKilledByWolf];
			if (bansoiPlayer.type == "BanSoi") {
				iPlayerKilledByWolf = -1;
				bansoiPlayer.type = "SoiThuong";
				//bansoiPlayer.sendMessage("Bạn đã biến thành Sói do bị cắn!");
				const fww = this.u_getAllWolves();
				let namef = [];
				for (const ww of fww) {
					const { name, type } = ww;
					namef.push(`${name}(${type})`);
				}


				for (const ww of fww) {
					const { name, type } = ww;
					// await this.sendMessage('Bạn ở phe Sói🐺', ww.threadID);
					if (namef.length > 1)
						await asyncWait(2000);
					await bansoiPlayer.sendMessage(
						`🌗 BẠN BỊ SÓI CẮN NÊN ĐÃ BIẾN THÀNH SÓI!\nCùng phe Sói 🐺 ${namef
							.filter(n => n != name)
							.join(
								',  '
							)}\n👋 Hãy liên hệ với họ để teamwork tốt nhé!\n❗️❗️SÓI VÀ MINION KHÔNG ĐƯỢC LIÊN LẠC NHAU❗️❗️`);


					break;
				}

			}
		}


		for (const movement of this.u_getMovements('ThayDong', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.THAYDONG:
						this.lastRealiveIndex = commit.value - 1;
						break;
				}
			}
		}


		for (const movement of this.u_getMovements('TienTri', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.TIENTRI:
						iPlayerSawBySeer = commit.value - 1;
						break;
					default:
						iPlayerSawBySeer = commit.value - 1;
						break;

				}
			}
		}

		if (iPlayerSawBySeer != -1) {

			const danLive = this.playerManager.items.filter(
				danlanglive => ((gameConfig.data[danlanglive.type].party == 1) && (!danlanglive.died))

			);
			const totalDan = this.playerManager.items.filter(
				danlangsum => ((gameConfig.data[danlangsum.type].party == 1))
			);

			const percent = (danLive.length) / (totalDan.length);
			console.log(percent);
			let message = '';
			const { name, username, type } = this.playerManager.items[iPlayerSawBySeer];
			const party = gameConfig.data[type].party
			//> 0 ? 'Dân Làng' : 'Sói';
			if ((party == 1) && ((this.playerManager.items[iPlayerSawBySeer].type == "NhanBan") || (this.playerManager.items[iPlayerSawBySeer].type == "ChanDoi") || (this.playerManager.items[iPlayerSawBySeer].type == "Waller") || (this.playerManager.items[iPlayerSawBySeer].type == "Minion"))) { message = `${percent <= 0.6 ? type : 'Trung lập'}`; }
			if ((party == 1) && (this.playerManager.items[iPlayerSawBySeer].type == "Lycan")) { message = `${percent <= 0.6 ? type : 'Sói'}`; }
			if ((party == 1) && (this.playerManager.items[iPlayerSawBySeer].type !== "Lycan") && (this.playerManager.items[iPlayerSawBySeer].type !== "NhanBan") && (this.playerManager.items[iPlayerSawBySeer].type !== "Minion") && (this.playerManager.items[iPlayerSawBySeer].type !== "ChanDoi") && (this.playerManager.items[iPlayerSawBySeer].type !== "Waller") ) { message = `${percent <= 0.6 ? type : 'Dân làng'}`; }
			if ((party == -1) && (this.playerManager.items[iPlayerSawBySeer].type !== "Minion")) { message = `${percent <= 0.6 ? type : 'Sói'}`; }
			//if ((party == -1) && (this.playerManager.items[iPlayerSawBySeer].type == "Minion")){message = "Dân làng";}
			if ((party == 2)) { message = `${percent <= 0.6 ? type : 'Trung lập'}`; }
			if ((party == 3)) { message = `${percent <= 0.6 ? type : 'Trung lập'}`; }
			if ((party == 6)) { message = `${percent <= 0.6 ? type : 'Trung lập'}`; }
			if (iPlayerSawBySeerWolf != -1) {
				if ((iPlayerSawBySeer == iPlayerSawBySeerWolf) && (this.playerManager.items[iPlayerSawBySeer].type !== "Minion")) { message = `${percent <= 0.6 ? 'Sói Tiên Tri' : 'Sói'}`; }

			}
			var indexdong = -1;
			for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
				if (this.playerManager.items[i].type == "TienTri" && !this.playerManager.items[i].died) {
					indexdong = i;
					break;
				}
			}
			if (indexdong != -1) {
				const tientriPlayer = this.playerManager.items[indexdong];
				await asyncWait(1000);
				if (percent <= 0.6) {
					await tientriPlayer.sendMessage(`🔮 ROLE của ${name} là ${message}.\n🔮 Do số dân đã chết hơn một nửa nên giờ đây bạn soi được Role!`);
				} else {
					await tientriPlayer.sendMessage(`🔮 PHE của ${name} là ${message}`);
				}
			}

		}



		if (((this.lastRealiveIndex) != -1) && (this.realive)) {
			//console.log(`${this.lastRealiveIndex}  -  ${this.iPlayerCloned} `);
			const realivedPlayer = this.playerManager.items[this.lastRealiveIndex];
			if (realivedPlayer.type !== "DongPham") {
				if ((this.lastRealiveIndex !== this.iPlayerCloned)) {
					console.log(`ThayDong-vam original ${this.killedIndexTemp}`);
					this.playerManager.items[this.lastRealiveIndex].live('ThayDong');
					const removeItem = (arr, item) => {
						let newArray = [...arr];
						const index = newArray.findIndex((e) => e === item);
						if (index !== -1) {
							newArray.splice(index, 1);
							return newArray;
						}
						return newArray;
					};
					let newarr = removeItem(this.killedIndexTemp, this.lastRealiveIndex);
					this.killedIndexTemp = newarr;
					console.log(`ThayDong-vam new ${this.killedIndexTemp}`);
					this.realive = false;
					await asyncWait(1000);
					await this.sendMessage(
						`<------------------------>\n☀️ ${realivedPlayer.name} đã hồi sinh 🃏\n<------------------------>`
					);
					try {
						await fca.removeUserFromGroup(realivedPlayer.threadID, "4660462720641608");
					} catch (e) { }

				}
				else if ((this.lastRealiveIndex == this.iPlayerCloned)) {
					this.realive = false;
					await asyncWait(1000);
					await this.sendMessage(
						`☀️ ❌❌❌ KHÔNG THỂ hồi sinh ${realivedPlayer.name} ❌🃏❌\nThầy Đồng đúng là còn cái nịt ❌😀❌`
					);
				}

			} else {
				await asyncWait(1000);
				await this.sendMessage(
					`☀️ ❌❌❌ KHÔNG THỂ hồi sinh ${realivedPlayer.name} ❌🃏❌\nThầy Đồng đúng là còn cái nịt ❌😀❌`
				);
			}

		}




		if (tempiPlayerKilledByWolf != -1) {
			const player = this.playerManager.items[tempiPlayerKilledByWolf];
			if ((player.type !== "BanSoi")) {
				if ((beastmode == true)) {
					iPlayerKilledByWolf = tempiPlayerKilledByWolf;

				}
			}
		}

		if (iPlayerKilledByWitch != -1) {
			const player = this.playerManager.items[iPlayerKilledByWitch];
			if (this.u_WolvesAffect(player.type)) {
				if ((beastmode == true)) {
					iPlayerKilledByWitch = -1;
				}
			}
		}

		let iPlayerVong = -1;
		let iCoinVong = -1;
		for (const movement of this.u_getMovements('VongHon', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.VONGHON_COIN:
						iCoinVong = commit.value;
						break;
					case gameConfig.code.VONGHON_PLAYER:
						iPlayerVong = commit.value - 1;
						break;
				}
			}
		}

		if (iPlayerVong != -1) {
			const player = this.playerManager.items[iPlayerVong];
			if ((player.type == "Harlot") && (iPlayerSleepByHarlot != -1)) {
				iPlayerVong = -1;
			}
		}


		if (iPlayerVong != -1) {
			const player = this.playerManager.items[iPlayerVong];
			if ((player.type == "GiaLang")) {
				iPlayerVong = -1;
			}
		}

		let deadAmount = 0;

		for (const movement of movements) {
			const player = this.playerManager.items[movement.indexPlayer];
			for (const commit of movement.data) {
				//await asyncWait(1000);
				await player.onNightEnd(commit.code, commit.value);
			}
		}

		if ((iCoinVong != -1) && (iPlayerVong != -1)) {
			const vongPlayer = this.playerManager.items[iPlayerVong];
			const previousvongPlayer = vongPlayer.commitChecker;
			vongPlayer.commitChecker = (code, value) => {
				vongPlayer.testCommit(value, ['1', '2']);
			}
			await vongPlayer.timingSend({
				message:
					`😈 Vong Hồn kéo xì dách với bạn(bắt buộc, nếu không bạn sẽ chết)!\n♥️♦️♣️♠️ Kéo bài tiếp hay dằn dơ?\n` +
					`${gameConfig.symbols[1]} 🤘 Kéo tiếp\n` +
					`${gameConfig.symbols[2]} 🤞 Dằn dơ`,
				timing: gameConfig.timeout.COIN_PLAYER
			});

			const commit = await vongPlayer.request(
				gameConfig.code.COIN_PLAYER,
				gameConfig.timeout.COIN_PLAYER
			);

			if (!commit.value) {
				if (!vongPlayer.died) {
					deadAmount++;
					await asyncWait(1000);
					await this.sendMessage(
						`☀️ ${vongPlayer.name} đã ${lmao[random(0, lmao.length - 1)]
						} `
					);
				}
				await vongPlayer.die('VongHon');

				if (iPlayerVong == iPlayerSleepByHarlot) {
					var indexharlot = -1;
					for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
						if (this.playerManager.items[i].type == "Harlot" && !this.playerManager.items[i].died) {
							indexharlot = i;
							break;
						}
					}
					if (indexharlot != -1) {

						const harlotPlayer = this.playerManager.items[indexharlot];
						const { name, username } = harlotPlayer;
						await asyncWait(1000);
						if (!harlotPlayer.died) {
							deadAmount++;
							await this.sendMessage(
								`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
								} `
							);
						}
						await harlotPlayer.die('VongHon');
					}
				}
			} else if (commit.value !== iCoinVong) {
				if (!vongPlayer.died) {
					deadAmount++;
					await asyncWait(1000);
					await this.sendMessage(
						`☀️ ${vongPlayer.name} đã ${lmao[random(0, lmao.length - 1)]
						} `
					);
				}
				await vongPlayer.die('VongHon');

				if (iPlayerVong == iPlayerSleepByHarlot) {
					var indexharlot = -1;
					for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
						if (this.playerManager.items[i].type == "Harlot" && !this.playerManager.items[i].died) {
							indexharlot = i;
							break;
						}
					}
					if (indexharlot != -1) {

						const harlotPlayer = this.playerManager.items[indexharlot];
						const { name, username } = harlotPlayer;
						await asyncWait(1000);
						if (!harlotPlayer.died) {
							deadAmount++;
							await this.sendMessage(
								`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
								} `
							);
						}
						await harlotPlayer.die('VongHon');
					}
				}
			}
			vongPlayer.commitChecker = previousvongPlayer;

		}


		let iPlayerMutedBySpellCaster = -1;
		//const movementsSpellCaster = this.history_last().movements;
		for (const movement of this.u_getMovements('PhapSuCam', movements)) {
			const commit = movement.data[0];
			if (commit.value == null) continue;
			iPlayerMutedBySpellCaster = commit.value - 1;
		}
		this.iPlayerMutedBySpellCaster = iPlayerMutedBySpellCaster;
		this.imutedPlayer = iPlayerMutedBySpellCaster;

		let iPlayerConvertConDo = -1;
		for (const movement of this.u_getMovements('ConDo', movements)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.CONDO:
						iPlayerConvertConDo = commit.value - 1;
						break;
				}
			}
		}

		if (iPlayerConvertConDo != -1) {
			const player = this.playerManager.items[iPlayerConvertConDo];
			if (((gameConfig.data[player.type].party) != -1) && ((gameConfig.data[player.type].party) != 2) && ((gameConfig.data[player.type].party) != 6)) {
				player.onNightEnd = async (code, value) => {
					if (!value) return;

				};
				player.type = "DongPham";
			}
		}


		if ((beastmode == true)) {
			//await asyncWait(1000);
			var msg = {
				body: `🌙 Có một tiếng hú ghê rợn vang khắp cả làng!\n🌙 Mọi người đều run sợ trước sức mạnh của bầy Sói! 🐺`,
				attachment: fs.createReadStream(__dirname + '/soihu.gif')
			} 
			await this.sendMessage(msg);
		}

		// await this.sendMessage('Trời sáng ☀️☀️☀️');

		//let deadAmount = 0;

		if (this.chandoicheck == false) {
			if (this.iPlayerChanDoi != -1) {
				deadAmount++;
				const chandoiPlayer = this.playerManager.items[this.iPlayerChanDoi];
				const { name, username } = chandoiPlayer;
				if (!this.playerManager.items[this.iPlayerChanDoi].died) {
					deadAmount++;
					await asyncWait(2000);
					await this.sendMessage(
						`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
						} `
					);
				}
				await chandoiPlayer.die('ChanDoi');

			}
			this.chandoicheck = true;
			this.iPlayerChanDoi = -1;
		}




		if (this.isKnight) {
			if (this.iWolfKnight != -1) {
				deadAmount++;
				const wolfKnightPlayer = this.playerManager.items[this.iWolfKnight];
				const { name, username } = wolfKnightPlayer;
				if (!this.playerManager.items[this.iWolfKnight].died) {
					await asyncWait(2000);
					await this.sendMessage(
						`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
						} `
					);
				}
				await wolfKnightPlayer.die('KySi');

			}
			this.isKnight = false;
			this.iWolfKnight = -1;
		}

		if (iPlayerKilledByDongPham != -1) {
			deadAmount++;
			const player = this.playerManager.items[iPlayerKilledByDongPham];
			const { name, username } = player;

			if (!this.playerManager.items[iPlayerKilledByDongPham].died) {
				await asyncWait(2000);
				await this.sendMessage(
					`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
					} `
				);
			}
			await player.die('DongPham');
		}


		if (iPlayerKilledByWolf != -1) {
			deadAmount++;
			const player = this.playerManager.items[iPlayerKilledByWolf];
			const { name, username } = player;

			if (!this.playerManager.items[iPlayerKilledByWolf].died) {
				await asyncWait(2000);
				await this.sendMessage(
					`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
					} `
				);
			}

			//  await this.sendMessage(`Testing: ${this.tannerwin} `);

			await player.die('SoiThuong');
		}


		if (iPlayerKilledByWitch != -1) {
			deadAmount++;
			const player = this.playerManager.items[iPlayerKilledByWitch];
			const { name, username } = player;

			if (!this.playerManager.items[iPlayerKilledByWitch].died) {
				await asyncWait(2000);
				await this.sendMessage(
					`☀️ ${deadAmount > 1 ? '' : ''}${name} đã ${lmao[random(0, lmao.length - 1)]
					} `
				);
			}

			await player.die('PhuThuy');
		}

		if (iPlayerKilledByWolf != -1) {
			var indexknight = -1;

			for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
				if (this.playerManager.items[i].type == "KySi") {
					indexknight = i;
					break;
				}
			}
			if (indexknight != -1) {
				if (iPlayerKilledByWolf == indexknight) {
					this.isKnight = true;
					var array = [];
					for (let i = 1; i <= this.playerManager.items.length; i++) {
						//const party = gameConfig.data[this.playerManager.items[i-1].type].party;
						if ((this.playerManager.items[i - 1].died == false) &&
							
							(this.u_WolvesAffect(this.playerManager.items[i - 1].type))
						
						) {
							array.push(i);
						}
					}

					var randomValue = array[random(0, array.length - 1)];
					if ((randomValue - 1) != -1) {
						this.iWolfKnight = randomValue - 1;
					}

				}
			}
		}




		if ((iPlayerKilledByWolf != -1) || (iPlayerKilledByDongPham != -1)) {
			if ((iPlayerKilledByWolf == iPlayerSleepByHarlot) || (iPlayerKilledByDongPham == iPlayerSleepByHarlot)) {
				var indexharlot = -1;
				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "Harlot" && !this.playerManager.items[i].died) {
						indexharlot = i;
						break;
					}
				}
				if (indexharlot != -1) {
					deadAmount++;
					const harlotPlayer = this.playerManager.items[indexharlot];
					const { name, username } = harlotPlayer;
					await asyncWait(2000);
					if (!harlotPlayer.died) {
						await this.sendMessage(
							`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
							} `
						);
					}
					await harlotPlayer.die('SoiDP');
				}

			}
		}




		if (iPlayerTransferedByShadow != -1) {
			this.notTransfer = false;
			const playerTransfer = this.playerManager.items[iPlayerTransferedByShadow];
			if ((playerTransfer.type == "DongPham")) {
				playerTransfer.onNight = async () => {
					console.log(`${playerTransfer.name}-${playerTransfer.type} locked ablity!`);
					return [
						await playerTransfer.request(
							gameConfig.code.DONGPHAM,
							0, true
						)
					];
				}
			} else if ((playerTransfer.type == "ConDo")) {
				playerTransfer.onNight = async () => {
					console.log(`${playerTransfer.name}-${playerTransfer.type} locked ablity!`);
					return [
						await playerTransfer.request(
							gameConfig.code.CONDO,
							0, true
						)
					];
				}
			} else if ((playerTransfer.type == "VongHon")) {
				playerTransfer.onNight = async () => {
					console.log(`${playerTransfer.name}-${playerTransfer.type} locked ablity!`);
					const requests = [];
					requests.push(
						await playerTransfer.request(
							gameConfig.code.VONGHON_COIN,
							0, true
						)
					);
					await asyncWait(1000);
					requests.push(
						await playerTransfer.request(
							gameConfig.code.VONGHON_PLAYER,
							0, true
						)
					);
					return requests;

				}
			}
			else if ((playerTransfer.type == "TienTri") ||
				(playerTransfer.type == "PhuThuy") ||
				(playerTransfer.type == "PhapSuCam") ||
				(playerTransfer.type == "Alchemist") ||
				(playerTransfer.type == "ThayDong") ||
				(playerTransfer.type == "BaoVe") ||
				(playerTransfer.type == "NhaNgoaiCam")
			) {
				playerTransfer.type = "DanLang";

			}

			var indexsd = -1;
			for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
				if (this.playerManager.items[i].type == "SoiBongDem" && !this.playerManager.items[i].died) {
					indexsd = i;
					break;
				}
			}
			if (indexsd != -1) {
				const sdPlayer = this.playerManager.items[indexsd];
				sdPlayer.type = "SoiThuong";
				//console.log(sdPlayer.type);
			}

		}




		if (deadAmount > 0) {	// await this.sendMessage(
			// 	`Vậy là đêm qua đã có ${gameConfig.symbols[deadAmount]} người chết!`
			// );
			await asyncWait(2000);
			await this.chat_sendStatus();
		}



		// NHANBANLYCAN //
		this.u_NhanBan();
		this.u_Lycan();
		// NHANBANLYCAN //

	}

	async onVote() {

		var indexmedium = -1;

		for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
			if (this.playerManager.items[i].type == "ThayDong" && !this.playerManager.items[i].died) {
				indexmedium = i;
				break;
			}
		}
		if (indexmedium != -1) {
			const mediumPlayer = this.playerManager.items[indexmedium];
			try {
				await fca.removeUserFromGroup(mediumPlayer.threadID, "4660462720641608");
			} catch (e) { }

		}

		await asyncWait(2000);
		await this.u_timingSend({
			message: '☀️ Làng bắt đầu thảo luận!',
			timing: gameConfig.timeout.DISCUSS
		});


		await asyncWait(gameConfig.timeout.DISCUSS);

		var msg = {
			body: ``,
			attachment: fs.createReadStream(__dirname + '/soiatt.gif')
		} 
		await this.u_timingSend({
			message: `☀️ Chuẩn bị hết giờ !\n🤝LÀNG HÃY CHỐT NGƯỜI BỊ TREO CỔ!🤝`,
			timing: 20000
		});

		await this.sendMessage(msg);


		let indexpaci = -1;
		for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
			if (this.playerManager.items[i].type == "SoiDeThuong" && !this.playerManager.items[i].died) {
				indexpaci = i;
				break;
			}
		}

		this.iPaciPlayer = indexpaci;
		this.byevoteKill = false;
		if (indexpaci != -1) {
			const paciPlayer = this.playerManager.items[indexpaci];
			if (this.canPaci) {
				await asyncWait(2000);
				this.openPaci = true;
				await paciPlayer.sendMessage('🐺🥰 Sói Dễ Thương bạn có [20s] để nhắn "soikute" tại đây để bỏ qua phiên vote treo cổ sáng ngày hôm nay! (1 lần duy nhất)');
			}
		}


		await asyncWait(25000);
		this.openPaci = false;

		if (this.byevoteKill == false) {
			await this.u_timingSend({
				message: `🆘🆘🆘 Hết giờ 🆘🆘🆘\n⚠️ Vui lòng check tin nhắn riêng!`,
				timing: gameConfig.timeout.VOTEKILL,
				left: false
			});
		}



		const groupPromises = [];
		if (this.byevoteKill == false) {
			for (const player of this.playerManager.items) {
				await asyncWait(2000);
				if (this.iPlayerMutedBySpellCaster != -1) {
					if (!player.died && player != this.playerManager.items[this.iPlayerMutedBySpellCaster]) groupPromises.push(player.voteKill());
				} else {
					if (!player.died) { groupPromises.push(player.voteKill()); }
				}
			}
		} else {
			console.log('SoiKute!');
		}


		const votes = await Promise.all(groupPromises);
		const voteChart = [];
		for (const commit of votes) {
			if (!commit.value) continue;
			const index = voteChart.findIndex(e => e.index == commit.value - 1);
			if (index != -1) {
				if (commit.code == 16) {
					voteChart[index].amount += 2;
				} else if (commit.code == 22) {
					voteChart[index].amount += 2;
				} else {
					voteChart[index].amount++;
				}
			} else {
				if (!commit.value) continue;
				if (commit.code == 16) {
					voteChart.push({
						index: commit.value - 1,
						amount: 2
					});
				} else if ((commit.code == 22)) {
					voteChart.push({
						index: commit.value - 1,
						amount: 2
					});
				} else {
					voteChart.push({
						index: commit.value - 1,
						amount: 1
					});
				}
			}
		}
		//console.log(voteChart);



		let iPlayerKilledByVampire = -1;
		let deadmode = false;
		const movementsvam = this.history_last().movements;
		for (const movement of this.u_getMovements('Vampire', movementsvam)) {
			for (const commit of movement.data) {
				if (commit.value == null) continue;
				switch (commit.code) {
					case gameConfig.code.VAMPIRE:

						iPlayerKilledByVampire = commit.value - 1;

						break;
					case gameConfig.code.VAMPIREKILL:
						if (commit.value == '1') deadmode = true;
						break;
				}

			}
		}


		if ((iPlayerKilledByVampire) != -1) {
			const harlotPlayer = this.playerManager.items[iPlayerKilledByVampire];
			if ((harlotPlayer.type == "Harlot") && (this.iPlayerSleepByHarlot != -1)) {
				iPlayerKilledByVampire = -1;
			}

		}




		if ((iPlayerKilledByVampire) != -1) {
			const vamvictim = this.playerManager.items[iPlayerKilledByVampire];
			if (vamvictim.type == "GiaLang") {
				iPlayerKilledByVampire = -1;
			}
		}


		if (iPlayerKilledByVampire != -1) {
			if (iPlayerKilledByVampire == this.iPlayerSleepByHarlot) {
				var indexharlot = -1;

				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "Harlot" && !this.playerManager.items[i].died) {
						indexharlot = i;
						break;
					}
				}
				if (indexharlot != -1) {
					// const harlotPlayer = this.playerManager.items[indexharlot];
					// const {name, username} = harlotPlayer;
					// await asyncWait(2000);
					// if(!harlotPlayer.died){
					// await this.sendMessage(
					// 	`☀️ ${name} đã ${
					// 		lmao[random(0, lmao.length - 1)]
					// 	} `
					// );}
					// await harlotPlayer.die('Vampire');
					this.killedIndex.push(indexharlot);
				}

			}
		}


		if ((iPlayerKilledByVampire) != -1) {
			this.checkindexvamp = iPlayerKilledByVampire;
			this.indexvamp = this.checkindexvamp;
			this.killedIndex.push(this.indexvamp);
		}


		if ((this.killedIndexTemp.length > 0) && (deadmode)) {
			for (let i = 0; i < this.killedIndexTemp.length; i++) {
				let vampireKilledPlayer = this.playerManager.items[this.killedIndexTemp[i]];
				let { name } = vampireKilledPlayer;

				if (vampireKilledPlayer.died) {
					console.log("This vampire player dead already so return!");
					continue;
				}
				if (vampireKilledPlayer.type == "Vampire") {
					console.log("This is VAMPIRE PLAYER, SKIP!");
					continue;
				}
				if (!vampireKilledPlayer.died) {
					await asyncWait(2000);
					await this.sendMessage(
						`☀️ ${name} đã ${lmao[random(0, lmao.length - 1)]
						}  `
					);
				}
				vampireKilledPlayer.die('Vampire');
			}

		}


		// NHANBANLYCAN //
		this.u_NhanBan();
		this.u_Lycan();
		// NHANBANLYCAN //




		if (voteChart.length == 0) {
			await asyncWait(3000);
			await this.sendMessage('🔥 Không ai bị treo cổ !\n🌙 LÀNG ĐI NGỦ 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ ');


			// NHANBANLYCAN //
			this.u_NhanBan();
			this.u_Lycan();
			// NHANBANLYCAN //
			this.u_CheckHell();

			return;
		}
		voteChart.sort((a, b) => b.amount - a.amount);

		let voteResult = 'Kết quả vote 🔥 \n';
		for (let i = 0; i < voteChart.length; i++) {
			const vote = voteChart[i];
			const { name, username } = this.playerManager.items[vote.index];
			voteResult += `${gameConfig.symbols[i + 1]} ${name}:  ${vote.amount
				}${i == 0 && (voteChart.length == 1 || voteChart[1].amount < vote.amount)
					? ' 💔🤬'
					: ''
				}\n`;
		}

		let indexshadow = -1;
		for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
			if (this.playerManager.items[i].type == "SoiBongDem" && !this.playerManager.items[i].died) {
				indexshadow = i;
				break;
			}
		}


		if ((indexshadow != -1)) {
			await asyncWait(2000);
			await this.sendMessage(`🌑 Bóng tối của Sói đã che khuất đi kết quả vote! Dân Làng chỉ còn cái nịt mà thoi😄🐺`);
		} else {
			await asyncWait(2000);
			await this.sendMessage(voteResult);
		}


		if (voteChart.length > 1 && voteChart[0].amount == voteChart[1].amount) {
			await asyncWait(2000);
			await this.sendMessage('🔥 Không ai bị treo cổ !(huề)\n🌙 LÀNG ĐI NGỦ 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ ');


			// NHANBANLYCAN //
			this.u_NhanBan();
			this.u_Lycan();
			// NHANBANLYCAN //


		} else {
			var { index: hangedIndex, amount } = voteChart[0];
			const percent = amount / votes.length;
			const player = this.playerManager.items[hangedIndex];
			const { name, username, type } = player;

			if (percent >= 0.5) {
				// await this.sendMessage(`Treo cổ ${name}(${username}) ...`);
				let indexreplace = -1;
				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "BaoVe" && !this.playerManager.items[i].died) {
						indexreplace = i;
						break;
					}
				}
				this.iReplacePlayer = indexreplace;
				this.iHangedPlayer = hangedIndex;
				this.activeReplace = false;
				if ((indexreplace != -1) && (this.allowBaoVe)) {
					//const dongPlayer = this.playerManager.items[indexreplace];
					if (!this.playerManager.items[hangedIndex].died) {
						await asyncWait(2000);
						this.openReplace = true;
						await this.sendMessage('☀️👼 Bảo Vệ có [20s] để nhắn "phepthuatwinx" để cứu người sắp bị treo cổ! (1 lần duy nhất)');
						await asyncWait(25000);
						this.openReplace = false;

					}
				}

				if ((this.activeReplace)) {
					if (this.iReplacePlayer != -1) {
						hangedIndex = this.iReplacePlayer;
					}
				}


				//const arrayminionPlayer = Array.from(this.playerManager.items);

				const werewolfsPlayer = this.u_getAllWolves();
				const werewolfsPlayerAlive = werewolfsPlayer.filter(
					wolves => !wolves.died
				);
				//const arrayminionSetup = Array.from(this.setup);
				const werewolfsSetup = this.u_getAllWolves();
				//console.log(`${werewolfsSetup.length} and ${werewolfsPlayerAlive.length}`);

				if ((werewolfsSetup.length == werewolfsPlayerAlive.length) && (this.playerManager.items[hangedIndex].type == 'Minion')) {
					this.minionwin = true;
				}


				if (this.playerManager.items[hangedIndex].type == 'ChanDoi') {
					this.tannerwin = true;
					// await this.sendMessage(`Tanner checking: ${this.tannerwin} !\nBugs about this role please contact Andrei!`);
				}
				if (this.playerManager.items[hangedIndex].type == 'Harlot') {
					if (this.iPlayerSleepByHarlot != -1) {
						const player = this.playerManager.items[this.iPlayerSleepByHarlot];
						await asyncWait(2000);
						await this.sendMessage(
							`👩🤰 Harlot: Anh ${player.name} đêm qua ăn ngủ với em mà trốn tránh trách nhiệm 😏\nMọi người sẽ biết được bộ mặt thật của ảnh chính là ${player.type}😏`
						);
					}
				}


				if ((this.activeReplace) && (this.allowBaoVe)) {
					if (this.iReplacePlayer != -1) {

						const playerreplace = this.playerManager.items[this.iReplacePlayer];
						await asyncWait(2000);
						await this.sendMessage(
							`☀️👼 ${name} không bị treo cổ hôm nay, ting ting 50k momo!🥵\n\n🌙 LÀNG ĐI NGỦ 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ `
						);
						//await playerreplace.die('BaoVe');
					}
					this.allowBaoVe = false;
					this.activeReplace = false;
					this.iHangedPlayer = -1;
					this.iReplacePlayer = -1;
				}
				else {

					await asyncWait(2000);
					await this.sendMessage(
						`☀️ Treo cổ ${name}🥵\n\n🌙 LÀNG ĐI NGỦ 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ `
					);
					await player.die();
				}

				await asyncWait(2000);
				await this.chat_sendStatus();


				// NHANBANLYCAN //
				this.u_NhanBan();
				this.u_Lycan();
				// NHANBANLYCAN //



			} else {

				const need = Math.ceil(votes.length / 2) - amount;
				await asyncWait(2000);
				await this.sendMessage(
					`⛔️ Không đủ phiếu cho ${name}\n(😩còn thiếu ${need} phiếu!)\n🌙 LÀNG ĐI NGỦ 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ `
				);
				// `⛔️ Không đủ vote cho ${name}\n(hiện tại: ${amount}, cần thêm: ${need} phiếu!)\n🌙 Màn đêm buông xuống 🌙\n ❌ TIẾP TỤC LÀM TASK ❌ `



				// NHANBANLYCAN //
				this.u_NhanBan();
				this.u_Lycan();
				// NHANBANLYCAN //


			}
		}


		if (this.welcome) {
			await asyncWait(1000);
			await fca.sendMessage("😈 WELCOME TO HELL 😈\n\n🔪 SÓI CHẾT RỒI KHÔNG ĐƯỢC LIÊN LẠC VỚI GROUP SÓI!😈😈😈\n🔪 LUẬT HOA QUẢ, VI PHẠM THÌ QUẢ TÁO ĐẾN SỚM RÁNG CHỊU HIHI😈😈😈\n\n💡Thầy Đồng sẽ được set làm admin nhóm!\n💡Mỗi buổi sáng Thầy Đồng sẽ bị kick khỏi đây, hết ngày được add vào lại!", "4660462720641608");
			this.welcome = false;
		}

		this.u_CheckHell();



	}
	// <-- core

	// ---------------------------------------------------------------------------

	// --> game utilities

	async sendMessage(message, threadID = this.threadID) {
		await kb2abot.helpers.fca.sendMessage(message, threadID);
	}



	allRole() {

		const cloneSetup = Array.from(this.setup);

		shuffle(cloneSetup);
		shuffle(cloneSetup);
		let occurence = cloneSetup.reduce((acc, curr) => {
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
		}, {})

		let message = '';

		for (let i in occurence) {
			message += occurence[i] + ' ' + i + ' 🔥 ';
		}
		let messageRole = '';
		messageRole = message.slice(0, -3);

		return messageRole;
	}

	async u_timingSend({
		message = '',
		timing = 0,
		threadID = this.threadID,
		left = true
	} = {}) {
		if (timing < 0) timing = 0;
		const hh = Math.floor(timing / 1000 / 60 / 60);
		const mm = Math.floor((timing - hh * 60 * 60 * 1000) / 1000 / 60);
		const ss = Math.ceil(
			(timing - hh * 60 * 60 * 1000 - mm * 60 * 1000) / 1000
		);
		let text = `${ss}s`;
		if (mm > 0) text = `${mm}m ${text}`;
		if (hh > 0) text = `${hh}h ${text}`;
		if (left) await this.sendMessage(`[${text}] ${message}`, threadID);
		else await this.sendMessage(`${message} [${text}]`, threadID);
		return {
			hh,
			mm,
			ss
		};
	}

	u_getIPlayerKilledByWolf(movements) {
		let iPlayerKilledByWolf = -1;
		let max = -1;
		const dd = new Array(this.playerManager.getLength() + 1).fill(0);
		for (const movement of this.u_getMovements('SoiThuong', movements)) {
			const commit = movement.data[0];
			if (commit.value == null) continue;
			dd[commit.value]++;
			if (max < dd[commit.value]) {
				iPlayerKilledByWolf = commit.value - 1;
				max = dd[commit.value];
			}
		}
		const sorted = [...dd].sort((a, b) => b - a);
		if (sorted[0] == sorted[1]) iPlayerKilledByWolf = -1;
		return iPlayerKilledByWolf;
	}

	u_getIPlayerKilledByAnyWolf(movements, ptype) {
		let codeg = -1;
		if (ptype == 'SoiBongDem'){
			codeg = gameConfig.code.SOIBONGDEM_VOTE;
		}
		let iPlayerKilledByWolf = -1;
		let max = -1;
		const dd = new Array(this.playerManager.getLength() + 1).fill(0);
		for (const movement of this.u_getMovements(ptype, movements)) {
			for (const commit of movement.data) {
			if (commit.value == null) continue;
			switch(commit.code){
			case codeg:
			dd[commit.value]++;
			if (max < dd[commit.value]) {
				iPlayerKilledByWolf = commit.value - 1;
				max = dd[commit.value];
			}
			break;
		}
	}
}
		const sorted = [...dd].sort((a, b) => b - a);
		if (sorted[0] == sorted[1]) iPlayerKilledByWolf = -1;
		return iPlayerKilledByWolf;
	}



	u_getIPlayerKilledByAllWolf(){
		let iPlayerKilledByAllWolf = -1;
		let max = -1;
		const dd = new Array(this.playerManager.getLength() + 1).fill(0);
		const movements = this.history_last().movements;
		let arr = [];
		let iPlayerKilledByWolf = this.u_getIPlayerKilledByWolf(movements);
		let iPlayerKilledByShadowWolf = this.u_getIPlayerKilledByAnyWolf(movements,'SoiBongDem');
		arr.push(iPlayerKilledByWolf+1,iPlayerKilledByShadowWolf+1);
		for (let i = 0; i < arr.length;i++){
			const value = arr[i];
			if (value == 0) continue;
			dd[value]++;
			if (max < dd[value]) {
				iPlayerKilledByAllWolf = value - 1;
				max = dd[value];
			}
		}
		const sorted = [...dd].sort((a, b) => b - a);
		if (sorted[0] == sorted[1]) iPlayerKilledByAllWolf = -1;
		return iPlayerKilledByAllWolf;

	}



	u_getIPlayerKilledByHarlot(movements) {
		let iPlayerKilledByHarlot = -1;
		let max = -1;
		const dd = new Array(this.playerManager.getLength() + 1).fill(0);
		for (const movement of this.u_getMovements('Harlot', movements)) {
			const commit = movement.data[0];
			if (commit.value == null) continue;
			dd[commit.value]++;
			if (max < dd[commit.value]) {
				iPlayerKilledByHarlot = commit.value - 1;
				max = dd[commit.value];
			}
		}
		const sorted = [...dd].sort((a, b) => b - a);
		if (sorted[0] == sorted[1]) iPlayerKilledByHarlot = -1;
		return iPlayerKilledByHarlot;
	}


	u_getDeaths() {
		const out = [];
		for (const player of this.playerManager.items) {
			if (player.died) out.push(player);
		}
		return out;
	}

	u_getMovements(type, movements) {
		const out = [];
		for (const movement of movements) {
			if (this.playerManager.items[movement.indexPlayer].type == type)
				out.push(movement);
		}
		return out;
	}

	u_isEnd() {
		if (!this.u_getWinner())
			return false;
		return true;
	}

	checkPhanBoi() {
		if (this.phanboi) {
			if (this.indexPhanBoi != -1) {
				const playerPhanBoi = this.playerManager.items[this.indexPhanBoi];
				if (!playerPhanBoi.died) {
					return true;
				}
			}
		}
		return false;

	}

	checkCupid() {
		if (this.pairs.length == 2) {
			if (!this.playerManager.items[this.pairs[0]].died &&
				!this.playerManager.items[this.pairs[1]].died) {
				return true;
			}
		}
		return false;
	}

	u_getWinner(text = false) {
		const werewolfs = this.playerManager.items.filter(
			player => ((gameConfig.data[player.type].party == -1) && (!player.died))
		);

		if (this.phanboi) {
			if (this.indexPhanBoi != -1) {
				const playerPhanBoi = this.playerManager.items[this.indexPhanBoi];
				if ((this.playerManager.items.filter(player => !player.died).length <= 2) && !playerPhanBoi.died) {
					return text ? `👺 Kẻ Phản Bội ${playerPhanBoi.name}(${playerPhanBoi.type})` : 4;
				}
			}
		}

		if (this.minionwin == true) {
			return text ? '🐺 Sói(Minion)' : -1;
		}
		if (this.tannerwin == true) {
			return text ? '🤠 Chán Đời' : 1;
		}


		if (this.pairsWaller.length == 2) {
			if (this.playerManager.items.filter(player => ( (player.type == "Waller") && (!player.died) ) ).length >= 1 &&
				this.playerManager.items[this.pairsWaller[0]].died &&
				this.playerManager.items[this.pairsWaller[1]].died &&
				(!this.checkPhanBoi())

			) {
				return text ? '👬🏻 Waller' : 2;
			}
		}

		if (this.pairs.length == 2) {
			if ((this.playerManager.items[this.pairs[0]].type == "TienTri" || this.playerManager.items[this.pairs[0]].type == "ThayDong") &&
				(this.playerManager.items[this.pairs[1]].type == "TienTri" || this.playerManager.items[this.pairs[1]].type == "ThayDong") &&
				!this.playerManager.items[this.pairs[0]].died &&
				!this.playerManager.items[this.pairs[1]].died) {
				this.couplewinTuQuy = true;
			}
		}

		if (this.couplewinTuQuy == true) {

			return text ? '👦🏻 💘 👩🏻 Cupid Tiên Tri ❤️ Thầy Đồng' : 5;
		}



		if (this.pairs.length == 2) {
			if (this.playerManager.items.filter(player => !player.died).length <= 2 &&
				!this.playerManager.items[this.pairs[0]].died &&
				!this.playerManager.items[this.pairs[1]].died &&
				(!this.checkPhanBoi())

			) {
				this.couplewin = true;
			}
		}

		if (this.couplewin == true) {

			return text ? '👦🏻 💘 👩🏻 Cupid' : 2;
		}

		const array2 = Array.from(this.playerManager.items);
		var filteredvam = array2.filter(function (e, index, arr) {

			if ((!e.died) && (e.type == "Vampire"))
				return e;
		});

		const array3 = Array.from(this.playerManager.items);
		var filtercheckvamp = array3.filter(function (e, index, arr) {

			if ((e.type == "Vampire"))
				return e;
		});
		// var filteredvam2 = array2.filter(function(e, index, arr){

		// 		if ((!e.died) && (e.type !== "Vampire"))
		// 				return e;
		// 	});
		let liveplayer = [];

		for (var i = 0; i < this.playerManager.items.length; i++) {
			if (!this.playerManager.items[i].died) {
				liveplayer.push(i);
			}

		}




		let hasAllElems = true;

		let killedIndex = Array.from(this.killedIndexTemp);
		var indexdong = -1;
		for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
			if (this.playerManager.items[i].type == "Vampire") {
				indexdong = i;
				break;
			}
		}
		if (indexdong != -1) {
			killedIndex.push(indexdong);
		}

		for (let i = 0; i < liveplayer.length; i++) {
			if (killedIndex.indexOf(liveplayer[i]) === -1) {
				hasAllElems = false;
				break;
			}
		}



		if ((hasAllElems) && (filtercheckvamp.length >= 1)) {
			return text ? '🧛🏻‍♂️ Vampire (thu phục tất cả dân làng)' : 2;
		}


		if ((this.playerManager.items.filter(player => !player.died).length <= 2) && (filteredvam.length >= 1) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 3) && (!player.died))).length <= 0) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 6) && (!player.died))).length <= 0) && (!this.checkCupid())) {
			this.vampirewin = true;
		}

		if (this.vampirewin == true) {
			return text ? '🧛🏻‍♂️ Vampire' : 2;
		}


		if ((this.playerManager.items.filter(player => !player.died).length <= 2) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 6) && (!player.died))).length >= 1) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 2) && (!player.died))).length <= 0) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 3) && (!player.died))).length <= 0)
			&& (!this.checkCupid())

		) {
			return text ? `👻 Vong Hồn` : 6;

		}


		if ((this.playerManager.items.filter(player => !player.died).length <= 2) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 3) && (!player.died))).length >= 1) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 2) && (!player.died))).length <= 0) &&
			(this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 6) && (!player.died))).length <= 0)
			&& (!this.checkCupid())

		) {
			return text ? `💪 Côn Đồ và Đồng Phạm` : 3;

		}




		const arrayghost = Array.from(this.playerManager.items);
		var filteralive = arrayghost.filter(function (e, index, arr) {

			if ((!e.died))
				return e;
		});
		if (filteralive.length == 0) {
			return text ? '😀 Andrei' : 69;
		}


		let wwCount = 0;
		let danlangCount = 0;

		for (const player of this.playerManager.items) {
			const { party } = gameConfig.data[player.type];
			if (player.died) continue;
			if ((party == -1)) wwCount++;
			if ((party == 1)) danlangCount++;

		}


		if ((danlangCount <= wwCount) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 3) && (!player.died))).length < werewolfs.length) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 2) && (!player.died))).length < werewolfs.length) && (!this.checkPhanBoi()) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 6) && (!player.died))).length < werewolfs.length)) return text ? '🐺 Sói' : -1;
		if ((wwCount <= 0) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 3) && (!player.died))).length <= 0) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 2) && (!player.died))).length <= 0) && (!this.checkPhanBoi()) && (this.playerManager.items.filter(player => ((gameConfig.data[player.type].party == 6) && (!player.died))).length <= 0)) return text ? '👦🏻 Dân Làng' : 1;
		return null;



	}


	u_addParticipant(id) {
		if (this.participants.includes(id)) return false;
		this.participants.push(id);
		return true;
	}
	// <-- game utilities

	// ---------------------------------------------------------------------------

	// --> history
	history_addTime(time) {
		this.history.push({
			time,
			movements: []
		});
		return this.history_last();
	}
	history_addMovement(type, data) {
		this.history[this.history.length - 1].movements.push({
			type,
			data
		});
	}
	history_last() {
		return this.history[this.history.length - 1];
	}
	// <-- history


	// --> ANDREI


	u_getAllWolves() {
		let arr = [];
		arr = this.playerManager.items.filter(e => e.type == 'SoiThuong' || e.type == 'SoiTienTri' || e.type == 'SoiBongDem' || e.type == 'SoiDeThuong' || e.type == "SoiKySinh");
		return arr;
	}


	u_WolvesAffect(ptype){
		
		let arr = ['SoiThuong', 'SoiBongDem', 'SoiTienTri','SoiDeThuong', 'SoiKySinh'];
		if (arr.includes(ptype)){
			return true;
		}else{
			return false;
		}

	
	}


	u_getAllMinion() {
		let arr = [];
		arr = this.playerManager.items.filter(e => e.type == 'SoiThuong' || e.type == 'SoiTienTri' || e.type == 'SoiBongDem' || e.type == "SoiKySinh" || e.type == 'SoiDeThuong' || e.type == 'Minion');
		return arr;
	}

	u_isAloneSeerWolf() {
		let alone = false;
		const arraytri = Array.from(this.playerManager.items);
		const werewolfs = arraytri.filter(
			player => (player.type == "SoiThuong")
		);
		const seerwolfs = arraytri.filter(
			player => (player.type == "SoiTienTri")
		);
		const seeralives = seerwolfs.filter(seerwolves => !seerwolves.died);
		const alives = werewolfs.filter(wolves => !wolves.died);


		if ((alives.length <= 0) &&  (seeralives.length <= 1)  ){
			alone = true;
		}
		return alone;

	}




	async u_Lycan() {

		if (this.iPlayerIdol != -1) {
			const idoledPlayer = this.playerManager.items[this.iPlayerIdol];
			if (idoledPlayer.died) {
				var indexlycan = -1;
				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "Lycan" && !this.playerManager.items[i].died) {
						indexlycan = i;
						break;
					}
				}
				if (indexlycan != -1) {
					const lycanPlayer = this.playerManager.items[indexlycan];
					lycanPlayer.type = "BanSoi";
					await asyncWait(2000);
					await lycanPlayer.sendMessage(`🐺 Bạn đã biến thành Bán Sói do thần tượng ${idoledPlayer.name} đã chết!`);
					// if (lycanPlayer.type == "SoiThuong") {
					// 	const wwl = this.u_getAllWolves();
					// 	let namel = [];

					// 	for (const ll of wwl) {
					// 		const { name, type } = ll;
					// 		namel.push(`${name}(${type})`);
					// 	}
					// 	for (const ll of wwl) {
					// 		const { name, type } = ll;
					// 		// await this.sendMessage('Bạn ở phe Sói🐺', ww.threadID);
					// 		if (namel.length > 1) {
					// 			await asyncWait(2000);
					// 			await lycanPlayer.sendMessage(
					// 				`Cùng phe Sói 🐺 ${namel
					// 					.filter(n => n != name)
					// 					.join(
					// 						',  '
					// 					)}\n👋 Hãy liên hệ với họ để teamwork tốt nhé!\n❗️❗️SÓI VÀ MINION KHÔNG ĐƯỢC LIÊN LẠC NHAU❗️❗️`);

					// 		}
					// 		break;
					// 	}
					// }
				}
			}
		}





	}

	async u_NhanBan() {
		if (this.iPlayerCloned != -1) {
			const clonedPlayer = this.playerManager.items[this.iPlayerCloned];
			if (clonedPlayer.died) {
				var indexdong = -1;
				for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
					if (this.playerManager.items[i].type == "NhanBan" && !this.playerManager.items[i].died) {
						indexdong = i;
						break;
					}
				}
				if (indexdong != -1) {
					const nhanbanPlayer = this.playerManager.items[indexdong];
					nhanbanPlayer.type = clonedPlayer.type;
					await asyncWait(2000);
					await nhanbanPlayer.sendMessage(`🃏 Bạn đã biến hình thành ${clonedPlayer.type} của ${clonedPlayer.name}`);
					if (this.u_WolvesAffect(nhanbanPlayer.type)) {
						const wws = this.u_getAllWolves();
						let names = [];

						for (const ww of wws) {
							const { name, type } = ww;
							names.push(`${name}(${type})`);
						}
						for (const ww of wws) {
							const { name, type } = ww;
							// await this.sendMessage('Bạn ở phe Sói🐺', ww.threadID);
							if (names.length > 1) {
								await asyncWait(2000);
								await nhanbanPlayer.sendMessage(
									`Cùng phe Sói 🐺 ${names
										.filter(n => n != name)
										.join(
											',  '
										)}\n👋 Hãy liên hệ với họ để teamwork tốt nhé!\n❗️❗️SÓI VÀ MINION KHÔNG ĐƯỢC LIÊN LẠC NHAU❗️❗️`);

							}
							break;
						}
					} else if (nhanbanPlayer.type == "Minion") {
						const nns = this.u_getAllMinion();
						let namem = [];
						for (const nn of nns) {
							const { name, type } = nn;
							namem.push(`${name}(${type})`);
						}
						const mms = this.playerManager.items.filter(e => e.type == 'Minion');
						for (const mm of mms) {
							const { name, type } = mm;
							// await this.sendMessage('Bạn ở phe Sói🐺', mm.threadID);
							if (namem.length > 1)
								await asyncWait(2000);
							await nhanbanPlayer.sendMessage(
								`Cùng phe Sói 🐺 ${namem
									.filter(n => n != name)
									.join(
										',  '
									)}\n❗️❗️CÁC MINION KHÔNG ĐƯỢC LIÊN LẠC VÀ CHO SÓI BIẾT MÌNH LÀ MINION NHÉ❗️❗️`);

							break;
						}

					} else if (nhanbanPlayer.type == "Waller") {
						if (this.pairsWaller.length == 2) {
							const playerPaired1 = this.playerManager.items[this.pairsWaller[0]];
							const playerPaired2 = this.playerManager.items[this.pairsWaller[1]];
							await asyncWait(2000);
							nhanbanPlayer.sendMessage(`👬🏻 Hãy giết ${playerPaired1.name} và ${playerPaired2.name} để chiến thắng!`);
						} else {
							//nhanbanPlayer.sendMessage(`💘 CUPID REAL chưa ghép đôi cặp nào cả và bạn không đủ năng lực để sử dụng sức mạnh tình iu 😀\nBây giờ hãy bảo vệ dân làng và tìm ra Sói nhé!`);
							nhanbanPlayer.runpairsWaller = true;
						}

					} else if (nhanbanPlayer.type == "GiaLang") {
						this.eldercheck = true;
					} else if (nhanbanPlayer.type == "ThayDong") {
						this.lastRealiveIndex = - 1;
						this.realive = true;
					} else if (nhanbanPlayer.type == "Vampire") {
						let vammsg = '';
						for (var i = 0; i < this.killedIndexTemp.length; i++) {
							let rightindex = this.killedIndexTemp[i] + 1;
							vammsg += `${gameConfig.symbols[rightindex]} `
						}
						await asyncWait(2000);
						nhanbanPlayer.sendMessage(`🧛 Số thứ tự những người mà Vampire cũ (REAL VAMPIRE) đã cắn là\n${vammsg}\nHãy tiếp tục nhiệm vụ của tổ tiên 😀`);
					} else if (nhanbanPlayer.type == "Harlot") {
						this.iPlayerSleepByHarlot = -1;
					} else if (nhanbanPlayer.type == "SoiBongDem") {
						this.notTransfer = true;
					} else if (nhanbanPlayer.type == "SoiDeThuong") {
						this.canPaci = true;
					}
				}
			}
		}
	}

	async u_CheckHell() {
		for (const player of this.playerManager.items) {
			if (player.died) {
				await asyncWait(500);
				try {
					await fca.addUserToGroup(player.threadID, "4660462720641608");
				} catch (e) { }
			}
		}

		var indexmedium3 = -1;

		for (var i = 0, len = this.playerManager.items.length; i < len; i++) {
			if (this.playerManager.items[i].type == "ThayDong" && !this.playerManager.items[i].died) {
				indexmedium3 = i;
				break;
			}
		}


		if (indexmedium3 != -1) {
			const mediumPlayer = this.playerManager.items[indexmedium3];

			try {
				await fca.addUserToGroup(mediumPlayer.threadID, "4660462720641608");
			} catch (e) { }
			try {
				await fca.changeAdminStatus("4660462720641608", mediumPlayer.threadID, true);
			} catch (e) { }

		}
	}










	// <-- ANDREI






};
