var UserProfilPage = UserProfilPage || {};

UserProfilPage.UserProfilPageViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "userProfileChange",
			OKAY_BUTTON_ID = "userProfileOk",
			DELETE_BUTTON_ID = "userProfileDelete";
					
	return Profil.ProfileDisplayPage(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);

}  