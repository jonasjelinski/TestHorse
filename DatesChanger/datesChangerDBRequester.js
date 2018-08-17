DatesChangerPageSingle.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		newDate;

	function init(newDate) {
		singleDate = newDate;;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(userID, horseID, singleDate, "updateDate");
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