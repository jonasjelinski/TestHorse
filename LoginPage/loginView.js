var LoginPage = LoginPage || {};

/**
 * @namespace LoginView
 * @memberOf! LoginPage
 * @description View of the LoginPage
 * <p><code>LoginView</code> represents the UI of the LoginPage
 * this modul is a controll-view modul
 * inits both domELements and sets their listeners 
 * <p>Options-Object:</p>
 * <ul>
 * <li><code>options.loginButton</code> DOM-reference on the hand of the loginButton</li>
 * <li><code>options.newUserButton</code> DOM-reference on the hand of the newUserButton</li>
 * <li><code>options.stayLoggedInBox</code> DOM-reference on the hand of the stayLoggedInBox</li>
 * <li><code>options.feedBackBox</code> DOM-reference on the hand of the feedBackBox</li>
 * <li><code>options.userNameInputBox</code> DOM-reference on the hand of the userNameInputBox</li>
 * <li><code>options.pwInputBox</code> DOM-reference on the hand of the pwInputBox</li>
 * </ul>
 * <p>the movement of the hand of the clock can be started and stopped here.</p>
 * </p>
 */

LoginPage.LoginView = function(options){

	const NEGATIVE_HINT = "Nutzername oder Passwort sind falsch";

	let loginView = new EventTarget(),
		loginButton,
		newUserButton,
		stayLoggedInBox,
		feedBackBox,
		userNameInputBox,
		pwInputBox;

	/**
	* @function init
	* @public
	* @memberof! LoginView  
	* @instance
	* @description Initialize this model. Inits the viewElements and their listeners.
	*/ 
	function init(){
		initViewElements();
		initListeners();
		hideNegativeFeedback();
	}

	/**
	* @function initViewElements
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Inits the viewElements by reading the properties of the param options .
	*/ 
	function initViewElements(){
		loginButton = options.loginButton;
		newUserButton = options.newUserButton;
		stayLoggedInBox = options.stayLoggedInBox;
		feedBackBox = options.feedBackBox;
		userNameInputBox = options.userNameInput;
		pwInputBox = options.passwordInput;
	}

	/**
	* @function initListeners
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Sets the listeners of the viewElements
	*/ 
	function initListeners(){		
		loginButton.addEventListener("click", handleLogin);
		newUserButton.addEventListener("click", handleNewUser);
		userNameInputBox.addEventListener("input", hideNegativeFeedback);		
	}

	/**
	* @function handleLogin
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Reads the values from DOM-Elements and gives it as params to sendLoginData
	*/ 
	function handleLogin(){	
		let stayLoggedIn = stayLoggedInBox.value;
			userId = userNameInputBox.value;
			pw = pwInputBox.value;
			sendLogInData(stayLoggedIn, userId, pw);			
	}

	/**
	* @function sendLogInData
	* @private
	* @memberof! LoginView  
	* @instance
	* @param {boolean} stayLoggedIn boolean descbiring if the user wants to stay logged in 
	* @param {string} userID id of the user
	* @param {string} pw password which has to be validated together with the userID
	* @description Sends the params as details properties of the event "tryLogin"
	*/ 
	function sendLogInData(stayLoggedIn, userId, pw){
		let event = new Event("tryLogin");
			event.details = {};
			event.details.stayLoggedIn = stayLoggedIn;
			event.details.userId = userId;
			event.details.pw = pw;
			loginView.dispatchEvent(event);
			
	}

	/**
	* @function handleNewUser
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Dispatches the event "newUser"
	*/ 
	function handleNewUser(){
		let event = new Event("newUser");
		loginView.dispatchEvent(event);
	}

	/**
	* @function showNegativeFeedback
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Sets the feedBackBox "visible" and sets the text
	*/ 
	function showNegativeFeedback(){
		feedBackBox.style.visibility = "visible";
		feedBackBox.innerHTML = NEGATIVE_HINT;
	}

	/**
	* @function hideNegativeFeedback
	* @private
	* @memberof! LoginView  
	* @instance
	* @description Sets the feedBackBox "hidden"
	*/ 
	function hideNegativeFeedback(){
		feedBackBox.style.visibility = "hidden";
	}

	loginView.init = init;
	loginView.showNegativeFeedback = showNegativeFeedback;
	return loginView;
}