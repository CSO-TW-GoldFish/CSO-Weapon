function Weapons() {
	// Data
	this.weaponList = [];
	this.weaponRarities = [];
	this.currentWeapon = {};
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
	
	// DOM
	this.thumbnailWrapperNode = document.querySelector('.js-weapon-thumbnails-wrapper');
	this.thumbnails = null;
}

// 0. 初始化
Weapons.prototype.init = function () {
	let self = this;
	
	// WeaponData 來自 weaponList.js 檔案，排序(按照ID)
	self.weaponList = Array.prototype.sort.call(WeaponData, function (a, b) {return a.InGameID - b.InGameID;});
	
	self.renderThumbnails();
	self.registerCategoriesEvents();
}

// 1. 渲染縮圖
Weapons.prototype.renderThumbnails = function () {
	let self = this;
	// 清空縮圖容器
	self.thumbnailWrapperNode.innerHTML = '';
	
	Array.prototype.forEach.call(self.weaponList, function (weapon) {
		if(self.matchFilter(weapon)) {
			let thumbnailNode = self.createThumbnailNode(weapon);
			self.thumbnailWrapperNode.appendChild(thumbnailNode);
		}
	})
}

// 1.1 生承單個縮圖
Weapons.prototype.createThumbnailNode = function(weapon, index) {
	let self = this
	// 外框
	let frameNode = document.createElement('div');
	frameNode.classList.add('card-container');
	frameNode.setAttribute('data-weapon', JSON.stringify(weapon));
	frameNode.setAttribute('data-type', weapon.Type);
	frameNode.setAttribute('data-rarity', weapon.Rarity);
	
	// 縮圖外框
	let imageFrameNode = document.createElement('div');
	imageFrameNode.classList.add('card-img');
	// 縮圖
	let img = document.createElement('img');
	img.src = weapon.ImageURL;
	img.addEventListener("error", function () {this.src = "./images/icon/cannotuse.png";});
	
	imageFrameNode.appendChild(img);
	
	// 內容外框
	let contentFrameNode = document.createElement('div');
	contentFrameNode.classList.add('card-content');
	// 武器中文名稱
	let weaponName = document.createElement('p');
	weaponName.classList.add('content-title');
	weaponName.innerText = weapon.ChineseName;
	// 武器ID
	let weaponID = document.createElement('p');
	weaponID.innerHTML = "<span>ID: </span>" + weapon.InGameID;
	// 複製ID 圖示
	let copyIDIcon = document.createElement('img');
	copyIDIcon.src = "./images/icon/copy.svg";
	copyIDIcon.addEventListener("click", function () {
		let ID = weapon.InGameID
		let Type = self.typeTo[weapon.Type]
		let Name = weapon.ChineseName
		let Text = `${ID}, -- ${Type} : ${Name}` + "\n";
		navigator.clipboard.writeText(Text);
	});
	
	
	contentFrameNode.appendChild(weaponName);
	contentFrameNode.appendChild(weaponID);
	contentFrameNode.appendChild(copyIDIcon);
	
	frameNode.appendChild(imageFrameNode);
	frameNode.appendChild(contentFrameNode);
	frameNode.addEventListener("mouseover", function () {copyIDIcon.style.display = 'block';});
	frameNode.addEventListener("mouseout", function () {copyIDIcon.style.display = 'none';});
	
	return frameNode;
}

// 1.2 檢查目前篩選
Weapons.prototype.matchFilter = function(weapon) {
	let matchRarity = false;
	let matchType = false;
	if(this.currentRarity === '全部' || this.currentRarity === this.rarityTo[weapon.Rarity]) {matchRarity = true;}
	if(this.currentType === '全部' || this.currentType === this.typeTo[weapon.Type]) {matchType = true;}
	
	return (matchRarity && matchType);
}

// 2.0 註冊篩選事件監聽
Weapons.prototype.registerCategoriesEvents = function() {
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
    var typeBtns = document.querySelectorAll('.js-weapon-category[data-type]');
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
Weapons.prototype.filterCategories = function() {
	this.renderThumbnails();
}



document.addEventListener('DOMContentLoaded', function() {
    var CSOWeapons = new Weapons();
    CSOWeapons.init();
});