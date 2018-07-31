var LoginPage = LoginPage || {};

LoginPage.LoginView = new function(options){

	const NEGATIVE_HINT = "Nutzername oder Passwort sind falsch";

	let loginView = new EventTarget(),
		loginButton,
		newUserButton,
		stayLoggedInBox,
		feedBackBox,
		negativeFeedbackClass;

	function init(){
		initViewElements();
		initListeners();
	}

	function initViewElements(){
		loginButton = options.loginButton;
		newUserButton = options.newUserButton;
		stayLoggedInBox = options.stayLoggedInBox;
		feedBackBox = options.feedBackBox;
		negativeFeedbackClass = options.negativeFeedbackClass;
	}

	function initListeners(){
		loginButton.addEventListener("onClick", handleLogin);
		newUserButton.addEventListener("onClick", handleNewUser);		
	}

	function handleLogin(){
		let stayLoggedIn = stayLoggedInBox.checked;
			event = new Event("tryLogin");
			event.details = {};
			event.deatils.stayLoggedIn = stayLoggedIn;
			loginView.dispatchEvent(event);
	}

	function handleNewUser(){
		let event = new Event("newUser");
		loginView.dispatchEvent(event);
	}	

	function showNegativeFeedback(){
		feedBackBox.innerHTML = NEGATIVE_HINT;
	}


}