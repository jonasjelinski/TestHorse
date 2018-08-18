DatesChangerPageSingle.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		oldDate;

	function init(oldDate) {
		oldDate = oldDate;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function saveDateIntoDB(changedDate){
		oldDate = changedDate;
		console.log("changedDate",changedDate);
			//hadCorrectParameter = requester.updateDate(changedDate);
		//handleParameterFeedBack(hadCorrectParameter, changedDate);
	}

	function handleParameterFeedBack(hadCorrectParameter, changedDate){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", changedDate);
		}
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}