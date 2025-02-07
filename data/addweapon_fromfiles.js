let WeaponData = custom_weaponlist

// 解析 翻譯檔
function parseTXT(text) {
    const valueindex = {}

    // 使用正則表達式一次匹配所有的 "鍵" 和 "值"
    const regex = /"((?:\\.|[^"\\])*)"\s*"((?:.|\n)*?)"/g;
    const matches = [...text.matchAll(regex)];

    for (const match of matches) {
        const key = match[1].toLowerCase(); // 取第一個雙引號內的內容
        const value = match[2];             // 取第二個雙引號內的內容
        valueindex[key] = value;
    }

    return valueindex;
}


// 解析 CSV 為陣列
function parseCSV(text) {
    const lines = text.trim().split("\n");
    const titleindex = [];
    const valueindex = [];
    
    // 解析 CSV 行，考慮雙引號包住的欄位
    function parseLine(line) {
        const result = [];
        let current = "";
        let insideQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"' && (i === 0 || line[i - 1] !== "\\")) {
                insideQuotes = !insideQuotes; // 反轉引號內外狀態
            } else if (char === "," && !insideQuotes) {
                result.push(current.trim());
                current = "";
            } else {
                current += char;
            }
        }

        result.push(current.trim()); // 最後一個欄位
        return result.map(val => val.replace(/^"|"$/g, "")); // 移除前後的引號
    }

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].charAt(0) === ";") {
            titleindex.length = 0;
            const spltitle = parseLine(lines[i].replace(/^;/, ""));
            titleindex.push(...spltitle);
        } else {
            const value = {};
            const splvalue = parseLine(lines[i]);
            
            for (let j = 0; j < splvalue.length; j++) {
                if (titleindex[j] !== undefined) {
                    value[titleindex[j]] = splvalue[j];
                }
            }
            
            valueindex.push(value);
        }
    }

    return valueindex;
}

// 解析
let txt_content = {
	tw: parseTXT(cso_tw_txt),
	na_en: parseTXT(cso_na_en_txt),
	chn: parseTXT(cso_chn_txt),
	koreana: parseTXT(cso_koreana_txt)
}

const csv_content = parseCSV(item_csv)
const csv_restrict = parseCSV(StandardRestrictTable_csv)

for (let i = 0; i < csv_content.length; i++) {
	const data = csv_content[i]
	if (data.ClassName == "Equipment") {
		const type = ["NONE", "SUBMACHINEGUN", "SHOTGUN", "RIFLE", "SNIPERRIFLE", "MACHINEGUN", "EQUIPMENT", "PISTOL", "KNIFE", "GRENADE"]
		// const type = ["NONE", "PISTOL", "SHOTGUN", "SUBMACHINEGUN", "RIFLE", "MACHINEGUN", "EQUIPMENT", "1", "STUDIO", "2", "3", "4", "KNIFE"]
		
		let restrict = "NONE"
		
		if ((data.InGameID >= 1 && data.InGameID <= 43) || (data.InGameID >= 2000 && data.InGameID <= 2006)  || data.InGameID == 4000) {
			restrict += ",CLASSIC"
		}
		
		for (let j = 0; j < csv_restrict.length; j++) {
			if (data.ID == csv_restrict[j]["ID"]) {
				// console.log(csv_restrict[j])
				if (csv_restrict[j]["NEWCLASSIC"] > 0) {
					restrict += ",NEWCLASSIC"
				}
				if (csv_restrict[j]["NEWCLASSICZOMBIE"] > 0) {
					restrict += ",NEWCLASSICZOMBIE"
				}
			}
		}
		
		const weapondata = {
			"SystemName": data.recourcename.toLowerCase(),
			"ID": data.ID,
			"InGameID": data.InGameID,
			"Type": type[data.SortingIndex],
			"Rarity": data.ItemGrade,
			"Restrict": restrict,
			"Unknown": "0",
			"ImageURL": `./images/weapon/${data.recourcename.toLowerCase()}.png`,
			"descimage": `./images/weapon/desc/${data.recourcename.toLowerCase()}.png`,
			"examplevideo": `./images/weapon/bink/${data.recourcename.toLowerCase()}.webm`,
			"Detail": {
				"CanExtend": data.CanExtend > 0 ? true : false,
				"WeaponParts": data.WeaponParts > 0 ? true : false,
				"ItemGradeForMode": data.ItemGradeForMode,
				"Damage": data.Damage,
				"ZombieDamage": data.zombie_damage,
				"ScenDamage": data.scen_damage,
				"HitRate": data.HitRate,
				"Reaction": data.Reaction,
				"FiringSpeed": data.FiringSpeed,
				"Weight": data.Weight,
				"Knockback": data.knockback,
				"Delay": data.delay,
			}
		}
		
		// 特殊調整
		if (weapondata.SystemName?.substring(0, 3) == "vxl") {
			weapondata.Type = "STUDIO"
		}
		
		// 檢查圖片是否存在
		const existchecklist = ['ImageURL', 'descimage'];
		for (let i = 0; i < existchecklist.length; i++) {
			let check = document.createElement('img');
			check.src = weapondata[existchecklist[i]];
			function handleImageError() {
				this.src = "./images/icon/cannotuse.png";
				weapondata[existchecklist[i]] = "./images/icon/cannotuse.png";
			}
			check.removeEventListener("error", handleImageError);
			check.addEventListener("error", handleImageError);
		}
		
		// 檢查影片是否存在
		let checkwebm = document.createElement('video');
		checkwebm.src = weapondata.examplevideo;
		function handleVideoError() {
			if (weapondata.examplevideo == "") {
				checkwebm.removeEventListener("error", handleVideoError);
				return
			}
			this.src = "";
			weapondata.examplevideo = "";
		}
		checkwebm.addEventListener("error", handleVideoError);
		
		const exists = WeaponData.some(item => item.InGameID === weapondata.InGameID);
		if (exists) {
			
		} else {
			WeaponData.push(weapondata)
		}
	}
}