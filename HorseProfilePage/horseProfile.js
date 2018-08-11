var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage = function(horseId){
	"user strict";
	const PAGE_ID = "horseProfile",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData";

	let model = new HorseProfilePage.HorseProfileModel(horseId, REQUEST_FUNCTION);
	return Profil(PAGE_ID, TEMPLATE_ID, HorseProfilePage.HorseProfilePageViewControll);
} 