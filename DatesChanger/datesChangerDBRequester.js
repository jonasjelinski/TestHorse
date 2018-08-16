DatesChangerPageSingle.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		newDate;

	function init(newDate) {
		singleDate = newDate;
		addUserId();
		initRequester();
	}

	function addUserId(){
		singleDate.userID = userID;
		regularDate.horseID = horseID;
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(singleDate, "updateDate");
		requester.init();
	}

	function saveDateIntoDB()
	{	console.log("saveUserIntoDB", user);
		//requester.request();
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}