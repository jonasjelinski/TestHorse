var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

RegulardatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		regularDate,
		isSavingDate = true,
		dateData,
		reminder;

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
		let	dataToSave = getDateObjectForDBRequest(data);
			regularDate = dataToSave;
			dateData = data;
			console.log("saveDateIntoDB", "data", data, "dataToSave", dataToSave);	
		hadCorrectParameter = requester.setDateIntoDB(dataToSave);
		handleParameterFeedBack(hadCorrectParameter, dateData);
		isSavingDate = false;
	}

	function getDateObjectForDBRequest(data) {
		let dataToSave= {
			userID: userID,
			horseID: horseID,
			title: data.date.title,
			date: data.date.date,
			time: data.date.time,
			location: data.date.location,
			dateFuture: "hasNoDate",
			timeFuture: "hasNoDate",
			valueRegular: data.value,
			unitRegular: data.unit,
		};
		return dataToSave;
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
		let reminderData = {},
			date = dateData.reminder.date,
			time = dateData.reminder.time,
			name = "",
			number = "";

		reminderData = {
			dateID: dateID,
			date: date,
			time: time,
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