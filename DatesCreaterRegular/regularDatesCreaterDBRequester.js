var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

RegulardatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		singleDate;

	function init(newDate) {
		singleDate = newDate;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function saveDateIntoDB(newDate){
		let idData = {userID, horseID},
			dataToSave = Object.assign(idData, newDate);	
			//hadCorrectParameter = requester.setDateIntoDB(dataToSave);
		//handleParameterFeedBack(hadCorrectParameter, newDate);
	}

	function handleParameterFeedBack(hadCorrectParameter, newDate){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newDate);
		}
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}