DatesChangerPageSingle.DBRequester = function(userID, horseID){
	let that = {},
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
	}

	function saveDateIntoDB(updatedData){
		let changedDate = updatedData.date,
			dateID = changedDate.id;
		updateDate(changedDate);
		updateReminder(updatedData, dateID);
	}


	function updateDate(changedDate){
		changedDate = changeAttributesAccordingToDBRequest(changedDate);
		changedDate = changeAttributesAccordingToDBRequest(changedDate);
		changeAttributesAccordingToDBRequest(changedDate);
		hadCorrectParameter = requester.updateDate(changedDate);
		handleParameterFeedBack(hadCorrectParameter, changedDate);
	}

	function changeAttributesAccordingToDBRequest(changedDate){
		oldDate = changedDate;
		changedDate.horseID = changedDate.horse_id;
		changedDate.dateID = changedDate.id;
		delete changedDate.horse_id;
		delete changedDate.id;
		return changedDate;
	}

	function handleParameterFeedBack(hadCorrectParameter, changedDate){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", changedDate);
		}
	}

	function updateReminder(updatedData, dateID){
		if(!isSingleReminder(updatedData)){
			let reminderData = createRegularReminderData(updatedData, dateID);
			saveRegularReminderIntoDB(reminderData);
		}
		else{
			let reminderData = createSingleReminderData(updatedData, dateID);
			saveSingleReminderIntoDB(reminderData);
		}
	}

	function isSingleReminder(updatedData){
		return false;
	}


	function createRegularReminderData(updatedData, dateID){
		let reminderData = {
			dateID: dateID,
			unitRegular: unit,
			valueRegular: value,
			name: name,
			number: number,
		};
		return reminderData;
	}	

	function saveRegularReminderIntoDB(reminderData){
		requester.updateRegularReminder(reminderData);
	}

	function createSingleReminderData(){
		let reminderData = {
			dateID: dateID,
			unitRegular: unit,
			valueRegular: value,
			name: name,
			number: number,
		};
		return reminderData;
	}

	function saveSingleReminderIntoDB(){
		requester.SingleReminder(reminderData);
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}