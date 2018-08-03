/*
This modul allows to set or get data from the database of the server
https://www.w3resource.com/ajax/working-with-PHP-and-MySQL.php
*/

var DatabaseClientInterface = DatabaseClientInterface || {};

DatabaseClientInterface.RequestModul = function () {
	"use strict";

	const METHODS = {
      POST: "POST",      
    };

    const ACTIONS = {
    	GET: "GET",
    	SET: "SET",
    	UPDATE: "UPDATE",
    	DELETE: "DELETE",
    }

	that = {},
	requestModul = new AJAXModul();	

	function getDataFromDB(url, data){
		let resultData,
			requestData = createRequestDataObject(ACTIONS.GET, data);

		function setData(requestResult){
			resultData = requestResult;
		}
		requestModul.request(setData, null, METHODS.POST, url, requestData);
		return resultData;
	}

	function createRequestDataObject(action, data){
		let requestData = {};
			requestData.action = action;
			requestData = Object.assign(requestData, data);
		return requestData;
	}

	function setDataIntoDB(url, data){
		let requestData = createRequestDataObject(ACTIONS.SET, data);
		requestModul.request(setResult, null, METHODS.POST, url, requestData);
	}

	function updateDataInDB(url, data){
		let requestData = createRequestDataObject(ACTIONS.UPDATE, data);
		requestModul.request(setResult, null, METHODS.UPDATE, url, requestData);
	}

	function delteDataFromDB(url, data){
		let requestData = createRequestDataObject(ACTIONS.DELETE, data);
		requestModul.request(setResult, null, METHODS.DELETE, url, requestData);
	}
}