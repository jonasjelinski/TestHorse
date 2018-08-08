var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorPages = function() {
	const NAME = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="name" value="" opacity = 0 ></div>',
			OWNER = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="owner" value="" opacity = 0 ></div>',
			RACE = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="race" value="" opacity = 0 ></div>',
			DATE_OF_BIRTH = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="dateOfBirth" value="" opacity = 0 ></div>',
			PHOTO = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="photo" value="" opacity = 0 ></div>',
			SEX = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="sex" value="" opacity = 0 ></div>',
			HEIGHT = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="height" value="" opacity = 0 ></div>',
			GROWER = '<input id="horseInteractionInput"></input>'+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="grower" value="" opacity = 0 ></div>';
				
	let pages = [NAME, OWNER, RACE, DATE_OF_BIRTH, PHOTO, SEX, HEIGHT, GROWER];
	return pages;
};