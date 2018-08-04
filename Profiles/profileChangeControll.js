var Profil = Profil || {};

Profil.ProfileChangeControll = function(changeButtonId, saveButtonId, delteButtonId){
	const SAVE_EVENT_TYPE = "onSave";
	return Profil.ProfilControllTypes(changeButtonId, saveButtonId, delteButtonId, SAVE_EVENT_TYPE);
}