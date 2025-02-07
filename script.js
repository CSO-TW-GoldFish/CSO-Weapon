var luaBuymenuList = [];
var wpnthis;
var theme = 1;
var sortway = 1;
var language = "tw";
let timer;

let updatedate = "2025 / 02 / 07 ( Destroyertw1207 )"

var lang_switch = {
	  "tw": {
		  "webtitle"      　: "Counter-Strike Online 武器清單"
		, "webmaker"      　: "網頁製作：崩潰金魚燒、DestroyerI滅世I"
		, "imgsprovider"  　: "圖片提供：SkullerRey、DestroyerI滅世I"
		, "idsprovider"   　: "ＩＤ提供：SkullerRey、DestroyerI滅世I"
		, "aboutbtn"      　: "關於"
		, "search"     　   : "搜尋"
		, "searchbtn"     　: "搜"
		, "copylua"       　: "已複製！"
		, "langswitch"    　: "語言：繁體中文 ( TW / HK )"
		, "rarityswitch"  　: "稀有度："
		, "typeswitch"    　: "類型："
		, "restrictswitch"　: "武器限制："
		, "none"          　: "無"
		, "detailbutton"  　: "詳細"
		, "lastupdate"      : "近期更新："
		, "detailoff"       : "關閉 ( ESC )"
		, "lualist" : {
			  "title"     : "Lua 購物車清單"
			, "exist"     : "無法重複添加同一把武器"
			, "addone"    : "武器已添加至清單內，請滑到右側確認"
			, "remone"    : "武器已成功從清單中移除"
			, "addall"    : "該頁面的武器已全數添加至清單內，請滑到右側確認"
			, "remall"    : "所有清單內的武器已移除"
			, "copy"      : "已生成 common.lua 的文字並複製於您的剪貼簿中"
			, "addallbtn" : "新增此頁所有"
			, "remallbtn" : "刪除全部"
			, "copybtn"   : "複製 common.lua"
		}
		, "type" : {
			  "GRADE"         : "．類型．"
			, "ALL"           : "全部"
			, "NONE"          : "未知"
			, "PISTOL"        : "輔助型"
			, "SHOTGUN"       : "散彈槍"
			, "SUBMACHINEGUN" : "衝鋒槍"
			, "RIFLE"         : "步槍"
			, "SNIPERRIFLE"   : "狙擊槍"
			, "MACHINEGUN"    : "機關槍"
			, "EQUIPMENT"     : "裝備型"
			, "GRENADE"       : "手榴彈"
			, "KNIFE"         : "近戰型"
			, "STUDIO"        : "創世者"
		}
		, "rarity" : {
			  "GRADE"  : "．稀有度．"
			, "GRADE0" : "全部"
			, "GRADE1" : "一般"
			, "GRADE2" : "高級"
			, "GRADE3" : "稀有"
			, "GRADE4" : "特殊"
			, "GRADE5" : "王牌"
			, "GRADE6" : "史詩"
		}
		, "restrict" : {
			  "GRADE"            : "．武器限制．"
			, "NONE"             : "無限制"
			, "CLASSIC"          : "經典"
			, "NEWCLASSIC"       : "新經典"
			, "NEWCLASSICZOMBIE" : "新經典(殭屍)"
		}
		, "theme"         : {
			  1: "主題：明亮"
			, 2: "主題：暗黑"
		}
		, "sort"          : {
			  1: "排序：InGameID"
			, 2: "排序：ID"
			, 3: "排序：類型"
			, 4: "排序：稀有度"
		}
	}
	, "na_en": {
		  "webtitle"      : "Counter-Strike Online Weapon List"
		, "webmaker"      : "Website Maker: Gold Fish、Destroyertw1207"
		, "imgsprovider"  : "Image Provider: Skuller Rey、Destroyertw1207"
		, "idsprovider"   : "Ids Provider: Skuller Rey、Destroyertw1207"
		, "aboutbtn"      : "About"
		, "search"     　 : "Search"
		, "searchbtn"     : "Search"
		, "copylua"       : "Copied!"
		, "langswitch"    : "LANGUAGE: English ( CSN )"
		, "rarityswitch"  : "Rarity: "
		, "typeswitch"    : "Type: "
		, "restrictswitch": "Restrict："
		, "none"          : "None"
		, "detailbutton"  : "Details"
		, "lastupdate"    : "Last Update: "
		, "detailoff"     : "OFF ( ESC )"
		, "lualist" : {
			  "title"     : "Lua Shopping List"
			, "exist"     : "Cannot add the same weapon multiple times"
			, "addone"    : "Weapon has been added to the list, please scroll to the right to confirm"
			, "remone"    : "Weapon has been successfully removed from the list"
			, "addall"    : "All weapons on this page have been added to the list, please scroll to the right to confirm"
			, "remall"    : "All weapons in the list have been removed"
			, "copy"      : "The text for common.lua has been generated and copied to your clipboard"
			, "addallbtn" : "Add All on This Page"
			, "remallbtn" : "Remove All"
			, "copybtn"   : "Copy common.lua"
		}
		, "type" : {
			  "GRADE"        : "．Type．"
			, "ALL"          : "All"
			, "NONE"         : "Unknown"
			, "PISTOL"       : "Pistol"
			, "SHOTGUN"      : "Shutgun"
			, "SUBMACHINEGUN": "Sub-Machine Gun"
			, "RIFLE"        : "Rifle"
			, "SNIPERRIFLE"  : "Sniper Rifle"
			, "MACHINEGUN"   : "Machine Gun"
			, "EQUIPMENT"    : "Equipment"
			, "GRENADE"      : "Grenade"
			, "KNIFE"        : "Melee"
			, "STUDIO"       : "Studio"
		}
		, "rarity" : {
			  "GRADE"  : "．Rarity．"
			, "GRADE0" : "All"
			, "GRADE1" : "Regular"
			, "GRADE2" : "Advanced"
			, "GRADE3" : "Rare"
			, "GRADE4" : "Unique"
			, "GRADE5" : "Transcendence"
			, "GRADE6" : "Epic"
		}
		, "restrict" : {
			  "GRADE"            : "．Restrict．"
			, "NONE"             : "No limits"
			, "CLASSIC"          : "Classic"
			, "NEWCLASSIC"       : "New Classic"
			, "NEWCLASSICZOMBIE" : "New Classic (Zombie)"
		}
		, "theme"　: {
			  1 : "THEME: Light"
			, 2 : "THEME: Dark"
		}
		, "sort"　: {
			  1 : "SORT: InGameID"
			, 2 : "SORT: ID"
			, 3 : "SORT: Type"
			, 4 : "SORT: Rarity"
		}
	}
	, "chn": {
		  "webtitle"       : "Counter-Strike Online 武器清单"
		, "webmaker"       : "网页制作：崩溃金鱼烧、DestroyerI灭世I"
		, "imgsprovider"   : "图片提供：SkullerRey、DestroyerI灭世I"
		, "idsprovider"    : "ＩＤ提供：SkullerRey、DestroyerI灭世I"
		, "aboutbtn"       : "关于"
		, "search"     　  : "搜"
		, "searchbtn"      : "搜"
		, "copylua"        : "已复制！"
		, "langswitch"     : "语言：简体中文 ( CHN )"
		, "rarityswitch"   : "稀有度："
		, "typeswitch"     : "类型："
		, "restrictswitch" : "武器限制："
		, "none"           : "无"
		, "detailbutton"   : "详细"
		, "lastupdate"     : "近期更新："
		, "detailoff"      : "关闭 ( ESC )"
		, "lualist" : {
			  "title"     : "Lua 购物车清单"
			, "exist"     : "无法重复添加同一把武器"
			, "addone"    : "武器已添加至清单内，请滑到右侧确认"
			, "remone"    : "武器已成功从清单中移除"
			, "addall"    : "该页面的武器已全数添加至清单内，请滑到右侧确认"
			, "remall"    : "所有清单内的武器已移除"
			, "copy"      : "已生成 common.lua 的文字并复制于您的剪贴板中"
			, "addallbtn" : "新增此页所有"
			, "remallbtn" : "删除全部"
			, "copybtn"   : "复制 common.lua"
		}
		, "type" : {
			  "GRADE"         : "．类型．"
			, "ALL"           : "全部"
			, "NONE"          : "未知"
			, "PISTOL"        : "副武器"
			, "SHOTGUN"       : "霰弹枪"
			, "SUBMACHINEGUN" : "冲锋枪"
			, "RIFLE"         : "步枪"
			, "SNIPERRIFLE"   : "狙击枪"
			, "MACHINEGUN"    : "轻机枪"
			, "EQUIPMENT"     : "装备型"
			, "GRENADE"       : "手榴弹"
			, "KNIFE"         : "近战型"
			, "STUDIO"        : "締造者"
		}
		, "rarity" : {
			  "GRADE"  : "．稀有度．"
			, "GRADE0" : "全部"
			, "GRADE1" : "普通"
			, "GRADE2" : "优秀"
			, "GRADE3" : "精良"
			, "GRADE4" : "稀有"
			, "GRADE5" : "超凡"
			, "GRADE6" : "传奇"
		}
		, "restrict" : {
			  "GRADE"            : "．武器限制．"
			, "NONE"             : "无限制"
			, "CLASSIC"          : "经典"
			, "NEWCLASSIC"       : "新经典"
			, "NEWCLASSICZOMBIE" : "新经典(生化)"
		}
		, "theme"　: {
			  1 : "主题：明亮"
			, 2 : "主题：暗黑"
		}
		, "sort"　: {
			  1 : "排序：InGameID"
			, 2 : "排序：ID"
			, 3 : "排序：类型"
			, 4 : "排序：稀有度"
		}
	}
	, "koreana": {
		"webtitle"         : "카스온라인​​​ 무기 목록"
		, "webmaker"       : "웹 제작: Gold Fish, Destroyertw1207"
		, "imgsprovider"   : "이미지 제공: Skuller Rey, Destroyertw1207"
		, "idsprovider"    : "ID 제공: Skuller Rey, Destroyertw1207"
		, "aboutbtn"       : "관한"
		, "search"     　  : "검색"
		, "searchbtn"      : "검색"
		, "copylua"        : "복사 완료!"
		, "langswitch"     : "언어: 한국어 ( KOREANA )"
		, "rarityswitch"   : "희귀도:"
		, "typeswitch"     : "유형:"
		, "restrictswitch" : "무기 제한:"
		, "none"           : "안"
		, "detailbutton"   : "상세한"
		, "lastupdate"     : "최근에 업데이트됨："
		, "detailoff"      : "끄세요 ( ESC )"
		, "lualist" : {
			  "title"     : "Lua 쇼핑 목록"
			, "exist"     : "같은 무기를 여러 번 추가할 수 없습니다"
			, "addone"    : "무기가 목록에 추가되었습니다. 오른쪽으로 스크롤하여 확인해주세요"
			, "remone"    : "무기가 목록에서 성공적으로 제거되었습니다"
			, "addall"    : "이 페이지의 모든 무기가 목록에 추가되었습니다. 오른쪽으로 스크롤하여 확인해주세요"
			, "remall"    : "목록에 있는 모든 무기가 제거되었습니다"
			, "copy"      : "common.lua의 텍스트가 생성되어 클립보드에 복사되었습니다"
			, "addallbtn" : "이 페이지의 모든 추가"
			, "remallbtn" : "모두 삭제"
			, "copybtn"   : "common.lua 복사"
		}
		, "type" : {
			  "GRADE"         : "．타입．"
			, "ALL"           : "모두"
			, "NONE"          : "알려지지 않은"
			, "PISTOL"        : "보조무기"
			, "SHOTGUN"       : "샷건"
			, "SUBMACHINEGUN" : "기관단총"
			, "RIFLE"         : "소총"
			, "SNIPERRIFLE"   : "저격총"
			, "MACHINEGUN"    : "기관총"
			, "EQUIPMENT"     : "장비"
			, "GRENADE"       : "수류탄"
			, "KNIFE"         : "근접무기"
			, "STUDIO"        : "스튜디오"
		}
		, "rarity" : {
			  "GRADE"  : "．진귀．"
			, "GRADE0" : "모두"
			, "GRADE1" : "일반"
			, "GRADE2" : "고급"
			, "GRADE3" : "레어"
			, "GRADE4" : "유니크"
			, "GRADE5" : "초월"
			, "GRADE6" : "에픽"
		}
		, "restrict" : {
			  "GRADE"            : "．무기제한．"
			, "NONE"             : "제한 없음"
			, "CLASSIC"          : "고전"
			, "NEWCLASSIC"       : "스탠다드"
			, "NEWCLASSICZOMBIE" : "뉴클래식(좀비)"
		}
		, "theme" : {
			  1 : "테마: 밝은"
			, 2 : "테마: 어두운"
		}
		, "sort" : {
			  1 : "정렬: InGameID"
			, 2 : "정렬: ID"
			, 3 : "정렬: 유형"
			, 4 : "정렬: 희귀도"
		}
	}
}

