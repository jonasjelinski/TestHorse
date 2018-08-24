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
			PHOTO =
				'<div>Photo des Pferdes:</div>'+
				'<input type="file" id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="photo" value="" opacity = 0 ></div>',
			SEX =
				'<div>Geschlecht des Pferdes:</div>'+
				'<input id="horseInteractionInput"></input>'+
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
				COMP =
				'<div>Schlachtpferde:</div>'+
				'<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="comp" value="" opacity = 0 ></div>';

	let pages = [NAME, OWNER, RACE, DATE_OF_BIRTH, PHOTO, SEX, HEIGHT, GROWER, COMP];
	return pages;
};
