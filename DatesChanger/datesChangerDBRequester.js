DatesChangerPageSingle.DBRequester = function(userID, horseID){
	let that = {},
		oldDate;

	function init(oldDate) {
		oldDate = oldDate;
		initRequester();
		addEventListeners();
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
		console.log("result",result);	
	}

	function saveDateIntoDB(updatedData){
		let changedDate = updatedData.date,
			unit = updatedData.unit,
			value = updatedData.value,
			dateID = changedDate.id;
			changedDate.valueRegular = value;
			changedDate.unitRegular = unit;
		updateDate(changedDate);
		updateReminder(updatedData, dateID);
	}


	function updateDate(changedDate){
		let dataToSave = {};
		dataToSave = changeAttributesAccordingToDBRequest(changedDate);
		dataToSave = getDateObjectForDBRequest(dataToSave);
		hadCorrectParameter = requester.updateDate(dataToSave);
		handleParameterFeedBack(hadCorrectParameter, dataToSave);
	}

	function getDateObjectForDBRequest(changedDate) {
		let dataToSave= {
			dateID: changedDate.dateID,
			horseID: changedDate.horseID,
			title: changedDate.title,
			date: changedDate.date,
			time: changedDate.time,
			location: changedDate.location,
			dateFuture: changedDate.date_future_date,
			timeFuture: changedDate.time_future_time,
			valueRegular: changedDate.valueRegular,
			unitRegular: changedDate.unitRegular,
		};
		return dataToSave;
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
		let date = updatedData.date,
			reminder = updatedData.reminder,
			name = "",
			number = "";
		let reminderData = {
			dateID: date.dateID,
			date: reminder.date,
			time: reminder.time,
			name: name,
			number: number,
		};
		return reminderData;
	}	

	function saveRegularReminderIntoDB(reminderData){
		requester.updateRegularReminder(reminderData);
	}

	function createSingleReminderData(updatedData){
		let date = updatedData.date,
			reminder = updatedData.reminder;
		let reminderData = {
			dateID: date.dateID,
			date: reminder.date,
			time: reminder.time,
		};
		return reminderData;
	}

	function saveSingleReminderIntoDB(reminderData){
		requester.updateSingleReminder(reminderData);
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}