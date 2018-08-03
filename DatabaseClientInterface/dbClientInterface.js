var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface = function(){
	
	const URLS = {
		TRY_LOGIN: "",
		LOGOUT: "",
		ALL_HORSES: "",
		SINGLE_HORSE: "",
		ALL_DATES: "",
		SINGLE_DATE: "",
		ALL_REMINDERS: "",
		SINGLE_REMINDER: "",
		ALL_AGREEMENTS: "",
		SINGLE_AGREEMENT: "",
		USER_DATA:"",
		SET_USER : "",
		SET_HORSE : "",
		SET_DATE : "",
		SET_REMINDER : "",
		SET_APPOINTMENT : "",
		DELETE_USER : "",
		DELETE_HORSE : "",
		DELETE_DATE : "",
		DELETE_REMINDER : "",
		DELETE_APPOINTMENT : "",
		UPDATE_USER : "",
		UPDATE_HORSE : "",
		UPDATE_DATE : "",
		UPDATE_REMINDER : "",
		UPDATE_APPOINTMENT : "",
	}

	let that = new EventTarget(),
		requestModul;

		function init(){
			requestModul = new RequestModul();
			requestModul.addEventListener("onResult", sendResultData);
		}

		function sendResultData(){
			let event = new Event("onResult");
			that.dispatchEvent(event);
		}

		//LOGIN AND LOGOUT

		function tryLogin(wantsToStayLoggedIn, userId, password){
			let data = {};
				data.stayLoggedIn = wantsToStayLoggedIn;
				data.id = userId;
				data.password;
			requestModul.tryLogin(URLS.TRY_LOGIN, data);
		}

		function logoutUser(userId){
			let data = {};
				data.id = userId;
			requestModul.tryLogout(URLS.LOGOUT, data);
		}


		//GET DATA

		function getAllHorsesOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(URLS.ALL_HORSES, data);
		}

		function getHorse(horseId){
			let data = {};
				data.id = horseId;
			requestModul.getDataFromDB(URLS.SINGLE_HORSE, data);
		}

		function getAllDatesOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(URLS.ALL_DATES, data);
		}

		function getDate(dateId){
			let data = {};
				data.id = dateId;
			requestModul.getDataFromDB(URLS.SINGLE_DATE, data);
		}

		function getAllRemindersOfUser(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(URLS.ALL_REMINDERS, data);	
		}

		function getReminder(reminderId){
			let data = {};
				data.id = reminderId;
			requestModul.getDataFromDB(URLS.SINGLE_REMINDER, data);	
		}

		function getUserData(userId){
			let data = {};
				data.id = userId;
			requestModul.getDataFromDB(URLS.USER_DATA, data);
		}

		function getAllAgreementsOfUser(userId){
			let data = {};
			data.id = userId;
			requestModul.getDataFromDB(URLS.ALL_AGREEMENTS, data);		
		}

		function getAgreement(agreementId){
			let data = {};
			data.id = agreementId;
			requestModul.getDataFromDB(URLS.SINGLE_AGREEMENT, data);		
		}

		//SET DATA

		function setUserIntoDB(name, email, dateOfBirth, password){
			let data = {
				name: name,
				email: email,
				dateOfBirth: dateOfBirth,
				password : password,
			};
			requestModul.setDataIntoDB(URLS.SET_USER, data);
		}

		function setHorseIntoDB(name, owner, race, dateOfBirth, photoSrc, sex, height, grower){
			let data = {
				name: name,
				owner: owner,
				race: race,
				dateOfBirth : dateOfBirth,
				photo: photoSrc,
				sex : sex, 
				height: height, 
				grower: grower,
			};
			requestModul.setDataIntoDB(URLS.SET_HORSE, data);
		}

		function setDateIntoDB(title, date, time, location, regular, reminder){
			let data = {
				title: title,
				date: date,
				time: time,
				location : location,
				regular: regular,
				reminder : reminder, 
			};
			requestModul.setDataIntoDB(URLS.SET_DATE, data);
		}

		function setReminderIntoDB(title, date, time, location, parentDate){
			let data = {
				title: title,
				date: date,
				time: time,
				location : location,
				parentDate: dateId,
			};
			requestModul.setDataIntoDB(URLS.SET_REMINDER, data);
		}

		function setAppointmentIntoDB(title, dateToShow, timeToShow, dateOfFutureDate, timeOfFutureDate){
			let data = {
				title: title,
				dateToShow: date,
				timeToShow: time,
				dateOfFutureDate : location,
				timeOfFutureDate: dateId,
			};
			requestModul.setDataIntoDB(URLS.SET_APPOINTMENT, data);
		}		

		//DELETE ENTITY

		function deleteUserFromDB(userId){
			deleteEntityFromDB(URLS.DELETE_USER, id);
		}

		function deleteEntityFromDB(url, id){
			let data = {};
			data.id = id;
			requestModul.delteDataFromDB(url, data);
		}

		function deleteHorseFromDB(horseId){
			deleteEntityFromDB(URLS.DELETE_HORSE, horseId);
		}

		function deleteDateFromDB(dateId){
			deleteEntityFromDB(URLS.DELETE_DATE, dateId);
		}

		function deleteReminderFromDB(reminderId){
			deleteEntityFromDB(URLS.DELETE_REMINDER, reminderId);
		}

		function deleteAgreementFromDB(agreementId){
			deleteEntityFromDB(URLS.DELETE_AGREEMENT, agreementId);
		}

		//UPDATE

		function updateUser(userId, valueObject){
			updateEntity(URLS.UPDATE_USER, userId, valueObject);
		} 

		function updateHorse(horseId, valueObject){
			updateEntity(URLS.UPDATE_HORSE, horseId, valueObject);
		}

		function updateEntity(url, id, valueObject){
			data = {};
			data.id = id;
			data = Object.assign(data, valueObject);
			requestModul.updateDataInDB(url, data);
		}

		function updateDate(dateId, valueObject){
			updateEntity(URLS.UPDATE_DATE, dateId, valueObject);
		}

		function updateReminder(reminderId, valueObject){
			updateEntity(URLS.UPDATE_REMINDER, reminderId, valueObject);
		}

		function updateAgreement(agreementId, valueObject){
			updateEntity(URLS.UPDATE_AGREEMENT, agreementId, valueObject);
		}

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