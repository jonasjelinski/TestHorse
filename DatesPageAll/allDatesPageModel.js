var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DatesPageModel 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of DatesPageAll
 * @description receives all dates of the db request at inititalisation. Transform
 * this sting to an array of objects.
 */

DatesPageAll.DatesPageModel = function(){
	let that = new EventTarget(),
		dbRequester,		
		allDates,
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
			if(!isObjectEmpty(allDatesAsStrings)){
				allDates = JSON.parse(allDatesAsStrings);
				sendOnDataConverted();   			
			}
			else{
				sendNoDataEvent();
			}   			
			
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
	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.getDatesData = getDatesData;
	return that;
}