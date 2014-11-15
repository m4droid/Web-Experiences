var onYouTubePlayerStateChange = function (newState) {
  if(newState.data === YT.PlayerState.ENDED) {
    changeExperience(current_experience_index + 1);
  }
};

var onYouTubeIframeAPIReady = function () {
  ytplayerParams.events = {
    'onStateChange': onYouTubePlayerStateChange
  };

  ytplayer = new YT.Player('video-youtube', ytplayerParams);
};

var YouTubeExperience = function (raw_experience) {
  var that = {};
  that.raw_experience = raw_experience;

  that.load = function () {
    // Clear previous content
    $("#content").html("");

    // Create the video container
    var video_container = document.createElement("div");
    $(video_container).attr("id", "video-youtube");
    $("#content").append(video_container);

    // Set player parameters
    ytplayerParams = {
      'width': '720',
      'height': '576',
      'videoId': that.raw_experience.video_id,
      'playerVars': {
        'autoplay': 1,
        'controls': 1,
        'autohide': 1,
        'wmode': 'opaque'
      }
    };

    if(that.raw_experience.params !== undefined && that.raw_experience.params.start_time !== undefined)
      ytplayerParams.playerVars.start = that.raw_experience.params.start_time;

    if(that.raw_experience.params !== undefined && that.raw_experience.params.end_time !== undefined)
      ytplayerParams.playerVars.end = that.raw_experience.params.end_time;

    if(window.YT !== undefined) {
      ytplayer = new YT.Player('video-youtube', ytplayerParams);
    } else {
      // Load YouTube API library
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  };

  that.checkPrevious = function () {
    return 0;
  };

  that.checkNext = function () {
    return 0;
  };

  that.getCurrentState = function() {
    return {
      "type": "video-youtube",
      "id": that.raw_experience.id,
      "player_video_id": that.raw_experience.video_id,
      "player_state": ytplayer.getPlayerState(),
      "player_current_time": ytplayer.getCurrentTime(),
      "player_video_duration": ytplayer.getDuration()
    };
  };

  return that;
};