var gettext = {
	  "rankmode" : {
		  0: "CSO_Tooltip_Desc_ModeType_Normal"
		, 1: "CSO_Tooltip_Desc_ModeType_Zombie"
		, 2: "CSO_Tooltip_Desc_ModeType_ZombieScen"
	}
	, "detail" : {
		  1: "CSO_Damage_Label"
		, 2: "CSO_Zombie_Damage_Label"
		, 3: "CSO_Scen_Damage_Label"
		, 4: "CSO_AccuracyRate_Label"
		, 5: "CSO_Rebound_Label"
		, 6: "CSO_Fusillade_Label"
		, 7: "CSO_Weight_Label"
		, 8: "CSO_Knockback_Label"
		, 9: "CSO_Zombie_Delay_Label"
	}
}

function get_csotxt(key) {
	key = key.toLowerCase()
	let txt = txt_content[language][key.toLowerCase()] || "　"
	
	const spec = {
		// 調整
		"cso_item_name_herochainsaw": {
			  "tw": "( 最後生存者 ) 電鋸"
			, "na_en": "( Last Survivor ) Chainsaw"
			, "chn": "( Last Survivor ) Chainsaw"
			, "koreana": "( Last Survivor ) Chainsaw"
		}
		, "cso_item_name_standalonehands": {
			  "tw": "( 偵查事件簿 ) " + txt
			, "na_en": "( Zombie Files ) " + txt
			, "chn": "( Zombie Files ) " + txt
			, "koreana": "( Zombie Files ) " + txt
		}
		, "cso_item_name_vxlknife": {
			  "tw": "( STUDIO創世者 ) " + txt
			, "na_en": "( Studio ) " + txt
			, "chn": "( Studio ) " + txt
			, "koreana": "( Studio ) " + txt
		}
		, "cso_item_name_fireextinguisher": {
			  "tw": "( 偵查事件簿 ) 滅火器"
			, "na_en": "( Zombie Files ) Fire Extinguisher"
			, "chn": "( Zombie Files ) Fire Extinguisher"
			, "koreana": "( Zombie Files ) Fire Extinguisher"
		}
		, "cso_item_name_standaloneknife": {
			  "tw": "( 偵查事件簿 ) 小刀"
			, "na_en": "( Zombie Files ) Knife"
			, "chn": "( Zombie Files ) Knife"
			, "koreana": "( Zombie Files ) Knife"
		}
		
		// CSN遺失
		, "cso_item_name_falcon": {
			  "tw": txt
			, "na_en": "Falcon"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_giantknife": {
			  "tw": txt
			, "na_en": "Giant Knife"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_basketball": {
			  "tw": txt
			, "na_en": "Basketball"
			, "chn": txt
			, "koreana": txt
		}
		
		// CSOWC
		, "cso_item_name_skull5wc": {
			  "tw": txt
			, "na_en": "( CSOWC ) SKULL-5"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_skull7wc": {
			  "tw": txt
			, "na_en": "( CSOWC ) SKULL-7"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_balrog11wc": {
			  "tw": txt
			, "na_en": "( CSOWC ) BALROG-XI"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_balrog9wc": {
			  "tw": txt
			, "na_en": "( CSOWC ) BALROG-IX"
			, "chn": txt
			, "koreana": txt
		}
		
		// WG_SR
		, "cso_item_name_m4a1wg_sr": {
			  "tw": txt
			, "na_en": "M4A1 White Gold"
			, "chn": txt
			, "koreana": txt
		}
		, "cso_item_name_deaglewg_sr": {
			  "tw": txt
			, "na_en": "Desert Eagle 50C White Gold"
			, "chn": txt
			, "koreana": txt
		}
		
		// 自訂義
	}
	
	if (key == "cso_item_name_funat4") {
		txt = get_csotxt("CSO_FUN_FunAT4")
	}
	if (key == "cso_item_name_funchainsaw") {
		txt = get_csotxt("CSO_FUN_FunChainsaw")
	}
	if (key == "cso_item_name_bazooka") {
		txt = "Bazooka"
	}
	
	custom_weaponname.forEach(obj => {
		let sys = Object.keys(obj)[0];
		let value = obj[sys];
		if (key.substring(14) == sys) {
			txt = value[language]
		}
	});
	
	return spec[key] ? (spec[key][language] || txt) : txt
}

