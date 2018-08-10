var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger.ViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "horseChangeChange",
			OKAY_BUTTON_ID = "horseChangeOk",
			DELETE_BUTTON_ID = "horseChangeDelete";					
	return Profil.ProfileDisplayPage(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
}