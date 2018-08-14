var UserCreator = UserCreator || {};

UserCreator.SliderPages = function() {
	const  NAME = 
				'<div>Ihr Name</div>'+
				'<input id="userInteractionInput"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="name" value="" opacity = 0 ></div>',
			EMAIL = 
				'<div>Ihre Email</div>'+
				'<input id="userInteractionInput"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="email" value="" opacity = 0 ></div>',
			PASSWORD = 
				'<div>Ihr Password</div>'+
				'<input id="userInteractionInput"></input>'+
				'<div>Password wiederholen</div>'+
				'<input id="userInteractionInput2"></input>'+
				'<div id=userInteractionFeedback></div>'+
				'<div id= "userInteractionValueBox" property="password" value="" opacity = 0 ></div>';
				
	let pages = [NAME, EMAIL, PASSWORD];
	return pages;
};