function feedadder(){
	var feedstxt = $('#feedstxt').val();
	$('#feedstxt').val("");
	
	feed(feedstxt);
}

function feed(a){
	$("#feeds").html("Loading...")
	feeder(a);
}

function headers(title, entriesLength){

	var header = "<li>" + title + " ("+ entriesLength+")"+"</li>";
	$('#subscribed_list').append(header);
}

function markread(entrytitle){
	//alert(entrytitle);
	$(this).hide();
         //  var cook =  $("li").find("Recipe").attr("cook") ;
}
