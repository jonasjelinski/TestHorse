var EntityCreater = EntityCreater || {};

EntityCreater = function(valueBoxId, forwardButtonId, backwardsButtonId, textBoxId, numberOfPages){
	let that = new EventTarget(),
		valueBox,
		pageCreator,
		slideShow,
		view,
		model;

	function init(){
		initPageCreator();
		initSlideShow();
		initModel();
	}

	function initPageCreator(){
		valueBox = document.getElementById(valueBoxId);
		pageCreator = new PageCreator(valueBox);		
	}

	function initSlideShow(){
		slideshow = Slideshow(forwardButtonId, backwardsButtonId, textBoxId, numberOfPages);
		slideshow.addEventListener("onPageChange", handlePageChange); 
		slideshow.addEventListener("slideShowIsOver", handleSlideShowIsOver); 
	}

	function handlePageChange(event){
		let pageNumber = event.details.pageNumber;
		model.setPage(pageNumber);	
	}

	function handleSlideShowIsOver(){
		model.checkIfEntityHasEnoughValues();
	}

	function initModel(){
		model = new EntityCreater.EntityCreaterModel(pages);
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
		view = new EntityCreater.EntityCreaterView();
		view.addEventListener("onNewPropertyValue", handleNewValue);
	}

	function handleNewValue(event){
		let details = event.details,
			property = details.property,
			value = details.value;
		model.updatePropertyValue(property, value);
	}

	that.init = init;
	return that;
}