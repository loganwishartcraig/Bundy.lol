const store = require('store')
// import * as localForage from 'localforage';
// import * as store from 'store'
import Logger from '../Utility/Logging';


class _CacheService {
  
  constructor() {

    this._cacheKey = 'cachingEnabled';

    this._enabled = (store.get(this._cacheKey) === undefined || store.get(this._cacheKey) === false) ? false : true;
      
  }

  enable() {
    store.set(this._cacheKey, true);
    this._enabled = true;
    Logger.log('Enabling caching')
  }

  disable() {
    store.set(this._cacheKey);
    this._enabled = false;
    Logger.log('Disabling caching')
  }

  get(key) {
    Logger.log('Getting from cache', {key: key})
    if (!this._enabled) return undefined;
    return store.get(key);
  }


  cache(key, data) {
    Logger.log('Caching...', {key: key, enabled: this._enabled})
    if (this._enabled) store.set(key, data)
  }

  remove(key) {
    store.remove(key);
  }

  clearAll() {
    store.clearAll();
  }

};


export const CacheService = new _CacheService();