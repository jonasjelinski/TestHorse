var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		user;

	function init(newUser) {
		user = newUser;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function handleResult(event){
		let data = event.details.data;
		console.log("data", data);
    }

	function saveUserIntoDB()
	{	let hadCorrectParameter = requester.setUserIntoDB(user);
		handleParameterFeedBack(hadCorrectParameter);
	}

	function handleParameterFeedBack(hadCorrectParameter){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newHorse);
		}
	}

	that.init = init;
	that.saveUserIntoDB = saveUserIntoDB;
	return that;
}