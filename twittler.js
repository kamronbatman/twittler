moment.locale('en', {
    relativeTime : {
        future: "%s",
        past:   "%s",
        s:  "1min",
        m:  "1min",
        mm: "%dmins",
        h:  "1hr",
        hh: "%dhrs",
        d:  "1d",
        dd: "%dd",
        M:  "1mnth",
        MM: "%dmnths",
        y:  "1yr",
        yy: "%dyrs"
    }
});


var drawUsers = function(users){
	_.each(users, function(element, index, list){
		$('<a/>', { class: 'list-group-item', href: '#', text: element} )
		.append('<span class="glyphicon glyphicon-chevron-right pull-right"></span>')
		.click(function(){
			setActiveUser(index);
			drawTweets(index);
		})
		.appendTo('#userlist');
	});
};

var setActiveUser = function(index){
	$('#userlist > a').removeClass('active');
	$('#userlist > a').eq(index).addClass('active');
}

var drawTweets = function(index){ 
	$('#timeline').empty();

	_.each(this.streams.users[this.users[index]].reverse(), function(tweet, index, list){
		$('<div class="list-group-item"></div>')
		.append($('<h4/>', { class: 'list-group-item-heading', html: tweet.user + ' &#8226; ' })
			.append($('<small/>').append($('<span/>', { 'data-livestamp': tweet.created_at.toISOString() })))
		)
		.append($('<p/>', { class: 'list-group-item-text', text: tweet.message }))
		.appendTo('#timeline');
	});
}

var drawTweetsAuto = function() {
	drawTweets($('#userlist > a.active').index());
	setTimeout(drawTweetsAuto, 10000);
}


drawUsers(this.users);
setActiveUser(0);
drawTweets(0);
drawTweetsAuto();