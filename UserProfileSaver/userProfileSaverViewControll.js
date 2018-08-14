var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.ViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "userSaverChange",
			OKAY_BUTTON_ID = "userSaverOk",
			DELETE_BUTTON_ID = "userSaverDelete";					
	return Profil.ProfileViewAndControll(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
}