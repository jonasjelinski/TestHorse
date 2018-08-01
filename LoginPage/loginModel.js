var LoginPage = LoginPage || {};

/**
 * @namespace LoginModul
 * @memberOf! LoginPage
 * @description contains the logic of the LoginPage
 * <p><code>LoginModel</code> validates the password of the login.
 * <code>tryLogin</code> is a public function which can be used in other moduls
 * it validates the passwort through the dbRequester
 * if the passwort and userId is correct <code>LoginModel</code> dispatches the <code>isValid</code> event with the userId
 * else it dispatches the <code>isInvalid</code> event.</p>
 * <code>stayLoggedIn</code> is a boolean which descripes if the user wants to stay logged in
 * the code to stay logged in is in the dbRequester and php-Modul because of security issues
 */

LoginPage.LoginModel = function(){
	let loginModel = new EventTarget(),
		dbRequester,		
		userID;

		/**
		* @function init
		* @public
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners.
		*/ 	
   		function init(){
			dbRequester = new DBRequester();
			addEventListener();
		}

		/**
		* @function addEventListener
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Sets the listeners of the dbRequester
		*/ 	
		function addEventListener(){
			dbRequester.addEventListener("isInvalid", handleIsInvalid);
			dbRequester.addEventListener("isValid", handleIsValid);
		}

		/**
		* @function handleIsInvalid
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "isInvalid"
		*/ 	
		function handleIsInvalid(){
			let data = {};
			sendEvent("isInvalid", data);
		}

		/**
		* @function handleIsValid
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "isValid" and the userID
		*/ 	
		function handleIsValid(){
			let data = {userID : userID};
			sendEvent("isValid", data);
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
			event.details = data;
			loginModel.sendEvent(event);
		}

		/**
		* @function tryLogin
		* @public
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @param {boolean} stayLoggedIn boolean descbiring if the user wants to stay logged in 
		* @param {string} userID id of the user
		* @param {string} pw password which has to be validated together with the userID
		* @description Trys to login through the dbRequester
		*/ 	
		function tryLogin(stayLoggedIn, userID, pw){
			dbRequester.tryLogin(stayLoggedIn, userID, pw);
		}

		loginModel.init = init;
		loginModel.tryLogin = tryLogin;
		return loginModel;
}