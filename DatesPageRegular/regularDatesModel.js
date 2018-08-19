var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.Model = function(userID){
	let that = new EventTarget(),
		dbRequester,		
		allDates,
		delteId;

		/**
		* @function init
		* @public
		* @memberof! RegularDatesPage.RegularDatesPageModel 
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
		*/ 	
   		function init(allDatesAsStrings){
   			allDates = JSON.parse(allDatesAsStrings);	
   			sendOnDataConverted();
		}

		function sendOnDataConverted(){
			let event = new Event("onDataConverted");
			event.details = {};
			event.details.allDates = allDates;
			that.dispatchEvent(event);
		}

		function setDelteId(id){
			delteId = id;
		}

		function getDeleteId(){
			return delteId;
		}

		function updateData(newOrder){
			console.log("newOrder", newOrder);
		}

		function getDateAttributesById(id){
			let searchedDate = getSearchedDate(id);
			return searchedDate; 
		}

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