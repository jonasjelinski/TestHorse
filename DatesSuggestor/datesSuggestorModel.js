var DatesSuggestor = DatesSuggestor || {};

DatesSuggestor.Model = function(){

	const BUTCHER = "",
		RACE ="",
		NOTHING = "";

	let that = {},
		dates,	
		horse;

	function init(newHorse){
		horse.init();
		dates = DatesSuggestor.Dates();
	}

	function getDateSuggestions(){
		let arrayOfSuggestions = calulcateSuggestions();
		return arrayOfSuggestions;
	}

	function calulcateSuggestions(){
		let suggestions,	
			horseAge = getHorseAge(),
			type = horse.type;
		if(horse.type === RACE){
			let tetanus = dates.INJECTIONS.TETANUS.ONE_YEAR,
				influenca = dates.INJECTIONS.INFLUENCA.HALF_YEAR,
				herpes = dates.INJECTIONS.INFLUENCA.HERPES;
			suggestions = [tetanus, influenca, herpes];
		}
		if(horse.type === NOTHING){
			let tetanus = dates.INJECTIONS.TETANUS.THREE_YEARS,
				influenca = dates.INJECTIONS.INFLUENCA.ONE_YEAR;
			suggestions = [tetanus, influenca];
		}
		return suggestions;
	}

	function getHorseAge(){
		let dateOfBirth = horse.dateOfBirth,
			yearOfBirth = getYear(dateOfBirth),
			today = new Date(),
			thisYear = today.getFullYear(),
			birthAsInt = parseInt(yearOfBirth),
			todayAsInt = parseInt(today);

		return todayAsInt - birthAsInt;
	}

	function getYear(dateOfBirth){
		let regex = "\b(19|20)\d{2}\b";
		return dateOfBirth.match(regex);
	}

	that.init = init;
	that.getDateSuggestions = getDateSuggestions;
	return that;
}
