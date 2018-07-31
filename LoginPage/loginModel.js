var LoginPage = LoginPage || {};

LoginPage.LoginModul = function(){
	let loginModul = new EventTarget(),
		dbRequester,		
		userID;

		function init(){
			dbRequester = new DBRequester();
			addEventListener();
		}

		function addEventListener(){
			dbRequester.addEventListener("isInvalid", handleIsInvalid);
			dbRequester.addEventListener("isValid", handleIsValid);
		}

		function handleIsInvalid(){
			let data = {};
			sendEvent("isInvalid", data);
		}

		function handleIsValid(){
			let data = {userID : userID};
			sendEvent("isValid", data);
		}

		function sendEvent(type, data){
			let event = new Event(type);
			event.details = data;
			loginModul.sendEvent(event);
		}

		function tryLogin(stayLoggedIn, userID, pw){
			dbRequester.tryLogin(stayLoggedIn, userID, pw);
		}

		loginModul.tryLogin = tryLogin;
		return loginModul;
}