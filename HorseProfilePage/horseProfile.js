var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.HorseProfile = function(horseId){
	"user strict";
	const PAGE_ID = "horseProfile",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData";

	return Profil(PAGE_ID, TEMPLATE_ID, HorseProfilePage.HorseProfilePageViewControll);
} 