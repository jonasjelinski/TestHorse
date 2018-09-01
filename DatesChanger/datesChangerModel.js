var DatesChangerPage = DatesChangerPage || {};

/**
 * @instance DatesChangerPageSingle
 * @description Modul <code>DatesChangerPageSingle.Model</code> is the model of DatesChangerPageSingle
 * @param {string} userID. Id of the user
 * @description receives new attributes at inititalisation. Those attributes are shown to
 * the user in a view so he can change them.
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
	* @description Initialize this modul.
	*/
	function updateDate(newDate){
		let keys = Object.keys(newDate);
		console.log("updateDate keys", JSON.stringify(keys));
		console.log("updateDate oldDate", JSON.stringify(oldDate));
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

	that.init = init;
	that.updateDate = updateDate;
	that.getDate = getDate;
	return that;
}