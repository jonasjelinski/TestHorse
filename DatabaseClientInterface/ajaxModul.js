/**
 * @instance DatabaseClientInterface
 * @memberof! DatabaseClientInterface 
 * @description <code>AJAXModul</code> contains the function <code>doAjaxRequest</code> to make an ajax request
 */

var DatabaseClientInterface = DatabaseClientInterface || {};

DatabaseClientInterface.AJAXModul = function () {
	"use strict";	 

	let that = new EventTarget();


	/**
	* @function doAjaxRequest
	* @public
	* @memberof! DatabaseClientInterface  
	* @instance
	* @param {array} url, url of the request
	* @param {object} type, type of the request e.g. POST
	* @param {object} data, data to send to the database
	* @description makes the ajax request
	*/ 	
	function doAjaxRequest(url, type , data){
		console.log("url, type, data", url, type, data);
	$.ajax({
	    	type: type,
	    	url: url,
	   		data: data,
		   	success: function(requestResult){
		        sendDBAnswer(requestResult);
		    }	   	
	   	});
	}

	/**
	* @function sendDBAnswer
	* @public
	* @memberof! DatabaseClientInterface  
	* @instance
	* @param {object} requestResult, data from the databse request
	* @description sends the data of the result with an event so toher moduls can use them
	*/ 	
	function sendDBAnswer(requestResult){
		let event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		that.dispatchEvent(event);		
	}

	that.doAjaxRequest = doAjaxRequest;
	return that;
}




	
	
	
