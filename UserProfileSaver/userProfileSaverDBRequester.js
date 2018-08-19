var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.DBRequester = function(){

	function init(){
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

	function saveUserIntoDB(isNewUser, user)
	{	let hadCorrectParameter ={};
		user.userID = user.id;
		if(isNewUser){
			hadCorrectParameter = requester.setUserIntoDB(user);
		}
		else{
			hadCorrectParameter = requester.updateUser(user);
		}		
		handleParameterFeedBack(hadCorrectParameter, user);
	}

	function handleParameterFeedBack(hadCorrectParameter, user){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", user);
		}
	}
	
	that.init = init;
	that.saveUserIntoDB = saveUserIntoDB;
	return that;
}