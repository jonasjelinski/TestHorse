var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.RegularDatesPageModel = function(userID){
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
   		function init(allDates){
   			allDates = allDates;
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