var Profil = Profil || {};

Profil.ProfilModel = function(requestParamater, requestFunction){
	return DatabaseClientInterface.SimpleRequester(requestParamater, requestFunction);
}