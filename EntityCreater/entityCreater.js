var EntityCreater = EntityCreater || {};

EntityCreater = function(innerPageId, forwardButtonId, backwardsButtonId, textBoxId, numberOfPages, attributes, pages, valueBoxId, feedBackBoxId){
	let that = new EventTarget(),
		innerPage,
		pageCreator,
		slideShow,
		view,
		model;

	function init(){
		initPageCreator();
		initSlideShow();
		initModel();
		initView();
	}

	function initPageCreator(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new PageCreator(innerPage);		
	}

	function initSlideShow(){
		slideshow = Slideshow(forwardButtonId, backwardsButtonId, textBoxId, numberOfPages);
		slideshow.addEventListener("onPageChange", handlePageChange); 
		slideshow.addEventListener("slideShowIsOver", handleSlideShowIsOver); 
	}

	function handlePageChange(event){
		let pageNumber = event.details.pageNumber,
			valueData = view.getValue();			
		model.setPage(pageNumber);	
		model.updatePropertyValue(valueData.property, valueData.value);
	}

	function handleSlideShowIsOver(){
		model.checkIfEntityHasEnoughValues();
	}

	function initModel(){
		model = new EntityCreater.EntityCreaterModel(attributes, pages);
		model.addEventListener("onPageChange", handlePageChangeOfModel);
		model.addEventListener("hasEnoughValues", handleEnoughValues);
		model.addEventListener("hasNotEnoughValues", handleNotEnoughValues);
	}	

	function handlePageChangeOfModel(event){
		let pageHTMLString = event.details.page;
		pageCreator.showPage(pageHTMLString); 
	}

	function handleEnoughValues(event){
		let details = event.details,
			data = details.data;
		sendValuesData(data);	
	}

	function handleNotEnoughValues(){
		view.showHasNotEnoughVaues();
	}

	function sendValuesData(data){
		let event = new Event("onAllValuesSaved");
		event.details = {};
		event.details.data = data;
		that.dispatchEvent(event);
	}

	function initView(){
		view = new EntityCreater.EntityCreaterView(valueBoxId, feedBackBoxId);		
	}

	that.init = init;
	return that;
}