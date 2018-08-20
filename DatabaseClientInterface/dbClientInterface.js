var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface = function(){
	
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

		function init(){
			requestModul = new DatabaseClientInterface.RequestModul ();
			requestModul.addEventListener("onResult", sendResultData);
		}

		function sendResultData(ev){
			let event = new Event("onResult");
				event.details = {};
				event.details.result = ev.details.result;			
			that.dispatchEvent(event);
		}

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

		function attributeIsMissing(attribute){
			if(attribute === undefined){
				return true;
			}
			return false;
		}

		//LOGIN AND LOGOUT

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

		function getUserId(email){
			let data = {};
				data.email = email;
			requestModul.getDataFromDB(ACTIONS.GET_USER_ID, data);
		}

		function getUserData(userID){
			let data = {};
				data.userID = userID;
			requestModul.getDataFromDB(ACTIONS.USER_DATA, data);
		}

		function getAllHorsesOfUser(userID){
			let data = {};
				data.userID = userID;
			requestModul.getDataFromDB(ACTIONS.ALL_HORSES, data);
		}

		function getHorse(horseId){
			let data = {};
				data.horseID = horseId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_HORSE, data);
		}

		function getAllDatesOfHorse(horseID){
			let data = {};
				data.horseID = horseID;
			requestModul.getDataFromDB(ACTIONS.ALL_DATES, data);
		}

		function getDate(dateId){
			let data = {};
				data.dateID = dateId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_DATE, data);
		}

		function getSingleReminder(dateID){
			let data = {};
				data.dateID = dateID;
			requestModul.getDataFromDB(ACTIONS.GET_SINGLE_REMINDER, data);	
		}

		function getRegularReminder(dateId){
			let data = {};
			data.dateID = dateId;
			requestModul.getDataFromDB(ACTIONS.GET_REGULAR_REMINDER, data);		
		}

		//SET DATA

		//newUser : name, email, dateOfBirth, password
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

		//title, date, time, location, horseID, userID
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

		function setReminderIntoDB(title, date, time, location, parentDate, dateID){
			let data = {
				title: title,
				date: date,
				time: time,
				location : location,
				dateID: dateID,
			};
			requestModul.setDataIntoDB(ACTIONS.SET_REMINDER, data);
		}

		function setAppointmentIntoDB(title, dateToShow, timeToShow, dateOfFutureDate, timeOfFutureDate){
			let data = {
				title: title,
				dateToShow: date,
				timeToShow: time,
				dateOfFutureDate : location,
				timeOfFutureDate: dateId,
			};
			requestModul.setDataIntoDB(ACTIONS.SET_APPOINTMENT, data);
		}		

		//DELETE ENTITY

		function deleteUserFromDB(userID){
			let data = {};
			data.userID = userID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_USER, data);
		}

		function deleteEntityFromDB(action, id){
			let data = {};
			data.id = id;
			requestModul.delteDataFromDB(action, data);
		}

		function deleteHorseFromDB(horseId){
			let data = {};
			data.horseID = horseId;
			requestModul.delteDataFromDB(ACTIONS.DELETE_HORSE, data);
		}

		function deleteDateFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_DATE, data);
		}

		function deleteSingleReminderFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_SINGLE_REMINDER, data);
		}

		function deleteRegularReminderFromDB(dateID){
			let data = {};
			data.dateID = dateID;
			requestModul.delteDataFromDB(ACTIONS.DELETE_REGULAR_REMINDER, data);
		}

		//UPDATE

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

		function updateEntity(url, id, valueObject){
			data = {};
			data.id = id;
			data = Object.assign(data, valueObject);
			requestModul.updateDataInDB(url, data);
		}

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
		that.setReminderIntoDB = setReminderIntoDB;
		that.setAppointmentIntoDB = setAppointmentIntoDB;
		that.deleteUserFromDB = deleteUserFromDB;
		that.deleteHorseFromDB = deleteHorseFromDB;
		that.deleteDateFromDB = deleteDateFromDB;
		that.deleteSingleReminderFromDB = deleteSingleReminderFromDB;
		that.deleteRegularReminderFromDB = deleteRegularReminderFromDB;
		that.updateUser = updateUser;
		that.updateHorse = updateHorse;
		that.updateEntity = updateEntity;
		that.updateDate = updateDate;
		that.updateSingleReminder = updateSingleReminder;
		that.updateRegularReminder = updateRegularReminder;
		return that;
}