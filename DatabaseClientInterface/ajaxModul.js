/**
 * @instance DatabaseClientInterface
 * @memberof! DatabaseClientInterface 
 * @description <code>AJAXModul</code> contains the function <code>doAjaxRequest</code> to make an ajax request
 * and contains the function <code>doAjaxUpload</code> to upload a picture.
 */

var DatabaseClientInterface = DatabaseClientInterface || {};

DatabaseClientInterface.AJAXModul = function () {
	"use strict";	 

	let that = new EventTarget(),
		resultAction;


	/**
	* @function doAjaxRequest
	* @public
	* @memberof! AJAXModul  
	* @instance
	* @param {array} url, url of the request
	* @param {object} type, type of the request e.g. POST
	* @param {object} data, data to send to the database
	* @description makes the ajax request
	*/ 	
	function doAjaxRequest(action, url, type , data){
		resultAction = action;
		console.log("action, url, type, data",action, url, type, JSON.stringify(data));
		$.ajax({
			context: this,
	    	type: type,
	    	url: url,
	   		data: data,
		   	success: function(requestResult){
		        sendDBAnswer(requestResult);
		    }	   	
	   	});
	}

	/**
	* @function doAjaxUpload
	* @public
	* @memberof! AJAXModul  
	* @instance
	* @param {array} url, url of the request
	* @param {object} type, type of the request e.g. POST
	* @param {object} data, data to send to the database
	* @description uploads the data to the database
	* has the setting contentType, cache and processData false
	* to allow the upload.
	* source: http://api.jquery.com/jquery.ajax/, 03.09.2018
	*/ 	
	function doAjaxUpload(url, type , data){
		console.log("url, type, data", url, type, data);
		$.ajax({
			context: this,
	    	type: type,
	    	url: url,
	   		data: data,
	   		contentType: false,
    		cache: false,
    		processData: false,
		   	success: function(requestResult){
		        sendDBAnswer(requestResult);
		    }	   	
	   	});
	}

	/**
	* @function sendDBAnswer
	* @public
	* @memberof! AJAXModul  
	* @instance
	* @param {object} requestResult, data from the databse request
	* @description sends the data of the result with an event so other moduls can use them
	*/ 	
	function sendDBAnswer(requestResult){
		let event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		event.details.resultAction = resultAction;
		that.dispatchEvent(event);		
	}

	that.doAjaxRequest = doAjaxRequest;
	that.doAjaxUpload = doAjaxUpload;
	return that;
}




	
	
	
