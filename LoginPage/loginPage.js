var LoginPage = LoginPage || {};

/**
 * @namespace LoginPage
 * @memberOf! LoginPage
 * @description Centermodul the LoginPage
 * <p><code>Centermodul</code> Directs the communication between 
 * the moduls <code>dbRequester</code> and the <code>loginView</code>
 * inits both moduls and sets their listeners 
 * <code>loginView</code> needs DOM-Elements to init
 * the ids of those elements are given to this modul as paramater
 * @param {boolean} loginButtonId id of the loginButton DOM-Element
 * @param {string} newUserButtonId id of the newUserButton DOM-Element
 * @param {string} stayLoggedInBoxId id of the stayLoggedInBox DOM-Element
 * @param {string} feedBackBoxId id of the feedBackBox DOM-Element
 * </p>
 */

LoginPage = function(loginButtonId, newUserButtonId, stayLoggedInBoxId, feedBackBoxId){
	const LOGIN_BUTTON_ID = "loginButton",  
		 NEW_USER_BUTTON_ID = "createNewAccount",
		 STAY_LOGGED_INBOX_ID = "stayLoggedInBox", 
		 FEEDBACK_BOX_ID = "loginFailedText",
		 NAME_INPUT_ID =  "userNameInput",
		 PASSWORD_INPUT_ID =  "passwordInput";

	let loginPage = new EventTarget(),
		loginView,
		dbRequester,
		loginButton,
		newUserButton,
		stayLoggedInBox,
		feedBackBox,
		negativeFeedbackClass;

		/**
		* @function init
		* @public
		* @memberof! LoginPage  
		* @instance
		* @description Initialize this model. Inits the dbRequester, the loginView and their listeners.
		*/ 
		function init(){
			getDomElements();
			initLoginView();
			initdbRequester();
			addListeners();
		}

		/**
		* @function getDomElements
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Gets the domElements by document.getElementById and the params of this modul
		*/ 
		function getDomElements(){
			loginButton = document.getElementById(LOGIN_BUTTON_ID);
			newUserButton = document.getElementById(NEW_USER_BUTTON_ID);
			stayLoggedInBox = document.getElementById(STAY_LOGGED_INBOX_ID);
			feedBackBox = document.getElementById(FEEDBACK_BOX_ID);
			userNameInput = document.getElementById(NAME_INPUT_ID);
			passwordInput = document.getElementById(PASSWORD_INPUT_ID);
		}

		/**
		* @function initLoginView
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Inits the loginView. Gives it he domElements as parameters.
		*/ 
		function initLoginView(){
			let options = {
				loginButton : loginButton,
				newUserButton: newUserButton,
				stayLoggedInBox : stayLoggedInBox,
				feedBackBox : feedBackBox,
				userNameInput: userNameInput,
				passwordInput: passwordInput,
			};
			loginView = new LoginPage.LoginView(options);
			loginView.init();	
		}

		/**
		* @function initdbRequester
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Inits the dbRequester.
		*/ 
		function initdbRequester(){
			dbRequester = new LoginPage.DBRequester();
			dbRequester.init();			
		}

		/**
		* @function addListeners
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Adds the listeners to the dbRequester and the loginView
		*/ 
		function addListeners(){
			dbRequester.addEventListener("isValid", handleIsValid);			
			dbRequester.addEventListener("isInvalid", handleIsInvalid);
			loginView.addEventListener("tryLogin", handleLoginTry);
			loginView.addEventListener("newUser", handleNewUser);	
		}


		/**
		* @function handleIsValid
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Reads the userId from the event and send this usedId with sendChangePageEvent
		*/ 
		function handleIsValid(event){
			let userID = event.details.userID;
			sendChangePageEvent(userID);
		}

		/**
		* @function sendChangePageEvent
		* @private
		* @memberof! LoginPage  
		* @instance
		* @param {string} userId id of the user who logged in successfuly
		* @description Dispatches the event of the type "showStartPage" together with the userId
		*/ 
		function sendChangePageEvent(userId){
			let event = new Event("showStartPage");
			event.details = {};
			event.details.userID = userId;
			loginPage.dispatchEvent(event);
		}

		/**
		* @function handleIsInvalid
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Tells the loginView that it has to give the user a negative feedback
		*/ 
		function handleIsInvalid(){
			loginView.showNegativeFeedback();
		}

		/**
		* @function handleLoginTry
		* @private
		* @memberof! LoginPage  
		* @instance
		* @param {Event} event is the event which contains the details stayLoggedIn, userId and pw
		* @description Tells the dbRequester that it has to try a login with the details of the event
		*/ 
		function handleLoginTry(event){
			let stayLoggedIn = event.details.stayLoggedIn,
				userId = event.details.userId,				
				pw = event.details.pw;
			dbRequester.tryLogin(stayLoggedIn, userId, pw);
		}

		/**
		* @function handleNewUser
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Dispatches an event of the type "newUser"
		*/ 
		function handleNewUser(){
			let event = new Event("createNewUser");
			loginPage.dispatchEvent(event);
		}

		loginPage.init = init;
		return loginPage;
}