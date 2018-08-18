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
	requestModul = new DatabaseClientInterface.JQAJAXModul();
	requestModul.addEventListener("onResult", sendResults);

	function askDataBase(url, action, data){
		let requestData = createRequestDataObject(action, data);
		requestModul.doAjaxRequest(url, METHODS.POST, requestData);
	}

	function showError(){
		console.log("error");
	}

	function sendResults(ev){
		let requestResult = ev.details.result,
		event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		that.dispatchEvent(event);		
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
				console.log(requestData);
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
		askDataBase(URLS.LOGIN, action, data);
	}

	function tryLogout(data, action){
		askDataBase(URLS.LOGOUT, action, data);
	}	

	function getDataFromDB(action, data){
		askDataBase(URLS.GET, action, data);
	}

	function setDataIntoDB(action, data){
		askDataBase(URLS.SET, action, data);
	}

	function updateDataInDB(action, data){
		askDataBase(URLS.UPDATE, action, data);
	}

	function delteDataFromDB(action, data){
		askDataBase(URLS.DELETE, action, data);
	}

	that.tryLogin = tryLogin;
	that.tryLogout = tryLogout;
	that.getDataFromDB = getDataFromDB;
	that.setDataIntoDB = setDataIntoDB;
	that.updateDataInDB = updateDataInDB;
	that.delteDataFromDB = delteDataFromDB;
	return that;
}