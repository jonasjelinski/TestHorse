var RegularDatesPage = RegularDatesPage || {};

/**
 * @namespace RegularDatesPage.Model 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of RegularDatesPage
 * @ receives all dates of the db request at inititalisation as string. Transform
 * this string to an array of objects and sorts out the regular dates.
 */

RegularDatesPage.Model = function(horseID){
	const REGULAR_POSTION_CODE = "RD",
		DATE_SUGGESTIONS_CODE = "DS",
		RESET_CODE = "0",
		DATE_SUGGESTION_DATE = "666-666-666",
		DATE_SUGGESTION_TIME = "666-666-666";

	let that = new EventTarget(),	
		allDates = [],
		horseDateSuggestions,	
		regularDates = [],
		dateSuggestions =[],
		delteId,
		datesSuggestor,
		hasNewHorse = false,
		hasAllDatesAndSuggestions = false,
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
	
	}

	function setNewHorseAsStrings(newHorseAsString){
		if(isParsable(newHorseAsString)){
			let parsedHorse = JSON.parse(newHorseAsString),
				newHorse;
			if(isArray(parsedHorse)){
				newHorse = parsedHorse[0];
				newHorse = convertPropertyNames(newHorse);
				initDatesSuggestor(newHorse);
				getHorseSuggestions();				
			}
		}
		hasNewHorse = true;
	}

	function convertPropertyNames(newHorse){
		newHorse.dateOfBirth = newHorse.dateOfBirth || newHorse.date_of_birth;		
		return newHorse;
	}

	function initDatesSuggestor(newHorse){
		datesSuggestor = new DatesSuggestor();
		datesSuggestor.init(newHorse);
	}

	function getHorseSuggestions(){
		horseDateSuggestions = datesSuggestor.getDateSuggestions();
		allDates = allDates.concat(horseDateSuggestions);
	}

	function isParsable(string) {
		try {
			JSON.parse(string);
		} catch (e) {
			return false;
		}
		return true;
	}

	function isArray(parsedDates){
		return Array.isArray(parsedDates);
	}

	function setNewDatesAsStrings(allDatesAsStrings){
		if(isParsable(allDatesAsStrings)){
			let parsedDates = JSON.parse(allDatesAsStrings),
				allDatesCopy;
			if(isArray(parsedDates)){
				allDates = parsedDates;
				allDatesCopy = allDates.slice(0),
				regularDatesAndSuggestions = removeSingleDates(allDatesCopy);
				filterDatesAndSuggestions(regularDatesAndSuggestions);
				convertData(regularDates, REGULAR_POSTION_CODE);	
				convertData(dateSuggestions, DATE_SUGGESTION_DATE);	
				hasAllDatesAndSuggestions = true;
			}
			
		}
	}

	function filterDatesAndSuggestions(regularDatesAndSuggestions){
		for(let i = 0; i < regularDatesAndSuggestions.length; i++){
			let date = regularDatesAndSuggestions[i];
			if(isDateSuggestion(date)){
				dateSuggestions.push(date);
			}
			else{
				regularDates.push(date);
			}			
		}
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

	function convertData(dates, posCode){
		changePropertyNames(dates);
		removeNullsAndUndefined(dates);
		sortDates(dates, posCode);
	}

	function removeSingleDates(allDates){
		let regularDatesAndSuggestions = [];
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			if(!isSingleDate(date)){
				regularDatesAndSuggestions.push(date);
			}			
		}
		return regularDatesAndSuggestions;
	}

	function isSingleDate(date){
		if(date.unit_regular === "" || date.unit_regular === "isSingleDate"){
				return true;
		}
		return false;
	}

	function changePropertyNames(regularDates){
		for(let i = 0; i < regularDates.length; i++){
			let date = regularDates[i];
			date.horseID = date.horse_id;
			date.dateFuture = date.date_future_date;
			date.timeFuture = date.time_future_date;
			date.valueRegular = date.value_regular;
			date.unitRegular = date.unit_regular;
			date.orderPosition = date.order_position;
			delete date.date_future_date;
			delete date.time_future_date;
			delete date.value_regular;
			delete date.unit_regular;
			delete date.order_position;
		}
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
			combineSuggestionsEndAndSendData();
		}

	}

	function combineSuggestionsEndAndSendData(){
		dateSuggestions = dateSuggestions.concat(horseDateSuggestions);
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
	return that;
}