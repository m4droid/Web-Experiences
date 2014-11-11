var HtmlExperience = function (raw_experience) {
  var that = {};
  that.raw_experience = raw_experience;

  that.load = function () {
    ytplayer = undefined;
    $("#content").html("");
    $.get(that.raw_experience.template, function(template, textStatus, jqXhr) {
      var data = Mustache.render($(template).html(), that.raw_experience.params);
      $("#content").html(data);
    });
    that.start_time = moment();
  };

  that.checkPrevious = function () {
    return htmlExperiencePreviousCallback();
  };

  that.checkNext = function () {
    return htmlExperienceNextCallback();
  };

  that.getCurrentState = function() {
    var data = htmlExperienceGetCurrentState();
    var now = moment();
    data.start_time = that.start_time.format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    data.end_time = now.format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    data.time_diff = now - that.start_time;
    return data;
  };

  return that;
};