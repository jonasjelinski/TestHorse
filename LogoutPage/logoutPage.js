var LogoutPage = LogoutPage || {};

/**
 * @class LogoutPage
 * @description <code>LogoutPage</code> sends s reust to the database to logout the user
 * @param {string} userID, id of the user who wants to logout
 */

LogoutPage = function(userID){
	let that = new EventTarget(),
		requester;

	/**
	* @function init
	* @public
	* @memberof! LogoutPage 
	* @instance
	* @description Initialize this modul.
	*/
	function init(){
		requester = new DatabaseClientInterface();
		requester.init();
	}

	/**
	* @function logout
	* @public
	* @memberof! LogoutPage 
	* @instance
	* @description sends a logout request to the db with the userID
	* to logout the user
	*/
	function logout(){
		requester.logoutUser(userID);
		sendEvent("onLogout");
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! LogoutPage 
	* @instance
	* @description sends an event of the type "type"
	*/
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	that.init = init;
	that.logout = logout;
	return that;
}