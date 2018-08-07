var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.HorseProfileModel = function(horseId){
	const DATABASE_REQUEST = "getHorseData";
	return Profil.ProfilModel(horseId, DATABASE_REQUEST); 
} 