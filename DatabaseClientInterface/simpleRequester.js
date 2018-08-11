var DatabaseClientInterface = DatabaseClientInterface || {};

DatabaseClientInterface.SimpleRequester = function(requestParamater, requestFunction){
	let that = new EventTarget(),
		dbRequester,		
		userData,
		requestParam,
		requestFunc;

	/**
	* @function init
	* @public
	* @memberof! UserProfilPage.UserProfilPageModel  
	* @instance
	* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
	*/ 	
	function init(){
		initParameter();
		initInterface();
	}

	function initParameter(){
		requestParam = requestParamater;
		requestFunc = requestFunction;
	}

	function initInterface(){
		interface = new DatabaseClientInterface();
		interface.init();
		addEventListener();
	}

	function request() {
		interface[requestFunc](requestParam);
	}

	function setParameter(param){
		requestParam = param;	
	}

	function setFunction(func){
		requestFunc = func;
	}

	/**
	* @function addEventListener
	* @private
	* @memberof! LoginModul.LoginPage  
	* @instance
	* @description Sets the listeners of the dbRequester
	*/ 	
	function addEventListener(){
		interface.addEventListener("onResult", handleResult);		
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
		sendEvent("onDataReceived", data);
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
	that.request = request;
	that.setParameter = setParameter;
	that.setFunction = setFunction;
	return that;
}