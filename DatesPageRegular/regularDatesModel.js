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
		DATE_SUGGESTION_DATE = "0000-00-00";

	let that = new EventTarget(),	
		allDates,	
		regularDates = [],
		dateSuggestions =[],
		delteId;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll.DatesPageModel 
	* @instance
	* @param {string} regularDatesAsStrings, all dates as a string
	* @description Initialize this model. Transform regularDatesAsStrings to an array
	* and tells the other moduls trough an event that regularDatesAsStrings has been converted
	*/ 	
	function init(allDatesAsStrings){
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
				sendOnDataConverted();
			}
			
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

	function isArray(parsedDates){
		return Array.isArray(parsedDates);
	}

	function filterDatesAndSuggestions(regularDatesAndSuggestions){
		for(let i = 0; i < regularDatesAndSuggestions.length; i++){
			let date = regularDatesAndSuggestions[i];
			if(!isDateSuggestion(date)){
				dateSuggestions.push(date);
			}
			else{
				regularDates.push(date);
			}			
		}
	}

	function isDateSuggestion(date){
		return date.date === DATE_SUGGESTION_DATE;
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
		let position,
			code;
		if(positionString === ""){
			position = numberOfDates.length;
		}
		else{
			regex = new RegExp(posCode+"\\d*")
			code = positionString.match(regex),
			position = code.replace( /^\D+/g, '');
		}
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

	function updateRegularDates(newDates){
		regularDates = newDates;
		updateRegularOrder();
	}

	function updateDateSuggestions(newSuggestions){
		dateSuggestions = newSuggestions;
		updateSuggestionsOrder();
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
			console.log("getSearchedDate", date, "id", id);
			if(date.id === id){
				return date;
			}
		}
	}

	function updateRegularOrder(){
		for(let position = 0; position < regularDates.length; position++){
			let date = regularDates[position];
				updateOrderPosition(REGULAR_POSTION_CODE ,date, position);
		}
	}

	function updateSuggestionsOrder(){
		for(let position = 0; position < dateSuggestions.length; position++){
			let suggestion =  dateSuggestions[position];
			updateOrderPosition(DATE_SUGGESTIONS_CODE ,suggestion, position);
		}
	}

	function updateOrderPosition(positonCode, date, position){
		 let regex = new RegExp(positonCode+"\\d*"),
		 	newPosition = positonCode+position+1,
			oldPositionString = date.orderPosition,
			code = oldPositionString.match(regex),
			newCode = oldPositionString.replace(code, newPosition);
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

	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.updateRegularDates = updateRegularDates;
	that.updateDateSuggestions = updateDateSuggestions;
	that.getDateAttributesById = getDateAttributesById;
	that.getRegularDates = getRegularDates;
	that.getDatesSuggestions = getDatesSuggestions;
	that.getAllDates = getAllDates;
	that.getHorseID = getHorseID;
	return that;
}