var Profil = Profil || {};


/** 
 * namespace ProfileViewAndControll  
 * @memberof! Profil 
 * @param{string} pageId, id of the page in which the profil should be displayed
 * @param{string} templateId, id of the template to create a new profil
 * @param{object} attributes, data to create new html objects with the templateString
 * @param{string} changeButtonId, id of the changeButton
 * @param{string} okayButtonId, id of the okayButton
 * @param{string} delteButtonId, id of the deleteButonn
 * @description ViewControll modul of Profil
 */
Profil.ProfileViewAndControll = function(pageId, templateString, attributes, changeButtonId, okayButtonId, delteButtonId){
	"use strict";

	let that = new EventTarget(),
	page,
	view,
	controll;

	/**
	* @function init
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description Initialize this model.
	*/ 	
	function init(){
		getPageFromDom();
		initView();
		initControll();
		addEventListeners();		
	}

	/**
	* @function getPageFromDom
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description gets page by using the pageId
	*/ 
	function getPageFromDom(){
		page = document.getElementById(pageId);
	}

	/**
	* @function initView
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description inits the view
	*/ 
	function initView(){
		view = Profil.ProfilView(page, templateString, attributes);
		view.init();
	}

	/**
	* @function initControll
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description inits the controll
	*/ 
	function initControll(){
		controll = Profil.Controll(changeButtonId, okayButtonId, delteButtonId);
		controll.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description adds the eventlisteners
	*/ 
	function addEventListeners(){
		controll.addEventListener("onChange", handleChange);
		controll.addEventListener("onOkay", handleOkay);
		controll.addEventListener("onDelete", handleDelete);
	}

	/**
	* @function handleChange
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description sends an event of type "onChange"
	*/ 
	function handleChange(){		
		sendEvent("onChange");
	}

	/**
	* @function sendEvent
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @param {string}, type
	* @description sends an event of type "ontypeChange"
	*/ 
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function handleOkay
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description sends an event of type "onOkay"
	*/ 
	function handleOkay(){		
		sendEvent("onOkay");
	}

	/**
	* @function handleDelete
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description sends an event of type "onDelete"
	*/ 
	function handleDelete(){		
		sendEvent("onDelete");
	}

	that.init = init;
	return that;

}