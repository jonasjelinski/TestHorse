var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

SingleDatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		isSavingDate,
		singleDate,
		reminder;

	function init(newDate) {
		singleDate = newDate;
		isSavingDate = true;
		initRequester();		
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function handleResult(){
		
	}

	function saveDateIntoDB(data){
		let idData = {userID, horseID},
			newDate = data.date,
			dataToSave = Object.assign(idData, newDate);
			singleDate = dataToSave;
			reminder = data.reminder;		
			//hadCorrectParameter = requester.setDateIntoDB(dataToSave);
			isSavingDate = false;
			console.log("data",data, "reminder", reminder);
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
		requester.updateSingleReminder(reminderData);
		isSavingDate = true;
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}