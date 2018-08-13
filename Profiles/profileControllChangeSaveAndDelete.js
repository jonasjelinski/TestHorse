var Profil = Profil || {};

Profil.ProfileControllChangeSaveAndDelete = function(changeButtonId, saveButtonId, delteButtonId){
	const SAVE_EVENT_TYPE = "onSave";
	return Profil.ProfilControllChangeAndDelete(changeButtonId, saveButtonId, delteButtonId, SAVE_EVENT_TYPE);
}