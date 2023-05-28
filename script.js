var wpnthis;
var language = "Chinese";

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
			  "ALL": "全部"
			, "NONE": "未知"
			, "PISTOL": "輔助型"
			, "SHOTGUN": "散彈槍"
			, "SUBMACHINEGUN": "衝鋒槍"
			, "RIFLE": "步槍"
			, "SNIPERRIFLE": "狙擊槍"
			, "MACHINEGUN": "機關槍"
			, "EQUIPMENT": "裝備型"
			, "GRENADE": "手榴彈"
			, "KNIFE": "近戰型"
			, "STUDIO": "創世者"
		}
		, "English": {
			  "ALL"          : "All"
			, "NONE"         : "Unknown"
			, "PISTOL"       : "Pistol"
			, "SHOTGUN"      : "Shutgun"
			, "SUBMACHINEGUN": "Submachine gun"
			, "RIFLE"        : "Rifle"
			, "SNIPERRIFLE"  : "Sniper rifle"
			, "MACHINEGUN"   : "Machine gun"
			, "EQUIPMENT"    : "Equipment"
			, "GRENADE"      : "Grenade"
			, "KNIFE"        : "Melee"
			, "STUDIO"       : "Studio"
		}
	}
	this.rarityTo = {
		"Chinese": {
			  "GRADE0": "全部"
			, "GRADE1": "一般"
			, "GRADE2": "高級"
			, "GRADE3": "稀有"
			, "GRADE4": "特殊"
			, "GRADE5": "王牌"
			, "GRADE6": "史詩"
		}
		, "English": {
			  "GRADE0": "All"
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
	self.weaponList = Array.prototype.sort.call(WeaponData, function (a, b) {return a.InGameID - b.InGameID;});
	
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
		let Text = `${InGameID}, -- ${Type} : ${Name}` + "\n";
		navigator.clipboard.writeText(Text);
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
			// 更新 currentRarity 資料
			self.currentRarity = event.currentTarget.getAttribute('data-rarity');
			// 更新按鈕
			Array.prototype.forEach.call(rarityBtns, function(btn) { btn.classList.remove('active'); });
			event.currentTarget.classList.add('active');
			// 執行篩選
			self.filterCategories();
		});
	});
	// 武器類型
	let typeBtns = document.querySelectorAll('.js-weapon-category[data-type]');
	Array.prototype.forEach.call(typeBtns, function(btn) {
		btn.addEventListener('click', function(event) {
			// 更新 currentType 資料
			self.currentType = event.currentTarget.getAttribute('data-type');
			// 更新按鈕
			Array.prototype.forEach.call(typeBtns, function(btn) { btn.classList.remove('active'); });
			event.currentTarget.classList.add('active');
			// 篩選武器
			self.filterCategories();
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
					"chinesename": weapon["ChineseName"],
					"englishname": weapon["EnglishName"],
					"id"         : weapon.ID,
					"ingameid"   : weapon.InGameID
				})
				node.setAttribute('style', 'display: block');
			} else {
				node.setAttribute('style', 'display: none');
			}
		}
	})
}

// 2.2 檢查目前篩選
Weapons.prototype.matchFilter = function(weapon) {
	let matchRarity = false;
	let matchType = false;
	if(this.currentRarity === 'ALL' || this.currentRarity === 'GRADE0' || this.rarityTo[language][this.currentRarity] === this.rarityTo[language]["GRADE" + weapon.Rarity]) {matchRarity = true;}
	if(this.currentType   === 'ALL' || this.currentType   === 'ALL'    || this.typeTo  [language][this.currentType]   === this.typeTo  [language][weapon.Type]            ) {matchType   = true;}
	
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
		let chinesename = item.chinesename.toLowerCase();
		let englishname = item.englishname.toLowerCase();
		let id = item.id;
		let ingameid = item.ingameid;
		
		if(chinesename.includes(value)) {
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

    const btn = document.querySelector('.btn')
    btn.addEventListener("click", function (e) {
		// 重新渲染縮圖
		self.renderThumbnails();
		self.registerSearchWeaponEvents();
		self.filterCategories();
    })
}

// 關於
const about = document.querySelector('.about-bg');
const about_btn = document.querySelector('.nav__links li a');

about.addEventListener('click', function(e) {
	if(e.target.classList.value === about.className) {
		this.style.display = 'none';
	}
})
about_btn.addEventListener('click', function() {about.style.display = 'block';})

// 切換語言按鈕
const lang_btn = document.querySelector('.nav__links .btn');

lang_btn.addEventListener('click', function(e){
	if(language === "Chinese"){
		language = "English";
		document.title = "Counter-Strike Online Weapon List";
		document.querySelector('.nav__links a').textContent = "About";
		document.querySelector('.nav__links .btn').textContent = "English > 中文";
		document.querySelector('.about h3').textContent = "About";
		document.querySelector('.about .a').textContent = "Website Author: 崩潰金魚燒";
		document.querySelector('.about .b').textContent = "Image Provider: WrenchReginald, DestroyerI滅世I";
		document.querySelector('.about .c').textContent = "WpnID Provider: WrenchReginald, DestroyerI滅世I";
		document.querySelector('.btn-search button').textContent = "Search";
	} else if(language === "English"){
		language = "Chinese";
		document.title = "Counter-Strike Online 武器清單";
		document.querySelector('.nav__links a').textContent = "關於";
		document.querySelector('.nav__links .btn').textContent = "中文 > English";
		document.querySelector('.about h3').textContent = "關於";
		document.querySelector('.about .a').textContent = "網頁製作: 崩潰金魚燒";
		document.querySelector('.about .b').textContent = "圖片提供: WrenchReginald、DestroyerI滅世I";
		document.querySelector('.about .c').textContent = "ＩＤ提供: WrenchReginald、DestroyerI滅世I";
		document.querySelector('.btn-search button').textContent = "搜尋";
	}
	var elements = document.querySelectorAll('.js-weapon-category');
	
	for (const element of elements) {
		var type = element.getAttribute('data-type');
		var rarity = element.getAttribute('data-rarity');
		var spanElement = element.querySelector('span');
		if(type) spanElement.textContent = wpnthis.typeTo[language][type];
		if(rarity) spanElement.textContent = wpnthis.rarityTo[language][rarity];
	}
})

document.addEventListener('DOMContentLoaded', function () {
    var CSOWeapons = new Weapons();
    CSOWeapons.init();
});