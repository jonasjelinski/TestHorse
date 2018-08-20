var UserProfilPage = UserProfilPage || {};

UserProfilPage = function(userID){
	const PAGE_ID = "mainpage",
		TEMPLATE_ID = "userProfileTemplate",
		REQUEST_FUNCTION = "getUserData";		
		
		
	let testData = {name:"Hans", email: "h@h", password: "123", },
		dbInterface,
		model,
		that = Profil(PAGE_ID, TEMPLATE_ID, UserProfilPage.UserProfilPageViewControll);

		function initPage(){
			initDBRequester();
			getUserDataFromDB();			
		}
		
		function initDBRequester(){
			dbInterface = new UserProfilPage.DBRequester(userID);
			dbInterface.addEventListener("onResult", handleResult);
			dbInterface.init();
		}

		function handleResult(event){
			let userData = event.details.userData;
			initModel(userData);			
		}

		function initModel(userData){
			model = new Profil.ProfilModel();
			model.addEventListener("onDataConverted", handleConvertedData)
			model.init(userData);
		}

		function handleConvertedData(event){
			let userData = event.details.userData;
			initProfilePage(userData);
		}

		function initProfilePage(userData){
			that.init(userData);
		}

		function getUserDataFromDB(){
			dbInterface.requestDatesFromDB();
		}

	that.initPage = initPage;
	return that;
}