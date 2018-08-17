
SingleDatesCreator.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		singleDate;

	function init(newDate) {
		singleDate = newDate;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(userID, horseID, singleDate, "setDateIntoDB");
		requester.init();
	}

	function saveDateIntoDB(newDate)
	{	console.log("saveDateIntoDB", newDate);
		singleDate = Object.assign(singleDate, newDate);
		//requester.request();
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}