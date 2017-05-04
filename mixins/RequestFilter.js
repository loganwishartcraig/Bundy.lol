const RequestFilter = function RequestFilter(requiredKeys) {

  this._requiredKeys = requiredKeys;

  this.validate = (request) => {

    for (let i = 0; i < this._requiredKeys.length; i++) {
      let key = this._requiredKeys[i]
      if (!request.hasOwnProperty(key)) return false;
      if (request[key] === '') return false;
    }

    return true;

  }

  this.serialize = (request) => {

    return this._requiredKeys.reduce((serialized, key) => {

      serialized[key] = request[key];
      return serialized;

    }, {});

  }

};

    
module.exports = RequestFilter;