var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

/**
 * @instance SingleDatesCreatorPage.DBRequester
 * @memberof! SingleDatesCreatorPage 
 * @description <code>DBRequester</code> is the interface for database requests to create a single date.
 */
SingleDatesCreatorPage.DBRequester = function(userID, horseID){
	let that = {},
		attributes,
		isSavingDate,
		singleDate,
		dateData,
		reminder;

	/**
	* @function init
	* @public
	* @memberof! SingleDatesCreatorPage  
	* @instance
	* @param {object}, newDate, contains data of the date
	* @description inits this modul.
	*/ 
	function init(newDate) {
		singleDate = newDate;
		isSavingDate = true;
		initRequester();
		addEventListeners();		
	}

	/**
	* @function initRequester
	* @public
	* @memberof! SingleDatesCreatorPage  
	* @instance
	* @description inits the interface for database requests
	*/ 
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}


	/**
	* @function addEventListeners
	* @private
	* @memberof! SingleDatesCreatorPage
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
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {event} event
	* @description if the date has been saved into the database the databse sends back the id of the date
	* this dateID is used to add it to the reminder. The database has a 1:1 relation between date and reminder.
	* Then the reminder is saved into the database.
	*/
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


	/**
	* @function saveDateIntoDB
	* @public
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object} data, contains the data for the date, the reminder, the unit and the value of the regular date
	* @description prepares data for the request and saves the data in the database
	*/
	function saveDateIntoDB(data){
		let dataToSave = getDateObjectForDBRequest(data),
			singleDate = dataToSave;
			dateData = data;
			setDateIntoDB(dataToSave);
			isSavingDate = false;			
	}

	/**
	* @function getDateObjectForDBRequest
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object} data, contains the data for the date, the reminder, the unit and the value of the regular date
	* @description prepares data for the request and returns them
	*/
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

	/**
	* @function setDateIntoDB
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object} dataToSave
	* @description sets date into the database
	*/
	function setDateIntoDB(dataToSave) {
		let hadCorrectParameter = requester.setDateIntoDB(dataToSave);
		handleParameterFeedBack(hadCorrectParameter);
	}

	/**
	* @function handleParameterFeedBack
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {bool} hadCorrectParameter
	* @description shows a console.log if the request to the interface was started sucessfully
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
	* @function getOnlyNumbers
	* @private
	* @memberof! SingleDatesCreatorPage
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
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string} dateID
	* @description creates the data for the reminder
	*/
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

	/**
	* @function saveRegularReminderIntoDB
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object} reminderData
	* @description saves the reminder into the database
	* after that set isSaving true
	*/
	function saveSingleReminderIntoDB(reminderData){		
		requester.updateSingleReminder(reminderData);
		isSavingDate = true;
	}

	that.init = init;
	that.saveDateIntoDB = saveDateIntoDB;
	return that;
}