var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

/**
 * @instance RegulardatesCreatorPage.DBRequester
 * @memberof! RegulardatesCreatorPage 
 * @param {string} userID. Id of the user
 * @param {string} horseID. Id of the horse
 * @description Modul <code>RegulardatesCreatorPage.DBRequester</code> is used to
 * make db requests to save the regular created date in the database.
 */
RegulardatesCreatorPage.DBRequester = function(userID, horseID){
	"user strict";

	const REG_DATE_START_POS = "RD99999999999";

	let that = new EventTarget(),
		regularDate,
		isSavingDate = true, //distincts between creating a date and a reminder
		dateData,
		reminder;

	/**
	* @function init
	* @public
	* @memberof! RegulardatesCreater
	* @instance
	* @param {object} newDate, a regular data
	* @description Initialize this modul.
	*/
	function init(newDate) {
		regularDate = newDate;
		initRequester();
		addEventListeners();
		isSavingDate = true;
	}

	/**
	* @function initRequester
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description Initialize the interface to communicate with the database
	*/
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description if the db interface has the result of the request "handleResult" is called
	* this listener is called after every request by the dbInterface.
	* <code>isSavingDate</code> is used to distinct if the result is the result of the 
	* saving of the date or the saving of the reminder
	*/
	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {event} event
	* @description if the date has been saved into the database the databse sends back the id of the date
	* this dateID is used to add it to the reminder. The database has a 1:1 relation between date and reminder.
	* Then the reminder is saved into the database
	*/
	function handleResult(event){
		let result = event.details.result,
			action = event.details.resultAction,
			dateID,
			reminderData;
		if(action === "setDateIntoDB"){
			let result = event.details.result,
				dateID = getOnlyNumbers(result);
				if(isIDAndNoWarningFeedbackFromDB(dateID)&&userWantsReminder()){
					reminderData = createReminderData(dateID);
					saveRegularReminderIntoDB(reminderData);
				}
				else{
					console.log("handleResult", result);
					tellModulItCanChangeToOtherSide();
				}
		}
		else if(action === "updateReminderRegular"){
			tellModulItCanChangeToOtherSide();
		}
		else{
			console.log(event.details.result);
		}		
	}

	function isIDAndNoWarningFeedbackFromDB(dateID){
		 return /\d/.test(dateID);
	}

	function userWantsReminder(){
		let noReminderValue = "noReminder";
		return dateData.reminder.date !== noReminderValue;
	}

	/**
	* @function saveDateIntoDB
	* @public
	* @memberof! RegulardatesCreater
	* @instance
	* @param {object} data, contains the data for the date, the reminder, the unit and the value of the regular date
	* @description prepares data for the request and saves the data in the database
	*/
	function saveDateIntoDB(data){
		let	regularDate = getDateObjectForDBRequest(data);
			dateData = data;			
		hadCorrectParameter = requester.setDateIntoDB(regularDate);
		handleParameterFeedBack(hadCorrectParameter, dateData);
		isSavingDate = false;
	}

	/**
	* @function getDateObjectForDBRequest
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {object} data, contains the data for the date, the reminder, the unit and the value of the regular date
	* @description prepares data for the request and returns them
	*/
	function getDateObjectForDBRequest(data) {
		let noValue = "00-00-00",
			dataToSave= {
			userID: userID,
			horseID: horseID,
			title: "",
			date: data.date.date,
			time: data.date.time,
			location: data.date.location,
			dateFuture: noValue,
			timeFuture: noValue,
			valueRegular: data.date.value,
			unitRegular: data.date.unit,
			orderPosition: REG_DATE_START_POS,
		};
		return dataToSave;
	}

	/**
	* @function handleParameterFeedBack
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {bool} hadCorrectParameter
	* @param {object} newDate
	* @description shows a console.log if the request to the interface was started sucessfully
	*/
	function handleParameterFeedBack(hadCorrectParameter, newDate){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newDate);
		}
	}	

	/**
	* @function getOnlyNumbers
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string} dateID
	* @description cleans dateID of NaNs, because sometimes the database result dateID contains NaNs
	* those NaNs could lead to problems setting a reminder into the database.
	*/
	function getOnlyNumbers(dateID){
			dateID = dateID.replace(/[^0-9]/, ''),
			dateID = dateID.replace(/(\r\n\t|\n|\r\t|\r)/gm,"");
			return dateID;
	}

	/**
	* @function createReminderData
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string} dateID
	* @description creates the data for the reminder
	*/
	function createReminderData(dateID){
		let reminderData = {},
			date = dateData.reminder.date,
			time = changeValueIfNotSaveableIntoDatabase(dateData.reminder.time),
			name = changeValueIfNotSaveableIntoDatabase(dateData.reminder.name),
			number = changeValueIfNotSaveableIntoDatabase(dateData.reminder.number);

		reminderData = {
			dateID: dateID,
			date: date,
			time: time,
			name: name,
			number: number,
		};
		return reminderData;
	}

	function changeValueIfNotSaveableIntoDatabase(value){
		let defaultValue = "00-00-00";
		if(isNoValueWhichDatabaseExpects(value)){
			return defaultValue;
		}
		return value;
	}

	function isNoValueWhichDatabaseExpects(value){
		return value === undefined;
	}

	/**
	* @function saveRegularReminderIntoDB
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {object} reminderData
	* @description saves the reminder into the database
	* after that set isSaving true
	*/
	function saveRegularReminderIntoDB(reminderData){
		requester.updateRegularReminder(reminderData);
		isSavingDate = true;
	}

	function tellModulItCanChangeToOtherSide(){
		let event = new Event("onDataSaved");
		that.dispatchEvent(event);
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}