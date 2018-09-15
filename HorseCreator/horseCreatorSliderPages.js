var HorseCreator = HorseCreator || {};

/**
 * namespace SliderPages
 * @memberof! HorseCreatorPage
 * @description Retunrns array of html pages as stings, which are used for the <code>Slideshow</Slideshow> of the horsecreator.
 * those pages will be given to the <code>EntityCreator</code> instance in the  <code>HorseCreatorPage.StandardPage</code>.
 */
HorseCreator.SliderPages = function() {
	const NAME =
				'<div class="PeterTheHorse">'+
				'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
				'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Bitte verate mir als Erstes <br>den Namen deines Pferdes!</div>'+
				'<div class="horseInteractionInputContainer"> <input id="horseInteractionInput" placeholder="Pferdename"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="name" value="" opacity = 0 ></div>'+
				'</div>',
			OWNER =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Wer ist der Besitzer des Pferdes?</div>'+
				'<div class="horseInteractionInputContainer"> <input id="horseInteractionInput" placeholder="Name des Besitzers"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="owner" value="" opacity = 0 ></div>'+
				'</div>',
			RACE =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Welche Rasse ist dein Pferd?</div>'+
				'<div class="horseInteractionInputContainer"> <input id="horseInteractionInput" placeholder="Rasse"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="race" value="" opacity = 0 ></div>'+
				'</div>',
			DATE_OF_BIRTH =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Wann wurde dein Pferd geboren?</div>'+
				'<div class="horseInteractionInputContainer"> <input type="date" id="horseInteractionInput"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="dateOfBirth" value="" opacity = 0 ></div>'+
				'</div>',
			SEX =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Bitte wähle das Geschlecht<br>deines Pferde aus.</div>'+
				'<div class="horseInteractionInputContainer"> <select id="horseInteractionInput"> '+
				'<option value="horseInteractionPlaceholder"> </option>'+
				'<option value="Hengst">Hengst</option>'+
				'<option value="Wallach">Wallach</option>'+
				'<option value="Stute">Stute</option>'+
  			'</select> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="sex" value="" opacity = 0 ></div>'+
				'</div>',
			HEIGHT =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Wie groß ist dein Pferd?</div>'+
				'<div class="horseInteractionInputContainer"> <input id="horseInteractionInput" type="number" placeholder="Widerristhöhe"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="height" value="" opacity = 0 ></div>'+
				'</div>',
			GROWER =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Bitte gib den Namen des Züchters ein.</div>'+
				'<div class="horseInteractionInputContainer"> <input id="horseInteractionInput" placeholder="Name des Züchters"></input> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="grower" value="" opacity = 0 ></div>'+
				'</div>',
			TYPE =
			'<div class="PeterTheHorse">'+
			'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
			'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
				'<div class="peterIsTalking">Wie wird dein Pferd verwendet und<br>wie ist es im Pass eingetragen?<br>Bitte wähle eine Option.</div>'+
				'<div class="horseInteractionInputContainer"> <select id="horseInteractionInput">'+
				'<option value="---"></option>'+
				'<option value="Turnierpferd">Turnierpferd</option>'+
				'<option value="Schlachtpferd">Schlachtpferd</option>'+
				'<option value="Freizeitpferd">Freizeitpferd</option>'+
  			'</select> </div> '+
				'<div id=horseInteractionFeedback></div>'+
				'<div id= "horseInteractionValueBox" property="type" value="" opacity = 0 ></div>'+
				'</div>';

	let pages = [NAME, OWNER, RACE, DATE_OF_BIRTH, SEX, HEIGHT, GROWER, TYPE];
	return pages;
};
