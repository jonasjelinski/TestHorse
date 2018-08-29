var HorseCreator = HorseCreator || {};

/**
 * namespace SliderPages
 * @memberof! HorseCreatorPage
 * @description Retunrns array of html pages as stings, which are used for the <code>Slideshow</Slideshow> of the horsecreator.
 * those pages will be given to the <code>EntityCreator</code> instance in the  <code>HorseCreatorPage.StandardPage</code>.
 */
HorseCreator.SliderPages = function() {
	const NAME =
				'<div>Name des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="name" value="" opacity = 0 ></div>',
			OWNER =
				'<div>Besitzer des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="owner" value="" opacity = 0 ></div>',
			RACE =
				'<div>Rasse des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="race" value="" opacity = 0 ></div>',
			DATE_OF_BIRTH =
				'<div>Geburtsdatum des Pferdes:</div>'+
				'<input type="date" id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="dateOfBirth" value="" opacity = 0 ></div>',
			SEX =
				'<div>Geschlecht des Pferdes:</div>'+
				'<select id="horseInteractionDropdown">'+
				'<option value="horseInteractionPlaceholder"> </option>'+
				'<option value="horseInteractionStallion">Hengst</option>'+
				'<option value="horseInteractionGelding">Wallach</option>'+
				'<option value="horseInteractionMare">Stute</option>'+
  			'</select>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="sex" value="" opacity = 0 ></div>',
			HEIGHT =
				'<div>Höhe des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="height" value="" opacity = 0 ></div>',
			GROWER =
				'<div>Züchter des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="grower" value="" opacity = 0 ></div>',
			TYPE =
				'<div>Status des Pferdes?</div>'+
				'<select id="horseInteractionDropdown">'+
				'<option value="horseInteractionPlaceholder"> </option>'+
				'<option value="horseInteractionComeptition">Turnierpferd</option>'+
				'<option value="horseInteractionSlaugther">Schlachtpferd</option>'+
				'<option value="horseInteractionNone">weder noch</option>'+
  			'</select>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="type" value="" opacity = 0 ></div>';

	let pages = [NAME, OWNER, RACE, DATE_OF_BIRTH, SEX, HEIGHT, GROWER, TYPE];
	return pages;
};
