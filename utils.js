module.exports = function(options){

    function Utils(){
    }

    var myUtils = new Utils();

    myUtils.showRequestCounters = function (getRequestCounter, postRequestCounter) {
        //console.log('Processed Request Count --> ' + 'sendGet:' + getRequestCounter + '  sendPost:' + postRequestCounter);
        this.log(null, null, 'INFO', 'Processed Request Count --> ' + 'sendGet:' + getRequestCounter + '  sendPost:' + postRequestCounter);
    }

    myUtils.log = function (prefix, title, messageType, message) {
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

        console.log(result);
        //console.log(directionSign + ' ' + title + ': ' + messageType + ': ' + message);
    }
    return myUtils;
    // This function shows counter for processed GET and POST requests
    // function showRequestCounters() {
    //     console.log('Processed Request Count --> ' + 'sendGet:' + getRequestCounter + '  sendPost:' +postRequestCounter);
    // }
}