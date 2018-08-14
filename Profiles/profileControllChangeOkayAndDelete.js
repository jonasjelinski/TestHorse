var Profil = Profil || {};

Profil.ProfileControllChangeOkayAndDelete = function(changeButtonId, okayButtonId, delteButtonId){
	const OKAY_EVENT_TYPE = "onOkay";
	return Profil.ProfilControllChangeAndDelete(changeButtonId, okayButtonId, delteButtonId, OKAY_EVENT_TYPE);
}