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

	function handleResult(event){
		let result = event.details.result;
		console.log("horse saver result", result);
	}

	function saveDateIntoDB(changedDate){
		oldDate = changedDate;
		changedDate.horseID = changedDate.horse_id;
		changedDate.dateID = changedDate.id;
		delete changedDate.horse_id;
		delete changedDate.id;
		hadCorrectParameter = requester.updateDate(changedDate);
		handleParameterFeedBack(hadCorrectParameter, changedDate);
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