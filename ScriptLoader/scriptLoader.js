/*---SCRIPT LOADER--*/

//loads the js files in the correct order
//and starts the startpage
//source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#defer_property 

var ScriptLoader = ScriptLoader || {};

ScriptLoader = function(){
	"use strict";

	let that = {};

	//async scripts 
	//needs to be loaded as soon the page is loaded
	function loadError(oError) {
		throw new URIError("The script " + oError.target.src + " didn't load correctly.");
	}

	//Async:False will hold the execution of rest code. Once you get response of ajax, only then, rest of the code will execute.
	function prefixScript(url, onloadFunction) {
		var newScript = document.createElement("script");
		newScript.onerror = loadError;
		if (onloadFunction) { newScript.onload = onloadFunction; }
		newScript.async = false;
		document.currentScript.parentNode.insertBefore(newScript, document.currentScript); 
		newScript.src = url;
	}

	function loadScripts(){
		let scripts = ScriptLoader.Scripts;
		scripts.forEach(function(script){
				prefixScript(script);		
		});	
	}

	that.loadScripts = loadScripts;
	return that;
};

