var wpnthis;
var theme = 1;
var sortway = 1;
var language = "Chinese";
let timer;

var lang_switch = {
	  "Chinese": {
		  "webtitle"      : "Counter-Strike Online 武器清單"
		, "aboutbtn"      : "關於"
		, "langbtn"       : "中文 > English"
		, "webmaker"      : "網頁製作：崩潰金魚燒"
		, "imgsprovider"  : "圖片提供：WrenchReginald、DestroyerI滅世I"
		, "idsprovider"   : "ＩＤ提供：WrenchReginald、DestroyerI滅世I"
		, "searchbtn"     : "搜尋"
		, "theme"         : {
			  1: "主題：正常"
			, 2: "主題：黑暗"
		}
		, "sort"          : {
			  1: "排序：InGameID"
			, 2: "排序：ID"
			, 3: "排序：類型"
		}
		, "copylua"       : "已複製！"
		, "langswitch"    : "語言：中文"
		, "rarityswitch"  : "稀有度："
		, "typeswitch"    : "類型："
	}
	, "English": {
		  "webtitle"      : "Counter-Strike Online Weapon List"
		, "aboutbtn"      : "About"
		, "langbtn"       : "English > 中文"
		, "webmaker"      : "Website Maker: Gold Fish"
		, "imgsprovider"  : "Image Provider: Skuller Rey、Destroyer"
		, "idsprovider"   : "Ids Provider: Skuller Rey、Destroyer"
		, "searchbtn"     : "Search"
		, "theme"         : {
			  1: "Theme: Normal"
			, 2: "Theme: Dark"
		}
		, "sort"          : {
			  1: "Sort: InGameID"
			, 2: "Sort: ID"
			, 3: "Sort: Type"
		}
		, "copylua"       : "Copied!"
		, "langswitch"    : "Language: English"
		, "rarityswitch"  : "Rarity: "
		, "typeswitch"    : "Type: "
	}
}

// 提示訊息
function message_prompt(stl, msg) {
    const notification = document.getElementById("notification");
    clearTimeout(timer); // Clear any previous timers

    navigator.clipboard.writeText(msg).then(() => {
        notification.style.display = "block";
        notification.innerHTML = stl + "<div>" + msg + "</div>";

        timer = setTimeout(() => {
            notification.style.display = "none";
        }, 2000); // Hide after 2 seconds
    }).catch((error) => {
        console.error("Error copying text: ", error);
    });
}

