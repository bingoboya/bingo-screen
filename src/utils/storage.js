

import globalConfig from "@/config";

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
  getStorage: () => {
    return JSON.parse(window.localStorage.getItem(globalConfig.nameSpace) || '{}')
  },
  setItem: (key, val)=>{
    let storage = Local.getStorage()
    storage[key] = val
    window.localStorage.setItem(globalConfig.nameSpace, JSON.stringify(storage))
  },
  getItem: (key)=>{
    return Local.getStorage()[key]
  },
  clearItem:(key)=>{
    let storage = Local.getStorage()
    console.log('sdf', Local.getStorage());
    delete storage[key]
    console.log('sdf2', storage);
    window.localStorage.setItem(globalConfig.nameSpace, JSON.stringify(storage))
  },
  clearAll:()=>{
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
 export const Session = {
	// 设置临时缓存
	set(key, val) {
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key) {
		let json = window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key) {
		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear();
	},
	// 获取临时缓存
	getCorporationId() {
		let json = window.sessionStorage.getItem('userInfo');
		const data = JSON.parse(json);
		if (!data || !data.user || !data.user.corporation) {
			return '';
		}
		return data.user.corporation.corporation_id;
	},
};