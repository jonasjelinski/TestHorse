var DatesSuggestor = DatesSuggestor || {};

DatesSuggestor.Dates = function(){
	"use strict";
	let that = {};

	const INJECTIONS = 
	{	
		TETANUS : {
			ONE_YEAR: { id:"-1", title:"Tetanusimpfung" , date: "00-00-00", time: "00:00:00", location:"", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"1", unitRegular: "Jahr"},
			THREE_YEARS:{id:"-2", title:"Tetanusimpfung" , date: "00-00-00", time: "00:00:00", location:"", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"3", unitRegular: "Jahr"},
		},

		INFLUENCA : {
			HALF_YEAR:{ id:"-3", title:"Grippeimpfung" , date: "00-00-00", time: "00:00:00", location:"", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"6", unitRegular: "Monate"},
			ONE_YEAR: { id:"-4", title:"Grippeimpfung" , date: "00-00-00", time: "00:00:00", location:"", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"1", unitRegular: "Jahr"},
		},

		HERPES : {
			ONE_YEAR: { id:"-5", title:"Herpesimpfung" , date: "00-00-00", time: "00:00:00", location:"", dateFuture:"00-00-00", timeFuture: "00:00:00", valueRegular:"1", unitRegular: "Jahr"},
		}
	}
	
	that.INJECTIONS = INJECTIONS;
	return that;
}