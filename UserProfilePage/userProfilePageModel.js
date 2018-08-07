var UserProfilPage = UserProfilPage || {};

UserProfilPage.UserProfilPageModel = function(userId){
	const DATABASE_REQUEST = "getUserData";
	return Profil.ProfilModel(userId, DATABASE_REQUEST);
}
