/**
 * 'store' library does not support { import }
 */
const store = require('store')


import Logger from '../Utility/Logging';


class _CacheService {
  
  constructor() {

    /**
     * Key for caching users caching preference
     */
    this._cacheKey = 'cachingEnabled';

    /**
     * If cached caching preference true, enable caching. Otherwise disable.
     */
    this._enabled = (store.get(this._cacheKey) === undefined || store.get(this._cacheKey) === false) ? false : true;
      
  }

  /**
   * Used to enable caching.
   */
  enable() {

    /**
     * Cache 'enabled' preference & set enabled
     */
    store.set(this._cacheKey, true);
    this._enabled = true;
    Logger.log('Enabling caching')
  }


  /**
   * Used to disable caching
   */
  disable() {

    /**
     * Remove cached & set to false
     */
    store.remove(this._cacheKey);
    this._enabled = false;
    Logger.log('Disabling caching')
  }


  /**
   * Used to retrieve an item from the cache.
   * If caching disabled, always returns undefined
   *
   * @param      {String}  key     The cache key associated with the item to retrieve 
   * @return     {Varries}  Returns data associated with key if found, undefined if not
   */
  get(key) {
    Logger.log('Getting from cache', {key: key});
    if (!this._enabled) return undefined;
    return store.get(key);
  }


  /**
   * Used to store a key, value pair in the cache.
   * If caching diabled, stores nothing.
   *
   * @param      {String}  key     They cache key to use for retrieval
   * @param      {Varries}  data    The data to cache
   */
  cache(key, data) {
    Logger.log('Caching...', {key: key, enabled: this._enabled});
    if (this._enabled) store.set(key, data);
  }


  /**
   * Used to remove an item from the cache
   *
   * @param      {String}  key     The cache key to remove
   */
  remove(key) {
    store.remove(key);
  }


  /**
   * Used to clear all entries in cache
   */
  clearAll() {
    store.clearAll();
  }

};


export const CacheService = new _CacheService();