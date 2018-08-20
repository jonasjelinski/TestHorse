/*---SCRIPT LOADER--*/

//loads the js files in the correct order
//and starts the startpage
//source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#defer_property 

var ScriptLoader = ScriptLoader || {};

ScriptLoader = function(){
	"use strict";

	const LOADING_TIME = 1000;

	let that = new EventTarget();

	//async scripts 
	//needs to be loaded as soon the page is loaded
	function loadError(oError) {
		throw new URIError("The script " + oError.target.src + " didn't load correctly.");
	}

	//Async:False will hold the execution of rest code. Once you get response of ajax, only then, rest of the code will execute.
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

	function waitAndSendEvent(){
		 setTimeout(sendLoadedEvent, LOADING_TIME);
	}

	function sendLoadedEvent(){
		let event = new Event("onLoaded");
		that.dispatchEvent(event);
	}

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

