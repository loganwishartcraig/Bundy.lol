
class _Logger {

  constructor() {
    this._logLevel = 0;    
  }

  setLogLevel(level) {
    
    if (typeof level !== 'number') throw new Error(`Can't set log level to non-number '${level}'`);
    if (level < 0 || level > 5) throw new Error(`Log level (${level}) must be between 0 and 5.`);
    
    this._logLevel = level;

  }

  _print(msg, params, displayFn) {

    switch(this._logLevel) {
      case 0:
        break;
      case 1:
        displayFn(`LOG: ${msg}`)
        break;
      case 2:
        displayFn(`LOG: ${msg} ${(typeof params !== 'undefined') ? '| PARAMS: '.concat(JSON.stringify(params)) : ''}`)
        break;
      case 3:
        try { throw new Error(); }
        catch (e) { 
          let callee = e.stack.trim().split('\n')[3].trim().replace(/^(at)/, '@').replace(/ \(.*\)$/g, '')
          displayFn(`LOG: ${callee}` + ' | ' + `%c${msg}` + `${(typeof params !== 'undefined') ? '%c | Params: '.concat(JSON.stringify(params)) : '%c'}`, 'color: blue;', 'color: black')
        }
        break;
      case 4:
        break;
      case 5: 
        break;
      default:
        break;
    }

  }

  log(msg, params) {
    this._print(msg, params, console.log);
  }

  warn(msg, params) {
    this._print(msg, params, console.warn);
  }

  error(msg, params) {
    this._print(msg, params, console.error);
  }

}

const Logger = new _Logger();

export default Logger