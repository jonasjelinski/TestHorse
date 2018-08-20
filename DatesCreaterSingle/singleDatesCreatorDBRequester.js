var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

SingleDatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		isSavingDate,
		singleDate,
		dateData,
		reminder;

	function init(newDate) {
		singleDate = newDate;
		isSavingDate = true;
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

	function handleResult(){
		
	}

	function saveDateIntoDB(data){
		let dataToSave = getDateObjectForDBRequest(data),
			singleDate = dataToSave;
			dateData = data;
			setDateIntoDB(dataToSave);
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
			valueRegular: "isSingleDate",
			unitRegular: "isSingleDate",
		};
		return dataToSave;
	}

	function setDateIntoDB(dataToSave) {
		hadCorrectParameter = requester.setDateIntoDB(dataToSave);
		handleParameterFeedBack(hadCorrectParameter);
	}

	function handleParameterFeedBack(hadCorrectParameter){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes");
		}
	}


	function handleResult(event){
		if(!isSavingDate){
			let result = event.details.result,
				dateID = getOnlyNumbers(result),
				reminderData = createReminderData(dateID);
			saveSingleReminderIntoDB(reminderData);
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
			time = dateData.reminder.time;

		reminderData = {
			dateID: dateID,
			date: date,
			time: time,
		};
		return reminderData;
	}	

	function saveSingleReminderIntoDB(reminderData){
		console.log("saveSingleReminderIntoDB", reminderData);
		requester.updateSingleReminder(reminderData);
		isSavingDate = true;
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}