var Profil = Profil || {};

Profil.ProfilView = function(domElement, templateString, data){
	"use strict";
	let that = new EventTarget();

	function init(){
		fillView();
	}

	function fillView(){
		let filledForms = createFilledForms();
		for(let i = 0; i < filledForms.length; i++){
			let form = filledForms[i];
			domElement.appendChild(form);
		}		
	}

	function createFilledForms(){
    	let filledForms = [],
			div =  document.createElement("div"),
			templateFunction = _.template(templateString),
			elementHTML = templateFunction(data);
    	div.innerHTML  = elementHTML;
    	filledForms = div.childNodes;
    	return filledForms;
	}

	function sendFilledEvent(){
		let event = new Event("filled");
		that.dispatchEVent(event);
	}

	that.init = init;
	return that;
}