var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.HorseProfilePageViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "horseProfileChange",
			OKAY_BUTTON_ID = "horseProfileOk",
			DELETE_BUTTON_ID = "horseProfileDelete";
					
	return Profil.ProfileViewAndControll(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);

}  