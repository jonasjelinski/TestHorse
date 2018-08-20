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

	function init(date) {
		oldDate = date;
	}

	function updateDate(newDate){
		let keys = Object.keys(newDate);
		keys.forEach(function(dateAttribute){
			oldDate[dateAttribute] = newDate[dateAttribute];
		});
	}

	function getDate(){
		return oldDate;
	}

	that.init = init;
	that.updateDate = updateDate;
	that.getDate = getDate;
	return that;
}