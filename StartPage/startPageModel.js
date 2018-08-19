var StartPage = StartPage || {};

StartPage.Model = function(){
	let that = new EventTarget(),
		allHorses;

	function init(horses){
		allHorses = JSON.parse(horses);
		changePropertyNames(allHorses);
		sendOnDataConverted();
	}

	function changePropertyNames(allHorses){
		for(let i = 0; i < allHorses.length;  i++){
			let horse = allHorses[i];
			changePropertyName(horse);
		}
	}

	function changePropertyName(horse){
		horse.dateOfBirth = horse.date_of_birth;
		delete horse.date_of_birth;
	}

	function getHorseById(id){
		let searchedHorse = getSearchedHorse(id);
		return searchedHorse;
	}

	function getSearchedHorse(id){
		for(let i = 0; i < allHorses.length; i++){
			let horse = allHorses[i];
			if(horse.id === id){
				return horse;
			}
		}
	}

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