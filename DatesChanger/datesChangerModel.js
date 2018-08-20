DatesChangerPageSingle.Model = function(){
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