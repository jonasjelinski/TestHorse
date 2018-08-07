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

    const URLS = {
    	LOGIN: " https://h2795767.stratoserver.net/database/actions/login.php",
    	GET: " https://h2795767.stratoserver.net/database/actions/get.php",
		SET: "https://h2795767.stratoserver.net/database/actions/set.php",
		DELETE: "https://h2795767.stratoserver.net/database/actions/delete.php",
		UPDATE: "https://h2795767.stratoserver.net/database/actions/update.php",
		LOGOUT: "https://h2795767.stratoserver.net/database/actions/logout.php",
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

	function tryLogin(action, data){
		askDataBase(URLS.LOGIN, data, action);
	}

	function tryLogout(data, action){
		askDataBase(URLS.LOGOUT, data, action);
	}	

	function getDataFromDB(url, data){
		askDataBase(URLS.GET, data, action);
	}

	function setDataIntoDB(url, data){
		askDataBase(URLS.SET, data, action);
	}

	function updateDataInDB(url, data){
		askDataBase(URLS.UPDATE, data, action);
	}

	function delteDataFromDB(url, data){
		askDataBase(URLS.DELETE, data, action);
	}

	that.tryLogin = tryLogin;
	that.tryLogout = tryLogout;
	that.getDataFromDB = getDataFromDB;
	that.setDataIntoDB = setDataIntoDB;
	that.updateDataInDB = updateDataInDB;
	that.delteDataFromDB = delteDataFromDB;
	return that;
}