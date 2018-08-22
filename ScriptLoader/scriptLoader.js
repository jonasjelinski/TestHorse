/*---SCRIPT LOADER--*/

/** 
 * namespace ScriptLoader  
 * @memberof! Profil 
 * @description loads the js files in the correct order and starts the startpage
 * source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#defer_property 
 * async scripts, needs to be loaded as soon the page is loaded
 */

var ScriptLoader = ScriptLoader || {};

ScriptLoader = function(){
	"use strict";

	const LOADING_TIME = 4000;

	let that = new EventTarget();

	/**
	* @function loadError
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description shows an error if the laoding failed
	*/ 
	function loadError(oError) {
		throw new URIError("The script " + oError.target.src + " didn't load correctly.");
	}

	/**
	* @function prefixScript
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description appends the scripts to the dom
	*/ 
	function prefixScript(url, lastScript, onloadFunction) {
		var newScript = document.createElement("script");
		newScript.onerror = loadError;
		if (onloadFunction) { newScript.onload = onloadFunction; }
		newScript.async = false;
		newScript.src = url;
		document.currentScript.parentNode.insertBefore(newScript, document.currentScript); 		
		if(lastScript){
			waitAndSendEvent();
		}
	}

	/**
	* @function waitAndSendEvent
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description waits LOADING_TIME and then send the event
	* that scripts have been loaded succesfuly
	* waiting is necessary, because the server needs to load all scripts
	* before showing the page. Prevents "not defined" errors.
	*/ 
	function waitAndSendEvent(){
		 setTimeout(sendLoadedEvent, LOADING_TIME);
	}


	/**
	* @function sendLoadedEvent
	* @private
	* @memberof!Profil.ProfilView
	* @instance
	* @description send the event that scripts have been loaded succesfuly
	*/ 
	function sendLoadedEvent(){
		let event = new Event("onLoaded");
		that.dispatchEvent(event);
	}


	/**
	* @function loadScripts
	* @public
	* @memberof!Profil.ProfilView
	* @instance
	* @description public function to load the scripts
	*/ 
	function loadScripts(){
		let scripts = ScriptLoader.Scripts,
			length = scripts.length;
		for(let i = 0; i < length; i++){
			let script = scripts[i],
				lastScript = false;
			if(i === length-1){
				lastScript =  true;
			}	
			prefixScript(script, lastScript);		
		}
	}

	that.loadScripts = loadScripts;
	return that;
};

