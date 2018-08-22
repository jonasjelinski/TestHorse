var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace HorseProfile 
 * @memberof! HorseProfilePage
 * @description returns an instance of <code>Profil</code>
 */
HorseProfilePage.HorseProfile = function(){
	"user strict";
	const PAGE_ID = "horseProfile",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData",
	CHANGE_BUTTON_ID = "horseProfileChange",
	OKAY_BUTTON_ID = "horseProfileOk",
	DELETE_BUTTON_ID = "horseProfileDelete";
	
	return Profil(PAGE_ID, TEMPLATE_ID, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
} 