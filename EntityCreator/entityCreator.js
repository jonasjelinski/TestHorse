var EntityCreator = EntityCreator || {};

EntityCreator = function(innerPageId, forwardButtonId, backwardsButtonId, textBoxId, numberOfPages, attr, pages, valueBoxId, feedBackBoxId){
	let that = new EventTarget(),
		innerPage,
		pageCreator,
		slideShow,
		view,
		model,
		attributes;

	function init(){
		setAttributes(attr);
		initPageCreator();
		initSlideShow();
		initModel();
		showFirstPage();
		initView();
		getCurrentDataFromViewAndSendThem();
	}

	function initPageCreator(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new Pages.PageCreator(innerPage);		
	}

	function initSlideShow(){
		slideshow = Slideshow(forwardButtonId, backwardsButtonId, textBoxId, numberOfPages, pages, innerPageId);
		slideshow.addEventListener("onPageChange", handleSliderPageChange); 
		slideshow.addEventListener("slideShowIsOver", handleSlideShowIsOver);
		slideshow.init();
		slideshow.showFirstPage(); 
	}

	function handleSliderPageChange(event){
		let pageNumber = event.details.pageNumber;		
		getCurrentDataFromViewAndUpdateModel();		
		getCurrentDataFromViewAndSendThem();
		switchToNewPageAndUpdateViewController(pageNumber);
		checkIfThereAreAlreadyValuesForTheNewPageAndSendThem();		
	}

	function reloadViewForNewPage(){
		view.init();
	}

	function getCurrentDataFromViewAndUpdateModel(){
		let valueData = view.getValue();		
		model.updateAttributeValue(valueData.property, valueData.value);
	}

	function getCurrentDataFromViewAndSendThem(){
		let valueData = view.getValue();
		sendCurrentData(valueData);		
	}

	function sendCurrentData(data){
		sendEvent("onCurrentData", data); 
	}

	function switchToNewPageAndUpdateViewController(pageNumber){
		slideshow.setPage(pageNumber);
		reloadViewForNewPage();
	}

	function checkIfThereAreAlreadyValuesForTheNewPageAndSendThem(){
		let valueData = view.getValue(),
			attributeName = valueData.property,
			oldValues = model.getAttribute(attributeName).value,
			data = {
				attribute : attributeName,
				value : oldValues,
			};			
			sendEvent("onOldValuesOfNewPageLoaded", data);
	}

	function handleSlideShowIsOver(){
		let valueData = view.getValue();
		model.updateAttributeValue(valueData.property, valueData.value)
		model.checkIfEntityHasEnoughValues();
	}

	function initModel(){
		model = new EntityCreator.EntityCreatorModel(attributes);
		model.addEventListener("hasEnoughValues", handleEnoughValues);
		model.addEventListener("hasNotEnoughValues", handleNotEnoughValues);
		model.init();
	}	

	function sendEvent(type, data) {
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	function handleEnoughValues(event){
		let details = event.details,
			data = details.data;
		sendValuesData(data);	
	}

	function handleNotEnoughValues(){
		view.showHasNotEnoughValues();
	}

	function sendValuesData(data){
		let event = new Event("hasEnoughValues");
		event.details = {};
		event.details.data = data;
		that.dispatchEvent(event);
	}

	function initView(){
		view = new EntityCreator.EntityCreatorView(valueBoxId, feedBackBoxId);
		view.init();		
	}

	function showFirstPage() {
		let pageNumber = 1;
		model.setPage(pageNumber);
	}

	function setPageCanChange(booleanValue){
		if(slideshow){
			slideshow.setPageCanChange(booleanValue);
		}		
	}

	function setAttributes(newAttributes){
		if(newAttributes){
			attributes = newAttributes;
		}		
	}

	function updateModel(attributes){
		if(model){
			model.updateModel(attributes);
		}
		
	}
	
	that.init = init;
	that.showFirstPage = showFirstPage;
	that.setPageCanChange = setPageCanChange;
	that.updateModel = updateModel;
	return that;
}