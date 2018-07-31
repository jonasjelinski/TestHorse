var LoginPage = LoginPage || {};

LoginPage.LoginView = new function(options){

	const NEGATIVE_HINT = "Nutzername oder Passwort sind falsch";

	let loginView = new EventTarget(),
		loginButton,
		newUserButton,
		stayLoggedInBox,
		feedBackBox,
		userNameInputBox,
		pwInputBox;

	function init(){
		initViewElements();
		initListeners();
	}

	//inits all viewElements and the negativeFeedbackClass 
	function initViewElements(){
		loginButton = options.loginButton;
		newUserButton = options.newUserButton;
		stayLoggedInBox = options.stayLoggedInBox;
		feedBackBox = options.feedBackBox;
		userNameInputBox = options.feedBackBox;
		pwInputBox = options.feedBackBox;
	}

	function initListeners(){		
		loginButton.addEventListener("onClick", handleLogin);
		newUserButton.addEventListener("onClick", handleNewUser);
		userNameInputBox.addEventListener("input", hideNegativeFeedback);		
	}

	function handleLogin(){
		let stayLoggedIn = stayLoggedInBox.checked;
			userId = userNameInputBox.value;
			pw = pwInputBox.value;
			sendLogInData(stayLoggedIn, userId, pw);			
	}

	function sendLogInData(stayLoggedIn, userId, pw){
		let event = new Event("tryLogin");
			event.details = {};
			event.details.stayLoggedIn = stayLoggedIn;
			event.details.userId = userId;
			event.details.pw = pw;
			loginView.dispatchEvent(event);
	}

	function handleNewUser(){
		let event = new Event("newUser");
		loginView.dispatchEvent(event);
	}	

	function showNegativeFeedback(){
		feedBackBox.style.visibility = "visible";
		feedBackBox.innerHTML = NEGATIVE_HINT;
	}

	function hideNegativeFeedback(){
		feedBackBox.style.visibility = "hidden";
	}

	loginView.init = init;
	loginView.showNegativeFeedback = showNegativeFeedback;
	return loginView;
}