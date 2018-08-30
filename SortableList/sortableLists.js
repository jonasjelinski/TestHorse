var SortableLists = SortableLists || {};


SortableLists = function(firstListID, secondListID, firstIDTag= "id", secondIDTag = "id"){
	
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
				console.log("firstList fires, secondIDTag", secondIDTag, ui.item, $(ui.item).attr(secondIDTag));
				var id = $(ui.item).find("li").attr(firstIDTag);
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
				console.log("secondList fires, firstIDTag", firstIDTag, ui.item, $(ui.item).attr(firstIDTag));
				var id = $(ui.item).attr(secondIDTag);
				sendEvent("onItemReceived", secondListID, id);
			}
		});
	}


	that.init = init;
	return that;
}