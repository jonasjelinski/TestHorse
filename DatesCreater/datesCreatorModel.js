var DatesCreator = DatesCreator || {};

/**
 * @namespace Model
 * @memberOf! DatesCreator
 * @description <code>DatesCreator.Model</code> ist the model of 
 * <code>DatesCreator</code> handles the data of this modul.
 */
DatesCreator.Model = function(){

	let that = new EventTarget,
		wantsReminder,
		status,
		date,
		reminder;
	
	/**
	* @function init
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @description Initialize this model. 
	*/ 
	function init(){
		date = {};
		reminder = {};
	}

	/**
	* @function tryToShowDateCreator
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} reminderValues
	* @description If the user wants to see the dateCreator
	* this function test if the reminderValues contains enough
	* atttibutes to create a new reminder before the user can see dateCreator
	* this prevents falls input by the user
	*/ 
	function tryToShowDateCreator(reminderValues){
		let oldValues = date,
			isInputOkay = checkInputAndSendResultMessage(reminderValues, "onShowDateOkay", oldValues);
		if(isInputOkay){
			reminder = reminderValues;
		}
	}

	/**
	* @function tryToShowReminderCreator
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} dateValues
	* @description If the user wants to see the reminderCreator
	* this function test if the dateValues contains enough
	* atttibutes to create a new date before the user can see reminderCreator
	* this prevents falls input by the user
	*/ 
	function tryToShowReminderCreator(dateValues){
		let oldValues = reminder,
			isInputOkay = checkInputAndSendResultMessage(dateValues, "onShowReminderOkay", oldValues);
		if(isInputOkay){
			date = dateValues;
		}
	}


	/**
	* @function checkInputAndSendResultMessage
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} input
	* @param{object} correctEvent
	* @param{object} oldValues
	* @description Checks if the user forgot one value and sends the according message
	*/ 
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

	/**
	* @function oneInputIsUndefinedOrEmpty
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} input
	* @description Checks if one value of input is undefined or empty
	*/ 
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

	/**
	* @function isUndefinedOrEmpty
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} value
	* @description returns true if value is undefined or empty
	*/ 
	function isUndefinedOrEmpty(value){
		if(value === undefined || value === "" || !value){
				return true;
		}
		return false;
	}


	/**
	* @function sendWrongInputMessages
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} input
	* @description sends a wrong inputmessage foe each value of the input which is undefined
	*/ 
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

	/**
	* @function sendEvent
	* @private
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{string} type
	* @param{object} data
	* @description sends event of type "type" and with the data
	*/ 
	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	/**
	* @function tryToSaveAtTheEnd
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} input
	* @description trys to save the input before finishing this modul
	* checks if the input is contains correct values
	* if so it send the final data
	*/ 
	function tryToSaveAtTheEnd(input){
		let isInputOkay = checkInputAndSendResultMessage(input);
		if(isInputOkay){
			date = input;
			sendFinaleData();
		}
	}

	/**
	* @function sendCorrectInputMessage
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{string} type
	* @param{object} data
	* @description sends event of type type and with data data, to tell the other
	* parts of this modul that the input of the use was correct
	*/ 
	function sendCorrectInputMessage(type, data) {
		sendEvent(type, data);
	}

	/**
	* @function sendFinaleData
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @description sends the final date-data in and event so other moduls can use them
	*/ 
	function sendFinaleData() {
		let data = {};
		data.date = date;
		if(wantsReminder){
			data.reminder = reminder;
		}
		sendEvent("onFinaleSaveOkay", data);
	}

	/**
	* @function setWantsReminder
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{bool} booleanValue
	* @description sets if the user wants a reminder or not
	*/ 
	function setWantsReminder(booleanValue) {
		wantsReminder = booleanValue;
	}

	/**
	* @function setReminder
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} newReminder
	* @description sets reminder
	*/ 
	function setReminder(newReminder) {
		reminder = newReminder;
	}

	/**
	* @function setDate
	* @public
	* @memberof! DatesCreator.Model  
	* @instance
	* @param{object} newDate
	* @description sets date
	*/ 
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