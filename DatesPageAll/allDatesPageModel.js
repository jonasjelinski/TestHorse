var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DatesPageModel 
 * @memberof! DatesPageAll
 * @description Modul <code>DatesPageAll.Model</code> is the model of DatesPageAll
 * @description receives all dates of the db request at inititalisation. Transform
 * this sting to an array of objects.
 */

DatesPageAll.DatesPageModel = function(){
	const POSTION_CODE = "AD";

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
			if(isParsable(allDatesAsStrings)){
				allDates = JSON.parse(allDatesAsStrings);
				convertData(allDates);
				sendOnDataConverted();   			
			}
			else{
				console.log("allDatesAsStrings", allDatesAsStrings);
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

	function convertData(allDates){
		changePropertyNames(allDates);
		removeNullsAndUndefined(allDates);
		sortDates(allDates);
	}

	function changePropertyNames(allDates){
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			date.horseID = date.horse_id;
			date.dateFuture = date.date_future_date;
			date.timeFuture = date.time_future_date;
			date.valueRegular = date.value_regular;
			date.unitRegular = date.unit_regular;
			delete date.date_future_date;
			delete date.time_future_date;
			delete date.value_regular;
			delete date.unit_regular;
		}
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
			let position1 = getPositionFromPositionCode(date1.order_position),
				position2 = getPositionFromPositionCode(date2.order_position);
				console.log("position1",position1,"position2",position2);
			if(position1 < position2){
				return -1;
			}
			if(position1 > position2){
				return 1;
			}
			return 0;
		});
	}

	function getPositionFromPositionCode(positionString){
		let position,
			code,
			regex;
		if(positionString === ""){
			position = allDates.length;
		}
		else{
			regex = new RegExp(POSTION_CODE+"\\d*")
			code = positionString.match(regex)[0],
			position = code.replace( /^\D+/g, '');
		}
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
			let date = allDates[position];
			updateOrderPosition(POSTION_CODE, date, position);
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
	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.getDatesData = getDatesData;
	that.updateDates = updateDates;
	return that;
}