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
    NHANBAN: 1,
	CUPIDFIRST: 2,
	BAOVE: 3,
	SOITHUONG: 4,
	TIENTRI: 5,
	PHUTHUY_CUU: 6,
	PHUTHUY_GIET: 7,
	THOSAN_NIGHT: 8,
	SOITIENTRI_SEER: 9,
	SOITIENTRI_VOTE: 10,
	BANSOI_VOTE: 11,
	THAYDONG: 12,
	PHAPSUCAM: 13,
	VAMPIRE: 14,
	VAMPIREKILL: 15,
    VOTEKILLGL: 16,
    SOITIENTRI_RESIGN: 17,
    HARLOT: 18,
    ALCHE_PUPPET: 19,
    ALCHE_HYPNOSIS: 20,
    SOIBONGDEM: 21,
    VOTEKILLSHADOW: 22,
    SOIBONGDEM_VOTE: 23,
    LYCAN_IDOL: 24,
    LYCAN_VOTE: 25,
    SOICUTE: 26,
    KYSI: 27,
    SOICUTE_VOTE: 28,
    CONDO: 29,
    DONGPHAM: 30,
    VONGHON_COIN: 31,
    VONGHON_PLAYER: 32,
    COIN_PLAYER: 33,
    NGOAICAM: 34,
    SOIKYSINH: 35,
    SOIKYSINH_VOTE: 36
    
};

const timeout = {
	// timeout cho từng event
	DELAY_STARTGAME: 12000,
	DISCUSS: 90000,
	VOTEKILL: 15000,
    NHANBAN: 30000,
	CUPIDFIRST: 35000,
	BAOVE: 30000,
	PHUTHUY_CUU: 30000,
	PHUTHUY_GIET: 30000,
	SOITHUONG: 40000,
	THOSAN_NIGHT: 30000,
	TIENTRI: 30000,
	SOITIENTRI_SEER: 30000,
	SOITIENTRI_VOTE: 40000,
	BANSOI_VOTE: 40000,
	THAYDONG: 40000,
	PHAPSUCAM: 30000,
	VAMPIRE: 30000,
	VAMPIREKILL: 25000,
    VOTEKILLGL: 15000,
    SOITIENTRI_RESIGN: 25000,
    HARLOT: 30000,
    ALCHE_PUPPET: 30000,
    ALCHE_HYPNOSIS: 30000,
    SOIBONGDEM: 30000,
    VOTEKILLSHADOW: 15000,
    SOIBONGDEM_VOTE: 40000,
    LYCAN_IDOL: 30000,
    LYCAN_VOTE: 40000,
    SOICUTE: 30000,
    KYSI: 30000,
    SOICUTE_VOTE: 40000,
    CONDO: 30000,
    DONGPHAM: 30000,
    VONGHON_COIN: 25000,
    VONGHON_PLAYER: 30000,
    COIN_PLAYER: 30000,
    NGOAICAM: 30000,
    SOIKYSINH: 30000,
    SOIKYSINH_VOTE: 30000
  
};

