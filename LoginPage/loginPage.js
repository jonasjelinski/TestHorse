var LoginPage = LoginPage || {};

LoginPage = function(loginButtonId, newUserButtonId, stayLoggedInBoxId, feedBackBoxId, negativeFeedbackClass){
	let loginPage = new EventTarget(),
		loginView,
		loginModel,
		loginButton,
		newUserButton,
		stayLoggedInBox,
		feedBackBox,
		negativeFeedbackClass;

		function init(){
			getDomElements();
			initLoginView();
			initLoginModel();
			addListeners();
		}

		function getDomElements(){
			loginButton = document.getElementById(loginButtonId);
			newUserButton = document.getElementById(newUserButtonId);
			stayLoggedInBox = document.getElementById(stayLoggedInBoxId);
			feedBackBox = document.getElementById(feedBackBoxId);
		}

		function initLoginView(){
			let options = {
				loginButton : loginButton,
				newUserButton: newUserButton,
				stayLoggedInBox : stayLoggedInBox,
				feedBackBox : feedBackBox,
				negativeFeedbackClass : negativeFeedbackClass,
			};
			loginView = new LoginView(options);
			loginView.init();			
		}

		function initLoginModel(){
			loginModel = new LoginModel();
			loginModel.init();			
		}

		function addListeners(){
			loginModel.addEventListener("isValid", handleIsValid);			
			loginModel.addEventListener("isInvalid", handleIsInvalid);
			loginView.addEventListener("tryLogin", handleLoginTry);
			loginView.addEventListener("newUser", handleNewUser);	
		}

		function handleIsValid(ev){
			let userId =  event.details.userId;
			sendChangePageEvent(userId);
		}

		function sendChangePageEvent(userId){
			let event = new Event("mainPage");
			event.details = {};
			event.details.userId = userId;
			loginPage.dispatchEvent(event);
		}

		function handleIsInvalid(){
			loginView.showNegativeFeedback();
		}

		function handleLoginTry(event){
			let userId = event.details.userId
				pw = event.details.pw;
			loginModel.tryLogin(userId, pw);
		}

		function handleNewUser(){
			let event = new Event("newUser");
			loginPage.dispatchEvent(event);
		}
}