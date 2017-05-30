

/**
 * Used by routes to validate incoming messages
 * or serialize outgoing messages
 *
 * @class      RequestFilter (name)
 * @param      {[String]}   requiredKeys  The array of keys required for a message
 */
const RequestFilter = function RequestFilter(requiredKeys) {

  this._requiredKeys = requiredKeys;


  /**
   * validates a request, ensuring all required keys are present
   *
   * @param      {Object}   request  The request to validat 
   * @return     {boolean}  indicates if all required keys are present & non-empty
   */
  this.validate = (request) => {

    for (let i = 0; i < this._requiredKeys.length; i++) {
      let key = this._requiredKeys[i]
      if (!request.hasOwnProperty(key)) return false;
      if (request[key] === '') return false;
    }

    return true;

  }


  /**
   * serializes requests, ensuring only required keys are returned
   *
   * @param      {Object}  request  The request to be serialized
   * @return     {Object}  the serialized object
   */
  this.serialize = (request) => {

    return this._requiredKeys.reduce((serialized, key) => {

      serialized[key] = request[key];
      return serialized;

    }, {});

  }

};

    
module.exports = RequestFilter;