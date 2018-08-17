RegulardatesCreater.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		regularDate;

	function init(newDate) {
		regularDate = newDate;
		addUserId();
		initRequester();
	}

	function addUserId(){
		regularDate.userID = userID;
		regularDate.horseID = horseID;
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(regularDate, "setUserIntoDB");
		requester.init();
	}

	function saveDateIntoDB(newDate)
	{	console.log("saveUserIntoDB", user);
		regularDate = Object.assign(regularDate, newDate);
		//requester.request();
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}