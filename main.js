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
    }, 1000);

    function getTweet(tweet, user) {
        var $tweet = $('<p></p>');
        var tweetTime = tweet.created_at;
        var date = tweetTime.getDate();
        var month = monthsList[tweetTime.getMonth()];
        var year = tweetTime.getFullYear();
        var hour = tweetTime.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minutes = tweetTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var link = '<a class="link" href = #>' + user + '</a>';
        $tweet.html('@' + link + ' . ' + month + ' ' + date + ' ' + year + ' ' + hour + ':' + minutes + ' : ' + tweet.message);
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

});

