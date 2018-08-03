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
		USER_DATA:"",
		SET_USER : "",
		SET_HORSE : "",
		SET_DATE : "",
		SET_REMINDER : "",
		SET_APPOINTMENT : "",
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
				data.userId = userId;
				data.password;
			requestModul.tryLogin(URLS.TRY_LOGIN, data);
		}

		function logoutUser(userId){
			let data = {};
				data.userId = userId;
			requestModul.tryLogout(URLS.LOGOUT, data);
		}


		//GET DATA

		function getAllHorsesOfUser(userId){
			let data = {};
				data.userId = userId;
			requestModul.getDataFromDB(URLS.ALL_HORSES, data);
		}

		function getHorse(horseId){
			let data = {};
				data.horseId = horseId;
			requestModul.getDataFromDB(URLS.SINGLE_HORSE, data);
		}

		function getAllDatesOfUser(userId){
			let data = {};
				data.userId = userId;
			requestModul.getDataFromDB(URLS.ALL_DATES, data);
		}

		function getDate(dateId){
			let data = {};
				data.dateId = dateId;
			requestModul.getDataFromDB(URLS.SINGLE_DATE, data);
		}

		function getAllRemindersOfUser(userId){
			let data = {};
				data.dateId = userId;
			requestModul.getDataFromDB(URLS.ALL_REMINDERS, data);	
		}

		function getReminder(reminderId){
			let data = {};
				data.reminderId = reminderId;
			requestModul.getDataFromDB(URLS.SINGLE_REMINDER, data);	
		}

		function getUserData(userId){
			let data = {};
				data.userId = userId;
			requestModul.getDataFromDB(URLS.USER_DATA, data);
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

		function deleteHorseFromDB(){

		}

		function deleteDateFromDB(){

		}

		function deleteReminderFromDB(){

		}

		function deleteAgreementFromDB(){

		}

		function deleteUserFromDB(){

		}

		//UPDATE 

		function updateHorse(){

		}

		function updateDate(){

		}

		function updateReminder(){

		}

		function updateAgreement(){

		}

		function updateUser(){

		}

}