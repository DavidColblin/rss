/**
 * REVERSED ENGINEERED Plugin: jquery.zRSSFeed
 * BY DAVID M.
 **/

function feeder(url){
			// Create Google Feed API address
		
			var api = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+ url;
			api += "&num=" + 30; //number of feeds

			// Send request
			$.getJSON(api, function(data){
				// Check for error
				if (data.responseStatus == 200) {
		
					// Process the feeds
					feedparser(data.responseData.feed);
				} 
				else {
					$("#feeds").html('<p> Wrong link, please try again.</p>');
				};
			});				
		
	}; //end of function(url)
	
	// Callback function to create HTML result
	function feedparser(feeds) {
		
		var html = '<script>$(document).ready(function(){';
		html += '$(".marker").click(function(){		$(this).parent().css({"opacity":"0.5","color":"black"}); $(this).hide(200); 	});});</script>';
		
		var row = 'odd';	
		
		html +=	'<h2>' +
				'<a href="'+feeds.link+'" title="'+ feeds.description +'">'+ feeds.title +'</a>' +
				'</h2>';
		var entriesLength = feeds.entries.length;
		
		headers(feeds.title, entriesLength);
		
		// Add body
		html += '<div class="rssBody">' +
			'<ul>';
		
		var entriesLength = feeds.entries.length;
		
		// Add feeds
		for (var i=0; i < entriesLength; i++) {
			
			// Get individual feed
			var entry = feeds.entries[i];
			
			// Format published date
			var entryDate = new Date(entry.publishedDate);
			var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
			
			// Add feed row
			html += '<li class="rssRow '+row+'" id="'+ entry.title +'">';
			html += '<h4><a href="'+ entry.link +'" title="View this feed at '+ feeds.title +'">'+ entry.title +'</a>'+ '<b>, '+ pubDate +'</b>' +'</h4>';
			//html += '<i>'+ pubDate +'</i>';
			
			//show content
				// Use feed snippet if available and optioned
				if (entry.contentSnippet != '') {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;
				}
				
				html += '<p>'+ content +'</p>'
			//show content ends
			
			html += '<a href="#" class="marker" name="'+ entry.title +'" > Mark as read</a></li> <hr width="100" noshade color="white"/>';
			
			// Alternate row classes
			if (row == 'odd') {
				row = 'even';
			} else {
				row = 'odd';
			}			
		}
		
		html += '</ul>' + '</div>';
		$('#feeds').html(html);
	}; //end of feedparser

