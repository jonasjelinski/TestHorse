var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DatesPageModel 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of DatesPageAll
 * @description receives all dates of the db request at inititalisation. Transform
 * this sting to an array of objects.
 */

DatesPageAll.DatesPageModel = function(){
	const POSTION_CODE = "SD";

	let that = new EventTarget(),
		dbRequester,		
		allDates,
		dateToSend,
		delteId;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} allDatesAsStrings, all dates as a string
	* @description Initialize this model. Transform allDatesAsStrings to an array
	* and tells the other moduls trough an event that allDatesAsStrings has been converted
	*/ 	
	function init(allDatesAsStrings){
		allDates = [];
		if(isParsable(allDatesAsStrings)){
			let parsedDates = JSON.parse(allDatesAsStrings);
			sortSingleDates(parsedDates);
			convertData(allDates);
			sendOnDataConverted();   			
		}
		else{
			sendNoDataEvent();
		}			
	}

	function isParsable(string) {
		try {
			JSON.parse(string);
		} catch (e) {
			return false;
		}
		return true;
	}

	function sortSingleDates(parsedDates){
		for(let i = 0; i < parsedDates.length; i++){
			let date = parsedDates[i];
			if(isSingleDate(date)){
				allDates.push(date);
			}
		}
	}

	function isSingleDate(date){
		let positionCode = date.order_position.substring(0,2);
		if(positionCode === POSTION_CODE){
				return true;
		}
		return false;
	}		

	function convertData(allDates){
		changePropertyNames(allDates);
		removeNullsAndUndefined(allDates);
		sortDates(allDates);
	}

	function changePropertyNames(allDates){
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			date = changePropertNamesOfDate(date);			
		}
	}

	function changePropertNamesOfDate(date){
			date.horseID =  date.horseID ||date.horse_id;
			date.dateFuture =  date.dateFuture || date.date_future_date;
			date.timeFuture = date.timeFuture || date.time_future_date;
			date.valueRegular = date.valueRegular || date.value_regular;
			date.unitRegular = date.unitRegular || date.unit_regular;
			date.orderPosition = date.orderPosition || date.order_position;
			delete date.date_future_date;
			delete date.time_future_date;
			delete date.value_regular;
			delete date.unit_regular;
			delete date.order_position;
		return date;
	}

	function removeNullsAndUndefined(allDates){
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i],
				attributes = Object.keys(date);

			attributes.forEach(function(attribute){
				let  value = date[attribute];
				if(value === undefined || value === null){
					value = "";
				}
				date[attribute] = value;
			})
		}
	}

	function sortDates(allDates){
		allDates.sort(function(date1,date2){
			let numberOfDates = allDates.length,
				position1 = getPositionFromPositionCode(date1.orderPosition, POSTION_CODE, numberOfDates),
				position2 = getPositionFromPositionCode(date2.orderPosition, POSTION_CODE, numberOfDates);				
			if(position1 < position2){
				return -1;
			}
			if(position1 > position2){
				return 1;
			}
			return 0;
		});
	}

	function getPositionFromPositionCode(positionString, posCode, numberOfDates){
		let position = numberOfDates,
			regex,
			match,
			code;
			
			regex = new RegExp(posCode+"\\d*");
			match = positionString.match(regex);
			if(match){
				code = match[0];
				position = code.replace( /^\D+/g, '');
			}
			position = parseInt(position);			
		return position;
	}

	/**
	* @function isObjectEmpty
	* @private
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} allDatesAsStrings, all dates as a string
	* @description Checks if allDatesAsStrings contains not an array full of dates
	* but an error message from the database
	*/ 	
	function isObjectEmpty(allDatesAsStrings){
		let noResultMessage = "No results found";
		return allDatesAsStrings.includes(noResultMessage);
	}

	/**
	* @function setDelteId
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} id
	* @description sets the delteId
	* this is the id for the date which the user wants to delte
	*/
	function setDelteId(id){
		delteId = id;
	}

	/**
	* @function getDeleteId
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @description returns the delteId
	*/
	function getDeleteId(){
		return delteId;
	}

	/**
	* @function getDatesData
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @description returns allDates
	*/
	function getDatesData(){
		return allDates;
	}

	/**
	* @function sendOnDataConverted
	* @private
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @description sends an event to inform the other moduls
	* that the string of the db request has been converted to an array
	*/
	function sendOnDataConverted(){
		let event = new Event("onDataConverted");
		event.details = {};
		event.details.allDates = allDates;
		that.dispatchEvent(event);
	}

	/**
	* @function sendOnDataConverted
	* @private
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @description sends an event that the request result didnt contain dates
	*/
	function sendNoDataEvent(){
		let event = new Event("onNoData");
		that.dispatchEvent(event);
	}

	function updateDates(newDates){
		allDates = newDates;
		updateOrder();
	}

	function updateOrder(){
		for(let position = 0; position < allDates.length; position++){
			let date = allDates[position],
				newPosition = position + 1;
			updateOrderPosition(POSTION_CODE, date, newPosition);
		}
	}

	
	function updateOrderPosition(positonCode, date, position){
		let newCode,
			regex,
			newPosition,
			oldPositionString,
			match,
			code;
		if(date.orderPosition == ""){
			newCode = positonCode+position; 
		}
		else{
			regex = new RegExp(positonCode+"\\d*");
		 	newPosition = positonCode+position;
			oldPositionString = date.orderPosition || date.order_position;
			match = oldPositionString.match(regex);
			if(match){
				code = match[0];
				newCode = oldPositionString.replace(code, newPosition);	
			}
			else{
				newCode = oldPositionString + positonCode+position;
			}
					
		}
		date.orderPosition = newCode;		 
	}

	/**
	* @function getDateAttributesById
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} id, id of the date
	* @description returns the date with the id "id"
	*/
	function getDateAttributesById(id){
		let searchedDate = getSearchedDate(id);
		return searchedDate; 
	}


	/**
	* @function getSearchedDate
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} id, id of the date
	* @description returns date with the id "id"
	*/
	function getSearchedDate(id){
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			if(date.id === id){
				return date;
			}
		}
	}

	function setDateToSend(id){
		let date = getSearchedDate(id);
		console.log("setDateToSend", setDateToSend, id);
		dateToSend = changePropertNamesOfDate(date);
	}

	function checkReminderAndSendChangeMessage(reminderAsString){
		let reminder = getReminderFromArrayString(reminderAsString);
		if(isNoReminder(reminder)){
			sendReadyForChangeEvent();
		}
		else{
			changeReminderProperties(reminder);
			sendReadyForChangeEvent(reminder);
		}
	}

	
	function getReminderFromArrayString(arrayString){
		let reminderArray,
			reminder = {};
		if(isParsable(arrayString)){
			reminderArray = JSON.parse(arrayString);
			if(Array.isArray(reminderArray)){
				reminder = reminderArray[0];
			}
		}
		return reminder;
	}

	function isNoReminder(reminder){
		console.log("isNoReminder",reminder);
		return reminder.date === null || reminder.date === undefined;
	}

	function changeReminderProperties(reminder){
		reminder.dateID = reminder.dateID || reminder.dates_id;
	}


	function sendReadyForChangeEvent(reminder){
		let event = new Event("onReadyForChange");
		event.details = {};
		event.details.dateAndReminder = {};
		event.details.dateAndReminder.date = dateToSend;
		if(reminder){			
			event.details.dateAndReminder.reminder = reminder;
		}
		that.dispatchEvent(event);
	}


	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.getDatesData = getDatesData;
	that.updateDates = updateDates;
	that.getDateAttributesById = getDateAttributesById;
	that.setDateToSend = setDateToSend;
	that.checkReminderAndSendChangeMessage = checkReminderAndSendChangeMessage;
	return that;
}