const setup = {
    //  Setup theo số lượng người chơi
    3: ['PhuThuy', 'Waller', 'SoiThuong'],
    4: ['DanLang', 'TienTri', 'BaoVe', 'SoiThuong'],
    5: ['BaoVe', 'TienTri', 'PhuThuy', 'SoiThuong', 'GiaLang'],
    
    6: ['BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'PhapSuCam',
        'ConDo'
],
    7: [
        'ThayDong',
        'TienTri',
        'SoiThuong',
        'SoiDeThuong',
        'ConDo',
        'PhapSuCam',
        'DanLang'
    ],
    8: [
        'ConDo',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'DanLang',
        'ThayDong',
        'PhapSuCam'
    ],
    9: [
        'PhapSuCam',
        'SoiBongDem',
        'SoiThuong',
        'ThayDong',
        'TienTri',
        'PhuThuy',
        'ChanDoi',
        'ConDo',
        'Vampire'
    ],
    10: [
        'DanLang',
        'DanLang',
        'SoiThuong',
        'DanLang',
        'PhapSuCam',
        'DanLang',
        'DanLang',
        'DanLang',
        'DanLang',
        'ChanDoi'
    ],
    11: [
        'PhapSuCam',
        'DanLang',
        'DanLang',
        'DanLang',
        'DanLang',
        'DanLang',
        'DanLang',
        'SoiThuong',
        'Minion',
        'ChanDoi',
        'DanLang'
        
    ],
 
    12: [
        'TienTri',
        'DanLang',
        'SoiThuong',
        'Minion',
        'Danlang',
        'ThoSan',
        'DanLang',
        'SoiThuong',
        'ChanDoi',
        'DanLang',
        'DanLang',
        'DanLang'
        
    ],
 
    13: [
        'BanSoi',
        'PhapSuCam',
        'SoiThuong',
        'DanLang',
        'DanLang',
        'ThoSan',
        'DanLang',
        'TienTri',
        'Vampire',
        'DanLang',
        'DanLang',
        'DanLang',
        'DanLang'
        
    ],
 
    14: [
        'DanLang',
        'BanSoi',
        'SoiThuong',
        'DanLang',
        'TienTri',
        'DanLang',
        'DanLang',
        'ChanDoi',
        'DanLang',
        'DanLang',
        'DanLang',
        'Vampire',
        'Minion',
        'DanLang'
        
    ],
 
    15: [
        'DanLang',
        'DanLang',
        'SoiThuong',
        'DanLang',
        'TienTri',
        'DanLang',
        'SoiThuong',
        'Minion',
        'Lycan',
        'Vampire',
        'DanLang',
        'ChanDoi',
        'PhapSuCam',
        'DanLang',
        'DanLang'
        
    ]
};





const setup2 = {
    //  Setup theo số lượng người chơi
    3: ['DanLang', 'DanLang', 'SoiThuong'],
    4: ['DanLang', 'NhanBan', 'ThayDong', 'SoiThuong'],
    5: ['ThayDong', 'DanLang', 'DanLang', 'SoiThuong', 'NhanBan'],
    
    6: ['BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'DanLang'
],
    7: [
        'BaoVe',
        'SoiThuong',
        'SoiBongDem',
        'PhuThuy',
        'DanLang',
        'ThoSan',
        'TienTri'
    ],
    8: [
        'BaoVe',
        'SoiDeThuong',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'PhapSuCam',
        'DanLang'
    ],
    9: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'ThayDong',
        'DanLang',
        'SoiThuong'
    ],
    10: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'ThayDong',
        'ChanDoi',
        'DanLang',
        'SoiThuong'
    ],
    11: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'GiaLang',
        'SoiThuong',
        'ThayDong',
        'Vampire',
        'NhanBan'
        
    ],
 
    12: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'DanLang',
        'SoiThuong',
        'GiaLang',
        'Vampire',
        'ThayDong',
        'NhanBan'
        
    ],
 
    13: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'SoiThuong',
        'GiaLang',
        'Vampire',
        'BanSoi',
        'ThayDong',
        'SoiThuong',
        'DanLang'
        
    ],
 
    14: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'SoiThuong',
        'ChanDoi',
        'GiaLang',
        'ThayDong',
        'SoiThuong',
        'Vampire',
        'BanSoi',
        'DanLang'
        
    ],
 
    15: [
        'BaoVe',
        'SoiTienTri',
        'SoiThuong',
        'PhuThuy',
        'TienTri',
        'ThoSan',
        'SoiThuong',
        'SoiThuong',
        'BanSoi',
        'Vampire',
        'DanLang',
        'ChanDoi',
        'Minion',
        'GiaLang',
        'ThayDong'
        
    ]
};




const arrange = [
	// Thứ tự gọi Role
    'ConDo',
    'Waller',
    'Harlot',
    'NhanBan',
    'Lycan',
	'BaoVe',
	'SoiTienTri',
	'BanSoi',
	'SoiThuong',
    'SoiKySinh',
    'SoiBongDem',
    'SoiDeThuong',
	'TienTri',
    'Alchemist',
    'DongPham',
	'PhuThuy',
	'ThoSan',
	'GiaLang',
	'DanLang',
	'Minion',
	'ChanDoi',
	'ThayDong',
    'KySi',
	'PhapSuCam',
	'Vampire',
    'VongHon',
    'NhaNgoaiCam'
    
];

