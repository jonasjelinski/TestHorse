var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		isNewUser = true,
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
    }

	function saveUserIntoDB()
	{	let hadCorrectParameter ={};
		if(isNewUser){
			hadCorrectParameter = requester.setUserIntoDB(user);
		}
		else{
			hadCorrectParameter = requester.updateUser(user);
		}		
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

	function createNewUser(){
		isNewUser= true;
	}

	function updateOldUser(){
		isNewUser = false;
	}

	that.init = init;
	that.saveUserIntoDB = saveUserIntoDB;
	that.createNewUser = createNewUser;
	that.updateOldUser = updateOldUser;
	return that;
}