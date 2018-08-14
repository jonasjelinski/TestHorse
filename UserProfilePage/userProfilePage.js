var UserProfilPage = UserProfilPage || {};

UserProfilPage = function(userId){
	const PAGE_ID = "mainpage",
		TEMPLATE_ID = "userProfileTemplate",
		REQUEST_FUNCTION = "getUserData";		
		model = new UserProfilPage.UserProfilPageModel(userId, REQUEST_FUNCTION);
		
	let testData = {name:"Hans", email: "h@h", password: "123", },
		that = Profil(PAGE_ID, TEMPLATE_ID, UserProfilPage.UserProfilPageViewControll);

		function initPage(){
			getDataFromDB();
			that.init(testData);
		}

		function getDataFromDB(){
			//return model.request;
		}
	that.initPage = initPage;
	return that;
}