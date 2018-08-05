var Profil = Profil || {};

Profil.ProfileDisplayControll = function(changeButtonId, saveButtonId, delteButtonId){
	const OKAY_EVENT_TYPE = "onOkay";
	return Profil.ProfilControllTypes(changeButtonId, saveButtonId, delteButtonId, OKAY_EVENT_TYPE);
}