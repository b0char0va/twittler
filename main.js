$(document).ready(function () {
    var monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
    var dataArrLength = streams.home.length;
    var index = streams.home.length - 1;
    while (index >= 0) {
        var initialTweets = getTweet(streams.home[index], streams.home[index].user);
        initialTweets.appendTo("#tweet-section");
        index -= 1;
    }
    setInterval(function () {
        if (streams.home.length > dataArrLength) {
            var numberOfNewTweets = streams.home.length - dataArrLength;
            var start = dataArrLength;
            for (var i = 0; i < numberOfNewTweets; i++) {
                var newTweet = getTweet(streams.home[start], streams.home[start].user);
                newTweet.prependTo("#tweet-section:first-child");
                start++;
            }
            dataArrLength = streams.home.length;
        }
        $('.time').each(function () {
            $(this).html(moment($(this).attr('data')).from(Date.now()));
        });
    }, 30000);

    function getTweet(tweet, user) {
        var $tweet = $('<p></p>');
        var tweetTime = tweet.created_at;
        var link = '<a class="link" href = #>' + user + '</a>';
        var formattedTime = moment(tweetTime).from(Date.now());
        $tweet.html('@' + link + ' . ' + '<span class="time" data="'+tweetTime+'">'+formattedTime+'</span>' + ' : ' + tweet.message);
        return $tweet;
    }

    $('#tweet-section').on('click', 'a', function (event) {
        $('#tweet-section').addClass('hide');
        $('#tweet-area').addClass('hide');
        $('#timeline-section').removeClass('hide');
        $('#timeline-area').removeClass('hide');
        var userName = this.text;
        var searchArr = streams.home;
        var startingPoint = 0;
        var i = startingPoint;
        setInterval(function () {
            var length = searchArr.length;
            for (i = startingPoint; i < length; i++) {
                if (searchArr[i].user === userName) {
                    var userTweets = getTweet(searchArr[i], userName);
                    userTweets.prependTo("#timeline-section:first-child");
                }
            }
            startingPoint = length;
        }, 100);
        event.preventDefault();
        return false;
    });

    $('#tweet-button').click(function () {
        var tweet = $('#user-tweet').val();
        var $tweet = $('<p></p>');
        var tweetTime = new Date();
        var formattedTime = moment(tweetTime).from(Date.now());
        $tweet.html('@guestUser' + ' . ' + '<span class="time" data="'+tweetTime+'">'+formattedTime+'</span>' + ' : ' + tweet);
        $tweet.prependTo("#tweet-section:first-child");
    })

});


