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
			sendEvent("isInvalid");
		}

		function sendEvent(type){
			let event = new Event(type);
			loginModul.sendEvent(event);
		}

		function handleIsValid(){
			sendEvent("isValid");
		}

		function tryLogin(userID, pw){
			dbRequester.tryLogin(userID, pw);
		}

		loginModul.tryLogin = tryLogin;
		return loginModul;
}