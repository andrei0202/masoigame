const version = '1.2.3';
// Phiên bản của file config, nếu khác thì phải xóa file gameConfig.js
// Một file gameConfig.js sẽ đc tạo lại sau khi run lại bot
(async () => {
	const path = require('path');
	const axios = require('axios');
	if (path.basename(__filename) == 'gameConfig.example.js') return;
	const exVer = require('./gameConfig.example.js').version;
	const curVer = (
		await axios.get(
			'https://drive.google.com/u/0/uc?id=14CIBFaNe9tz9Iz0bqW5V6etEwlCZCe2R&export=download'
		)
	).data.version;
	if (exVer != curVer) {
		console.newLogger.warn(
			`Ma Soi: Da co phien ban moi: ${curVer}! Phien ban hien tai: ${exVer}. Hay truy cap bit.ly/kb2abot`
		);
	}
	if (version != exVer) {
		console.newLogger.warn(
			'Ma Soi: Phien ban config khong tuong thich co the gay loi, vui long backup va xoa file gameConfig.js'
		);
	}
})();

const code = {
	// developer only (cái này chỉ là phân loại th, ko nên chỉnh)
	VOTEKILL: 0,
	BAOVE: 1,
	SOITHUONG: 2,
	TIENTRI: 3,
	PHUTHUY_CUU: 4,
	PHUTHUY_GIET: 5,
	THOSAN_NIGHT: 6,
	THOSAN_TREOCO: 7,
	SOITIENTRI_RESIGN: 8,
	SOITIENTRI_SEER: 9,
	SOITIENTRI_VOTE: 10
};

const timeout = {
	// timeout cho từng event
	DELAY_STARTGAME: 10000,
	DISCUSS: 45000,
	VOTEKILL: 30000,
	BAOVE: 30000,
	PHUTHUY_CUU: 30000,
	PHUTHUY_GIET: 30000,
	SOITHUONG: 30000,
	THOSAN_NIGHT: 30000,
	THOSAN_TREOCO: 15000,
	TIENTRI: 30000,
	SOITIENTRI_RESIGN: 15000,
	SOITIENTRI_SEER: 30000,
	SOITIENTRI_VOTE: 30000
};

const setup = {
	//  Setup theo số lượng người chơi
	3: ['BaoVe', 'DanLang', 'SoiThuong'],
	4: ['BaoVe', 'PhuThuy', 'SoiThuong', 'ThoSan'],
	5: ['BaoVe', 'PhuThuy', 'SoiThuong', 'SoiTienTri', 'TienTri'],
	6: ['BaoVe', 'PhuThuy', 'SoiThuong', 'ThoSan', 'TienTri', 'SoiTienTri'],
	7: [
		'BaoVe',
		'PhuThuy',
		'SoiThuong',
		'ThoSan',
		'TienTri',
		'SoiTienTri',
		'DanLang'
	],
	8: [
		'BaoVe',
		'PhuThuy',
		'SoiThuong',
		'ThoSan',
		'TienTri',
		'SoiTienTri',
		'ThoSan',
		'SoiThuong'
	],
	9: [
		'BaoVe',
		'PhuThuy',
		'SoiThuong',
		'ThoSan',
		'TienTri',
		'SoiTienTri',
		'ThoSan',
		'SoiThuong',
		'DanLang'
	],
	10: [
		'BaoVe',
		'PhuThuy',
		'SoiThuong',
		'ThoSan',
		'TienTri',
		'SoiTienTri',
		'ThoSan',
		'SoiThuong',
		'TienTri',
		'DanLang'
	]
};

const arrange = [
	// Thứ tự gọi Role
	'BaoVe',
	'SoiTienTri',
	'SoiThuong',
	'PhuThuy',
	'TienTri',
	'ThoSan',
	'DanLang'
];

const data = {
	// Data về các role (khi nhắn "help")
	BaoVe: {
		score: 45, // điểm cân bằng game
		party: 1, // -1 là sói, 0 là trung lập, 1 là dân làng
		description:
			'Mỗi đêm, Bảo Vệ sẽ chọn một người bất kì để bảo vệ, nếu người đó bị Sói cắn, sẽ không bị chết vào sáng hôm sau',
		note:
			'Bảo Vệ có quyền tự cứu mình, không được cứu 1 người 2 lượt liên tiếp',
		advice: 'Cố gắng quan sát để cứu được người bị hại'
	},
	SoiThuong: {
		score: -100,
		party: -1,
		description: 'Mỗi đêm, Sói sẽ chọn 1 dân làng để giết',
		note: 'Sói có thể chọn không cắn. Sói có thể tự cắn nhau',
		advice: 'Cố gắng giết hết phe Dân Làng'
	},
	TienTri: {
		score: 25,
		party: 1,
		description: 'Mỗi đêm, Nhà tiên tri sẽ chọn 1 người chơi để đoán phe',
		note: 'Nếu là phe trung lập bot vẫn sẽ nhắn là "Sói"',
		advice:
			'Cố gắng quan sát để tìm ra sói trong đêm, ban ngày cố gắng thuyết phục mọi người'
	},
	PhuThuy: {
		score: -35,
		party: 1,
		description:
			'Phù Thủy có 2 chức năng đó là chọn 1 người sắp chết để cứu sống và giết chết 1 người mà Phù Thủy muốn',
		note: 'Có quyền xài 1 hoặc cả 2 bình. Bình xài rồi sẽ mất tác dụng',
		advice: 'Có quyền năng trong tay nên cần sử dụng khôn ngoan nhất có thể'
	},
	ThoSan: {
		score: 35,
		party: 1,
		description:
			'Trong đêm Thợ Săn sẽ chọn một người, nếu Thợ Săn chết trong đêm thì người bị Thợ Săn chọn sẽ chết chung với Thợ Săn',
		note: 'Thợ Săn bắn ai thì người đó chắc chắn phải chết',
		advice: 'Chăm chú tìm ra Sói để bắn'
	},
	DanLang: {
		score: 0,
		party: 1,
		description:
			'Dân làng cùng với những người có chức năng tìm cách lập luận và suy đoán ra đâu là Sói đang ẩn mình dưới lớp người',
		note: 'Có nhiều thời gian và có nhiều cơ hội suy đoán hơn tất cả',
		advice:
			'Đừng để vai trò dân làng của bạn trở nên vô ích, bạn có thể treo cổ Sói mà!'
	},
	SoiTienTri: {
		score: -150,
		party: -1,
		description:
			'Mỗi đêm, Nhà tiên tri sẽ chọn 1 người chơi để đoán phe và có thể trở thành Sói Thường bất cứ lúc nào (sẽ mất chức năng tiên tri)',
		note:
			'Nếu trong phe Sói chỉ còn mỗi Sói Tiên Tri thì nó sẽ tự động trở thành thành Sói Thường',
		advice:
			'Cố gắng quan sát để tìm ra những kẻ quan trọng và bảo với mọi người'
	}
};

const symbols = {
	// emoji số
	0: '0⃣',
	1: '1⃣',
	2: '2⃣',
	3: '3⃣',
	4: '4⃣',
	5: '5⃣',
	6: '6⃣',
	7: '7⃣',
	8: '8⃣',
	9: '9⃣'
};
for (let i = 10; i <= 1000; i++) {
	let number = i;
	symbols[i] = '';
	while (number > 0) {
		symbols[i] = symbols[number % 10] + symbols[i];
		number = Math.floor(number / 10);
	}
}

module.exports = {
	version,
	timeout,
	setup,
	arrange,
	data,
	code,
	symbols
};
