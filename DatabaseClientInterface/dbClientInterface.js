var DatabaseClientInterface = DatabaseClientInterface || {}; 

DatabaseClientInterface = function(){
	const URLS = {
		TRY_LOGIN: "",
		ALL_HORSES: "",
		SINGLE_HORSE: "",
		ALL_DATES: "",
		SINGLE_DATE: "",
		ALL_REMINDERS: "",
		SINGLE_REMINDER: "",
		USER_DATA:"",
	}

	let that = {},
		requestModul;

		function init(){
			requestModul = new RequestModul();
		}

		//LOGIN AND LOGOUT

		function tryLogin(wantsToStayLoggedIn, userId, password){
			let data = {};
				data.stayLoggedIn = wantsToStayLoggedIn;
				data.userId = userId;
				data.password;
			requestModul.getDataFromDB(URLS.TRY_LOGIN, data);
		}

		function logoutUser(userId){

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

		function setHorseIntoDB(){

		}

		function setDateIntoDB(){

		}

		function setReminderIntoDB(){

		}

		function setUserIntoDB(){

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