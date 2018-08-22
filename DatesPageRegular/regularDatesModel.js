var RegularDatesPage = RegularDatesPage || {};

/**
 * @namespace RegularDatesPage.Model 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of RegularDatesPage
 * @ receives all dates of the db request at inititalisation as string. Transform
 * this string to an array of objects and sorts out the regular dates.
 */

RegularDatesPage.Model = function(){
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
		allDates = JSON.parse(allDatesAsStrings);	
		sendOnDataConverted();
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

	function updateData(newOrder){
		console.log("newOrder", newOrder);
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
	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.updateData = updateData;
	that.getDateAttributesById = getDateAttributesById;
	return that;
}