function Weapons() {
	// Data
	wpnthis = this;
	this.currentType = "ALL";
	this.currentRarity = "ALL";
	this.weaponList = [];
	this.currentWeapons = [];
	this.noneWeapon = {
		  "Chinese": "無"
		, "English": "None"
	}
	this.selectWeapon = {
		  "Chinese": "選取"
		, "English": "Select"
	}
	this.typeTo = {
		"Chinese": {
			  "GRADE"        : "類型"
			, "ALL"          : "全部"
			, "NONE"         : "未知"
			, "PISTOL"       : "輔助型"
			, "SHOTGUN"      : "散彈槍"
			, "SUBMACHINEGUN": "衝鋒槍"
			, "RIFLE"        : "步槍"
			, "SNIPERRIFLE"  : "狙擊槍"
			, "MACHINEGUN"   : "機關槍"
			, "EQUIPMENT"    : "裝備型"
			, "GRENADE"      : "手榴彈"
			, "KNIFE"        : "近戰型"
			, "STUDIO"       : "創世者"
		}
		, "English": {
			  "GRADE"        : "Type"
			, "ALL"          : "All"
			, "NONE"         : "Unknown"
			, "PISTOL"       : "Pistol"
			, "SHOTGUN"      : "Shutgun"
			, "SUBMACHINEGUN": "Sub-Machine-Gun"
			, "RIFLE"        : "Rifle"
			, "SNIPERRIFLE"  : "Sniper Rifle"
			, "MACHINEGUN"   : "Machine Gun"
			, "EQUIPMENT"    : "Equipment"
			, "GRENADE"      : "Grenade"
			, "KNIFE"        : "Melee"
			, "STUDIO"       : "Studio"
		}
	}
	this.rarityTo = {
		"Chinese": {
			  "GRADE" : "稀有度"
			, "GRADE0": "全部"
			, "GRADE1": "一般"
			, "GRADE2": "高級"
			, "GRADE3": "稀有"
			, "GRADE4": "特殊"
			, "GRADE5": "王牌"
			, "GRADE6": "史詩"
		}
		, "English": {
			  "GRADE" : "Rarity"
			, "GRADE0": "All"
			, "GRADE1": "Regular"
			, "GRADE2": "Advanced"
			, "GRADE3": "Rare"
			, "GRADE4": "Unique"
			, "GRADE5": "Transcendence"
			, "GRADE6": "Epic"
		}
	}
	this.emptyMsg = {
		  "Chinese": "查無此武器"
		, "English": "Unknown Weapon"
	};
	
	var elements = document.querySelectorAll('.js-weapon-category');
	var dataTypes = [];

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		var type = element.getAttribute('data-type');
		var rarity = element.getAttribute('data-rarity');
		var spanElement = element.querySelector('span');
		if(type){
			spanElement.textContent = this.typeTo[language][type];
		}
		if(rarity){
			spanElement.textContent = this.rarityTo[language][rarity];
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
	frameNode.setAttribute('style', 'display: block');
	
	// 縮圖外框
	let imageFrameNode = document.createElement('div');
	imageFrameNode.classList.add('img');
	
	// 縮圖
	let img = document.createElement('img');
	img.src = weapon.ImageURL;
	img.addEventListener("error", function () {this.src = './images/icon/cannotuse.png';});
	
	imageFrameNode.appendChild(img);
	
	// 內容外框
	let contentFrameNode = document.createElement('div');
	contentFrameNode.classList.add('content');
	contentFrameNode.addEventListener("click", function () {
		let InGameID = weapon.InGameID;
		let Type = self.typeTo[language][weapon.Type];
		let Name = weapon[language + "Name"];
		
		// 複製 InGameID 給 CSO LUA 使用
		const Text = `${InGameID}, -- ${Type} : ${Name}` + "\n";
		message_prompt(lang_switch[language].copylua, Text);
		document.querySelector(".notification").style.width = "500px";
		document.querySelector(".notification").style.height = "80px";
	});
	// 武器名稱
	let WeaponName = `<p>${weapon[language + "Name"]}</p>`
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
	selectFrameNode.innerHTML = "<span>" + this.selectWeapon[language] + "</span>";
	
	frameNode.appendChild(imageFrameNode);
	frameNode.appendChild(contentFrameNode);
	frameNode.appendChild(selectFrameNode);
	
	return frameNode;
}

// 2.0 註冊篩選事件監聽
Weapons.prototype.registerCategoriesEvents = function () {
	let self = this;

	// 稀有度
	let rarityBtns = document.querySelectorAll('.js-weapon-category[data-rarity]');
	Array.prototype.forEach.call(rarityBtns, function(btn) {
		btn.addEventListener('click', function(event) {
			if (event.currentTarget.getAttribute('data-rarity') !== "GRADE") {
				// 更新 currentRarity 資料
				self.currentRarity = event.currentTarget.getAttribute('data-rarity');
				// 更新按鈕
				Array.prototype.forEach.call(rarityBtns, function(btn) { btn.classList.remove('active'); });
				event.currentTarget.classList.add('active');
				// 執行篩選
				self.filterCategories();
				
				message_prompt(lang_switch[language].rarityswitch + self.rarityTo[language][event.currentTarget.getAttribute('data-rarity')], "")
				document.querySelector(".notification").style.width = "250px";
				document.querySelector(".notification").style.height = "40px";
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
				// 篩選武器
				self.filterCategories();
				
				message_prompt(lang_switch[language].typeswitch + self.typeTo[language][event.currentTarget.getAttribute('data-type')], "")
				document.querySelector(".notification").style.width = "250px";
				document.querySelector(".notification").style.height = "40px";
			}
		});
	});
}

// 2.1 篩選武器
Weapons.prototype.filterCategories = function () {
	let self = this;

	self.currentWeapons = [];
	
	Array.prototype.forEach.call(self.thumbnailWrapperNode.childNodes, function (node) {
		let weapon = JSON.parse(node.getAttribute('data-weapon'));
		
		if(node.getAttribute('class') === 'card') {
			if(self.matchFilter(weapon)) {
				self.currentWeapons.push({
					"item"       : node,
					"systemname" : weapon.SystemName,
					"chinesename": weapon.ChineseName,
					"englishname": weapon.EnglishName,
					"id"         : weapon.ID,
					"ingameid"   : weapon.InGameID,
					"unknown"    : weapon.Unknown,
					"imagesrc"   : weapon.ImageURL
				})
				node.setAttribute('style', 'display: block');
			} else {
				node.setAttribute('style', 'display: none');
			}
		}
	})
	theme_reload();
}

// 2.2 檢查目前篩選
Weapons.prototype.matchFilter = function(weapon) {
	let matchRarity = false;
	let matchType = false;
	if(
		   this.currentRarity === 'ALL' 
		|| this.currentRarity === 'GRADE0'
		|| this.rarityTo[language][this.currentRarity] === this.rarityTo[language]["GRADE" + weapon.Rarity]
	) {
		matchRarity = true;
	}
	if(
			this.currentType === 'ALL'
		||  this.typeTo[language][this.currentType] === this.typeTo[language][weapon.Type]
		|| (this.typeTo[language][this.currentType] === this.typeTo[language]["NONE"] && weapon.Unknown === "1")
	) {
		matchType = true;
	}
	
	return (matchRarity && matchType);
}

// 3.0 註冊搜尋武器事件監聽
Weapons.prototype.registerSearchWeaponEvents = function () {
	let self = this;

	let searchBtn = document.querySelector('.btn-search');
	searchBtn.addEventListener('click', function() {
		// 搜尋的內容
		let content = document.querySelector('.search-container input').value;
		// 儲存目前武器清單
		let currentWeapons = self.currentWeapons;
		if(isEmptyOrSpaces(content)) {
			Array.prototype.forEach.call(currentWeapons, function(item) {
				item.item.setAttribute('style', 'display: block');
			})
			return false;
		} else {
			// 過濾後的武器清單
			let filteredWeapons = self.searchWeapon(content, currentWeapons);
			self.renderThumbnailsFilteredWeapons(currentWeapons, filteredWeapons);
		}
		theme_reload();
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
		let systemname = item.systemname.toLowerCase();
		let chinesename = item.chinesename.toLowerCase();
		let englishname = item.englishname.toLowerCase();
		let id = item.id;
		let ingameid = item.ingameid;
		
		if(systemname.includes(value)) {
			filteredWeapons.push(item);
		} else if(chinesename.includes(value)) {
			filteredWeapons.push(item);
		} else if(englishname.includes(value)) {
			filteredWeapons.push(item);
		} else if(id.includes(value)) {
			filteredWeapons.push(item);
		} else if(ingameid.includes(value)) {
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
	
	const theme = document.querySelector('.theme')
    theme.addEventListener("click", function (e) {
		
    })
	
	const sort = document.querySelector('.sort')
    sort.addEventListener("click", function (e) {
		// 重新渲染縮圖
		self.renderThumbnails();
		self.registerSearchWeaponEvents();
		self.filterCategories();
		theme_reload();
    });
	
	const lang = document.querySelector('.lang')
    lang.addEventListener("click", function (e) {
		// 重新渲染縮圖
		self.renderThumbnails();
		self.registerSearchWeaponEvents();
		self.filterCategories();
		theme_reload();
    });
}

// 點擊左上LOGO重新整理網頁
const logo_btn = document.querySelector('.App .Navigation .logo');
logo_btn.addEventListener('click', function(e){
	location.reload();
});

// 關於
const about = document.querySelector('.about-bg');
const about_btn = document.querySelector('.nav__links li a');
about.addEventListener('click', function(e) {
	if(e.target.classList.value === about.className) {
		this.style.display = 'none';
	}
});
about_btn.addEventListener('click', function() {about.style.display = 'block';})

// 重整主題
function theme_reload() {
	if (theme === 1) {
		document.querySelector(".watermark").style.color = "rgba(0, 0, 0, 0.3)";
		document.querySelector(".watermark").style.outline = "2px solid rgba(0, 0, 0, 0.3)";
		document.querySelector(".Cards-Content").style.backgroundColor = "#bbb";
		var cards = document.querySelectorAll(".card");
		cards.forEach(function(card) {
			card.style.border = "2px solid #6B6B6B"
			card.style.backgroundColor = "#fff";
		});
		var images = document.querySelectorAll(".card .img");
		images.forEach(function(image) {
			image.style.backgroundColor = "#f3f3f3";
		});
		var paragraphs = document.querySelectorAll(".card .content p");
		paragraphs.forEach(function(paragraph) {
			paragraph.style.color = "#535C66";
		});
		var elements = document.querySelectorAll('.card .content');
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener('mousedown', function() {
				this.style.backgroundColor = '#eee';
			});
			elements[i].addEventListener('mouseup', function() {
				this.style.backgroundColor = '';
			});
		}
	} else if (theme === 2) {
		document.querySelector(".watermark").style.color = "rgba(255, 255, 255, 0.3)";
		document.querySelector(".watermark").style.outline = "2px solid rgba(255, 255, 255, 0.3)";
		document.querySelector(".Cards-Content").style.backgroundColor = "#1A1A1A";
		var cards = document.querySelectorAll(".card");
		cards.forEach(function(card) {
			card.style.border = "2px solid #7D7D7D"
			card.style.backgroundColor = "#0F0F0F";
		});
		var images = document.querySelectorAll(".card .img");
		images.forEach(function(image) {
			image.style.backgroundColor = "#424242";
		});
		var paragraphs = document.querySelectorAll(".card .content p");
		paragraphs.forEach(function(paragraph) {
			paragraph.style.color = "#ffffff";
		});
		var elements = document.querySelectorAll('.card .content');
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener('mousedown', function() {
				this.style.backgroundColor = '#212121';
			});
			elements[i].addEventListener('mouseup', function() {
				this.style.backgroundColor = '';
			});
		}
	}
}

// 主題按鈕
const theme_btn = document.querySelector('.nav__links .theme');
theme_btn.addEventListener('click', function(e){
	if (event.target.classList.contains('theme')) {
		if (theme === 1) {
			theme = 2;
		} else if (theme === 2) {
			theme = 1;
		};
		theme_reload();
		document.querySelector('.nav__links .theme').textContent = lang_switch[language].theme[theme];
		
		message_prompt(lang_switch[language].theme[theme], "")
		document.querySelector(".notification").style.width = "250px";
		document.querySelector(".notification").style.height = "40px";
	}
});

// 排序按鈕
const sort_btn = document.querySelector('.nav__links .sort');
sort_btn.addEventListener('click', function(e){
	if (event.target.classList.contains('sort')) {
		sortway = sortway % 3 + 1
		
		message_prompt(lang_switch[language].sort[sortway], "")
		document.querySelector(".notification").style.width = "250px";
		document.querySelector(".notification").style.height = "40px";
		
		document.querySelector('.nav__links .sort').textContent = lang_switch[language].sort[sortway];
		
		this.weaponList = Array.prototype.sort.call(WeaponData, function (a, b) {
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
	}
});

// 切換語言按鈕
const lang_btn = document.querySelector('.nav__links .lang');
lang_btn.addEventListener('click', function(e){
	if (event.target.classList.contains('lang')) {
		if(language === "Chinese"){
			language = "English";
			message_prompt("Language: " + language, "")
		} else if(language === "English"){
			language = "Chinese";
			message_prompt("語言：中文", "")
		}
		document.querySelector(".notification").style.width = "250px";
		document.querySelector(".notification").style.height = "40px";
		
		document.title                                           = lang_switch[language].webtitle;
		document.querySelector('.nav__links a')     .textContent = lang_switch[language].aboutbtn;
		document.querySelector('.nav__links .lang') .textContent = lang_switch[language].langbtn;
		document.querySelector('.about h3')         .textContent = lang_switch[language].aboutbtn;
		document.querySelector('.about .a')         .textContent = lang_switch[language].webmaker;
		document.querySelector('.about .b')         .textContent = lang_switch[language].imgsprovider;
		document.querySelector('.about .c')         .textContent = lang_switch[language].idsprovider;
		document.querySelector('.btn-search button').textContent = lang_switch[language].searchbtn;
		document.querySelector('.nav__links .theme').textContent = lang_switch[language].theme[theme];
		document.querySelector('.nav__links .sort') .textContent = lang_switch[language].sort[sortway];
		
		var elements = document.querySelectorAll('.js-weapon-category');
		var dataTypes = [];
		
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var type = element.getAttribute('data-type');
			var rarity = element.getAttribute('data-rarity');
			var spanElement = element.querySelector('span');
			if(type){
				spanElement.textContent = wpnthis.typeTo[language][type];
			}
			if(rarity){
				spanElement.textContent = wpnthis.rarityTo[language][rarity];
			}
		}
	}
})

document.addEventListener('DOMContentLoaded', function () {
    var CSOWeapons = new Weapons();
    CSOWeapons.init();
});