// 提示訊息
function message_prompt(stl, msg) {
	document.querySelector(".notification").style.width = "auto";
	document.querySelector(".notification").style.height = "auto";
	
    const notification = document.getElementById("notification");
    clearTimeout(timer); // Clear any previous timers
	
	notification.style.display = "block";
    notification.innerHTML = stl + "<div>" + msg + "</div>";

    timer = setTimeout(() => {
        notification.style.display = "none";
    }, 2000); // Hide after 2 seconds
}

// 複製
function copytext(msg) {
	navigator.clipboard.writeText(msg).then(() => {
        
    }).catch((error) => {
        console.error("Error copying text: ", error);
    });
}

function Weapons() {
	// Data
	wpnthis = this;
	this.currentType = "ALL";
	this.currentRarity = "ALL";
	this.currentRestrict = "NONE";
	this.searchContent = "";
	this.weaponList = [];
	this.currentWeapons = [];
	this.filteredWeapons = [];
	this.noneWeapon = {
		  "tw"     : lang_switch.tw.none
		, "na_en"  : lang_switch.na_en.none
		, "chn"    : lang_switch.chn.none
		, "koreana": lang_switch.koreana.none
	}
	this.selectWeapon = {
		  "tw"     : lang_switch.tw.detailbutton
		, "na_en"  : lang_switch.na_en.detailbutton 
		, "chn"    : lang_switch.chn.detailbutton 
		, "koreana": lang_switch.koreana.detailbutton
	}
	this.typeTo = {
		  "tw"     : lang_switch.tw.type
		, "na_en"  : lang_switch.na_en.type
		, "chn"    : lang_switch.chn.type
		, "koreana": lang_switch.koreana.type
	}
	this.rarityTo = {
		  "tw"     : lang_switch.tw.rarity
		, "na_en"  : lang_switch.na_en.rarity
		, "chn"    : lang_switch.chn.rarity
		, "koreana": lang_switch.koreana.rarity
	}
	this.restrictTo = {
		  "tw"     : lang_switch.tw.restrict
		, "na_en"  : lang_switch.na_en.restrict
		, "chn"    : lang_switch.chn.restrict
		, "koreana": lang_switch.koreana.restrict
	}
	
	var elements = document.querySelectorAll('.js-weapon-category');
	var dataTypes = [];

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		var type = element.getAttribute('data-type');
		var rarity = element.getAttribute('data-rarity');
		var restrict = element.getAttribute('data-restrict');
		var spanElement = element.querySelector('span');
		if(type){
			spanElement.textContent = this.typeTo[language][type];
		}
		if(rarity){
			spanElement.textContent = this.rarityTo[language][rarity];
		}
		if(restrict){
			spanElement.textContent = this.restrictTo[language][restrict];
		}
	}
	
	// DOM
	this.thumbnailWrapperNode = document.querySelector('.js-weapon-thumbnails-wrapper');
}

