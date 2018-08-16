var DatesCreator = DatesCreator || {};

DatesCreator.View = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId){
	const INVISIBLE = 0,
		VISIBLE = 1;

	let that = new EventTarget(),
		containerElement,
		titleInput,
		dateInput,
		timeInput,
		wantsReminderCheckBox,
		dateButton,
		reminderButton,
		saveButton,
		cancelButton;

	function init(){
		getDomElements();
		addEventListeners();
		hideReminderAndDateButtons();		
	}

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

	function addEventListeners(){
		wantsReminderCheckBox.addEventListener("click", handleCheckboxInput)
		saveButton.addEventListener("click", handleSaveButtonClick);
		cancelButton.addEventListener("click", handleCancelButtonClick);
		dateButton.addEventListener("click", handleDateButtonClick);
		reminderButton.addEventListener("click", handleReminderButtonClick);
	}

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

	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.input = data;
		}
		that.dispatchEvent(event);
	}

	function showReminderAndDateButtons(){
		dateButton.style.opacity = VISIBLE;
		reminderButton.style.opacity = VISIBLE;
		
	}

	function disableDateButton() {
		dateButton.disabled = true;
	}

	function hideReminderAndDateButtons(){
		dateButton.style.opacity = INVISIBLE;
		reminderButton.style.opacity = INVISIBLE;	
	}

	function handleSaveButtonClick(){
		let data = getDateInputData();
		sendEvent("onSaveButtonClick", data);
	}	

	function handleCancelButtonClick(){
		sendEvent("onCancel");
	}

	function handleDateButtonClick(){
		let data = getReminderInputData();
		sendEvent("onDateButtonClicked", data);
	}

	function getReminderInputData(){
		let data = {};
		data.date = dateInput.value;
		data.time = timeInput.value;
		return data;
	}

	function handleReminderButtonClick(){
		let data = getDateInputData();
		sendEvent("onReminderButtonClick", data);
	}

	function getDateInputData(){
		let data = {};
		data.title = titleInput.value;
		data.date = dateInput.value;
		data.time = timeInput.value;
		data.location = locationInput.value;
		return data;
	}

	function showDateCreater(data){
		changeViewToDateView();
		//containerElement.setClass = dateClass;
		fillDateCreatorWithValues(data);

	}

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

	function fillDateCreatorWithValues(data) {
		titleInput.value = getFillValue(data.title);
		dateInput.value = getFillValue(data.date);
		timeInput.value = getFillValue(data.time);
		locationInput.value = getFillValue(data.location);
	}

	function getFillValue(value) {
		if(value){
			return value;
		}
		return "";
	}

	function showReminderCreater(data){
		changeViewToReminderView();
		fillDateCreatorWithValues(data);
		//containerElement.setClass = reminderClass;
	}

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

	function fillReminderWithValues(data) {
		dateInput.value = getFillValue(data.date);
		timeInput.value = getFillValue(data.time);
	}

	function giveNoTitleFeedback(){
		setInputValue(titleInput, "Bitte Titel eingeben");
	}

	function setInputValue(inputElement, text) {
		inputElement.value = text;
	}

	function giveNoDateFeedback(){
		setInputValue(dateInput, "Bitte Datum eingeben");
	}

	function giveNoTimeFeedback(){
		setInputValue(timeInput, "Bitte Zeitpunkt eingeben");

	}

	function giveNoLocationFeedback(){
		setInputValue(locationInput, "Bitte Ort eingeben");
	}

	function handleInputOkay(){

	}

	that.init = init;
	that.showDateCreater = showDateCreater;
	that.showReminderCreater = showReminderCreater;
	that.giveNoTitleFeedback = giveNoTitleFeedback;
	that.giveNoDateFeedback = giveNoDateFeedback;
	that.giveNoTimeFeedback = giveNoTimeFeedback;
	that.giveNoLocationFeedback = giveNoLocationFeedback;
	return that;

}