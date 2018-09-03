var DatesChangerPage = DatesChangerPage || {};

/**
 * @instance DatesChangerPageSingle
 * @description Modul <code>DatesChangerPageSingle.Model</code> is the model of DatesChangerPageSingle
 * @param {string} userID. Id of the user
 * @description contains the data of the DatesChangerPage.
 */

DatesChangerPage.Model = function(){
	let that = {},
		oldDate;

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPage.Model
	* @instance
	* @param {object} date
	* @description Initialize this modul.
	*/
	function init(attributes) {
		oldDate = attributes.date;
	}

	/**
	* @function updateDate
	* @public
	* @memberof! DatesChangerPage.Model
	* @instance
	* @param {object} newDate
	* @description updates date
	*/
	function updateDate(newDate){
		let keys = Object.keys(newDate);
		keys.forEach(function(dateAttribute){
			oldDate[dateAttribute] = newDate[dateAttribute];
		});
	}

	/**
	* @function getDate
	* @public
	* @memberof! DatesChangerPage.Model
	* @instance
	* @description returns the oldDate
	*/
	function getDate(){
		return oldDate;
	}

	/**
	* @function prepareDataForDBRequest
	* @public
	* @memberof! DatesChangerPage.Model
	* @instance
	* @param {object} data, contains the data (date and reminder)
	* @param {object} date, contains the date with new values
	* @description prepares data so it can be safed into the database
	*/
	function prepareDataForDBRequest(data, date){
		let updatedDate;
		updateDate(date);
		updatedDate = oldDate;		
		data.date = updatedDate;
		return data;
	}

	that.init = init;
	that.updateDate = updateDate;
	that.getDate = getDate;
	that.prepareDataForDBRequest = prepareDataForDBRequest;
	return that;
}