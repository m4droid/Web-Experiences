var ytplayer = null;
var experiences = [];
var current_experience_index = -1;

var ExperiencesFactory = function (raw_experience) {
  var experience = null;

  if(raw_experience.type === "video_youtube") {
    experience = YouTubeExperience(raw_experience);
  } else if(raw_experience.type === "html") {
    experience = HtmlExperience(raw_experience);
  }

  return experience;
};

var loadExperiences = function (raw_experiences_list) {
  for(var i = 0; i < raw_experiences_list.length; i++) {
    var experience = ExperiencesFactory(raw_experiences_list[i]);
    if(experience !== null) experiences.push(experience);
  }

  var stored_current_experience_index = $.localStorage.get("current_experience_index");
  current_experience_index = (stored_current_experience_index === null) ? 0 : stored_current_experience_index;
  changeExperience(current_experience_index);
};

var resetExperiences = function () {
  current_experience_index = 0;
  changeExperience(current_experience_index);
};

var check_controls = function () {
  $("#experience-previous").attr("disabled", (current_experience_index === 0));
  $("#experience-next").attr("disabled", (current_experience_index == experiences.length - 1));
};

var changeExperience = function (next_experience_index) {
  if(0 <= next_experience_index <= experiences.length) {
    current_experience_index = next_experience_index;
    $.localStorage.set("current_experience_index", current_experience_index);
    experiences[current_experience_index].load();
    check_controls();
  }
};

var sendDataToServer = function (data) {
  // TODO: implement this
  console.log(data);
};

var changeExperienceFromControls = function (next_index, experienceTimeoutFunction) {
  var timeout = experienceTimeoutFunction();
  if(timeout >= 0) {
    sendDataToServer(experiences[current_experience_index].getCurrentState());
    setTimeout(function () {
      changeExperience(next_index);
    }, timeout);
  }
};

$(document).ready(function () {
  $("#experience-previous").click(function (ev) {
    changeExperienceFromControls(current_experience_index - 1, experiences[current_experience_index].checkPrevious);
  });

  $("#experience-next").click(function (ev) {
    changeExperienceFromControls(current_experience_index + 1, experiences[current_experience_index].checkNext);
  });
});
