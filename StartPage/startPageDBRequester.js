var StartPage = StartPage || {};

StartPage.DBRequester = function(userID){
	return DatabaseClientInterface.SimpleRequester("getAllHorsesOfUser", userID); 
}