// 0. 初始化
Weapons.prototype.init = function () {
	let self = this;
	
	// WeaponData 來自 weaponList.js 檔案，排序(按照ID)
	self.weaponList = Array.prototype.sort.call(WeaponData, function (a, b) {
		const order = ['NONE', 'PISTOL', 'SHOTGUN', 'SUBMACHINEGUN', 'RIFLE', 'SNIPERRIFLE', 'MACHINEGUN', 'EQUIPMENT', 'KNIFE', 'GRENADE', 'STUDIO'];
		if (sortway === 1) {
			return a.InGameID - b.InGameID;
		};
		if (sortway === 2) {
			return a.ID - b.ID;
		};
		if (sortway === 3) {
			const typeIndexDiff = order.indexOf(a.Type) - order.indexOf(b.Type);
			if (typeIndexDiff === 0) {
				return a.InGameID - b.InGameID;
			}
			return order.indexOf(a.Type) - order.indexOf(b.Type);
		};
	});
	
	self.renderThumbnails();
	self.registerCategoriesEvents();
	self.registerSearchWeaponEvents();
	self.filterCategories();
	self.clickButton();
	refresh_filtered(self);
}

// 1. 渲染縮圖
Weapons.prototype.renderThumbnails = function () {
	let self = this;
	// 清空縮圖容器
	self.thumbnailWrapperNode.innerHTML = '';
	
	Array.prototype.forEach.call(self.weaponList, function (weapon) {
		let thumbnailNode = self.createThumbnailNode(weapon);
		self.thumbnailWrapperNode.appendChild(thumbnailNode);
	})
}

