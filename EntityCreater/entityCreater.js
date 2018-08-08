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
		showFirstPage();
		initView();
	}

	function initPageCreator(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new Pages.PageCreator(innerPage);		
	}

	function initSlideShow(){
		slideshow = Slideshow(forwardButtonId, backwardsButtonId, textBoxId, numberOfPages);
		slideshow.addEventListener("onPageChange", handlePageChange); 
		slideshow.addEventListener("slideShowIsOver", handleSlideShowIsOver);
		slideshow.init(); 
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
		model = new EntityCreater.EntityCreaterModel(pages, attributes);
		model.addEventListener("onPageChange", handlePageChangeOfModel);
		model.addEventListener("hasEnoughValues", handleEnoughValues);
		model.addEventListener("hasNotEnoughValues", handleNotEnoughValues);
		model.init();
	}	

	function handlePageChangeOfModel(event){
		let pageHTMLString = event.details.page;
		pageCreator.createPage(pageHTMLString); 
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
		view.init();		
	}

	function showFirstPage() {
		let pageNumber = 1;
		model.setPage(pageNumber);
	}

	that.init = init;
	that.showFirstPage = showFirstPage;
	return that;
}