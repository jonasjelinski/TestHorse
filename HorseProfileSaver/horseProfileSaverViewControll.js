var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver.ViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "horseSaverChange",
			OKAY_BUTTON_ID = "horseSaverOk",
			DELETE_BUTTON_ID = "horseSaverDelete";					
	return Profil.ProfileDisplayPage(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
}