function Weapons() {
	// Data
	this.weaponList = [];
	this.currentWeapons = [];
	this.currentType = '全部';
	this.currentRarity = '全部';
	this.typeTo = {
		"NONE": "未知",
		"PISTOL": "輔助型",
		"SHOTGUN": "散彈槍",
		"SUBMACHINEGUN": "衝鋒槍",
		"RIFLE": "步槍",
		"SNIPERRIFLE": "狙擊槍",
		"MACHINEGUN": "機關槍",
		"EQUIPMENT": "裝備型",
		"GRENADE": "手榴彈",
		"KNIFE": "近戰型",
		"STUDIO": "創世者"
	}
	this.rarityTo = {
		"1":"一般",
		"2":"高級",
		"3":"稀有",
		"4":"特殊",
		"5":"王牌",
		"6":"史詩"
	}
	this.emptyMsg = '查無此武器';
	
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

// 1.1 生承單個縮圖
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
		let ID = weapon.InGameID;
		let Type = self.typeTo[weapon.Type];
		let Name = weapon.ChineseName;
		let Text = `${ID}, -- ${Type} : ${Name}` + "\n";
		navigator.clipboard.writeText(Text);
	});
	// 武器中文名稱
	let WeaponName = `<p>${weapon.ChineseName}</p>`
	// 武器ID
	let InGameID = `<span>ID: </span>${weapon.InGameID}`
	let weaponContent = WeaponName + InGameID;
	contentFrameNode.innerHTML = weaponContent;
	
	// 選取外框
	let = selectFrameNode = document.createElement('div');
	selectFrameNode.classList.add('btn-select');
	selectFrameNode.innerHTML = "<span>選取</span>";
	
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
					"item":node,
					"name":weapon.ChineseName,
					"id":weapon.InGameID
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
	if(this.currentRarity === '全部' || this.currentRarity === this.rarityTo[weapon.Rarity]) {matchRarity = true;}
	if(this.currentType === '全部' || this.currentType === this.typeTo[weapon.Type]) {matchType = true;}
	
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
			// 搜尋到的武器清單
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
		let name = item.name.toLowerCase();
		let id = item.id;
		
		if(name.includes(value)) {
			filteredWeapons.push(item);
		} else if(id.includes(value)) {
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

// 關於
const about = document.querySelector('.about-bg');
const about_btn = document.querySelector('.nav__links li a');

about.addEventListener('click', function(e) {
	if(e.target.classList.value === about.className) {
		this.style.display = 'none';
	}
})
about_btn.addEventListener('click', function() {about.style.display = 'block';})


document.addEventListener('DOMContentLoaded', function () {
    var CSOWeapons = new Weapons();
    CSOWeapons.init();
});