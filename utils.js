module.exports = function(options){

    function logToConsole (prefix, title, messageType, message, color) {
        var result = buildMessageString(prefix, title, messageType, message);
        if (color) {
            console.log(color + '%s' + myUtils.RESET, result);    
        }
        else {
            console.log(result);
        }
    }

    function buildMessageString (prefix, title, messageType, message){
        var result = '';
        
        if(prefix) {
            result += prefix;
        }
        if (title) {
            result +=  ' ' + title + ': ';
        }
        if (messageType) {
            result += messageType + ': ';
        }
        if (message) {
            result += message;
        }
    
        return result;
    }

    function Utils(){
    }

    var myUtils = new Utils();

    //Export color definitions, so they can be used from outside
    myUtils.RED = '\x1b[31m';
    myUtils.GREEN = '\x1b[32m';
    myUtils.BLUE = '\x1b[34m';
    myUtils.RESET = '\x1b[0m';

    // Methods exported to help loggin information to console:
    
    myUtils.showRequestCounters = function (getRequestCounter, postRequestCounter) {
        // Modern ES6: template literals to insert variable values in a string
        this.logWithColor(`Processed Request Count --> sendGet:${getRequestCounter}  sendPost:${postRequestCounter}`, this.GREEN);
    }

    myUtils.log = function (prefix, title, messageType, message) {
        logToConsole(prefix, title, messageType, message, null);
    }

    myUtils.logWithColor = function (message, color) {
        logToConsole(null, null, null, message, color);
    }

    return myUtils;
}


// Colors reference
/*
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
*/