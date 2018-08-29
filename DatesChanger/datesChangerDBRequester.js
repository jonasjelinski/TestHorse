var DatesChangerPage = DatesChangerPage || {};

/**
 * @instance DatesChangerPage.DBRequester
 * @description Modul <code>DatesChangerPage.DBRequester</code> is used to change a regulat date
 * @param {string} userID. Id of the user
 * @param {string} horseID. Id of the horse
 * @description this is a simpel datebase requester to update the dates of the horse with the id horseID
 */

DatesChangerPage.DBRequester = function(userID, horseID){
	let that = {};

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @description Initialize this modul.
	*/
	function init() {
		initRequester();
		addEventListeners();
	}

	/**
	* @function initRequester
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @description Initialize the DatabaseClientInterface
	* this requester is used to start db requests
	*/
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	/**
	* @function addEventListeners
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @description adds event listener
	* if the requester got the data from the database
	* the function "handleResult" is called 
	*/
	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {event} event, contains the data of the db request
	* @description adds event listener
	*/
	function handleResult(event){
		let result = event.details.result;		
	}
	
	/**
	* @function saveDateIntoDB
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {event} event, contains the data of the db request
	* @description saves the updated data into the database
	*/
	function saveDateIntoDB(updatedData){
		let changedDate = updatedData.date,
			unit = updatedData.unit,
			value = updatedData.value,
			dateID = changedDate.id;
			changedDate.valueRegular = value;
			changedDate.unitRegular = unit;
		updateDate(changedDate);
		if(hasReminder(updatedData)){
			updateReminder(updatedData, dateID);
		}		
	}

	function hasReminder(updatedData){
		if (updatedData.reminder === undefined){
			return false;
		}
		return true;
	}


	/**
	* @function updateDate
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} changedDate
	* @description changes the changedDate so it can be saved into the databse and then save it
	*/
	function updateDate(changedDate){
		let dataToSave = {};
		dataToSave = getDateObjectForDBRequest(dataToSave);
		hadCorrectParameter = requester.updateDate(dataToSave);
		handleParameterFeedBack(hadCorrectParameter);
	}

	/**
	* @function getDateObjectForDBRequest
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} changedDate
	* @description prepares data so it can be send to the database
	*/
	function getDateObjectForDBRequest(changedDate) {
		let dataToSave= {
			dateID: changedDate.id,
			horseID: changedDate.horse_id,
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

	/**
	* @function handleParameterFeedBack
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {bool} hadCorrectParameter
	* @description gives a feedback if the object given to the requester had the correct properties
	*/
	function handleParameterFeedBack(hadCorrectParameter){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes");
		}
	}

	/**
	* @function isSingleReminder
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} updatedData
	* @param {string} dateID
	* @description updates the reminder depending on if it is a reminder
	* for a singleDate or a regularDate
	*/
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


	/**
	* @function createRegularReminderData
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} updatedData
	* @param {string} dateID
	* @description creates the data for the db request of the reminder update
	*/
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

	/**
	* @function saveRegularReminderIntoDB
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} reminderData
	* @description updates the reminder with the reminderData
	*/
	function saveRegularReminderIntoDB(reminderData){
		requester.updateRegularReminder(reminderData);
	}

	/**
	* @function createSingleReminderData
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} updatedData
	* @description creates the data for the db request of the reminder update
	*/
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

	/**
	* @function saveSingleReminderIntoDB
	* @public
	* @memberof! DatesChangerPage.DBRequester
	* @instance
	* @param {object} reminderData
	* @description updates the reminder with the reminderData
	*/
	function saveSingleReminderIntoDB(reminderData){
		requester.updateSingleReminder(reminderData);
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}