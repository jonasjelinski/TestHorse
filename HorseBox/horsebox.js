var Horsebox = Horsebox ||{};

Horsebox = function(horseBoxId, dateButtonClass, profileButtonClass){
	let that = new EventTarget(),
		horseBoxModel,
		horseBoxView,
		horseBox,
		horsePic,
		dateButton,
		profileButton;

	function init(){
		getDomElements();
		initModel();
		initView();		
		addListeners();
	}

	function getDomElements(){
		horseBox = document.getElementById(horseBoxId);
		dateButton = horseBox.querySelectorAll("."+dateButtonClass)[0];
		profileButton = horseBox.querySelectorAll("."+profileButtonClass)[0];
	}

	function initModel(){
		horseBoxModel = new Horsebox.HorseboxModel(numberOfPages);
		horseBoxModel.init();
	}

	function addListeners(){
		dateButton.addEventListener("click", handleDateButton);
		profileButton.addEventListener("click", handleProfileButton);
	}

	function handleDateButton(){
		sendEvent("onDateButton");
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleProfileButton(){
		sendEvent("onProfileButton");
	}
	
	that.init = init;
	return that;
} 