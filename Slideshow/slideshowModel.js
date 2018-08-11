var Slideshow = Slideshow ||{};

Slideshow.SlideshowModel = function(numberOfPages){
	let that = new EventTarget(),
		pageNumber,
		pageCanChange = true;

	function init(){
		pageNumber = 1;
	}

	function setNextPage(){
		if(pageCanChange){
			increasePageNumberAndSendIt();
		}		
	}

	function increasePageNumberAndSendIt(){
		if(!isSlideShowOver()){
			pageNumber++;
			sendPageNumber();			
		}
		else{
			sendSlideShowOverEvent();
		}
	}

	function isSlideShowOver(){
		return pageNumber === numberOfPages;
	}

	function sendSlideShowOverEvent(){
		let event = new Event("slideShowIsOver");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}


	function setPreviousPage(){	
		if(pageCanChange){
			decreasePackeNumberAndSendIt();
		}

	}

	function decreasePackeNumberAndSendIt(){		
		if(!isFirstPage()){
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

	function setPageCanChange(booleanValue){
		pageCanChange = booleanValue;
	}

	that.init = init;
	that.setNextPage = setNextPage;
	that.setPreviousPage = setPreviousPage;
	that. setPageCanChange = setPageCanChange;
	return that;
}