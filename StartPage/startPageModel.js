var StartPage = StartPage || {};

StartPage.Model = function(userId){
	return DatabaseClientInterface.SimpleRequester("getAllHorsesOfUser", userId); 
}