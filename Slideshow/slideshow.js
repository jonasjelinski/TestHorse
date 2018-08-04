var Slideshow = Slideshow ||{};

Slideshow = function(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages){
	let that = new EventListener(),
		slideshowModel,
		slideshowView,
		forwardButton,
		backwardsButton,
		progressBox;

	function init(){
		getDomElements();
		initModel();
		initView();		
		addListeners();
	}

	function getDomElements(){
		forwardButton = document.getElementById(forwardButton);
		backwardsButton = document.getElementById(backwardsButtonId);
		progressBox = document.getElementById(progressBoxId);
	}

	function initModel(){
		slideshowModel = new SlideshowModel(numberOfPages);
	}

	function initView(){
		let domElements = {
			backButton: backwardsButton,
			forwardButton: forwardButton,
			progressBox: progressBox,
			numberOfPages: numberOfPages,
		}
		slideshowView = new SlideshowView(domElements);
	}	

	function addListeners(){
		modelListeners();
		addViewListeners();
		addPageListeners();
	}

	function modelListeners(){
		slideshowModel.addEventListener("onPageChange", handlePageChange);
	}

	function handlePageChange(event){
		let pageNumber = event.details.pageNumber;
		slideshowView.setPageNumber(pageNumber);
		sendPageNumber(pageNumber);
	}

	function sendPageNumber(number){
		let event = new Event("onPageChange");
		event.details = {};
		event.details.pageNumber = number;
		that.dispatchEvent(event);
	}

	function addViewListeners(){
		slideshowView.addEventListener("onBackwards", handleForward);
		slideshowView.addListeners("onForward", handleBackwards);	
	}

	function handleForward(){
		slideshowModel.setNextPage();
	}

	function handleBackwards(){
		slideshowModel.setPreviousPage();
	}
	
	return that;
} 