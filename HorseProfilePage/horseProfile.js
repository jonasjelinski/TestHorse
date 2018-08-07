var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage = function(horseId){
	"user strict";
	const PAGE_ID = "horseProfil",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData";

	let data = {name :"dieter", birth: "24.0488", race: "harfling",  comp: "ja", owner: "klaus", sex: "male", height :"1, 60m"}
		model = new HorseProfilePage.HorseProfileModel(horseId, REQUEST_FUNCTION);
	return Profil(horseId, PAGE_ID, TEMPLATE_ID, data, HorseProfilePage.HorseProfilePageViewControll, model);
} 