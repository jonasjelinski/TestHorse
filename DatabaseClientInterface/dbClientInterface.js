var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface = function(){
	
	const ACTIONS = {
		TRY_LOGIN: "loginUser",
		LOGOUT: "logoutUser",
		GET_USER_ID: "getUserId",
		ALL_HORSES: "getAllHorsesOfUser",
		SINGLE_HORSE: "getHorse",
		ALL_DATES: "getAllHorseDates",
		SINGLE_DATE: "getHorseDate",
		ALL_REMINDERS: "getAllRemindersOfUser",
		SINGLE_REMINDER: "getReminderNotification",
		ALL_REGULAR_REMINDERS: "getAllAgreementsOfUser",
		SINGLE_REGULAR_REMINDER: "getReminderRegular",
		USER_DATA:"getUserData",
		SET_USER : "setUserIntoDB",
		SET_HORSE : "setHorseIntoDB",
		SET_DATE : "setDateIntoDB",
		SET_REMINDER : "setReminderIntoDB",
		SET_REGULAR_REMINDER : "?????",
		DELETE_USER : "deleteUserFromDB",
		DELETE_HORSE : "deleteHorseFromDB",
		DELETE_DATE : "deleteDateFromDB",
		DELETE_REMINDER : "deleteReminderFromDB",
		DELETE_REGULAR_REMINDER : "deleteAgreementFromDB",
		UPDATE_USER_NAME : "updateUserName",
		UPDATE_USER_EMAIL : "?????",
		UPDATE_USER_PASSWORD : "updateUserName",
		UPDATE_USER_BIRTH : "updateUserDateOfBirth",
		UPDATE_HORSE_NAME : "updateHorseName",
		UPDATE_HORSE_OWNER : "updateHorseOwner",
		UPDATE_HORSE_RACE : "updateHorseRace",
		UPDATE_HORSE_BIRTH : "updateHorseDateOfBirth",
		UPDATE_HORSE_PHOTO : "updateHorseDateOfBirth",
		UPDATE_HORSE_SEX : "updateHorseSex",
		UPDATE_HORSE_HEIGHT : "updateHorseHeight",
		UPDATE_HORSE_GROWER : "updateHorseGrower",
		UPDATE_DATE : "?????",
		UPDATE_REMINDER : "????",
		UPDATE_REGULAR_REMINDER: "????",
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

		function tryLogin(wantsToStayLoggedIn, userId, password){
			let data = {};
				data.stayLoggedIn = wantsToStayLoggedIn;
				data.id = userId;
				data.password;
			requestModul.tryLogin(ACTIONS.TRY_LOGIN, data);
		}

		function logoutUser(userId){
			let data = {};
				data.id = userId;
			requestModul.tryLogout(ACTIONS.LOGOUT, data);
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

		function getAllRemindersOfUser(userId){
			let data = {};
				data.dateID = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_REMINDERS, data);	
		}

		function getReminder(dateID){
			let data = {};
				data.dateID = dateID;
			requestModul.getDataFromDB(ACTIONS.SINGLE_REMINDER, data);	
		}

		function getAllregularRemindersOfUser(userId){
			let data = {};
			data.id = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_AGREEMENTS, data);		
		}

		function getregularReminder(regularReminderId){
			let data = {};
			data.id = regularReminderId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_AGREEMENT, data);		
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
				console.log("setUserIntoDB failed");
				return false;				
			}			
		}

		//title, date, time, location, horseID, userID
		function setDateIntoDB(newDate){
				necessaryAttributes = ["title", "date", "time", "location", "horseID", "userID"];
			if(allNecessaryDataHaveBeenParsed(necessaryAttributes, newDate)){
				requestModul.setDataIntoDB(ACTIONS.SET_DATE, newDate);
				return true;
			}
			else{
				console.log("setUserIntoDB failed");
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

		function deleteUserFromDB(userId){
			deleteEntityFromDB(ACTIONS.DELETE_USER, id);
		}

		function deleteEntityFromDB(url, id){
			let data = {};
			data.id = id;
			requestModul.delteDataFromDB(url, data);
		}

		function deleteHorseFromDB(horseId){
			deleteEntityFromDB(ACTIONS.DELETE_HORSE, horseId);
		}

		function deleteDateFromDB(dateId){
			deleteEntityFromDB(ACTIONS.DELETE_DATE, dateId);
		}

		function deleteReminderFromDB(reminderId){
			deleteEntityFromDB(ACTIONS.DELETE_REMINDER, reminderId);
		}

		function deleteregularReminderFromDB(agreementId){
			deleteEntityFromDB(ACTIONS.DELETE_AGREEMENT, agreementId);
		}

		//UPDATE

		function updateUser(userId, valueObject){
			updateEntity(ACTIONS.UPDATE_USER, userId, valueObject);
		} 

		function updateHorse(horseId, valueObject){
			updateEntity(ACTIONS.UPDATE_HORSE, horseId, valueObject);
		}

		function updateEntity(url, id, valueObject){
			data = {};
			data.id = id;
			data = Object.assign(data, valueObject);
			requestModul.updateDataInDB(url, data);
		}

		function updateDate(dateId, valueObject){
			updateEntity(ACTIONS.UPDATE_DATE, dateId, valueObject);
		}

		function updateReminder(reminderId, valueObject){
			updateEntity(ACTIONS.UPDATE_REMINDER, reminderId, valueObject);
		}

		function updateregularReminder(regularReminderId, valueObject){
			updateEntity(ACTIONS.UPDATE_AGREEMENT, regularReminderId, valueObject);
		}

		that.init = init;
		that.tryLogin = tryLogin;
		that.logoutUser = logoutUser;
		that.getUserId = getUserId;
		that.getAllHorsesOfUser = getAllHorsesOfUser;
		that.getAllRemindersOfUser = getAllRemindersOfUser;
		that.getAllDatesOfHorse = getAllDatesOfHorse;
		that.getAllregularRemindersOfUser = getAllregularRemindersOfUser;
		that.getUserData = getUserData;
		that.getHorse = getHorse;
		that.getDate = getDate;
		that.getReminder = getReminder;
		that.getregularReminder = getregularReminder;
		that.setHorseIntoDB = setHorseIntoDB;
		that.setUserIntoDB = setUserIntoDB;
		that.setDateIntoDB = setDateIntoDB;
		that.setReminderIntoDB = setReminderIntoDB;
		that.setAppointmentIntoDB = setAppointmentIntoDB;
		that.deleteUserFromDB = deleteUserFromDB;
		that.deleteHorseFromDB = deleteHorseFromDB;
		that.deleteDateFromDB = deleteDateFromDB;
		that.deleteReminderFromDB = deleteReminderFromDB;
		that.deleteregularReminderFromDB = deleteregularReminderFromDB;
		that.updateUser = updateUser;
		that.updateHorse = updateHorse;
		that.updateEntity = updateEntity;
		that.updateDate = updateDate;
		that.updateReminder = updateReminder;
		that.updateregularReminder = updateregularReminder;
		return that;
}