// 1.1 生成單個縮圖
Weapons.prototype.createThumbnailNode = function (weapon, index) {
	let self = this
	// 外框
	let frameNode = document.createElement('div');
	frameNode.classList.add('card');
	frameNode.setAttribute('data-weapon', JSON.stringify(weapon));
	frameNode.setAttribute('data-type', weapon.Type);
	frameNode.setAttribute('data-rarity', weapon.Rarity);
	frameNode.setAttribute('data-restrict', weapon.Restrict);
	frameNode.setAttribute('style', 'display: block');
	
	// 縮圖外框
	let imageFrameNode = document.createElement('div');
	imageFrameNode.classList.add('img');
	
	// 縮圖
	let img = document.createElement('img');
	img.src = weapon.ImageURL;
	img.addEventListener("error", function () {weapon.ImageURL = './images/icon/cannotuse.png'; this.src = './images/icon/cannotuse.png';});
	
	const rarity = {
		1: "106, 107, 107",
		2: "48, 118, 91",
		3: "46, 117, 154",
		4: "149, 79, 80",
		5: "203, 143, 15",
		6: "246, 0, 255"
	};
	if (weapon.Rarity > 0 & weapon.Rarity < 7) {
		const colors = rarity[weapon.Rarity].split(',').map(num => num.trim());
		img.style.filter = `drop-shadow(0px 0px 10px rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.5))`;
	}
	
	imageFrameNode.appendChild(img);
	
	// 內容外框
	let contentFrameNode = document.createElement('div');
	contentFrameNode.classList.add('content');
	if (weapon.InGameID == 0) {
		contentFrameNode.style.cursor = 'auto'
	} else {
		contentFrameNode.style.cursor = 'pointer'
		contentFrameNode.addEventListener("click", function () {
			let InGameID = weapon.InGameID;
			let Type = self.typeTo[language][weapon.Type];
			let Name = get_csotxt(`CSO_Item_Name_${weapon.SystemName}`);
			
			// 複製 InGameID 給 CSO LUA 使用
			if (InGameID > 0) {
				const Text = `${InGameID}, -- ${Type} : ${Name}` + "\n";
				message_prompt(lang_switch[language].copylua, Text);
				copytext(Text);
			}
		});
	}
	// 武器名稱
	let WeaponName = `<p>${get_csotxt(`CSO_Item_Name_${weapon.SystemName}`)}</p>`
	// 武器ID
	let ID = `<span>ID: </span>${weapon.ID}`
	let InGameID = `<span>GID: </span>${weapon.InGameID}`
	if(weapon.ID == 0){
		ID = `<span>ID: ${this.noneWeapon[language]}</span>`
	}
	if(weapon.InGameID == 0){
		InGameID = `<span>GID: ${this.noneWeapon[language]}</span>`
	}
	let weaponContent = WeaponName + ID + " / " + InGameID;
	contentFrameNode.innerHTML = weaponContent;
	
	// 選取外框
	let selectFrameNode = document.createElement('div');
	selectFrameNode.classList.add('btn-select');
	if (weapon.Unknown == 0) {
		selectFrameNode.innerHTML = "<span>" + this.selectWeapon[language] + "</span>";
		selectFrameNode.style.cursor = 'pointer';
		
		selectFrameNode.addEventListener("click", async function () {
			if (weapon.Unknown == 0) {
				const detail = document.querySelector('.detail');
				if (detail) {
					detail.style.display = 'flex';

					const html_weaponname = document.querySelector(".weapon-name");
					html_weaponname.textContent = get_csotxt(`CSO_Item_Name_${weapon.SystemName}`);

					const html_mainimage = document.querySelector(".main-image img");
					const html_weaponani = document.querySelector(".weaponani");
					const tipImage = document.querySelector(".tipimage");

					// 加載圖片和影片的 Promise
					const imageLoadPromises = [
						loadSrc(weapon.ImageURL, html_mainimage),
						loadSrc(weapon.examplevideo, html_weaponani),
						loadSrc(weapon.descimage, tipImage)
					];

					try {
						// 等待所有圖片和影片加載完成
						await Promise.all(imageLoadPromises);

						// 顯示其他細節資訊
						html_mainimage.src = weapon.ImageURL;
						html_weaponani.src = weapon.examplevideo;
						tipImage.src = weapon.descimage;

						// rank
						const rankmode = ["", "zombie", "scen"];
						const ranklevel = ["D", "C", "B", "A", "S", "SS", "SSS"];
						const grademode = weapon.Detail.ItemGradeForMode.split(",");
						for (let i = 0; i < 3; i++) {
							document.querySelector(`.rankmode` + (i > 0 ? `[data-mode="${rankmode[i]}"]`: "")).innerHTML = `
								<span class="ranklevel">
									${ranklevel[grademode[i]] || "-"}
								</span>
								${get_csotxt(gettext.rankmode[i])}
							`
							
							// document.querySelector(`.ranklevel` + (i > 0 ? `[data-mode="${rankmode[i]}"]`: "")).textContent = ranklevel[grademode[i]] || "-";
						}

						// detail title
						const detailinfotitle = [];
						for (let key in gettext.detail) {
							detailinfotitle.push(get_csotxt(gettext.detail[key]));
						}
						document.querySelector(".title").innerHTML = detailinfotitle.join("<br>");

						// detail value
						const values = document.querySelector(".value").innerHTML.split("</br>");
						const formatValue = (val, isPercent = false) => {
							let strVal = String(val);
							if (strVal.includes(",")) {
								let [a, b] = strVal.split(",");
								return isPercent ? `${a} % / ${b} %` : `${a} / ${b}`;
							}
							if (strVal == "") {
								return "-"
							}
							return isPercent ? `${strVal} %` : strVal;
						};
						const newValues = [
							formatValue(weapon.Detail.Damage),              // 傷害
							formatValue(weapon.Detail.ZombieDamage),        // 殭屍傷害
							formatValue(weapon.Detail.ScenDamage),          // 災厄傷害
							formatValue(weapon.Detail.HitRate, true),       // 命中 (%)
							formatValue(weapon.Detail.Reaction, true),      // 後座力 (%)
							formatValue(weapon.Detail.FiringSpeed, true),   // 連發 (%)
							formatValue(weapon.Detail.Weight, true),        // 重量 (%)
							formatValue(weapon.Detail.Knockback, true),     // 殭屍擊退 (%)
							formatValue(weapon.Detail.Delay, true),         // 殭屍僵直 (%)
						];
						document.querySelector(".value").innerHTML = newValues.join("</br>");

						// 顯示其他細節
						document.querySelector(".desc .text").innerHTML = get_csotxt(`CSO_Item_Desc_${weapon.SystemName}`).replace(/\n/g, "<br>");
						document.querySelector(".desc2 .text").innerHTML = get_csotxt(`CSO_Item_Buff_${weapon.SystemName}`).replace(/\n/g, "<br>") + "<br><br>" + get_csotxt(`CSO_Item_Desc2_${weapon.SystemName}`).replace(/\n/g, "<br>");

						// 稀有度
						document.querySelector('.detail .weapon-name').style.color = `rgba(${rarity[weapon.Rarity]})`;
						document.querySelector('.detail .main-image').style.border = `2px solid rgba(${rarity[weapon.Rarity]}, 1)`;
						document.querySelector('.detail .main-image').style.backgroundColor = `rgba(${rarity[weapon.Rarity]}, 0.25)`;

						const detailElement = document.querySelector('.detail');
						detailElement.style.setProperty('--rarity-gradient', `radial-gradient(circle at top left, rgba(${rarity[weapon.Rarity]}, 0.3), rgba(${rarity[weapon.Rarity]}, 0) 70%)`);
						
					} catch (error) {
						// 加載錯誤處理
						console.error("資源加載錯誤", error);
						document.querySelector(".main-image img").src = './images/icon/cannotuse.png';
						document.querySelector(".weaponani").src = '';
						document.querySelector(".tipimage").src = './images/icon/cannotuse.png';
					}
				}
			}
		});
	} else {
		selectFrameNode.innerHTML = "<span>　</span>";
		selectFrameNode.style.cursor = 'auto';
	}

	// 加載圖片的 Promise 函數
	function loadSrc(src, element) {
		if (src == "") {
			return
		}
		return new Promise((resolve, reject) => {
			let mediaElement;

			// 根據 src 判斷是圖片還是視頻
			if (src.endsWith('.webm')) {
				// 如果是視頻，創建 video 元素
				mediaElement = document.createElement('video');
				mediaElement.preload = 'auto'; // 自動預加載
				mediaElement.oncanplaythrough = () => {
					element.src = src;
					resolve();
				};
				mediaElement.src = src;
				mediaElement.load();
			} else {
				// 否則處理圖片
				mediaElement = new Image();
				mediaElement.onload = () => {
					element.src = src;
					resolve();
				};
				mediaElement.onerror = () => reject(new Error(`Failed to load image: ${src}`));
				mediaElement.src = src;
			}
		});
	}
	
	// LUA
	let luaBuymenu = document.createElement('img');
	luaBuymenu.classList.add('luascript');
	luaBuymenu.src = "./images/icon/luascript.png"; // 正確設定圖片路徑
	luaBuymenu.addEventListener("click", function () {
		event.stopPropagation();
		const exists = luaBuymenuList.some(item => item.InGameID === weapon.InGameID);
		if (exists) {
			message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.exist)
		} else {
			const list = document.getElementById("list");
			const newItem = document.createElement("li");
			newItem.innerHTML = `
				( ${String(weapon.InGameID).padStart(4, '0')} ) ${get_csotxt(`CSO_Item_Name_${weapon.SystemName}`)}
				<button data-weapon="${weapon}" onclick="lua_rem(this)">－</button>
			`;
			list.appendChild(newItem);

			message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.addone);
			luaBuymenuList.push(weapon);
		}
	});
	
	if (weapon.InGameID != 0) {
		selectFrameNode.appendChild(luaBuymenu);
	};
	
	frameNode.appendChild(imageFrameNode);
	frameNode.appendChild(contentFrameNode);
	frameNode.appendChild(selectFrameNode);
	
	return frameNode;
}

