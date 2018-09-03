var DatabaseClientInterface = DatabaseClientInterface || {};

/**
 * @instance DatabaseClientInterface.RequestModul
 * @memberof! DatabaseClientInterface 
 * @description <code>RequestModul</code> contains the correct urls for the ajax requests
 * uses those and the <code>DatabaseClientInterface.AJAXModul</code> to make requests
 */

DatabaseClientInterface.RequestModul = function () {
	"use strict";

	/*@const{object}, Types,
	* @description: contains the type "POST" for the ajax request
	*/
	const Types = {		
    	POST: "POST",      
    };

    /*@const{object}, URLS,
	* @description: contains the method urls for the ajax request
	*/
    const URLS = {
    	LOGIN: " https://h2795767.stratoserver.net/database/actions/login.php",
    	GET: " https://h2795767.stratoserver.net/database/actions/get.php",
		SET: "https://h2795767.stratoserver.net/database/actions/set.php",
		DELETE: "https://h2795767.stratoserver.net/database/actions/delete.php",
		UPDATE: "https://h2795767.stratoserver.net/database/actions/update.php",
		LOGOUT: "https://h2795767.stratoserver.net/database/actions/logout.php",
		UPLOAD:"https://h2795767.stratoserver.net/database/actions/upload.php",
	}

	let that = new EventTarget(),
		requestModul;
	

	/**
	* @function init
	* @public
	* @memberof! DatabaseClientInterface.RequestModul
	* @instance
	* @description Initialize this modul.
	*/ 	
	function init(){
		requestModul = new DatabaseClientInterface.AJAXModul();
		requestModul.addEventListener("onResult", sendResults);
	}

	/**
	* @function askDataBase
	* @private
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} url, url for the request
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description makes the axajRequest with the given paramaters by calling the function <code>doAjaxRequest</code>
	*/ 	
	function askDataBase(url, action, data){
		let requestData = createRequestDataObject(action, data);
		requestModul.doAjaxRequest(action, url, Types.POST, requestData);
	}

	/**
	* @function showError
	* @private
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @description function which is called if the ajax request fails
	*/ 
	function showError(){
		console.log("ajax request error");
	}

	/**
	* @function sendResults
	* @private
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {event} ev, contains the result of the request
	* @description function which is called if the ajax request is sucessfull
	* sends the results in an event
	*/ 
	function sendResults(ev){
		let requestResult = ev.details.result,
			resultAction = ev.details.resultAction,
		event = new Event("onResult");
		event.details = {};
		event.details.result = requestResult;
		event.details.resultAction = resultAction;
		that.dispatchEvent(event);		
	}

	/**
	* @function createRequestDataObject
	* @private
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description returns a object which can be used for the request
	*/ 
	function createRequestDataObject(action, data){
		let requestData = {};
			requestData.action = action;
			requestData = Object.assign(requestData, data);
			requestData = convertAllValuesToTypeString(requestData);
		return requestData;
	}

	/**
	* @function convertAllValuesToTypeString
	* @private
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {object} requestData, contains the values for the database requests
	* @description converts all values in the object to strings. Prevents errors,
	* because the database php code expect strings as paraamters
	*/ 
	function convertAllValuesToTypeString(requestData){
		Object.keys(requestData).forEach( function(i){
			if (typeof requestData[i] === "object") { 
				return convertAllValuesToTypeString(requestData[i]);
			}
			requestData[i] = '' + requestData[i];
		});
		return requestData;
	}

	/**
	* @function tryLogin
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request for a login
	*/ 
	function tryLogin(action, data){
		askDataBase(URLS.LOGIN, action, data);
	}

	/**
	* @function tryLogout
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request for a logout
	*/ 
	function tryLogout(action, data){
		askDataBase(URLS.LOGOUT, action, data);
	}

	/**
	* @function getDataFromDB
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request for data from the database
	*/
	function getDataFromDB(action, data){
		askDataBase(URLS.GET, action, data);
	}

	/**
	* @function setDataIntoDB
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request to set new data into the database
	*/
	function setDataIntoDB(action, data){
		askDataBase(URLS.SET, action, data);
	}

	/**
	* @function updateDataInDB
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request to update data in the database
	*/
	function updateDataInDB(action, data){
		askDataBase(URLS.UPDATE, action, data);
	}


	/**
	* @function delteDataFromDB
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {string} action, action so the php code know that to do with parameters in data
	* @param {object} data, contains the values for the database requests
	* @description public function to allow other moduls making a request to delete data in the database
	*/
	function delteDataFromDB(action, data){
		askDataBase(URLS.DELETE, action, data);
	}

	/**
	* @function uploadHorsePicture
	* @public
	* @memberof! DatabaseClientInterface.RequestModul  
	* @instance
	* @param {object} file, contains the picture and the id of the horse
	* @description public function to allow other moduls to upload a picture of a horse
	*/
	function uploadHorsePicture(file){
		requestModul.doAjaxUpload(URLS.UPLOAD, Types.POST, file);
	}

	that.init = init;
	that.tryLogin = tryLogin;
	that.tryLogout = tryLogout;
	that.getDataFromDB = getDataFromDB;
	that.setDataIntoDB = setDataIntoDB;
	that.updateDataInDB = updateDataInDB;
	that.delteDataFromDB = delteDataFromDB;
	that.uploadHorsePicture = uploadHorsePicture;
	return that;
}