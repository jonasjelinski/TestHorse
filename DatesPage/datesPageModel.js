var DatesPage = DatesPage || {};

DatesPage.DatesPageModel = function(userID){
	let that = new EventTarget(),
		dbRequester,		
		datesData;

		/**
		* @function init
		* @public
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
		*/ 	
   		function init(){
			dbRequester = new DatabaseClientInterface(userID);
			addEventListener();
			dbRequester.getUserData(userID);
		}

		/**
		* @function addEventListener
		* @private
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Sets the listeners of the dbRequester
		*/ 	
		function addEventListener(){
			dbRequester.addEventListener("onResult", handleResult);		
		}

		/**
		* @function handleResult
		* @private
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Dispatches the event of the type "onDataReceived". Is used to give other moduls the data of the database.
		*/ 	
		function handleResult(event){
			let data = event.details.data;
			datesData = data;
			sendEvent("onDataReceived", datesData);
		}	

		/**
		* @function sendEvent
		* @private
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Dispatches the event of the type "type" and the details data
		*/ 	
		function sendEvent(type, data){
			let event = new Event(type);
			event.details = {};
			event.details.data = data;
			that.dispatchEvent(event);
		}

		/**
		* @function updateData
		* @private
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Updates the data of this model
		*/ 	
		function updateData(data){
			datesData = data;
		}

		/**
		* @function saveDataIntoDB
		* @private
		* @memberof! DatesPage.DatesPageModel 
		* @instance
		* @description Saves data into the db
		*/ 	
		function saveDataIntoDB(data){
			datesData = data;
		}		

		that.updateData = updateData;
		that.saveDataIntoDB = saveDataIntoDB;
		that.init = init;
		return that;
}