var Profil = Profil || {};

/** 
 * namespace ProfilView  
 * @memberof! Profil
 * @param{htmlElement} parentElement, element on which the new html object will be append
 * @param{string} templateString, templatestring to create new html objects
 * @param{object} attributes, data to create new html objects with the templateString
 * @description View of the profilmodul. Adds new elements to the dom.
 * Each element shows an attribute of the profil to the user
 * e.g. name of the horse, or email of the user.
 */
Profil.ProfilView = function(parentElement, templateString, attributes){
	"use strict";
	let that = new EventTarget();

	/**
	* @function init
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description Initialize this model. Calls the function fillView
	*/ 	
	function init(){
		fillView();
	}

	/**
	* @function fillView
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description appends new forms to the view. Each form shows an attribute of the profil to the user.
	*/ 	
	function fillView(){
		let filledForms = createFilledForms();
		for(let i = 0; i < filledForms.length; i++){
			let form = filledForms[i];
			parentElement.appendChild(form);
		}		
	}

	/**
	* @function createFilledForms
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description returns the new created html-object, which are created with the templateString and the attributes
	*/ 	
	function createFilledForms(){
    	let filledForms = [],
			div =  document.createElement("div"),
			templateFunction = _.template(templateString),
			elementHTML = templateFunction(attributes);
    	div.innerHTML  = elementHTML;
    	filledForms = div.childNodes;
    	return filledForms;
	}

	/**
	* @function sendFilledEvent
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description sends an event of the type "filled" to tell other moduls that all forms are now attached
	* to the dom
	*/ 	
	function sendFilledEvent(){
		let event = new Event("filled");
		that.dispatchEVent(event);
	}

	that.init = init;
	return that;
}