// Lua 新增此頁所有
function lua_addall(button) {
	for (let i = 0; i < wpnthis.filteredWeapons.length; i++) {
		const weapon = wpnthis.filteredWeapons[i]
		if (weapon.InGameID > 0) {
			const exists = luaBuymenuList.some(item => item.InGameID === weapon.InGameID);
			if (exists) {
				
			} else {
				const list = document.getElementById("list");
				const newItem = document.createElement("li");
				newItem.innerHTML = `
					( ${String(weapon.InGameID).padStart(4, '0')} ) ${get_csotxt(`CSO_Item_Name_${weapon.SystemName}`)}
					<button data-weapon="${weapon}" onclick="lua_rem(this)">－</button>
				`;
				list.appendChild(newItem);

				message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.addall);
				luaBuymenuList.push(weapon);
			}
		}
	}
}

// Lua 刪除全部
function lua_delall(button) {
	luaBuymenuList = [];
	
	const list = document.getElementById("list");
	const listItems = list.getElementsByTagName("li");
	
	for (let i = listItems.length - 1; i >= 0; i--) {
		const item = listItems[i];
		
		if (!item.classList.contains("list-header")) {
			list.removeChild(item);
		}
	}
	
	message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.remall);
}

// Lua 複製 common.lua
function lua_copy(button) {
    let code = "\n-- command.lua\n-- DESTROLL WEAPONLIST ( https://cso-tw-goldfish.github.io/CSO-Weapon/ )\n\nBuymenuWeaponList = {";
    for (let i = 0; i < luaBuymenuList.length; i++) {
        code = code + "\n\t" + String(luaBuymenuList[i].InGameID).padStart(4, ' ') + ", -- " + luaBuymenuList[i][`${language}_Name`];
    }
    code = code + "\n}\n\nCommon.SetBuymenuWeaponList(BuymenuWeaponList)\n";
    copytext(code);
	
	message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.copy);
};

// Lua 刪除指定項目
function lua_rem(button) {
    const item = button.parentElement;
    list.removeChild(item);
	
	const weapon = button.getAttribute("data-weapon");
    const index = luaBuymenuList.findIndex(weapon => {
        return weapon.InGameID;
    });
    if (index !== -1) {
		message_prompt(`．${lang_switch[language].lualist.title}．`, lang_switch[language].lualist.remone);
        luaBuymenuList.splice(index, 1); // 刪除該武器物件
    }
}

// 關閉詳細資訊
function details_off(button) {
	const detail = document.querySelector('.detail');
    if (detail) {
        detail.style.display = 'none';
		document.querySelector(".weaponani").src = "";
    }
}

function refresh_render(self) {
	// 重新渲染縮圖
	self.renderThumbnails();
	self.registerSearchWeaponEvents();
	self.filterCategories();
}

function refresh_filtered(self) {
	// 儲存目前武器清單
	let currentWeapons = self.currentWeapons;
	if(isEmptyOrSpaces(self.searchContent)) {
		Array.prototype.forEach.call(currentWeapons, function(item) {
			item.item.setAttribute('style', 'display: block');
		})
	}
	
	// 過濾後的武器清單
	let filteredWeapons = self.searchWeapon(self.searchContent, currentWeapons);
	self.renderThumbnailsFilteredWeapons(currentWeapons, filteredWeapons);
	self.filteredWeapons = filteredWeapons.map(entry => entry.data);
}

