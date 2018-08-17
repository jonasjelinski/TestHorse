var DatesPageAll = DatesPageAll || {};

DatesPageAll.DBRequester = function(userID, horseID){
	return DatabaseClientInterface.SimpleRequester("getAllDatesOfUser", userID, horseID); 
}