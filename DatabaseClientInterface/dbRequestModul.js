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
    	LOGIN: "LOGIN",
    	LOGOUT : "LOGOUT",
    	GET: "GET",
    	SET: "SET",
    	UPDATE: "UPDATE",
    	DELETE: "DELETE",
    }

	let that = new EventTarget(),
	requestModul = new DatabaseClientInterface.AJAXModul();

	function askDataBase(url, data, action){
		let requestData = createRequestDataObject(action, data);
		requestModul.request(getDBAnswer, showError, METHODS.POST, url, requestData);
	}

	function showError(){
		console.log("error");
	}

	function createRequestDataObject(action, data){
		let requestData = {};
			requestData.action = action;
			requestData = Object.assign(requestData, data);
			requestData = convertAllValuesToTypeString(requestData);
		return requestData;
	}

	function convertAllValuesToTypeString(requestData){
		Object.keys(requestData).forEach( function(i){
			if (typeof requestData[i] === "object") {
				return convertAllValuesToTypeString(requestData[k]);
			}
			requestData[i] = '' + requestData[i];
		});
		return requestData;
	}

	function getDBAnswer(requestResult){
		let event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		that.dispatchEvent(event);		
	}

	function tryLogin(url, data){
		askDataBase(url, data, ACTIONS.LOGIN);
	}

	function tryLogout(url, data){
		askDataBase(url, data, ACTIONS.LOGOUT);
	}	

	function getDataFromDB(url, data){
		askDataBase(url, data, ACTION.GET);
	}

	function setDataIntoDB(url, data){
		askDataBase(url, data, ACTIONS.SET);
	}

	function updateDataInDB(url, data){
		askDataBase(url, data, ACTIONS.UPDATE);
	}

	function delteDataFromDB(url, data){
		askDataBase(url, data, ACTIONS.DELETE);
	}

	that.tryLogin = tryLogin;
	that.tryLogout = tryLogout;
	that.getDataFromDB = getDataFromDB;
	that.setDataIntoDB = setDataIntoDB;
	that.updateDataInDB = updateDataInDB;
	that.delteDataFromDB = delteDataFromDB;
	return that;
}