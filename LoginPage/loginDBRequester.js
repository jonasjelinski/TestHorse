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
 * </p>
 */

LoginPage.DBRequester = function(){
	let loginModel = new EventTarget(),
		dbRequester,
		isLogginTry = true,		
		email;

		/**
		* @function init
		* @public
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Initialize this model. Inits the dbRequester and its listeners.
		*/ 	
   		function init(){
			dbRequester = new DatabaseClientInterface();
			dbRequester.init();
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
			dbRequester.addEventListener("onResult", handleResult);
		}

		/**
		* @function handleResult
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event depending on the result of the db request
		*/ 	
		function handleResult(event){
			if(isLogginTry){
				handleLogginResult(event);
			}
			else{
				handleIDResult(event);
			}
			
		}

		function handleLogginResult(event){
			let result = event.details.result;
			if(isResultValid(result)){
				isLogginTry = false;
				dbRequester.getUserId(email);
			}
			else{
				handleIsInvalid();
			}
		}

		function isResultValid(result){
			let validMessage = "true";
			return result.includes(validMessage);
		}

		function handleIDResult(event){
			let userID = event.details.result;
			handleIsValid(userID);
		}

		/**
		* @function handleIsValid
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "isValid" and the userID
		*/ 	
		function handleIsValid(userID){
			let cleanUserID = getOnlyNumbers(userID),
				data = {userID : cleanUserID};
			sendEvent("isValid", data);
		}

		function getOnlyNumbers(userID){
			userID = userID.replace(/[^0-9]/, '');
			return userID;
		}

		/**
		* @function isInvalid
		* @private
		* @memberof! LoginModul.LoginPage  
		* @instance
		* @description Dispatches the event of the type "isValid" and the userID
		*/ 	
		function handleIsInvalid(){
			sendEvent("isInvalid");
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
			loginModel.dispatchEvent(event);
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
		function tryLogin(stayLoggedIn, mail, pw){
			isLogginTry = true;
			email = mail;
			let logginData = {
				stayLoggedIn : stayLoggedIn,
				email: email,
				password: pw,
			};
			dbRequester.tryLogin(logginData);

		}

		loginModel.init = init;
		loginModel.tryLogin = tryLogin;
		return loginModel;
}