var DatesSuggestor = DatesSuggestor || {};

DatesSuggestor.Model = function(){

	const BUTCHER = "",
		RACE ="",
		NOTHING = "";

	let that = {},
		dates,	
		horse;

	function init(newHorse){
		horse = newHorse;
		dates = DatesSuggestor.Dates();
	}

	function getDateSuggestions(){
		let arrayOfSuggestions = calulcateSuggestions();
		return arrayOfSuggestions;
	}

	function calulcateSuggestions(){
		let suggestions,	
			type = horse.type;
			console.log("type",type);
		if(horse.type === RACE){
			let tetanus = dates.INJECTIONS.TETANUS.ONE_YEAR,
				influenca = dates.INJECTIONS.INFLUENCA.HALF_YEAR,
				herpes = dates.INJECTIONS.INFLUENCA.HERPES;
			suggestions = [tetanus, influenca, herpes];
		}
		else if(horse.type !== RACE){
			let tetanus = dates.INJECTIONS.TETANUS.THREE_YEARS,
				influenca = dates.INJECTIONS.INFLUENCA.ONE_YEAR;
			suggestions = [tetanus, influenca];
		}
		return suggestions;
	}

	that.init = init;
	that.getDateSuggestions = getDateSuggestions;
	return that;
}
