/*This modul allows a http requse
//possible values https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

*/

var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface.AJAXModul = function() {
  "use strict";  

  const READY_STATES = {
      UNITIALIZED: 0,
      CONNECTED: 1,
      SERVER_RECEIVED_REQUEST: 2,
      SERVER_PROCESSING_REQUEST: 3,
      RESPONSE_READY: 4,
    },
    HTTP_CODES = {
      OK_200: 200,
      FORBIDDEN_403: 403,
      NOT_FOUND_404: 404,
    },
    ERROR ={
      FORBIDDEN_403: "HTTP Error 403: Access forbidden.",
      NOT_FOUND_404: "HTTP Error 404: Document not found.",
      UNKNOWN: "Unknown Error",
    };

  that = {};    

  function request(onSuccessCallback, error, method, url, send) {
    var request = createXMLHttpRequest(onSuccessCallback, error);
    

    request.open(method, url, true);
    request.send(send);
  }

  function createXMLHttpRequest(onSuccess, onError) {
    var httpRequest;
    if(window.XMLHttpRequest){
      httpRequest = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = onreadystatechangeCallback;
    return httpRequest;
  }

  function onreadystatechangeCallback () {
      switch (this.readyState) {
        case READY_STATES.UNITIALIZED:
          break;
        case READY_STATES.CONNECTED:
          break;
        case READY_STATES.SERVER_RECEIVED_REQUEST:
          break;
        case READY_STATES.SERVER_PROCESSING_REQUEST:
          break;
        case READY_STATES.RESPONSE_READY:
          onResponseReady(this, onSuccess, onError);
          break;
        default:
          break;
      }
  };

  function onResponseReady(response, onSuccess, onError) {
    var success = onSuccess || foo,
      error = onError || foo;
    switch (response.status) {
      case HTTP_CODES.OK_200:
        success(response.responseText);
        break;
      case HTTP_CODES.FORBIDDEN_403:
        error(ERROR.FORBIDDEN_403);
        break;
      case HTTP_CODES.NOT_FOUND_404:
        error(ERROR.NOT_FOUND_404);
        break;
      default:
        error(ERROR.UNKNOWN);
        break;
    }
  }

  function foo() {
    return false;
  }

  that.request = request;
  return that;
};
