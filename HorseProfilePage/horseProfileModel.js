var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.HorseProfileModul = function(horseId){
	const DATABASE_REQUEST = "getHorseData";
	return Profil.ProfilModel(horseId, DATABASE_REQUEST); 
} 