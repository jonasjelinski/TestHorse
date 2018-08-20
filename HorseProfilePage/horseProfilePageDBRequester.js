var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage.DBRequester = function(){
	
	let that = {};

	function init() {
		initRequester();
		addEventListeners();
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function handleResult(event) {
		let result = event.details.result;
		console.log("horseDelteResult", result);
	}

	function delteHorseFromDB(horseID) {
		requester.deleteHorseFromDB(horseID);
	}

	that.init = init;
	that.delteHorseFromDB = delteHorseFromDB;
	return that;
}

	