// 2.0 註冊篩選事件監聽
Weapons.prototype.registerCategoriesEvents = function () {
	let self = this;

	// 武器稀有度
	let rarityBtns = document.querySelectorAll('.js-weapon-category[data-rarity]');
	Array.prototype.forEach.call(rarityBtns, function(btn) {
		btn.addEventListener('click', function(event) {
			if (event.currentTarget.getAttribute('data-rarity') !== "GRADE") {
				// 更新 currentRarity 資料
				self.currentRarity = event.currentTarget.getAttribute('data-rarity');
				// 更新按鈕
				Array.prototype.forEach.call(rarityBtns, function(btn) { btn.classList.remove('active'); });
				event.currentTarget.classList.add('active');
				// 過濾內容重整
				refresh_render(self);
				refresh_filtered(self);
				
				message_prompt(lang_switch[language].rarityswitch + self.rarityTo[language][event.currentTarget.getAttribute('data-rarity')], "")
			}
		});
	});
	// 武器類型
	let typeBtns = document.querySelectorAll('.js-weapon-category[data-type]');
	Array.prototype.forEach.call(typeBtns, function(btn) {
		btn.addEventListener('click', function(event) {
			if (event.currentTarget.getAttribute('data-type') !== "GRADE") {
				// 更新 currentType 資料
				self.currentType = event.currentTarget.getAttribute('data-type');
				// 更新按鈕
				Array.prototype.forEach.call(typeBtns, function(btn) { btn.classList.remove('active'); });
				event.currentTarget.classList.add('active');
				// 過濾內容重整
				refresh_render(self);
				refresh_filtered(self);
				
				message_prompt(lang_switch[language].typeswitch + self.typeTo[language][event.currentTarget.getAttribute('data-type')], "")
			}
		});
	});
	// 武器限制
	let restrictBtns = document.querySelectorAll('.js-weapon-category[data-restrict]');
	Array.prototype.forEach.call(restrictBtns, function(btn) {
		btn.addEventListener('click', function(event) {
			if (event.currentTarget.getAttribute('data-restrict') !== "GRADE") {
				// 更新 currentRestrict 資料
				self.currentRestrict = event.currentTarget.getAttribute('data-restrict');
				// 更新按鈕
				Array.prototype.forEach.call(restrictBtns, function(btn) { btn.classList.remove('active'); });
				event.currentTarget.classList.add('active');
				// 過濾內容重整
				refresh_render(self);
				refresh_filtered(self);
				
				message_prompt(lang_switch[language].restrictswitch + self.restrictTo[language][event.currentTarget.getAttribute('data-restrict')], "")
			}
		});
	});
}

// 2.1 篩選武器
Weapons.prototype.filterCategories = function () {
	let self = this;
	let count = 0;

	self.currentWeapons = [];
	
	Array.prototype.forEach.call(self.thumbnailWrapperNode.childNodes, function (node) {
		let weapon = JSON.parse(node.getAttribute('data-weapon'));
		
		if(node.getAttribute('class') === 'card') {
			count = count + 1;
			if(self.matchFilter(weapon)) {
				self.currentWeapons.push({
					"item" : node,
					"data" : weapon
				})
			} else {
				node.setAttribute('style', 'display: none');
			}
		}
		
		if (count == 0) {
			message_prompt("Not Found.", "")
		}
	})
}

// 2.2 檢查目前篩選
Weapons.prototype.matchFilter = function(weapon) {
	let matchRarity = false;
	let matchType = false;
	let matchRestrict = false;
	let matchRestrict_content;
	
	// 武器稀有度篩選
	if(
		   this.currentRarity === 'ALL' 
		|| this.currentRarity === 'GRADE0'
		|| this.rarityTo[language][this.currentRarity] === this.rarityTo[language]["GRADE" + weapon.Rarity]
	) {
		matchRarity = true;
	}
	
	// 武器類型篩選
	if(
			this.currentType === 'ALL'
		||  this.typeTo[language][this.currentType] === this.typeTo[language][weapon.Type]
		|| (this.typeTo[language][this.currentType] === this.typeTo[language]["NONE"] && weapon.Unknown === "1")
	) {
		matchType = true;
	}
	
	// 武器限制篩選
	if (this.currentRestrict === 'NONE') {
		matchRestrict = true;
	} else {
		for (var i = 0; i < weapon.Restrict.split(",").length; i++) {
			if (this.currentRestrict === weapon.Restrict.split(",")[i]) {
				matchRestrict = true;
			}
		}
	}
	
	return (matchRarity && matchType && matchRestrict);
}

// 3.0 註冊搜尋武器事件監聽
Weapons.prototype.registerSearchWeaponEvents = function () {
	let self = this;
	
	let searchBtn = document.querySelector('.btn-search');
	
	let enterPressed = false;

	document.querySelector(".search-container").addEventListener("keydown", function(event) {
		if (event.key === "Enter" && !enterPressed) {
			event.preventDefault();
			enterPressed = true;
			searchBtn.click();
		}
	});

	document.querySelector(".search-container").addEventListener("keyup", function(event) {
		if (event.key === "Enter") {
			enterPressed = false; // 釋放 Enter 鍵後重置狀態
		}
	});
	
	searchBtn.addEventListener('click', function() {
		// 搜尋的內容
		let content = document.querySelector('.search-container input').value;
		if (content != "") {
			message_prompt("「" + content + "」的搜尋結果", "")
		}
		self.searchContent = content;
		
		refresh_filtered(self);
	})
}

// 3.0.1 檢查是否為空值
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

// 3.1 搜尋武器
Weapons.prototype.searchWeapon = function (search, data) {
	let filteredWeapons = [];

	Array.prototype.forEach.call(data, function (item) {
		let value = search.toLowerCase();
		let data = item.data;
		
		if(data.SystemName.includes(value)) {
			filteredWeapons.push(item);
		} else if(get_csotxt(`CSO_Item_Name_${data.SystemName}`).includes(value)) {
			filteredWeapons.push(item);
		} else if(data.ID == value) {
			filteredWeapons.push(item);
		} else if(data.InGameID == value) {
			filteredWeapons.push(item);
		}
	})
	
	return filteredWeapons;
}

// 3.2 搜尋武器
Weapons.prototype.renderThumbnailsFilteredWeapons = function (current, filtered) {
	// 讓目前的武器全部隱藏
	Array.prototype.forEach.call(current, function (item) {
		item.item.setAttribute('style', 'display: none');
	})
	// 讓篩選過後的武器顯示
	Array.prototype.forEach.call(filtered, function (item) {
		item.item.setAttribute('style', 'display: block');
	})
}

// 按鈕事件
Weapons.prototype.clickButton = function () {
    let self = this;
	
	const sort = document.querySelector('.sort')
    sort.addEventListener("click", function (e) {
		// 重新渲染縮圖
		refresh_render(self);
    });
	
	const lang = document.querySelector('.lang')
    lang.addEventListener("click", function (e) {
		// 重新渲染縮圖
		refresh_render(self);
    });
}

// 點擊左上LOGO重新整理網頁
const logo_btn = document.querySelector('.App .Navigation .logo');
logo_btn.addEventListener('click', function(e){
	location.reload();
});

