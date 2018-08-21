var DatabaseClientInterface = DatabaseClientInterface || {}; 

/**
 * @instance DatabaseClientInterface
 * @memberof! DatabaseClientInterface 
 * @description <code>DatabaseClientInterface</code> is the interface for database requests.
 * It contains all functions which are used in the other moduls to make specified db requests.
 * The reason for this interface is to sperate the AXAJ Request from the other moduls so
 * only correct requests can be send to the database.
 */

DatabaseClientInterface = function(){
	
	/*@const{object}, ACTIONS,
	* @description: each action is a special information for the database
	* the database knows from the name of the action which request is sended
	* and what it has to do with the given parameters
	*/
	const ACTIONS = {
		TRY_LOGIN: "tryLogin",
		LOGOUT: "logoutUser",
		GET_USER_ID: "getUserID",
		ALL_HORSES: "getAllHorsesOfUser",
		SINGLE_HORSE: "getHorse",
		ALL_DATES: "getAllHorseDates",
		SINGLE_DATE: "getHorseDate",
		GET_SINGLE_REMINDER: "getReminderNotification",
		GET_REGULAR_REMINDER: "getReminderRegular",
		USER_DATA:"getUserData",
		SET_USER : "setUserIntoDB",
		SET_HORSE : "setHorseIntoDB",
		SET_DATE : "setDateIntoDB",
		SET_REMINDER : "setReminderIntoDB",
		SET_REGULAR_REMINDER : "?????",
		DELETE_USER : "deleteUserFromDB",
		DELETE_HORSE : "deleteHorseFromDB",
		DELETE_DATE : "deleteDateFromDB",
		DELETE_SINGLE_REMINDER : "deleteReminderNotificationFromDB",
		DELETE_REGULAR_REMINDER : "deleteReminderNotificationFromDB",
		UPDATE_USER : "updateUser",
		UPDATE_USER_NAME : "updateUserName",
		UPDATE_USER_EMAIL : "?????",
		UPDATE_USER_PASSWORD : "updateUserName",
		UPDATE_USER_BIRTH : "updateUserDateOfBirth",
		UPDATE_HORSE : "updateHorse",
		UPDATE_HORSE_NAME : "updateHorseName",
		UPDATE_HORSE_OWNER : "updateHorseOwner",
		UPDATE_HORSE_RACE : "updateHorseRace",
		UPDATE_HORSE_BIRTH : "updateHorseDateOfBirth",
		UPDATE_HORSE_PHOTO : "updateHorseDateOfBirth",
		UPDATE_HORSE_SEX : "updateHorseSex",
		UPDATE_HORSE_HEIGHT : "updateHorseHeight",
		UPDATE_HORSE_GROWER : "updateHorseGrower",
		UPDATE_DATE : "updateDate",
		UPDATE_SINGLE_REMINDER : "updateReminderNotification",
		UPDATE_REGULAR_REMINDER: "updateReminderRegular",
	}

	let that = new EventTarget(),
		requestModul;


		/**
		* @function init
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @description inits this modul. The Request modul makes the AJAX requests.
		*/ 	
		function init(){
			requestModul = new DatabaseClientInterface.RequestModul();
			requestModul.addEventListener("onResult", sendResultData);
			requestModul.init();
		}

		/**
		* @function sendResultData
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {event} ev
		* @description If the Ajax request has received the result his function sends the event
		*/ 	
		function sendResultData(ev){
			let event = new Event("onResult");
				event.details = {};
				event.details.result = ev.details.result;			
			that.dispatchEvent(event);
		}

		/**
		* @function allNecessaryDataHaveBeenParsed
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {array} necessaryAttributes, array of attributenames which are necessary for the request
		* @param {object} parsedObject, object which is tested if it contains all necessary attributes
		* @description If the Ajax request has received the result his function sends the event
		*/ 	
		function allNecessaryDataHaveBeenParsed(necessaryAttributes, parsedObject){
			for(let i = 0; i < necessaryAttributes.length; i++){
				let attribute = necessaryAttributes[i],
					parsedAttribute = parsedObject[attribute];
				if(attributeIsMissing(parsedAttribute)){
					return false;
				}
			}
			return true;
		}

		/**
		* @function attributeIsMissing
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} attribute, object which is tested if it contains all necessary attributes
		* @description returns true if the attribute is undefined
		*/ 	
		function attributeIsMissing(attribute){
			if(attribute === undefined){
				return true;
			}
			return false;
		}		

		//LOGIN AND LOGOUT

		/**
		* @function tryLogin
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} loginData, contains an email and a password
		* @description sends the database the email and the password to login the user into his account
		*/ 	
		function tryLogin(loginData){
			let necessaryAttributes = ["email", "password"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, loginData)){
				requestModul.tryLogin(ACTIONS.TRY_LOGIN, loginData);
				return true;
			}
			else{
				console.log("login failed");
				return false;				
			}		
		}

		/**
		* @function logoutUser
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} userId, 
		* @description logouts the user with the id userId
		*/ 	
		function logoutUser(userId){
			let necessaryAttributes = ["userID"],
				data = {};
				data.userID = userId;
				console.log("logoutUser", data);
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, data)){
				requestModul.tryLogout(ACTIONS.LOGOUT, data);
				return true;
			}
			else{
				console.log("logout failed");
				return false;				
			}				
		}

		//GET DATA

		/**
		* @function getUserId
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} email, 
		* @description requests the userId with the email of the user
		* each email is unique in the databse
		*/ 
		function getUserId(email){
			let data = {};
				data.email = email;
			requestModul.getDataFromDB(ACTIONS.GET_USER_ID, data);
		}

		/**
		* @function getUserData
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} userId, 
		* @description requests the data of the user e.g. the name
		*/ 
		function getUserData(userID){
			let data = {};
				data.userID = userID;
			requestModul.getDataFromDB(ACTIONS.USER_DATA, data);
		}

		/**
		* @function getAllHorsesOfUser
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} userID, 
		* @description requests all horses of the user
		*/ 
		function getAllHorsesOfUser(userID){
			let data = {};
				data.userID = userID;
			requestModul.getDataFromDB(ACTIONS.ALL_HORSES, data);
		}

		/**
		* @function getHorse
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} horseId, 
		* @description requests a horse of the user, with the id horseId
		*/ 
		function getHorse(horseId){
			let data = {};
				data.horseID = horseId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_HORSE, data);
		}

		/**
		* @function getAllDatesOfHorse
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} horseId, 
		* @description requests the dates of a horse, e.g. "smith"
		*/ 
		function getAllDatesOfHorse(horseID){
			let data = {};
				data.horseID = horseID;
			requestModul.getDataFromDB(ACTIONS.ALL_DATES, data);
		}

		/**
		* @function getDate
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateId, 
		* @description requests the date with the id, dateId
		*/ 
		function getDate(dateId){
			let data = {};
				data.dateID = dateId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_DATE, data);
		}

		/**
		* @function getSingleReminder
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateId, 
		* @description requests the reminder with the id, dateId
		*/ 
		function getSingleReminder(dateID){
			let data = {};
				data.dateID = dateID;
			requestModul.getDataFromDB(ACTIONS.GET_SINGLE_REMINDER, data);	
		}

		/**
		* @function getRegularReminder
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateId, 
		* @description requests the regular reminder with the id, dateId
		*/ 
		function getRegularReminder(dateId){
			let data = {};
			data.dateID = dateId;
			requestModul.getDataFromDB(ACTIONS.GET_REGULAR_REMINDER, data);		
		}

		//SET DATA

		/**
		* @function setUserIntoDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} newUser, 
		* @description sets the newUser into the database
		*/ 
		function setUserIntoDB(newUser){
			let necessaryAttributes = ["name", "email", "dateOfBirth", "password"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, newUser)){
				requestModul.setDataIntoDB(ACTIONS.SET_USER, newUser);
				return true;
			}
			else{
				console.log("setUserIntoDB failed");
				return false;				
			}			
		}

		/**
		* @function setHorseIntoDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} newHorse, 
		* @description sets the newHorse into the database
		*/ 
		function setHorseIntoDB(newHorse){
			let standardPhoto = "https://h2795767.stratoserver.net/images/standardPhoto.jpg",
				necessaryAttributes = ["name", "owner", "race", "dateOfBirth", "photo", "sex", "height", "grower", "userID"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, newHorse)){
				newHorse.photo = standardPhoto;
				requestModul.setDataIntoDB(ACTIONS.SET_HORSE, newHorse);
				return true;
			}
			else{
				console.log("setHorseIntoDB failed");
				return false;				
			}			
		}

		/**
		* @function setDateIntoDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} newDate, 
		* @description sets the newDate into the database
		*/ 
		function setDateIntoDB(newDate){
				necessaryAttributes = ["title", "date", "time", "location", "dateFuture","timeFuture", "valueRegular", "unitRegular"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, newDate)){
				requestModul.setDataIntoDB(ACTIONS.SET_DATE, newDate);
				return true;
			}
			else{
				console.log("setDateIntoDB failed");
				return false;				
			}				
		}				

		//DELETE ENTITY


		/**
		* @function deleteUserFromDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} userID, 
		* @description deletes user with id userID from the database
		*/ 
		function deleteUserFromDB(userID){
			let data = {};
			data.userID = userID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_USER, data);
		}

		/**
		* @function deleteHorseFromDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} userID, 
		* @description deletes horse with id horseId from the database
		*/ 
		function deleteHorseFromDB(horseId){
			let data = {};
			data.horseID = horseId;
			requestModul.delteDataFromDB(ACTIONS.DELETE_HORSE, data);
		}

		/**
		* @function deleteDateFromDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateID, 
		* @description deletes date with id horseId from the database
		*/ 
		function deleteDateFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_DATE, data);
		}

		/**
		* @function deleteSingleReminderFromDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateID, 
		* @description deletes the single reminder from the database
		* each reminder has a 1:1 relation to a date
		* therefore it can be delted with the dateID
		*/ 
		function deleteSingleReminderFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_SINGLE_REMINDER, data);
		}

		/**
		* @function deleteRegularReminderFromDB
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {string} dateID, 
		* @description deletes the regular reminder from the database
		* each reminder has a 1:1 relation to a date
		* therefore it can be delted with the dateID
		*/
		function deleteRegularReminderFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_REGULAR_REMINDER, data);
		}

		//UPDATE

		/**
		* @function updateUser
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} oldUser, 
		* @description updates the oldUser in the database
		* oldUser contains the new values
		*/
		function updateUser(oldUser){
			let necessaryAttributes = ["name", "email", "dateOfBirth", "password", "userID"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, oldUser)){
				requestModul.updateDataInDB(ACTIONS.UPDATE_USER, oldUser);
				return true;
			}
			else{
				console.log("updateUserIntoDB failed");
				return false;				
			}	
		}

		/**
		* @function updateHorse
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} oldHorse, 
		* @description updates the oldHorse in the database
		* oldHorse contains the new values
		*/
		function updateHorse(oldHorse){
			let necessaryAttributes = ["horseID", "name", "owner", "race", "dateOfBirth", "photo", "sex", "height", "grower", "userID"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, oldHorse)){
				requestModul.updateDataInDB(ACTIONS.UPDATE_HORSE, oldHorse);
				return true;
			}
			else{
				console.log("updateUserIntoDB failed");
				return false;				
			}
		}

		/**
		* @function updateDate
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} oldDate, 
		* @description updates the oldDate in the database
		* oldDate contains the new values
		*/
		function updateDate(oldDate){
			let necessaryAttributes = ["dateID", "horseID", "title", "date"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, oldDate)){
				requestModul.updateDataInDB(ACTIONS.UPDATE_DATE, oldDate);
				return true;
			}
			else{
				console.log("updateUserIntoDB failed");
				return false;				
			}			
		}

		/**
		* @function updateSingleReminder
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} singleReminder, 
		* @description updates the singleReminder in the database
		* singleReminder contains the new values
		*/
		function updateSingleReminder(singleReminder){
			let necessaryAttributes = ["dateID", "date", "time"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, singleReminder)){
				requestModul.updateDataInDB(ACTIONS.UPDATE_SINGLE_REMINDER, singleReminder);
				return true;
			}
			else{
				console.log("updateUserIntoDB failed");
				return false;				
			}	
		}

		/**
		* @function updateRegularReminder
		* @public
		* @memberof! DatabaseClientInterface  
		* @instance
		* @param {object} regularreminder, 
		* @description updates the regularreminder in the database
		* regularreminder contains the new values
		*/
		function updateRegularReminder(regularreminder){
			let necessaryAttributes = ["dateID", "date", "time", "name", "number"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, regularreminder)){
				requestModul.updateDataInDB(ACTIONS.UPDATE_REGULAR_REMINDER, regularreminder);
				return true;
			}
			else{
				console.log("updateUserIntoDB failed");
				return false;				
			}	
		}

		that.init = init;
		that.tryLogin = tryLogin;
		that.logoutUser = logoutUser;
		that.getUserId = getUserId;
		that.getAllHorsesOfUser = getAllHorsesOfUser;
		that.getAllDatesOfHorse = getAllDatesOfHorse;
		that.getUserData = getUserData;
		that.getHorse = getHorse;
		that.getDate = getDate;
		that.getSingleReminder = getSingleReminder;
		that.getRegularReminder = getRegularReminder;
		that.setHorseIntoDB = setHorseIntoDB;
		that.setUserIntoDB = setUserIntoDB;
		that.setDateIntoDB = setDateIntoDB;
		that.deleteUserFromDB = deleteUserFromDB;
		that.deleteHorseFromDB = deleteHorseFromDB;
		that.deleteDateFromDB = deleteDateFromDB;
		that.deleteSingleReminderFromDB = deleteSingleReminderFromDB;
		that.deleteRegularReminderFromDB = deleteRegularReminderFromDB;
		that.updateUser = updateUser;
		that.updateHorse = updateHorse;
		that.updateDate = updateDate;
		that.updateSingleReminder = updateSingleReminder;
		that.updateRegularReminder = updateRegularReminder;
		return that;
}