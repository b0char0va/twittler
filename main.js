$(document).ready(function () {
    var guestTweets = [];
    var dataArrLength = streams.home.length;
    var index = streams.home.length - 1;
    while (index >= 0) {                                 // loads initial tweets when page is refreshed
        var initialTweets = getTweet(streams.home[index]);
        initialTweets.appendTo("#tweet-section");
        index -= 1;
    }
    setInterval(function () {                           //loads newly generated tweets every second
        if (streams.home.length > dataArrLength) {
            var numberOfNewTweets = streams.home.length - dataArrLength;
            var start = dataArrLength;
            for (var i = 0; i < numberOfNewTweets; i++) {
                var newTweet = getTweet(streams.home[start]);
                newTweet.prependTo("#tweet-section:first-child");
                start++;
            }
            dataArrLength = streams.home.length;
        }
        $('.time').each(function () {
            $(this).html(moment($(this).attr('data')).from(Date.now()));
        });
    }, 1000);

    function getTweet(tweet) {                          // formats tweets
        var $tweet = $('<p></p>');
        var user = tweet.user;
        var tweetTime = tweet.created_at;
        var link = '<a class="link" href = #>' + user + '</a>';
        var formattedTime = moment(tweetTime).from(Date.now());
        $tweet.html('@' + link + ' . ' + '<span class="time" data="' + tweetTime + '">' + formattedTime + '</span>' + ' : ' + tweet.message);
        return $tweet;
    }

    $('#tweet-section').on('click', 'a', function (e) {     //  handles username click event to filter tweets for that username
        $('#tweet-section').addClass('hide');
        $('#tweet-area').addClass('hide');
        $('#timeline-section').removeClass('hide');
        $('#timeline-area').removeClass('hide');
        var userName = this.text;
        var searchArr = streams.home;
        if (userName === 'guestUser') {
            searchArr = guestTweets;
        }
        var startingPoint = 0;
        var i = startingPoint;
        setInterval(function () {
            var length = searchArr.length;
            for (i = startingPoint; i < length; i++) {
                if (searchArr[i].user === userName) {
                    var userTweets = getTweet(searchArr[i]);
                    userTweets.prependTo("#timeline-section:first-child");
                }
            }
            startingPoint = length;
        }, 100);
        e.preventDefault();
        return false;
    });

    $('#tweet-button').click(function () {                   // handles guest user tweet click event which lets user tweet
        var message = $('#user-tweet').val();
        if (message.length > 0) {
            var tweet = {};
            tweet.user = 'guestUser';
            tweet.message = message;
            tweet.created_at = new Date();
            guestTweets.push(tweet);
            var userTweet = getTweet(tweet);
            userTweet.prependTo("#tweet-section:first-child");
            $('#user-tweet').val('');
        }
    })

});


