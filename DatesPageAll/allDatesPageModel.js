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
   			if(!isObjectEmpty(allDatesAsStrings)){
   				allDates = JSON.parse(allDatesAsStrings);
   				sendOnDataConverted();   			
   			}
   			else{
   				sendNoDataEvent();
   			}   			
   			
		}

		function isObjectEmpty(allDatesAsStrings){
			let noResultMessage = "No results found";
			return allDatesAsStrings.includes(noResultMessage);
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

		function sendNoDataEvent(){
			let event = new Event("onNoData");
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