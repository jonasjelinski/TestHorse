var LogoutPage = LogoutPage || {};

LogoutPage = function(userID){
	let that = new EventTarget(),
		requester;

	function init(){
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function logout(){
		console.log("logout");
		requester.logoutUser(userID);
		sendEvent("onLogout");
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	that.init = init;
	that.logout = logout;
	return that;
}