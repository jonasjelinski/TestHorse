var StartPage = StartPage || {};

/**
 * @namespace Model 
 * @memberof! StartPage
 * @description Modul <code>DatesPageAll.Model</code> is the model of StartPage
 * @ receives all horses of the db request at inititalisation as string. Transform
 * this string to an array of objects which can be used to fill the template of the view.
 */

StartPage.Model = function(){

	const POSTION_CODE = "AH";

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
			convertData(allHorses);		
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

	function convertData(allHorses){
		changePropertyNames(allHorses);
		removeNullsAndUndefined(allHorses);
		sortHorses(allHorses);
	}

	function removeNullsAndUndefined(allHorses){
		for(let i = 0; i < allHorses.length; i++){
			let horse = allHorses[i],
				attributes = Object.keys(horse);

			attributes.forEach(function(attribute){
				let  value = horse[attribute];
				if(value === undefined || value === null){
					value = "";
				}
				horse[attribute] = value;
			})
		}
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
		horse.userID = horse.user_id;
		delete horse.date_of_birth;
		delete horse.user_id;
	}

	function sortHorses(allHorses){
		allHorses.sort(function(horse1,horse2){
			let position1 = getPositionFromPositionCode(horse1.order_position),
				position2 = getPositionFromPositionCode(horse2.order_position);
			if(position1 < position2){
				return -1;
			}
			if(position1 > position2){
				return 1;
			}
			return 0;
		});
	}

	function getPositionFromPositionCode(positionString){
		let position;
		if(positionString === ""){
			position = allHorses.length;
		}
		else{
			position = positionString.replace( /^\D+/g, '');
		}
		return position;
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

	function update(horses){
		allHorses = horses;
		updateOrder();
	}

	function updateOrder(){
		for(let position = 0; position < allHorses.length; position++){
			let horse = allHorses[position],
				listPosition = POSTION_CODE+position;
			horse.orderPosition = listPosition;
		}
	}

	function getAllHorses(){
		return allHorses;
	}

	that.init = init;
	that.getHorseById = getHorseById;
	that.update = update;
	that.getAllHorses = getAllHorses;
	return that;
}