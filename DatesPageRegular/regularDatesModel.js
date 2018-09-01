var RegularDatesPage = RegularDatesPage || {};

/**
 * @namespace RegularDatesPage.Model 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of RegularDatesPage
 * @ receives all dates of the db request at inititalisation as string. Transform
 * this string to an array of objects and sorts out the regular dates.
 */

RegularDatesPage.Model = function(horseID){
	const SINGLE_POSTION_CODE = "SD", 
		REGULAR_POSTION_CODE = "RD",
		DATE_SUGGESTIONS_CODE = "DS",
		RESET_CODE = "0",
		DATE_SUGGESTION_DATE = "666-666-666",
		DATE_SUGGESTION_TIME = "666-666-666",
		DEFAULT_HORSE = {id: horseID, type:""},
		DEFAULT_DATE = { id:"-1", title:"Füge einen Termin hinzu" , date: "00-00-00", time: "00:00:00", location:"Ort", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"1", orderPosition:DATE_SUGGESTIONS_CODE +"-1", unitRegular: "Jahr"};

	let that = new EventTarget(),	
		allDates,
		horseDateSuggestions,	
		regularDates,
		dateSuggestions,
		delteId,
		dateToSend,
		datesSuggestor,
		hasNewHorse,
		hasAllDatesAndSuggestions,
		newDateId;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} regularDatesAsStrings, all dates as a string
	* @description Initialize this model. Transform regularDatesAsStrings to an array
	* and tells the other moduls trough an event that regularDatesAsStrings has been converted
	*/ 	
	function init(){
		allDates = [];
		regularDates = [];
		dateSuggestions =[];
		hasNewHorse = false;
		hasAllDatesAndSuggestions = false;
	}

	function setNewHorseAsStrings(newHorseAsString){
		let parsedHorse,
			newHorse;
		if(isParsable(newHorseAsString)){
			parsedHorse = JSON.parse(newHorseAsString);
			if(isArray(parsedHorse)){
				newHorse = parsedHorse[0];
				newHorse = convertPropertyNames(newHorse);
				initDatesSuggestor(newHorse);
				getDataFromSuggestorAndSaveThemIntoHorseDateSuggestions();				
			}
		}			
		if(!newHorse){
			newHorse = DEFAULT_HORSE;			
		}
		getDataFromSuggestorAndSaveThemIntoHorseDateSuggestions();	
		sendHorseSetted();
		hasNewHorse = true;
	}

	function isParsable(string) {
		try {
			JSON.parse(string);
		} catch (e) {
			return false;
		}
		return true;
	}

	function convertPropertyNames(newHorse){
		newHorse.dateOfBirth = newHorse.dateOfBirth || newHorse.date_of_birth;		
		return newHorse;
	}

	function initDatesSuggestor(newHorse){
		datesSuggestor = new DatesSuggestor();
		datesSuggestor.init(newHorse);
	}

	function getDataFromSuggestorAndSaveThemIntoHorseDateSuggestions(){
		horseDateSuggestions = datesSuggestor.getDateSuggestions();
	}

	function sendHorseSetted(){
		let event = new Event("onHorseSetted");
		that.dispatchEvent(event);
	}	

	function setNewDatesAsStrings(allDatesAsStrings){
		if(!hasAllDatesAndSuggestions){
			if(isParsable(allDatesAsStrings)){
				let parsedDates = JSON.parse(allDatesAsStrings),
				allDatesCopy;
				if(isArray(parsedDates)){
					allDatesCopy = parsedDates.slice(0),
					savesDatesAndSuggestionsIntoArrays(allDatesCopy);
					convertRegularDates();
					convertSuggestionsData();					
				}	
			}				
		}
		if(regularDates.length === 0){
			regularDates.push(DEFAULT_DATE);
		}
		hasAllDatesAndSuggestions = true;
	}

	function isArray(parsedDates){
		return Array.isArray(parsedDates);
	}

	function savesDatesAndSuggestionsIntoArrays(allDatesCopy){
		for(let i = 0; i < allDatesCopy.length; i++){
			let date = allDatesCopy[i];
			if(!isSingleDate(date)){
				if(isDateSuggestion(date)){
					dateSuggestions.push(date);
				}
				else{
					regularDates.push(date);
				}
			}						
		}
	}

	function isSingleDate(date){
		let positionCode = date.order_position.substring(0,2);
		if(positionCode === SINGLE_POSTION_CODE){
				return true;
		}
		return false;
	}	

	function isDateSuggestion(date){
		let regex = RegExp(REGULAR_POSTION_CODE+"\\d*"),
			positionCode = date.order_position,
			match = positionCode.match(regex),
			code = match[0],			
			datePos = code.replace( /^\D+/g, '');
		if(datePos === RESET_CODE){
			return true;
		}

		return false;
	}

	function convertRegularDates(){
		convertData(regularDates, REGULAR_POSTION_CODE);
	}

	function convertSuggestionsData(){
		convertData(dateSuggestions, DATE_SUGGESTION_DATE);
	}		

	function convertData(dates, posCode){
		changePropertyNames(dates);
		removeNullsAndUndefined(dates);
		sortDates(dates, posCode);
	}


	function changePropertyNames(dates){
		for(let i = 0; i < dates.length; i++){
			let date = regularDates[i];
			date = changePropertNamesOfDate(date);
		}
	}

	function changePropertNamesOfDate(date){
			date.horseID =  date.horseID ||date.horse_id;
			date.dateFuture =  date.dateFuture || date.date_future_date;
			date.timeFuture = date.timeFuture || date.time_future_time;
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

	function removeNullsAndUndefined(regularDates){
		for(let i = 0; i < regularDates.length; i++){
			let date = regularDates[i],
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

	function sortDates(regularDates, posCode){
		regularDates.sort(function(date1,date2){
			let numberOfDates = regularDates.length,
				position1 = getPositionFromPositionCode(date1.orderPosition, posCode, numberOfDates),
				position2 = getPositionFromPositionCode(date2.orderPosition, posCode, numberOfDates);
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
			
			regex = new RegExp(posCode+"\\d*"),
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
	* @param {string} regularDatesAsStrings, all dates as a string
	* @description Checks if regularDatesAsStrings contains not an array full of dates
	* but an error message from the database
	*/ 	
	function isObjectEmpty(regularDatesAsStrings){
		let noResultMessage = "No results found";
		return regularDatesAsStrings.includes(noResultMessage);
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
		event.details.regularDates = regularDates;
		event.details.dateSuggestions = dateSuggestions;
		that.dispatchEvent(event);
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

	function updateAllDates(newDates, newSuggestions){
		updateRegularDates(newDates);
		updateDateSuggestions(newSuggestions);
		allDates = regularDates.concat(dateSuggestions);
	}

	function updateRegularDates(newDates){
		regularDates = newDates;
		updateRegularOrder();
	}

	function updateDateSuggestions(newSuggestions){
		dateSuggestions = newSuggestions;
		convertDatesToSuggestionsAndUpdateOrder();
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

	function updateRegularOrder(){
		for(let position = 0; position < regularDates.length; position++){
			let date = regularDates[position],
				newPos = position +1;
				updateOrderPosition(DATE_SUGGESTIONS_CODE ,date, RESET_CODE);
				updateOrderPosition(REGULAR_POSTION_CODE ,date, newPos);
		}
	}

	function convertDatesToSuggestionsAndUpdateOrder(){
		for(let position = 0; position < dateSuggestions.length; position++){
			let suggestion =  dateSuggestions[position],
				newPos = position +1;
			updateOrderPosition(REGULAR_POSTION_CODE ,suggestion, RESET_CODE);
			updateOrderPosition(DATE_SUGGESTIONS_CODE ,suggestion, newPos);
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
			oldPositionString = date.orderPosition;
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

	function getRegularDates(){
		return regularDates;
	}

	function getDatesSuggestions(){
		return dateSuggestions;
	}

	function getAllDates(){
		return allDates;
	}

	function getHorseID(){
		return horseID;
	}

	function convertDateToSuggestion(date){
		date.dateFuture = DATE_SUGGESTION_DATE;
		date.timeFuture = DATE_SUGGESTION_TIME;
		return date;	
	}

	function updateDatesAndSuggestionsByIds(dateIds, suggestionIds){		
		updateRegularDatesByIds(dateIds);
		updateSuggestionsByIds(suggestionIds);
		updateRegularOrder();
		convertDatesToSuggestionsAndUpdateOrder();
	}

	function updateRegularDatesByIds(dateIds){
		let newRegularDates = [];
		for(let i = 0; i < dateIds.length; i ++ ){
			let dateId = dateIds[i],
				newDate = getDateById(dateId);
				if(newDate){
					newRegularDates.push(newDate);
				}				
		}
		updateRegularDates(newRegularDates);
	}


	function updateSuggestionsByIds(suggestionIds){
		let	newSuggestions = [];		
		for(let i = 0; i < suggestionIds.length; i ++ ){
			let suggestionId = suggestionIds[i];
				newSuggestion = getDateById(suggestionId);
				if(newSuggestion){
					newSuggestions.push(newSuggestion);
				}
		}
		updateDateSuggestions(newSuggestions);
	}	

	function getDateById(dateId){
		for(let i = 0; i < allDates.length; i ++){
			let date = allDates[i];
			if(date.id === dateId){
				return date;
			}
		}
	}

	function checkIfReadyForSendingData(){
		if(hasAllDatesAndSuggestions && hasNewHorse){
			combineAllDatesAndSendData();
		}
	}

	function combineAllDatesAndSendData(){
		dateSuggestions = dateSuggestions.concat(horseDateSuggestions);
		allDates = regularDates.concat(dateSuggestions);
		sendOnDataConverted();
	}

	function isDateSuggestion(elementId){
		for(let i = 0; i < dateSuggestions.length; i++){
			let suggestion = dateSuggestions[i],
				suggestionId = suggestion.id;
			if(elementId === suggestionId){
				return true;
			}
		}
		return false;
	}

	function setNewDateId(id){
		newDateId = id;
	}

	function getNewDateId(){
		return newDateId;
	}

	function getNewDate(){
		return getDateAttributesById(newDateId);
	}

	function setDateToSend(id){
		let date = getDateAttributesById(id);
		dateToSend = changePropertNamesOfDate(date);
	}

	function checkReminderAndSendChangeMessage(reminderAsString){
		let reminder = getReminderFromArrayString(reminderAsString);
		if(isNoReminder(reminder)){
			sendReadyForChangeEvent();
		}
		else{
			reminder = changeReminderProperties(reminder);
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
		return reminder.date === null || reminder.date === undefined;
	}

	function changeReminderProperties(reminder){
		reminder.dateID = reminder.dateID || reminder.dates_id;
		reminder.name = reminder.name || reminder.contact_name;
		reminder.number = reminder.number || reminder.contact_number;
		delete reminder.dates_id;
		delete reminder.contact_name;
		delete reminder.contact_number;
		return reminder;
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

	function deleteDateAndUpdateModel(dateId){
		deleteDateFromAllDates(dateId);
		deleteDateFromRegularDates(dateId);
		deleteDateFromSuggestions(dateId);
	}

	function deleteDateFromAllDates(dateId){
		for(let i = 0 ; i < allDates.length; i++){
			let date = allDates[i];
			if(dateId = date.id){
				allDates.splice(i,1);
			}
		}
	}

	function deleteDateFromRegularDates(dateId){
		for(let i = 0 ; i < regularDates.length; i++){
			let date = regularDates[i];
			if(dateId = date.id){
				regularDates.splice(i,1);
			}
		}
	}

	function deleteDateFromSuggestions(dateId){
		for(let i = 0 ; i < dateSuggestions.length; i++){
			let date = dateSuggestions[i];
			if(dateId = date.id){
				dateSuggestions.splice(i,1);
			}
		}
	}
	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.updateAllDates = updateAllDates;
	that.updateRegularDates = updateRegularDates;
	that.updateDateSuggestions = updateDateSuggestions;
	that.getDateAttributesById = getDateAttributesById;
	that.getRegularDates = getRegularDates;
	that.getDatesSuggestions = getDatesSuggestions;
	that.getAllDates = getAllDates;
	that.getHorseID = getHorseID;
	that.updateDatesAndSuggestionsByIds = updateDatesAndSuggestionsByIds;
	that.setNewHorseAsStrings = setNewHorseAsStrings;
	that.setNewDatesAsStrings = setNewDatesAsStrings;
	that.checkIfReadyForSendingData = checkIfReadyForSendingData;
	that.isDateSuggestion = isDateSuggestion;
	that.setNewDateId = setNewDateId;
	that.getNewDateId = getNewDateId,
	that.getNewDate = getNewDate;
	that.setDateToSend =setDateToSend;
	that.checkReminderAndSendChangeMessage = checkReminderAndSendChangeMessage;
	that.deleteDateAndUpdateModel = that.deleteDateAndUpdateModel;
	return that;
}