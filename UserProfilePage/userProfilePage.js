var UserProfilPage = UserProfilPage || {};

UserProfilPage = function(userId){
	const PAGE_ID = "mainpage",
		TEMPLATE_ID = "userProfileTemplate",
		REQUEST_FUNCTION = "getUserData";		
		model = new UserProfilPage.UserProfilPageModel(userId, REQUEST_FUNCTION);;
	let data = {userProfileName:"Hans", userProfileMail: "h@h", userProfilePassword: "123", };
	return Profil(userId, PAGE_ID, TEMPLATE_ID, data, UserProfilPage.UserProfilPageViewControll, model);
}