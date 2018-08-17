/*
This modul allows to set or get data from the database of the server
https://www.w3resource.com/ajax/working-with-PHP-and-MySQL.php
*/

var DatabaseClientInterface = DatabaseClientInterface || {};

DatabaseClientInterface.JQAJAXModul = function () {
	"use strict";	 

	let that = new EventTarget(),
	requestModul = new DatabaseClientInterface.AJAXModul();

	function doAjaxRequest(url, type , data){
	$.ajax({
	    	type: type,
	    	url: url,
	   		data: data,
		   	success: function(requestResult){
		        sendDBAnswer(requestResult);
		    }	   	
	   	});
	}

	function sendDBAnswer(requestResult){
		let event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		that.dispatchEvent(event);		
	}

	that.doAjaxRequest = doAjaxRequest;
	return that;
}




	
	
	
