var Slideshow = Slideshow ||{};

Slideshow.SlideshowModel = function(numberOfPages){
	let that = new EventTarget(),
		pageNumber;

	function init(){
		pageNumber = 1;
	}

	function setNextPage(){
		if(!isSlideShowOver){
			pageNumber++;
			sendPageNumber();
		}
		else{
			sendSlideShowOverEvent();
		}
	}

	function isSlideShowOver(){
		return pageNumber === numberOfPages+1;
	}

	function setPreviousPage(){
		if(!isFirstPage){
			pageNumber--;
			sendPageNumber();
		}
	}

	function isFirstPage(){
		return pageNumber === 1;
	}

	function sendPageNumber(){
		let event = new Event("onPageChange");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}

}