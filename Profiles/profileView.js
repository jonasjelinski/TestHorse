var Profil = Profil || {};

Profil.ProfilView = function(domElement, templateString, data){
	"use strict";
	let that = new EventTarget();

	function init(){
		filledForm();
	}

	function fillView(){
		let filledForm = createFilledForms();	
		domElement.appendChild(filledForm);
	}

	function createFilledForms(){
    	let element = {},
			div =  document.createElement("div"),
			templateFunction = _.template(templateString),
			elementHTML = templateFunction(data);
    	div.innerHTML = elementHTML;
    	element = div.children[0];
    	return element;
	}

	function sendFilledEvent(){
		let event = new Event("filled");
		that.dispatchEVent(event);
	}

	that.init = init;
	return that;
}