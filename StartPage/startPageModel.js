var StartPage = StartPage || {};

/**
 * @namespace Model 
 * @memberof! StartPage
 * @description Modul <code>DatesPageAll.Model</code> is the model of StartPage
 * @ receives all horses of the db request at inititalisation as string. Transform
 * this string to an array of objects which can be used to fill the template of the view.
 */

StartPage.Model = function(){
	let that = new EventTarget(),
		allHorses;

	/**
	* @function init
	* @public
	* @memberof! StartPage.Model 
	* @instance
	* @param {string} allDatesAsStrings, all dates as a string
	* @description Initialize this model. Transform allDatesAsStrings to an array
	* and tells the other moduls trough an event that allDatesAsStrings has been converted
	*/ 	
	function init(horses){
		if(isParsable(horses)){
			allHorses = JSON.parse(horses);
			changePropertyNames(allHorses);
			sendOnDataConverted();
		}
		else{
			allHorses = [];
		}
	}

	/**
	* @function isParsable
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @param {string} string
	* @description returns true if the string is parsable else false
	*/ 
	function isParsable(string) {
		try {
			JSON.parse(string);
		} catch (e) {
			return false;
		}
		return true;
	}		
		
	function isArrayFullOfHorses(horses){
		let horseAttribute = "date_of_birth";
		return horses.includes(horseAttribute);
	}

	/**
	* @function changePropertyNames
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @param {array} allHorses
	* @description changes the object in all horses, so they can be used by the template
	* in the view 
	*/ 
	function changePropertyNames(allHorses){
		for(let i = 0; i < allHorses.length;  i++){
			let horse = allHorses[i];
			changePropertyName(horse);
		}
	}
	
	/**
	* @function changePropertyName
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @param {array} allHorses
	* @description removes property date_of_birth and saves its value into property dateOfBirth
	*/ 
	function changePropertyName(horse){
		horse.dateOfBirth = horse.date_of_birth;
		delete horse.date_of_birth;
	}

	/**
	* @function getHorseById
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @param {string} id
	* @description getter for a horse with the id id
	*/ 
	function getHorseById(id){
		let searchedHorse = getSearchedHorse(id);
		return searchedHorse;
	}

	/**
	* @function getSearchedHorse
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @param {string} id of the horse
	* @description returns the horse with the id id
	*/ 
	function getSearchedHorse(id){
		for(let i = 0; i < allHorses.length; i++){
			let horse = allHorses[i];
			if(horse.id === id){
				return horse;
			}
		}
	}

	/**
	* @function sendOnDataConverted
	* @private
	* @memberof! StartPage.Model 
	* @instance
	* @description sends event "onDataConverted"
	*/ 
	function sendOnDataConverted(){
			let event = new Event("onDataConverted");
			event.details = {};
			event.details.allHorses = allHorses;
			that.dispatchEvent(event);
		}

	that.init = init;
	that.getHorseById = getHorseById;
	return that;
}