var SortableLists = SortableLists || {};


SortableLists = function(firstListID, secondListID){
	"use strict";
	
	let that = new EventTarget(),
		firstList,
		secondList;

	function init(){
		firstList = document.getElementById(firstListID);
		secondList = document.getElementById(secondListID);
		addEventListeners();
	}

	function addEventListeners(){
		addListenerToFirstList();
		addListenerToSecondList();
	}

	function addListenerToFirstList(){
		  $("#"+firstListID).sortable({
			connectWith: "#"+secondListID,
			receive: function(event, ui){
				var id = $(ui.item).attr("id");
				sendEvent("onItemReceived", firstListID, id);
			}
		});
	}

	function sendEvent(type, listId, id){
		let event = new Event(type);
		event.details = {};
		event.details.listID = listId;
		event.details.elementID = id;
		that.dispatchEvent(event);
	}

	function addListenerToSecondList(){
		$("#"+secondListID).sortable({
			connectWith: "#"+firstListID,
			receive: function(event, ui){
				var id = $(ui.item).attr("id");
				sendEvent("onItemReceived", secondListID, id);
			}
		});
	}


	that.init = init;
	return that;
}