// 關於
const about = document.querySelector('.about-bg');
const about_btn = document.querySelector('.nav__links .info');
about.addEventListener('click', function(e) {
	if(e.target.classList.value === about.className) {
		this.style.display = 'none';
	}
});
about_btn.addEventListener('click', function() {about.style.display = 'block';})

// 主題按鈕
const theme_btn = document.querySelector('.nav__links .theme');
theme_btn.addEventListener('click', function(e){
	const theme = document.documentElement.getAttribute('data-theme')
	
	if (theme !== 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
		document.querySelector(".theme").src = "./images/icon/darkTOlight.png";
		message_prompt(lang_switch[language].theme[2], "")
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		document.querySelector(".theme").src = "./images/icon/lightTOdark.png";
		message_prompt(lang_switch[language].theme[1], "")
	}
});

// 排序按鈕
const sort_btn = document.querySelector('.nav__links .sort');
sort_btn.addEventListener('click', function(e){
	if (event.target.classList.contains('sort')) {
		sortway = sortway % 4 + 1
		
		message_prompt(lang_switch[language].sort[sortway], "")
		
		this.weaponList = Array.prototype.sort.call(WeaponData, function (a, b) {
			if (sortway === 1) {
				document.querySelector(".sort").src = "./images/icon/sort_id.png";
				return a.InGameID - b.InGameID;
			};
			if (sortway === 2) {
				document.querySelector(".sort").src = "./images/icon/sort_type.png";
				return a.ID - b.ID;
			};
			if (sortway === 3) {
				document.querySelector(".sort").src = "./images/icon/sort_rarity.png";
				const order = ['NONE', 'PISTOL', 'SHOTGUN', 'SUBMACHINEGUN', 'RIFLE', 'SNIPERRIFLE', 'MACHINEGUN', 'EQUIPMENT', 'KNIFE', 'GRENADE', 'STUDIO'];
				const typeIndexDiff = order.indexOf(a.Type) - order.indexOf(b.Type);
				if (typeIndexDiff === 0) {
					return a.InGameID - b.InGameID;
				}
				return order.indexOf(a.Type) - order.indexOf(b.Type);
			};
			if (sortway === 4) {
				document.querySelector(".sort").src = "./images/icon/sort_gid.png";
				const rarityIndexDiff = a.Rarity - b.Rarity;
				if (rarityIndexDiff === 0) {
					const order2 = ['NONE', 'EQUIPMENT', 'RIFLE', 'SNIPERRIFLE', 'SHOTGUN', 'MACHINEGUN', 'SUBMACHINEGUN', 'PISTOL', 'KNIFE', 'GRENADE']
					const typeIndexDiff = order2.indexOf(a.Type) - order2.indexOf(b.Type);
					if (typeIndexDiff === 0) {
						return b.ID - a.ID;
					}
					return order2.indexOf(a.Type) - order2.indexOf(b.Type);
				}
				return b.Rarity - a.Rarity;
			};
		});
	}
});

// 切換語言按鈕
const lang_btn = document.querySelector('.nav__links .lang');
lang_btn.addEventListener('click', function(e){
	if (event.target.classList.contains('lang')) {
		
		// 臺灣
		if(language === "tw"){
			language = "na_en";
			document.querySelector(".lang").src = "./images/icon/lang_chn.png";
			
		// 英文
		} else if(language === "na_en"){
			language = "chn";
			document.querySelector(".lang").src = "./images/icon/lang_koreana.png";
		
		// 中國
		} else if(language === "chn"){
			language = "koreana";
			document.querySelector(".lang").src = "./images/icon/lang_tw.png";
			
		// 韓文
		} else if(language === "koreana"){
			language = "tw";
			document.querySelector(".lang").src = "./images/icon/lang_na_en.png";
		}
		
		message_prompt(lang_switch[language].langswitch, "")
		
		document.title                                           = lang_switch[language].webtitle;
		document.querySelector('.nav__links .lang') .textContent = lang_switch[language].langbtn;
		document.querySelector('.about h3')         .textContent = lang_switch[language].aboutbtn;
		document.querySelector('.about .a')         .textContent = lang_switch[language].webmaker;
		document.querySelector('.about .b')         .textContent = lang_switch[language].imgsprovider;
		document.querySelector('.about .c')         .textContent = lang_switch[language].idsprovider;
		document.querySelector('.btn-search button').textContent = lang_switch[language].searchbtn;
		document.querySelector('.nav__links .theme').textContent = lang_switch[language].theme[theme];
		document.querySelector('.nav__links .sort') .textContent = lang_switch[language].sort[sortway];
		
		document.querySelector('.list-header span').textContent = lang_switch[language].lualist.title
		document.querySelector('.addallbtn')       .textContent = lang_switch[language].lualist.addallbtn
		document.querySelector('.remallbtn')       .textContent = lang_switch[language].lualist.remallbtn
		document.querySelector('.copybtn')         .textContent = lang_switch[language].lualist.copybtn
		document.querySelector('.turnoff')         .textContent = lang_switch[language].detailoff
		document.querySelector('.lastupdate')      .textContent = lang_switch[language].lastupdate + updatedate
		document.querySelector('.searchinput')     .placeholder = lang_switch[language].search;
		
		var elements = document.querySelectorAll('.js-weapon-category');
		var dataTypes = [];
		
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var type = element.getAttribute('data-type');
			var rarity = element.getAttribute('data-rarity');
			var restrict = element.getAttribute('data-restrict');
			var spanElement = element.querySelector('span');
			if(type){
				spanElement.textContent = wpnthis.typeTo[language][type];
			}
			if(rarity){
				spanElement.textContent = wpnthis.rarityTo[language][rarity];
			}
			if(restrict){
				spanElement.textContent = wpnthis.restrictTo[language][restrict];
			}
		}
	}
})

document.addEventListener('DOMContentLoaded', function () {
    var CSOWeapons = new Weapons();
    CSOWeapons.init();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        details_off()
		
		const about = document.querySelector('.about-bg');
        if (about && window.getComputedStyle(about).display === 'block') {
            about.style.display = 'none';
        }
    }
});