var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

RegulardatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		regularDate,
		isSavingDate = true,
		reminder,
		name = "",
		number = "",
		unit,
		value;

	function init(newDate) {
		regularDate = newDate;
		initRequester();
		addEventListeners();
		isSavingDate = true;
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function saveDateIntoDB(data){
		let newDate = data.date,
			idData = {userID, horseID},
			dataToSave = Object.assign(idData, newDate);
			regularDate = dataToSave;
			reminder = data.reminder;
			unit = data.unit;
			value = data.value;	
		hadCorrectParameter = requester.setDateIntoDB(dataToSave);
		handleParameterFeedBack(hadCorrectParameter, newDate);
		isSavingDate = false;
	}

	function handleParameterFeedBack(hadCorrectParameter, newDate){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newDate);
		}
	}

	function handleResult(event){
		if(!isSavingDate){
			let result = event.details.result,
				dateID = getOnlyNumbers(result),
				reminderData = createReminderData(dateID);
			saveRegularReminderIntoDB(reminderData);
		}
		else{
			console.log(event.details.result);
		}
	}

	function getOnlyNumbers(dateID){
			dateID = dateID.replace(/[^0-9]/, ''),
			dateID = dateID.replace(/(\r\n\t|\n|\r\t|\r)/gm,"");
			return dateID;
	}


	function createReminderData(dateID){
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
		isSavingDate = true;
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}