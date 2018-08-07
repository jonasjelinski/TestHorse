var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface = function(){
	
	const ACTIONS = {
		TRY_LOGIN: "loginUser",
		LOGOUT: "logoutUser",
		ALL_HORSES: "getAllHorsesOfUser",
		SINGLE_HORSE: "getHorse",
		ALL_DATES: "getAllDatesOfUser",
		SINGLE_DATE: "getDate",
		ALL_REMINDERS: "getAllRemindersOfUser",
		SINGLE_REMINDER: "getReminder",
		ALL_AGREEMENTS: "getAllAgreementsOfUser",
		SINGLE_AGREEMENT: "getAgreement",
		USER_DATA:"getUserData",
		SET_USER : "setUserIntoDB",
		SET_HORSE : "setHorseIntoDB",
		SET_DATE : "setDateIntoDB",
		SET_REMINDER : "setReminderIntoDB",
		SET_AGREEMENT : "?????",
		DELETE_USER : "deleteUserFromDB",
		DELETE_HORSE : "deleteHorseFromDB",
		DELETE_DATE : "deleteDateFromDB",
		DELETE_REMINDER : "deleteReminderFromDB",
		DELETE_AGREEMENT : "deleteAgreementFromDB",
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
		UPDATE_AGREEMENT: "????",
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
				event.details.data = ev.details.data;
			that.dispatchEvent(event);
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

		function getUserData(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(ACTIONS.USER_DATA, data);
		}

		function getAllHorsesOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_HORSES, data);
		}

		function getHorse(horseId){
			let data = {};
				data.id = horseId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_HORSE, data);
		}

		function getAllDatesOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_DATES, data);
		}

		function getDate(dateId){
			let data = {};
				data.id = dateId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_DATE, data);
		}

		function getAllRemindersOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_REMINDERS, data);	
		}

		function getReminder(reminderId){
			let data = {};
				data.id = reminderId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_REMINDER, data);	
		}

		function getAllAgreementsOfUser(userId){
			let data = {};
			data.id = userId;
			requestModul.getDataFromDB(ACTIONS.ALL_AGREEMENTS, data);		
		}

		function getAgreement(agreementId){
			let data = {};
			data.id = agreementId;
			requestModul.getDataFromDB(ACTIONS.SINGLE_AGREEMENT, data);		
		}

		//SET DATA

		function setUserIntoDB(name, email, dateOfBirth, password){
			let data = {
				name: name,
				email: email,
				dateOfBirth: dateOfBirth,
				password : password,
			};
			requestModul.setDataIntoDB(ACTIONS.SET_USER, data);
		}

		function setHorseIntoDB(name, owner, race, dateOfBirth, photoSrc, sex, height, grower, userID){
			let data = {
				name: name,
				owner: owner,
				race: race,
				dateOfBirth : dateOfBirth,
				photo: photoSrc,
				sex : sex, 
				height: height, 
				grower: grower,
				userID: userID,
			};
			requestModul.setDataIntoDB(ACTIONS.SET_HORSE, data);
		}

		function setDateIntoDB(title, date, time, location, regular, reminder, userID){
			let data = {
				userID: userID,
				title: title,
				date: date,
				time: time,
				location : location,				
				reminder : reminder,
				regular: regular,
			};
			requestModul.setDataIntoDB(ACTIONS.SET_DATE, data);
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

		function deleteAgreementFromDB(agreementId){
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

		function updateAgreement(agreementId, valueObject){
			updateEntity(ACTIONS.UPDATE_AGREEMENT, agreementId, valueObject);
		}

		that.init = init;
		that.tryLogin = tryLogin;
		that.logoutUser = logoutUser;
		that.getAllHorsesOfUser = getAllHorsesOfUser;
		that.getAllRemindersOfUser = getAllRemindersOfUser;
		that.getAllDatesOfUser = getAllDatesOfUser;
		that.getAllAgreementsOfUser = getAllAgreementsOfUser;
		that.getUserData = getUserData;
		that.getHorse = getHorse;
		that.getDate = getDate;
		that.getReminder = getReminder;
		that.getAgreement = getAgreement;
		that.setHorseIntoDB = setHorseIntoDB;
		that.setUserIntoDB = setUserIntoDB;
		that.setDateIntoDB = setDateIntoDB;
		that.setReminderIntoDB = setReminderIntoDB;
		that.setAppointmentIntoDB = setAppointmentIntoDB;
		that.deleteUserFromDB = deleteUserFromDB;
		that.deleteHorseFromDB = deleteHorseFromDB;
		that.deleteDateFromDB = deleteDateFromDB;
		that.deleteReminderFromDB = deleteReminderFromDB;
		that.deleteAgreementFromDB = deleteAgreementFromDB;
		that.updateUser = updateUser;
		that.updateHorse = updateHorse;
		that.updateEntity = updateEntity;
		that.updateDate = updateDate;
		that.updateReminder = updateReminder;
		that.updateAgreement = updateAgreement;
		return that;
}