var EntityCreator = EntityCreator || {};

/**
 * @namespace EntityCreator
 * @memberOf! EntityCreator
 * @description The Modul <code>EntityCreator</code> creates a new entity with a slidershow
 */
EntityCreator = function(innerPageId, forwardButtonId, backwardsButtonId, textBoxId, numberOfPages, attr, pages, valueBoxId, feedBackBoxId){
	let that = new EventTarget(),
		innerPage,
		pageCreator,
		slideShow,
		view,
		model,
		attributes;

	/**
	* @function init
	* @public
	* @memberof! EntityCreator
	* @instance
	* @description Initialize this model.
	*/ 
	function init(){
		setAttributes(attr);
		initPageCreator();
		initSlideShow();
		initModel();
		initView();
		checkIfThereAreAlreadyValuesForTheNewPageAndSendThem();
	}

	/**
	* @function setAttributes
	* @public
	* @memberof! EntityCreator  
	* @instance
	* @param {object} newAttributes
	* @description setter for attributes
	*/ 
	function setAttributes(newAttributes){
		if(newAttributes){
			attributes = newAttributes;
		}		
	}

	/**
	* @function initPageCreator
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @param {object} newAttributes
	* @description inits the pageCreator. PageCreator is used to switch between different pages
	*/ 
	function initPageCreator(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new Pages.PageCreator(innerPage);		
	}

	/**
	* @function initSlideShow
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description inits the slideshow
	*/ 
	function initSlideShow(){
		slideshow = Slideshow(forwardButtonId, backwardsButtonId, textBoxId, numberOfPages, pages, innerPageId);
		slideshow.addEventListener("onPageChange", handleSliderPageChange); 
		slideshow.addEventListener("slideShowIsOver", handleSlideShowIsOver);
		slideshow.init();
		slideshow.showFirstPage(); 
	}

	/**
	* @function handleSliderPageChange
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description After the slidershow sends that it has changed its page
	* this function reads the values the user has put in the view
	* updates the model with the new values and send them with an event
	* it then siwtches to the next page
	* and checks if there are already values for the view from a previous input
	* it takes this old values and fills the view with them
	* after that it sends the old values with an event  
	*/ 
	function handleSliderPageChange(event){
		let pageNumber = event.details.pageNumber;		
		getCurrentDataFromViewAndUpdateModel();		
		getCurrentDataFromViewAndSendThem();
		switchToNewPageAndUpdateViewController(pageNumber);
		checkIfThereAreAlreadyValuesForTheNewPageAndSendThem();		
	}

	/**
	* @function reloadViewForNewPage
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description inits the view after a page change
	* the reason is: after a pageCange the dom-Elements have been changed
	*/
	function reloadViewForNewPage(){
		view.init();
	}

	/**
	* @function getCurrentDataFromViewAndUpdateModel
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description reads the data from the view and updates the model with the new data
	*/ 
	function getCurrentDataFromViewAndUpdateModel(){
		let valueData = view.getValue();		
		model.updateAttributeValue(valueData.property, valueData.value);
	}

	/**
	* @function getCurrentDataFromViewAndSendThem
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description reads the data from the view and sends them with an event
	*/ 
	function getCurrentDataFromViewAndSendThem(){
		let valueData = view.getValue(),
			data = {
					attribute : valueData.property,
					value : valueData.value,
				};	
		sendEvent("onCurrentData", data); 		
	}

	/**
	* @function getCurrentDataFromViewAndSendThem
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @param {number} pageNumber
	* @description sets the page of the slideshow for pageNumber and reloads the view
	* because dom-Elements have changed after that
	*/ 
	function switchToNewPageAndUpdateViewController(pageNumber){
		slideshow.setPage(pageNumber);
		reloadViewForNewPage();
	}

	/**
	* @function checkIfThereAreAlreadyValuesForTheNewPageAndSendThem
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description if there a are already values in the model for the view
	* those values are send through an event
	* other moduls which extend the simple view of this modul can use them
	* to display them to the user
	*/ 
	function checkIfThereAreAlreadyValuesForTheNewPageAndSendThem(){
		let valueData = view.getValue(),
			attributeName = valueData.property,
			oldAttribute = model.getAttribute(attributeName);
			if(oldAttribute){
				let oldValues = oldAttribute.value;			
				data = {
					attribute : attributeName,
					value : oldValues,
				};			
				sendEvent("onOldValuesOfNewPageLoaded", data);
			}
	}

	/**
	* @function handleSlideShowIsOver
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description if the slideshow is over the model checks if it has all
	* necessary attributes or if the user forgot some to put in
	*/ 
	function handleSlideShowIsOver(){
		let valueData = view.getValue();
		model.updateAttributeValue(valueData.property, valueData.value)
		model.checkIfEntityHasEnoughValues();
	}


	/**
	* @function initModel
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description inits the model and sets its listener
	*/ 
	function initModel(){
		model = new EntityCreator.EntityCreatorModel(attributes);
		model.addEventListener("hasEnoughValues", handleEnoughValues);
		model.addEventListener("hasNotEnoughValues", handleNotEnoughValues);
		model.init();
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @param {string} type, type of the event
	* @param  {object} data, da to add to the event
	* @description sends and event of type type and data if there is data
	*/ 
	function sendEvent(type, data) {
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	/**
	* @function handleEnoughValues
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @param {event} event, received event of the listener, contains data
	* @description if the model has enough values this function send those values to other moduls
	*/ 
	function handleEnoughValues(event){
		let details = event.details,
			data = details.data;
		sendValuesData(data);	
	}

	/**
	* @function handleNotEnoughValues
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description gives a feedback to the user that he din't put in enough values
	*/ 
	function handleNotEnoughValues(){
		view.showHasNotEnoughValues();
	}

	/**
	* @function sendValuesData
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description sends data with event, after the entity had enough datas to finish the creation
	*/ 
	function sendValuesData(data){
		let event = new Event("hasEnoughValues");
		event.details = {};
		event.details.data = data;
		that.dispatchEvent(event);
	}

	/**
	* @function initView
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @description inits view
	*/ 
	function initView(){
		view = new EntityCreator.EntityCreatorView(valueBoxId, feedBackBoxId);
		view.init();		
	}

	/**
	* @function setPageCanChange
	* @private
	* @memberof! EntityCreator  
	* @instance
	* @param {boolean} booleanValue
	* @description disables the slider to show the next page or enables it
	*/ 
	function setPageCanChange(booleanValue){
		if(slideshow){
			slideshow.setPageCanChange(booleanValue);
		}		
	}

	/**
	* @function updateModel
	* @public
	* @memberof! EntityCreator  
	* @instance
	* @param {object} newAttributes
	* @description updates the data of the model
	*/ 
	function updateModel(newAttributes){
		if(model){
			model.updateModel(newAttributes);
		}		
	}

	/**
	* @function overrideConstructorAttributes
	* @public
	* @memberof! EntityCreator  
	* @instance
	* @param {object} newAttributes
	* @description overrides the attributes of the constructor
	* this function is necessary if the instance of the entitiyCreater has allready been created with new,
	* but the init function of this modul should be changed afterwards
	* this allows this modul to act as a constructor of a new entity and a changer of an old entity
	*/ 
	function overrideConstructorAttributes(newAttributes){
		attr = newAttributes;
	}
	
	that.init = init;
	that.setPageCanChange = setPageCanChange;
	that.updateModel = updateModel;
	that.overrideConstructorAttributes = overrideConstructorAttributes;
	return that;
}