var Slideshow = Slideshow ||{};

Slideshow = function(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages, pages, innerPageId){
	let that = new EventTarget(),
		slideShowProgress,
		slideShowPageChanger,
		currentPage;

	function init(){
		initModuls();
		addListeners();
	}

	function initModuls(){
		slideShowProgress = new Slideshow.SlideshowProgress(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages);
		slideShowPageChanger = new Slideshow.PageChanger(innerPageId, pages);
		slideShowProgress.init();
		slideShowPageChanger.init();
	}

	function addListeners(){
		slideShowProgress.addEventListener("onPageChange", handlePageChange);
		slideShowProgress.addEventListener("slideShowIsOver", handleSlideShowIsOver);
	}

	function showFirstPage(){
		let firstPage = 1;
		slideShowPageChanger.setPage(firstPage);
	}

	function handlePageChange(event){
		currentPage = event.details.pageNumber;		
		sendPageNumber(currentPage);
	}

	function sendPageNumber(pageNumber){
		let event = new Event("onPageChange");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}

	function handleSlideShowIsOver(){
		let event = new Event("slideShowIsOver");
		that.dispatchEvent(event);
	}

	function setPage(pageNumber){
		slideShowPageChanger.setPage(pageNumber);
	}

	that.init = init;
	that.setPage = setPage;
	that.showFirstPage = showFirstPage;
	return that;
}