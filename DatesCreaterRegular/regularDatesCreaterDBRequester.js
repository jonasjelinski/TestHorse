RegulardatesCreater.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		regularDate;

	function init(newDate) {
		regularDate = newDate;
		initRequester();
	}	

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(userID, horseID,regularDate, "setDateIntoDB");
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