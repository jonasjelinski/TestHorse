var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver.PotraitView = function(containerID){
	"use strict";
	let that = new EventTarget(),
		picContainer,
		dropbox,
		potrait;

	function init(){
		initDropbox();
		initPotrait();
		console.log("init");
	}

	function initDropbox(){
		picContainer = document.getElementById(containerID);
		dropbox = new Dropbox(picContainer, ["gif","png","jpg","jpeg","image/jpeg"],"hover");
		dropbox.addEventListener("fileDropped", handleFileDrop);
	}

	function initPotrait(){
		potrait = new Potrait(containerID);
		potrait.init();
	}

	function handleFileDrop(event){
		let file = event.data;
		if (!(file instanceof File)) {
		  return;
		}
		setPicture(file);  
	}

	function setPicture(file){
		let src = URL.createObjectURL(file);
		potrait.setPicture(src);
		sendNewPhotoEvent(file);
	}

	function sendNewPhotoEvent(file){
		let photo = file;
		sendEvent("onNewPhoto", photo);
	}

	function sendEvent(type, photo){
		let event = new Event(type);
		event.details = {};
		event.details.photo = photo;
		that.dispatchEvent(event);
	}

	that.init = init;
	return that;
}