var onYouTubePlayerReady = function (playerId) {
  ytplayer = document.getElementById("video-youtube");
  ytplayer.setLoop(false);
  ytplayer.playVideo();

  ytplayer.addEventListener("onStateChange", "onYouTubePlayerStateChange");
};

var onYouTubePlayerStateChange = function (newState) {
  if(newState === 0) {
    changeExperience(current_experience_index + 1);
  }
};

var YouTubeExperience = function (raw_experience) {
  var that = {};
  that.raw_experience = raw_experience;

  that.load = function () {
    if(ytplayer !== undefined && ytplayer !== null) {
      var video_params = {
        "videoId": that.raw_experience.id,
        "suggestedQuality": "large",
      };
      if(that.raw_experience.params !== undefined && that.raw_experience.params.start_time !== undefined)
        video_params.startSeconds = that.raw_experience.params.start_time;
      if(that.raw_experience.params !== undefined && that.raw_experience.params.end_time !== undefined)
        video_params.endSeconds = that.raw_experience.params.end_time;
      ytplayer.loadVideoById(video_params);
    } else {
      $("#content").html("");

      // Create the video container
      var video_container = document.createElement("div");
      $(video_container).attr("id", "video-youtube");
      $("#content").append(video_container);

      var video_params = {
        "allowScriptAccess": "always"
      };
      var video_atts = {
        "id": "video-youtube"
      };

      var url = "http://www.youtube.com/v/" + that.raw_experience.video_id + "?enablejsapi=1&playerapiid=ytplayer&version=3&rel=0";
      if(that.raw_experience.params !== undefined && that.raw_experience.params.start_time !== undefined)
        url = url + "&start=" + that.raw_experience.params.start_time;
      if(that.raw_experience.params !== undefined && that.raw_experience.params.end_time !== undefined)
        url = url + "&end=" + that.raw_experience.params.end_time;
      
      swfobject.embedSWF(url, "video-youtube", "720", "576", "8", null, null, video_params, video_atts);
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