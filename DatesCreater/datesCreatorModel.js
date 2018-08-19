var DatesCreator = DatesCreator || {};

DatesCreator.Model = function(){

	let that = new EventTarget,
		wantsReminder,
		status,
		date,
		reminder;

	function init(){
		date = {};
		reminder = {};
	}

	function tryToShowDateCreator(reminderValues){
		let oldValues = date,
			isInputOkay = checkInputAndSendResultMessage(reminderValues, "onShowDateOkay", oldValues);
		if(isInputOkay){
			reminder = reminderValues;
		}
	}

	function tryToShowReminderCreator(dateValues){
		let oldValues = reminder,
			isInputOkay = checkInputAndSendResultMessage(dateValues, "onShowReminderOkay", oldValues);
		if(isInputOkay){
			date = dateValues;
		}
	}

	function checkInputAndSendResultMessage(input, correctEvent, oldValues){
		if(oneInputIsUndefinedOrEmpty(input)){
			sendWrongInputMessages(input);
			return false;		
		}
		else{
			if(correctEvent){
				sendCorrectInputMessage(correctEvent, oldValues);
			}			
			return true;
		}
	}	

	function oneInputIsUndefinedOrEmpty(input){
		let attributes = Object.keys(input);
		for(let i = 0; i<attributes.length;i++){
			let attribute = attributes[i],
				value = input[attribute];			
			if(isUndefinedOrEmpty(value)){
				return true;
			}
		}
		return false;
	}

	function isUndefinedOrEmpty(value){
		if(value === undefined || value === "" || !value){
				return true;
		}
		return false;
	}

	function sendWrongInputMessages(input){
			let attributes = Object.keys(input);
		attributes.forEach(function(attribute){
			let value = input[attribute];
			if(isUndefinedOrEmpty(value)){
				switch(attribute){
					case "title": sendEvent("onNoTitle");
						break;
					case "date": sendEvent("onNoDate");
						break;
					case "time": sendEvent("onNoTime");
						break;
					case "location": sendEvent("onNoLocation");
						break;
				}
			}
		});
	}

	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	

	function tryToSaveAtTheEnd(input){
		let isInputOkay = checkInputAndSendResultMessage(input);
		if(isInputOkay){
			date = input;
			sendFinaleData();
		}
	}

	function sendCorrectInputMessage(type, data) {
		sendEvent(type, data);
	}

	function sendFinaleData() {
		let data = {};
		data.date = date;
		if(wantsReminder){
			data.reminder = reminder;
		}
		sendEvent("onFinaleSaveOkay", data);
	}

	function setWantsReminder(booleanValue) {
		wantsReminder = booleanValue;
	}

	function setReminder(newReminder) {
		reminder = newReminder;
	}

	function setDate(newDate) {
		date = newDate;
	}

	that.init = init;
	that.tryToSaveAtTheEnd = tryToSaveAtTheEnd;
	that.tryToShowDateCreator = tryToShowDateCreator;
	that.tryToShowReminderCreator = tryToShowReminderCreator;
	that.setWantsReminder = setWantsReminder;
	that.setReminder = setReminder;
	that.setDate = setDate;
	return that;	
}