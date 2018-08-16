var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.RegularDatesPageModel = function(userID){
	let that = new EventTarget(),
		dbRequester,		
		regularDatesData;

		/**
		* @function init
		* @public
		* @memberof! RegularDatesPage.RegularDatesPageModel 
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
		* @memberof! RegularDatesPage.RegularDatesPageModel
		* @instance
		* @description Sets the listeners of the dbRequester
		*/ 	
		function addEventListener(){
			dbRequester.addEventListener("onResult", handleResult);		
		}

		/**
		* @function handleResult
		* @private
		* @memberof! RegularDatesPage.RegularDatesPageModel
		* @instance
		* @description Dispatches the event of the type "onDataReceived". Is used to give other moduls the data of the database.
		*/ 	
		function handleResult(event){
			let data = event.details.data;
			regularDatesData = data;
			sendEvent("onDataReceived", datesData);
		}	

		/**
		* @function sendEvent
		* @private
		* @memberof! RegularDatesPage.RegularDatesPageModel
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
		* @memberof! RegularDatesPage.RegularDatesPageModel
		* @instance
		* @description Updates the data of this model
		*/ 	
		function updateData(data){
			regularDatesData = data;
		}

		/**
		* @function saveDataIntoDB
		* @private
		* @memberof! RegularDatesPage.RegularDatesPageModel
		* @instance
		* @description Saves data into the database
		*/ 	
		function saveDataIntoDB(){
			regularDatesData = data;
			dbRequester.updateDate(data);
		}

		function getDateAttributesById(id) {}		

		that.getDateAttributesById = getDateAttributesById;
		that.updateData = updateData;
		that.saveDataIntoDB = saveDataIntoDB;
		that.init = init;
		return that;
}