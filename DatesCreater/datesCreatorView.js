var DatesCreator = DatesCreator || {};

/**
 * @instance DatesCreator.View 
 * @memberof! DatesCreator 
 * @description View <code>DatesCreator.View </code> is the view controll modul of the DatesCreator
 * @param {string} dateClass. class of dates
 * @param {string} reminderClass. class of the reminder
 * @param {string} containerElementId. id of the container
 * @param {string} titleInputId. id of the input for title
 * @param {string} dateInputId. id of the input for date
 * @param {string} timeInputId. id of the input for time
 * @param {string} locationInputId. id of the input for location
 * @param {string} wantsReminderCheckboxId. id for the checkbox
 * @param {string} dateButtonId. Id of the dateButton
 * @param {string} reminderButtonId. Id of the reminderButton
 * @param {string} saveButtonId. Id of the saveButton
 * @param {string} cancelButtonId. Id of the cancelButton
 */

DatesCreator.View = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId){
	const INVISIBLE = 0,
		VISIBLE = 1,
		POPUP_TEXT = "",
		POPUP_ELEMENT_ID = "createDatePopup",
		HAS_TWO_BUTTONS = false,
		POPUP_TEXT_ID = "createDatePopupText",
		YES_BUTTON_ID = "createDatePopupClose",
		CREATE_DATE_MAIN_WITHOUT_BUTTONS = "createDate",
		CREATE_DATE_MAIN_WITH_BUTTONS = "createDateReminder";

	let that = new EventTarget(),
		containerElement,
		titleInput,
		dateInput,
		timeInput,
		wantsReminderCheckBox,
		dateButton,
		reminderButton,
		saveButton,
		cancelButton,
		popup;

	/**
	* @function init
	* @public
	* @memberof! DatesCreator.View  
	* @instance
	* @description Initialize this modul. 
	*/ 
	function init(){
		console.log("initview");
		initPopup();
		getDomElements();
		addEventListeners();
		hideReminderAndDateButtons();		
	}

	function initPopup(){
		popup = new Popup(POPUP_TEXT, HAS_TWO_BUTTONS, POPUP_ELEMENT_ID, POPUP_TEXT_ID, 
	YES_BUTTON_ID);
		popup.init();
	}

	/**
	* @function getDomElements
	* @public
	* @memberof! DatesCreator.View  
	* @instance
	* @description gets the domElements from the dom with the ids which were given
	* as paramter of DatesCreator.View  
	*/ 
	function getDomElements(){
		containerElement = document.getElementById(containerElementId);
		titleInput = document.getElementById(titleInputId);
		dateInput = document.getElementById(dateInputId);
		timeInput = document.getElementById(timeInputId);
		locationInput = document.getElementById(locationInputId);
		wantsReminderCheckBox = document.getElementById(wantsReminderCheckboxId);
		dateButton = document.getElementById(dateButtonId);
		reminderButton = document.getElementById(reminderButtonId);
		saveButton = document.getElementById(saveButtonId);
		cancelButton = document.getElementById(cancelButtonId);
	}


	/**
	* @function addEventListeners
	* @public
	* @memberof! DatesCreator.View  
	* @instance
	* @description adds event listeners to the domElements
	*/
	function addEventListeners(){
		wantsReminderCheckBox.addEventListener("click", handleCheckboxInput)
		saveButton.addEventListener("click", handleSaveButtonClick);
		cancelButton.addEventListener("click", handleCancelButtonClick);
		dateButton.addEventListener("click", handleDateButtonClick);
		reminderButton.addEventListener("click", handleReminderButtonClick);
	}


	/**
	* @function handleCheckboxInput
	* @public
	* @memberof! DatesCreator.View  
	* @instance
	* @description checkBox wantsReminderCheckBox is checked
	* if the user wants a reminder 
	* this function sends the appropriate event
	*/
	function handleCheckboxInput(){
		let wantsReminder = wantsReminderCheckBox.checked;
		if(wantsReminder){
			showReminderAndDateButtons();
			disableDateButton();
			sendEvent("onWantsReminder");
		}
		else{
			hideReminderAndDateButtons();
			sendEvent("onWantsNoReminder");
		}
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param{string} type
	* @param{object} data
	* @description sends event of type "type" and with the data
	*/ 
	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.input = data;
		}
		that.dispatchEvent(event);
	}

	/**
	* @function showReminderAndDateButtons
	* @private
	* @memberof! DatesCreator.View    
	* @instance
	* @description changes the opacity of dateButton and reminderButton
	* so user can switch between the different views of the creator
	* of a reminder and the creator of a date
	*/ 
	function showReminderAndDateButtons(){
		containerElement.className = CREATE_DATE_MAIN_WITH_BUTTONS;
	}

	/**
	* @function disableDateButton
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description disables dateButton
	*/ 
	function disableDateButton() {
		dateButton.disabled = true;
	}

	/**
	* @function hideReminderAndDateButtons
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description changes the opacity of dateButton and reminderButton
	* so user can't switch between the different views of the creator
	* of a reminder and the creator of a date anymore
	*/ 
	function hideReminderAndDateButtons(){
		dateButton.style.opacity = INVISIBLE;
		reminderButton.style.opacity = INVISIBLE;	
	}

	/**
	* @function handleSaveButtonClick
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description sends event with the input data
	* so the model can save them and try to save the created date
	*/ 
	function handleSaveButtonClick(){
		let data = getDateInputData();
		sendEvent("onSaveButtonClick", data);
	}

	/**
	* @function getDateInputData
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gets the input data for the date
	*/ 
	function getDateInputData(){
		let data = {};
		data.title = titleInput.value;
		data.date = dateInput.value;
		data.time = timeInput.value;
		data.location = locationInput.value;
		return data;
	}	

	function showPopup(){
		popup.setPopupVisible();
	}

	/**
	* @function handleSaveButtonClick
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description sends event with the input data
	*/ 
	function handleCancelButtonClick(){
		sendEvent("onCancel");
	}

	/**
	* @function handleDateButtonClick
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description sends the reminderData after the dateButton has been clicked
	* so the model can save them
	*/ 
	function handleDateButtonClick(){
		let data = getReminderInputData();
		sendEvent("onDateButtonClicked", data);
	}

	/**
	* @function getReminderInputData
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gets the input data for the reminder
	*/ 
	function getReminderInputData(){
		let data = {};
		data.date = dateInput.value;
		data.time = timeInput.value;
		return data;
	}

	/**
	* @function handleReminderButtonClick
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description send the date data with an event
	* after the reminderButton had been clicked so the model can save it
	*/ 
	function handleReminderButtonClick(){
		let data = getDateInputData();
		sendEvent("onReminderButtonClick", data);
	}

	/**
	* @function showDateCreater
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param {object} data, data which contains date values
	* @description changes the view so it looks like a dateCreator
	* and fills it with the data
	*/ 
	function showDateCreater(data){
		//changeViewToDateView();
		containerElement.className = CREATE_DATE_MAIN_WITHOUT_BUTTONS;
		fillDateCreatorWithValues(data);

	}

	/**
	* @function changeViewToDateView
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description changes the view so it looks like a dateCreator
	*/ 
	function changeViewToDateView() {
		titleInput.style.opacity = VISIBLE;
		locationInput.style.opacity = VISIBLE;
		saveButton.style.opacity = VISIBLE;
		cancelButton.style.opacity = VISIBLE;
		wantsReminderCheckBox.style.opacity = VISIBLE;
		reminderButton.disabled = false;
		dateButton.disabled = true;
		wantsReminderCheckBox.disabled = false;

	}

	/**
	* @function fillDateCreatorWithValues
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param {object} data, data which contains date values
	* @description fills creatorview with the data
	*/ 
	function fillDateCreatorWithValues(data) {
		titleInput.value = getFillValue(data.title);
		dateInput.value = getFillValue(data.date);
		timeInput.value = getFillValue(data.time);
		locationInput.value = getFillValue(data.location);
	}

	/**
	* @function getFillValue
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param {value} value, 
	* @description prevents undefined in the view
	*/ 
	function getFillValue(value) {
		if(value){
			return value;
		}
		return "";
	}

	/**
	* @function showReminderCreater
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param {object} data, data which contains date values
	* @description changes the view so it looks like a reminderCreator
	* and fills it with the data
	*/ 
	function showReminderCreater(data){
		//changeViewToReminderView();
		fillDateCreatorWithValues(data);
		containerElement.className = reminderClass;
	}

	/**
	* @function changeViewToReminderView
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description changes the view so it looks like a reminderCreator
	*/ 
	function changeViewToReminderView() {
		titleInput.style.opacity = INVISIBLE;
		locationInput.style.opacity = INVISIBLE;
		saveButton.style.opacity = INVISIBLE;
		cancelButton.style.opacity = INVISIBLE;
		wantsReminderCheckBox.style.opacity = INVISIBLE;
		reminderButton.disabled = true;
		dateButton.disabled = false;
		wantsReminderCheckBox.disabled = true;
	}

	/**
	* @function fillReminderWithValues
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @param {object} data, data which contains date values
	* @description fills reminder input with the data
	*/ 
	function fillReminderWithValues(data) {
		dateInput.value = getFillValue(data.date);
		timeInput.value = getFillValue(data.time);
	}

	/**
	* @function giveNoTitleFeedback
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gives Feedback to the user
	*/ 
	function giveNoTitleFeedback(){
		setInputValue(titleInput, "Bitte Titel eingeben");
	}

	/**
	* @function setInputValue
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gives Feedback to the user
	*/ 
	function setInputValue(inputElement, text) {
		inputElement.value = text;
	}

	/**
	* @function giveNoDateFeedback
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gives Feedback to the user
	*/ 
	function giveNoDateFeedback(){
		setInputValue(dateInput, "Bitte Datum eingeben");
	}

	/**
	* @function giveNoTimeFeedback
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gives Feedback to the user
	*/ 
	function giveNoTimeFeedback(){
		setInputValue(timeInput, "Bitte Zeitpunkt eingeben");

	}

	/**
	* @function giveNoLocationFeedback
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description gives Feedback to the user
	*/ 
	function giveNoLocationFeedback(){
		setInputValue(locationInput, "Bitte Ort eingeben");
	}

	/**
	* @function setReminderTrue
	* @private
	* @memberof! DatesCreator.View  
	* @instance
	* @description tells the view that it has to allow
	* the user to create a reminder
	*/ 
	function setReminderTrue(){
		wantsReminderCheckBox.checked = true;
		showReminderAndDateButtons();
	}

	that.init = init;
	that.showPopup = showPopup;
	that.showDateCreater = showDateCreater;
	that.showReminderCreater = showReminderCreater;
	that.giveNoTitleFeedback = giveNoTitleFeedback;
	that.giveNoDateFeedback = giveNoDateFeedback;
	that.giveNoTimeFeedback = giveNoTimeFeedback;
	that.giveNoLocationFeedback = giveNoLocationFeedback;
	that.setReminderTrue = setReminderTrue;
	that.wantsReminderCheckBox = wantsReminderCheckBox;
	return that;

}