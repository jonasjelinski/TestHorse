var UserCreator = UserCreator || {};

UserCreator.SliderPages = function() {
	const  NAME = 
				'<div>Ihr Name</div>'+
				'<input id="userInteractionInput"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="name" value="" opacity = 0 ></div>',
			DATE = '<div>Ihre Geburtsdatum</div>'+
				'<input id="userInteractionInput"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="dateOfBirth" value="" opacity = 0 ></div>',
			EMAIL = 
				'<div>Ihre Email</div>'+
				'<input id="userInteractionInput" type=email></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="email" value="" opacity = 0 ></div>',
			PASSWORD = 
				'<div>Ihr Password</div>'+
				'<input id="userInteractionInput" type="password"></input>'+
				'<div>Password wiederholen</div>'+
				'<input id="userInteractionInput2" type="password"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="password" value="" opacity = 0 ></div>';
				
	let pages = [NAME, DATE, EMAIL, PASSWORD];
	return pages;
};