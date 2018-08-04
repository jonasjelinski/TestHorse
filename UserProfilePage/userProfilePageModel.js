var UserProfilPage = UserProfilPage || {};

UserProfilPage.UserProfilPageModel = function(userID){
	let that = new EventTarget(),
		dbRequester,		
		userData;

		/**
		* @function init
		* @public
		* @memberof! UserProfilPage.UserProfilPageModel  
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
		*/ 	
   		function init(){
			dbRequester = new DatabaseClientInterface(userID);
			addEventListener();
			dbRequester.getUserData();
		}

		/**
		* @function addEventListener
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Sets the listeners of the dbRequester
		*/ 	
		function addEventListener(){
			dbRequester.addEventListener("onResult", handleResult);		
		}

		/**
		* @function handleResult
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "onDataReceived". Is used to give other moduls the data of the database.
		*/ 	
		function handleResult(event){
			let data = event.details.data;
			userData = data;
			sendEvent("onDataReceived", userData);
		}	

		/**
		* @function sendEvent
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "type" and the details data
		*/ 	
		function sendEvent(type, data){
			let event = new Event(type);
			event.details = {};
			event.details.data = data;
			that.sendEvent(event);
		}

		that.init = init;
		return that;
}