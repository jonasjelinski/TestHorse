var LoginPage = LoginPage || {};

/**
 * @namespace LoginPage
 * @memberOf! LoginPage
 * @description Centermodul the LoginPage
 * <p><code>Centermodul</code> Directs the communication between 
 * the moduls <code>loginModel</code> and the <code>loginView</code>
 * inits both moduls and sets their listeners 
 * <code>loginView</code> needs DOM-Elements to init
 * the ids of those elements are given to this modul as paramater
 * @param {boolean} loginButtonId id of the loginButton DOM-Element
 * @param {string} newUserButtonId id of the newUserButton DOM-Element
 * @param {string} stayLoggedInBoxId id of the stayLoggedInBox DOM-Element
 * @param {string} feedBackBoxId id of the feedBackBox DOM-Element
 */

LoginPage = function(loginButtonId, newUserButtonId, stayLoggedInBoxId, feedBackBoxId){
	let loginPage = new EventTarget(),
		loginView,
		loginModel,
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
		* @description Initialize this model. Inits the loginModel, the loginView and their listeners.
		*/ 
		function init(){
			getDomElements();
			initLoginView();
			initLoginModel();
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
			loginButton = document.getElementById(loginButtonId);
			newUserButton = document.getElementById(newUserButtonId);
			stayLoggedInBox = document.getElementById(stayLoggedInBoxId);
			feedBackBox = document.getElementById(feedBackBoxId);
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
			};
			loginView = new LoginView(options);
			loginView.init();			
		}

		/**
		* @function initLoginModel
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Inits the loginModel.
		*/ 
		function initLoginModel(){
			loginModel = new LoginModel();
			loginModel.init();			
		}

		/**
		* @function addListeners
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Adds the listeners to the loginModel and the loginView
		*/ 
		function addListeners(){
			loginModel.addEventListener("isValid", handleIsValid);			
			loginModel.addEventListener("isInvalid", handleIsInvalid);
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
			let userId = event.details.userId;
			sendChangePageEvent(userId);
		}

		/**
		* @function sendChangePageEvent
		* @private
		* @memberof! LoginPage  
		* @instance
		* @param {string} userId id of the user who logged in successfuly
		* @description Dispatches the event of the type "mainPage" together with the userId
		*/ 
		function sendChangePageEvent(userId){
			let event = new Event("mainPage");
			event.details = {};
			event.details.userId = userId;
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
		* @description Tells the loginModel that it has to try a login with the details of the event
		*/ 
		function handleLoginTry(event){
			let stayLoggedIn = event.details.stayLoggedIn,
				userId = event.details.userId,				
				pw = event.details.pw;
			loginModel.tryLogin(stayLoggedIn, userId, pw);
		}

		/**
		* @function handleNewUser
		* @private
		* @memberof! LoginPage  
		* @instance
		* @description Dispatches an event of the type "newUser"
		*/ 
		function handleNewUser(){
			let event = new Event("newUser");
			loginPage.dispatchEvent(event);
		}

		loginPage.init = init;
		return loginPage;
}