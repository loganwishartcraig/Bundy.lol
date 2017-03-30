import * as localForage from 'localforage';

class _CacheService {
  
  
  get(key) {
    return new Promise((res, rej) => {
      localForage
        .getItem(key)
        .then(data => {
          if (data) res(data);
          else rej({msg: `Key '${key}' not found in cache`});
        })
        .catch(err => { rej(err) })
    })
  }

  cache(key, data) {
    localForage.setItem(key, data)
  }

  remove(key) {
    localForage.removeItem(key);
  }

  clearAll() {
    localForage.clear();
  }

};


export const CacheService = new _CacheService();