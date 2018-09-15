var UserCreator = UserCreator || {};

/**
 * namespace SliderPages
 * @memberof! UserCreator
 * @description Returns an array of html pages as stings, which are used for the <code>Slideshow</Slideshow> of the UserCreatot.
 * those pages will be given to the <code>EntityCreator</code> instance in the  <code>UserCreatorPage.StandardPage</code>.
 */

UserCreator.SliderPages = function() {
	const  NAME =
	'<div class="PeterTheHorse">'+
	'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
	'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
	'<div class="peterIsTalking">Hallo,ich bin Peter.<br>Bitte verate mir als Erstes <br>deinen Namen!</div>'+
	'<div class="userInteractionInputContainer"> <input id="userInteractionInput" placeholder="Name"></input> </div> '+
	'<div id=userInteractionFeedback></div>'+
	'<div id= "userInteractionValueBox" property="name" value="" opacity = 0 ></div>'+
	'</div>',
	DATE =
	'<div class="PeterTheHorse">'+
	'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
	'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
	'<div class="peterIsTalking">Bitte verate mir dein Geburtsdatum!</div>'+
	'<div class="userInteractionInputContainer"> <input id="userInteractionInput" placeholder="Datum"></input> </div> '+
	'<div id=userInteractionFeedback></div>'+
	'<div id= "userInteractionValueBox" property="dateOfBirth" value="" opacity = 0 ></div>',
	EMAIL =
	'<div class="PeterTheHorse">'+
	'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
	'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
	'<div class="peterIsTalking">Bitte gib deine Emailadresse ein.</div>'+
	'<div class="userInteractionInputContainer"> <input id="userInteractionInput" type=email placeholder="Mailadresse"></input> </div> '+
	'<div id=userInteractionFeedback></div>'+
	'<div id= "userInteractionValueBox" property="email" value="" opacity = 0 ></div>'+
	'</div>',
	PASSWORD =
	'<div class="PeterTheHorse">'+
	'<img class="peter" src="Store/pics/Peter.png" alt="Peter the Horse">' +
	'<img class="petersWords" src="Store/pics/Sprechblase.png" alt="Peter#s words">' +
	'<div class="peterIsTalking">Bitte gib dein Passwort zwei Mal ein<br>und achte darauf, dass es<br>gleich geschrieben wird.</div>'+
	'<div class="userInteractionInputContainer"> <input id="userInteractionInput" type="password"></input> </div> '+
	'<div class="userInteractionInputContainer2"> <input id="userInteractionInput2" type="password"></input> </div> '+
	'<div id=userInteractionFeedback></div>'+
	'<div id= "userInteractionValueBox" property="password" value="" opacity = 0 ></div>'+
	'</div>';

	let pages = [NAME, DATE, EMAIL, PASSWORD];
	return pages;
};