const data = {
	// Data về các role (khi nhắn "help")
	BaoVe: {
		score: 45, // điểm cân bằng game
		party: 1, // -1 là sói, 0 là trung lập, 1 là dân làng
		description:
			'Mỗi đêm, Bảo Vệ chọn một người bất kì để bảo vệ, nếu người đó bị Sói cắn hoặc bị Đồng Phạm giết, sẽ không bị chết vào buổi sáng.\n💡 Bảo Vệ có thể cứu người sắp bị treo cổ! (1 lần duy nhất)',
		note:
			'Bảo Vệ được tự bảo vệ mình, không được bảo vệ 1 người 2 lần liên tiếp',
		advice: 'Cố gắng quan sát để cứu được người bị hại'
	},
	SoiThuong: {
		score: -100,
		party: -1,
		description: 'Mỗi đêm, Sói chọn 1 dân làng để giết',
		note: 'Các Sói phải thống nhất người cần giết, nếu khác nhau sẽ không cắn được',
		advice: 'Cố gắng giết hết phe Dân Làng'
	},
	TienTri: {
		score: 25,
		party: 1,
		description: 'Mỗi đêm, Tiên Tri chọn 1 người chơi để soi PHE!\n💡 Nếu số dân còn sống nhỏ hơn 60% tổng số dân ban đầu, lúc này Tiên Tri sẽ soi ra ROLE!\n💡 Tiên Tri soi Nhân Bản, Chán Đời, Minion, Vampire sẽ ra PHE Trung lập!',
		note: 'Hãy cẩn thận trước Sói Tiên Tri vì nó có thể làm bạn mờ mắt!',
		advice:
			'Cố gắng quan sát để tìm ra sói trong đêm, ban ngày cố gắng thuyết phục mọi người'
	},
	PhuThuy: {
		score: -35,
		party: 1,
		description:
			'Phù Thủy có 2 chức năng là cứu sống 1 người sắp chết và giết chết 1 người mà Phù Thủy muốn',
		note: 'Có quyền xài 1 hoặc cả 2 bình. Bình xài rồi sẽ mất tác dụng.\n💡Phù Thủy chỉ có thể biết được ai có vết sói cắn!',
		advice: 'Có quyền năng trong tay nên cần sử dụng khôn ngoan nhất có thể'
	},
	ThoSan: {
		score: 35,
		party: 1,
		description:
			'Trong đêm Thợ Săn chọn một người, nếu Thợ Săn chết thì sẽ kéo theo người đó chết',
		note: 'Thợ Săn bắn ai thì chắc chắn phải chết',
		advice: 'Chăm chú tìm ra Sói để bắn'
	},
	DanLang: {
		score: 0,
		party: 1,
		description:
			'Dân làng cùng những người khác lập luận và suy đoán ai là Sói',
		note: 'Có nhiều thời gian và có nhiều cơ hội suy đoán hơn tất cả',
		advice:
			'Đừng để vai trò dân làng của bạn trở nên vô ích, bạn có thể treo cổ Sói mà!'
	},
	Minion: {
		score: -5,
		party: 1,
		description:
			'Minion phe Sói (phản bội dân làng), không có chức năng, Tiên Tri khi soi bạn vẫn thấy thuộc phe Trung Lập. Nếu phe Sói thắng thì Minion thắng.',
		note: 'Khi Minion bị treo cổ mà chưa có Sói nào chết thì phe Sói thắng trắng cùng Minion.',
		advice:
			'Cố gắng bảo vệ Sói khi thảo luận bạn nhé!'
	},
	SoiTienTri: {
		score: -120,
		party: -1,
		description:
			'Mỗi đêm, Sói Tiên Tri chọn 1 người chơi để soi role đến khi chỉ còn một mình nó trong team Sói.\n💡Đồng thời Sói Tiên Tri phù phép người đã soi khiến cho Tiên Tri soi người này ra Sói!\n💡Một lần duy nhất mỗi game, Sói Tiên Tri hú lên tăng sức mạnh tối đa, lúc này không gì có thể ngăn Sói cắn, dân làng còn có cái nịt thôi, Sói cũng sẽ miễn nhiễm với phép thuật tấn công vào nó',
		note:
			'Nếu trong phe Sói không còn Sói Thường thì Sói Tiên Tri trở thành Sói Thường và có thể cắn người!',
		advice:
			'Cố gắng quan sát để tìm ra những kẻ quan trọng và bảo với mọi người'
	},
	PhapSuCam: {
		score: 25, // điểm cân bằng game
		party: 1, // -1 là sói, 0 là trung lập, 1 là dân làng
		description:
			'Mỗi đêm, Pháp Sư chọn một người để khoá mõm, người đó sẽ không được tham gia thảo luận vào sáng hôm sau!',
		note:
			'Không được khoá mõm 1 người 2 lần liên tiếp. Người bị khoá cũng không thể vote treo cổ vào sáng hôm sau!',
		advice: 'Cố gắng quan sát để khoá mõm hợp lý!'
	},
	ChanDoi: {
		score: 20,
		party: 1,
		description:
			'Chán Đời thuộc Dân Làng nhưng chỉ thắng khi cả làng treo cổ nó!\n💡 Chán Đời nếu bị Sói cắn thì không chết liền mà qua sáng hôm sau mới chết!',
		note: 'Tiên Tri soi Chán Đời vẫn sẽ ra phe Trung Lập! ',
		advice:
			'Cố gắng lừa mọi người treo cổ bạn nhé!'
	},
	ThayDong: {
		score: 90, // điểm cân bằng game
		party: 1, // -1 là sói, 0 là trung lập, 1 là dân làng
		description:
			'Thầy Đồng phe dân, có thể nói chuyện với người chết và hồi sinh 1 người bất kì',
		note:
			'Chỉ được hồi sinh 1 lần duy nhất mỗi game!\n❗️❗️Nếu bạn hồi sinh người đã bị Nhân Bản phù phép thì sẽ mất khả năng hồi sinh!\n❗️❗️Thầy Đồng chỉ được nói chuyện với người chết vào ban đêm!\n💡 Thầy Đồng không thể hồi sinh Đồng Phạm!',
		advice: 'Cố gắng quan sát để hồi sinh hợp lý!'
	},
	Vampire: {
		score: 0,
		party: 2,
		description: 'Là Phe Thứ 3 ngoài Phe Sói và Phe Dân, thắng khi cuối game còn sống!💡 Mỗi đêm, Ma cà rồng sẽ chọn 1 người chơi là nạn nhân. Những nạn nhân của Ma cà rồng sẽ được công bố sau khi phiên treo cổ diễn ra',
		note: '💡 Vampire bật dead mode (có thể sử dụng nhiều lần) để giết người ngay, không thì số người chết sẽ dồn lại một lần.\n💡 Những nạn nhân Vampire đã chọn sẽ mang dấu ấn MA CÀ RỒNG! Nếu tất cả người chơi còn sống còn lại đều mang dấu ấn thì Vampire chiến thắng!',
		advice: 'Cố gắng giết hết các phe khác !'
	},
	BanSoi: {
		score: -30,
		party: 1,
		description: 'Bán sói phe Dân, nhưng nếu bị cắn sẽ không chết mà bị biến thành Sói',
		note: 'Bị Sói cắn không chết mà biến thành Sói Thường, Tiên Tri soi ra phe Sói',
		advice: 'Cố gắng giết hết phe Dân Làng'
	},
	Cupid: {
		score: 0,
		party: 1,
		description: 'Cupid phe Dân, đầu game ghép đôi 2 người bất kỳ với nhau, cặp đôi Cupid đã ghép sẽ thắng vào cuối game khi cặp đôi còn sống!',
		note: 'Cupid có thể tự ghép chính mình nhưng\nKhông được chọn ghép trùng lặp!',
		advice: 'Cố gắng giết hết phe Dân Làng'
	},
	GiaLang: {
		score: 0,
		party: 1,
		description:
			'Già làng trùm cuối phe dân làng, phiếu treo cổ của Già Làng được tính là 2 phiếu!\n💡Sói cắn 2 lần mới chết, Vampire, Đồng Phạm vô dụng với Già Làng',
		note: '⚠️Khi già làng chết thì một số quyền năng đặc biệt của phe dân bị vô hiệu hoá!⚠️',
		advice:
			'Hãy cẩn thận!'
	},
	Lycan: {
		score: 0,
		party: 1,
		description:
			'Lycan thuộc Phe Dân Làng, nhưng bị Tiên Tri soi ra Sói.',
		note: 'Lycan sẽ chọn 1 người làm thần tượng, nếu người này chết đi, Lycan sẽ biến thành BÁN SÓI (Tri soi ra Dân).',
		advice:
			'Đừng để vai trò dân làng của bạn trở nên vô ích, bạn có thể treo cổ Sói mà!'
	},
	NhanBan: {
		score: 0,
		party: 1,
		description:
			'Nhân Bản chọn 1 người, Nhân Bản sẽ trở thành người đó với toàn bộ chức năng SAU KHI NGƯỜI ĐÓ CHẾT! Nhân Bản sẽ theo phe người đã chọn.',
		note: '💡Nhân Bản biến thành Cupid sẽ không thể ghép đôi mới mà tiếp tục bảo vệ cặp đôi cũ\n💡Nhân bản biến thành Già Làng Fake sẽ có 2 mạng nhưng không thể phục hồi quyền năng cho dân làng!\n💡Nhân Bản biến thành Vampire thì những nạn nhân không mất đi dấu ấn ma cà rồng cũ!\n💡Nhân Bản biến thành Côn Đồ/Đồng Phạm sẽ không được biết đồng đội mình là ai!',
		advice:
			'NHÂN BẢN TESTING'
	},
    Harlot: {
		score: 0,
		party: 1,
		description:
			'Bạn là gái điếm của dân làng! Mỗi đêm bạn sẽ ngủ với một người\n💡Nếu bạn ngủ với Sói/Vampire/Đồng Phạm/Vong Hồn, họ sẽ không thể giết được được ai!\n💡Nếu ngủ ở nhà người khác vào đêm Sói/Vampire/Đồng Phạm/Vong Hồn chọn bạn, họ không thể giết chết bạn(trừ khi Sói hú thì cái nịt bạn cũng không còn hic)\n💡Nếu Sói/Vampire/Đồng Phạm/Vong Hồn giết đúng người mà bạn ngủ chung, cả hai sẽ chết chung/mang dấu ấn ma cà rồng!',
		note: 'Nếu bạn bị vote treo cổ, bạn sẽ bóc phốt người ngủ với bạn đêm qua!',
		advice:
			'Harlot testing!'
	},
	Alchemist: {
		score: 0,
		party: 1,
		description:
			'Alchemist phe dân làng, nhà giả kim có 2 quyền năng tối thượng.\n💡 1. Mỗi đêm Alchemist sẽ được dịch vết cắn của Sói lên trên - xuống dưới - hoặc không dịch (trong danh sách người chơi còn sống)\n💡2. Thôi miên một người bất kì, khi nhà giả kim chết, người đó nếu còn sống sẽ chết thay bạn, bạn sẽ được hồi sinh và dân làng KHÔNG được thông báo rằng bạn còn sống!',
		note: 'Hãy sử dụng dịch chuyển một cách hợp lý để diệt trừ Sói. Phù Thuỷ, Bảo Vệ có thể cứu Sói thoát chết vì bạn đã thay đổi mục tiêu của Sói!\n💡 Nếu Sói hú lên bạn không thể ngăn cản cái chết, nhưng vẫn có thể thay đổi mục tiêu của bầy Sói!\n💡 Nếu cupid ghép đôi bạn, thôi miên sẽ giúp bạn sống nhưng không cứu được cặp đôi của bạn!',
		advice:
			'ALCHEMIST TESTING'
	},
    SoiBongDem: {
		score: 0,
		party: -1,
		description:
			'Khi Sói Bóng Đêm còn sống thì kết quả vote treo cổ bị che khuất trong bóng đêm và lượt vote của bạn tính là 2 !!\n💡Ngoài ra, một lần duy nhất trong game, bạn có thể vĩnh viễn biến người có quyền năng phép thuật thành Dân Làng bình thường vào đêm hôm sau, vào đêm đó những chức năng giết trực tiếp sẽ bị vô hiệu với người này ! Vampire sẽ bị khoá vĩnh viễn chức năng nhưng những nạn nhân vẫn còn dấu ấn ma cà rồng!',
		note: 'Nếu bạn chọn khoá quyền năng, bạn đánh đổi MẤT ĐI khả năng ẩn kết quả vote treo cổ và vote 2 phiếu, trở về thành Sói Thường vào ĐÊM HÔM SAU!\n⚠️ Bạn chỉ có thể cắn người khi đã trở về thành Sói Thường!',
		advice:
			'SÓI BÓNG ĐÊM TESTING'
	},
	SoiDeThuong: {
		score: 0,
		party: -1,
		description:
			'Sói Dễ Thương chọn 1 người mỗi đêm, người đó sẽ tình nguyện chết chung vì Sói dễ thương quá hic! (Chỉ hoạt động khi còn là Sói Dễ Thương)',
		note: 'Sói Dễ Thương 1 lần duy nhất trong game có thể ngẫu nhiên làm lộ một role bất kì, lúc này Dân Làng bỏ qua phiên treo cổ ngay lập tức!\n💡 Sau khi dùng chức năng này, trở về thành Sói Thường vào đêm sau!\n⚠️ Bạn chỉ có thể cắn người khi đã trở về thành Sói Thường!',
		advice:
			'SÓI CUTE TESTING'
	},
	KySi: {
		score: 0,
		party: 1,
		description:
			'Kỵ Sĩ phe Dân Làng, khi Sói cắn Kỵ Sĩ sẽ chết nhưng một con sói bất kì sẽ bị thương và chết vào sáng hôm sau!',
		note: 'Kỵ Sĩ có thể đánh cược đâm một người trong đêm (1 lần duy nhất), nếu là Sói, Sói chết ngay, nếu không phải Sói, Kỵ Sĩ sẽ chết ngay!',
		advice:
			'KYSI'
	},
    ConDo: {
		score: 0,
		party: 3,
		description:
			'Côn Đồ chọn 1 người (trừ Sói, Vampire, Vong Hồn) làm Đồng Phạm vào ĐÊM HÔM SAU và sẽ là tay sai cho hắn, mỗi đêm Đồng Phạm sẽ thay Côn Đồ giết người!\n💡 Sói không thể cắn chết Côn Đồ! Côn Đồ chỉ có thể chọn người mới nếu Đồng Phạm cũ đã chết!\n💡 Thầy Đồng không thể hồi sinh Đồng Phạm!',
		note: 'Côn đồ và Đồng Phạm sẽ thắng khi một trong cả hai còn sống sót cuối cùng!',
		advice:
			'con do'
	},
    DongPham: {
		score: 0,
		party: 3,
		description:
			'Đồng Phạm sẽ thay Côn Đồ giết nguời!\n💡 Côn đồ và Đồng Phạm sẽ thắng khi một trong cả hai còn sống sót cuối cùng!\n💡 Đồng Phạm không thể giết chết Già Làng và người được bảo vệ hoặc được phù thuỷ cứu!\n💡 Thầy Đồng không thể hồi sinh Đồng Phạm!',
		note: 'Côn đồ và Đồng Phạm sẽ thắng khi một trong cả hai còn sống sót cuối cùng!',
		advice:
			'dong pham'
	},
    VongHon: {
		score: 0,
		party: 6,
		description:
			'Vong Hồn sẽ chọn 1 người để kéo xì dách, chọn kéo bài tiếp hoặc dằn dơ. Vong Hồn phe 3 sẽ thắng khi sống sót cuối cùng!',
		note: 'Nếu người chơi chọn giống vong hồn thì người đó sống, chọn khác thì người đó chết!\n💡 Sói không thể cắn chết Vong Hồn\n💡 Vong Hồn không có tác dụng với Già Làng!',
		advice:
			'VongHon'
	},
    NhaNgoaiCam: {
		score: 0,
		party: 1,
		description:
			'Nhà Ngoại Cảm sẽ chọn 2 người để soi, nếu một trong 2 người đã sử dụng chức năng có khả năng giết người vào đêm hôm qua, nhà ngoại cảm sẽ nhận được dấu hiệu đỏ, còn nếu không sẽ là xanh!',
		note: 'Ngoại trừ Pháp Sư Câm không được tính là chức năng giết người!\n💡 Ngoài ra, Ngoại Cảm sẽ được thông báo nếu 1 trong 2 người đã bị Waller lựa chọn! ',
		advice:
			'NgoaiCam'
	},
    SoiKySinh: {
		score: 0,
		party: -1,
		description:
			'Sói Ký Sinh chọn ký sinh 1 người, chỉ cần người này chưa chết, Sói Ký Sinh sẽ bất tử',
		note: 'Sói ký sinh xong đêm sau mới trở về Sói Thường để cắn người',
		advice:
			'Sói Ký Sinh'
	},
	Waller: {
		score: 0,
		party: 1,
		description: 'Waller phe Dân, đầu game chọn 2 người bất kỳ, Waller sẽ thắng nếu còn sống và 2 người bị chọn chết hết!',
		note: 'Waller không thể tự chọn chính mình và không được chọn trùng lặp!\n💡 Tiên Tri soi Waller ra phe Trung Lập!',
		advice: 'Cố gắng giết hết phe Dân Làng'
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
	setup2,
	arrange,
	data,
	code,
	symbols
};
