var DatesPageAll = DatesPageAll || {};

DatesPageAll.DatesPageModel = function(){
	let that = new EventTarget(),
		dbRequester,		
		allDates,
		delteId;

		/**
		* @function init
		* @public
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
		*/ 	
   		function init(allDatesAsStrings){
   			allDates = JSON.parse(allDatesAsStrings);	
   			sendOnDataConverted();	
		}

		function setDelteId(id){
			delteId = id;
		}

		function getDeleteId(){
			return delteId;
		}

		function getDatesData(){
			return allDates;
		}

		function sendOnDataConverted(){
			let event = new Event("onDataConverted");
			event.details = {};
			event.details.allDates = allDates;
			that.dispatchEvent(event);
		}

		function updateData(newOrder){
			console.log("newOrder", newOrder);
		}

		
		that.init = init;
		that.setDelteId = setDelteId;
		that.getDeleteId = getDeleteId;
		that.getDatesData = getDatesData;
		return that;
}