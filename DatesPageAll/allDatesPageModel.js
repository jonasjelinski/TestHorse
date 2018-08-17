var DatesPageAll = DatesPageAll || {};

DatesPageAll.DatesPageModel = function(userID){
	let that = new EventTarget(),
		dbRequester,		
		datesData,
		delteId;

		/**
		* @function init
		* @public
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
		*/ 	
   		function init(allDates){
   			datesData = allDates;		
		}

		function setDelteId(id){
			delteId = id;
		}

		function getDeleteId(){
			return delteId;
		}

		
		that.init = init;
		that.setDelteId = setDelteId;
		that.getDeleteId = getDeleteId;
		return that;
}