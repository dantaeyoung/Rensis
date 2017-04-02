import $ from 'jquery';
import _ from 'lodash';
import queryString from 'query-string';

import './css/reset.scss';
import './css/main.scss';
import Rensis from './Rensis/Rensis';

import qdp from './questionData.json'; // file-loader gives us the path


var questionData = {};
var rensis;


if(typeof(qdp) !== "undefined") { var questionDataPath = qdp; }
// use URL querystring if possible
const parsed = queryString.parse(location.search);
if("questions" in parsed) { var questionDataPath = parsed.questions; }

$.getJSON(questionDataPath, function( data ) {

	questionData = data;

  console.log(questionData);
  rensis = new Rensis(questionData);

  rensis.addHtml({
    "title": ".quiz_title",
    "description": ".quiz_description",
    "questions": "#questions"
  });

  _.each(questionData.axes, function(v, k) {
    if(v.axis == "y") {
      $("#axis_ymin").html(v.labels[0]);
      $("#axis_ymax").html(v.labels[1]);
    }
    if(v.axis == "x") {
      $("#axis_xmin").html(v.labels[0]);
      $("#axis_xmax").html(v.labels[1]);
    }
  });

});


var clearInput = function() {
  $("input:checked").prop("checked", false)
  $(".text_question input").val("");
}

var check_and_disable_cancelconfirm = () => {

  var nonemptyText = $('.text_question input[type="text"]').filter(function () {
    return this.value.length > 0
  }).length;
  var nonemptyCheckboxes = $(".checkboxes_question").has("input:checked").length; 
  var nonemptyLikert = $(".likert_question input:checked").length; 
  var nonemptyMultiple = $(".multiple_choice_question input:checked").length; 

if ((nonemptyText + nonemptyLikert + nonemptyCheckboxes + nonemptyMultiple) == $(".question").length) {
     $("button#confirm").removeAttr("disabled"); 
  } else {
    $("button#confirm").attr("disabled", "disabled"); 
  }

if ($(".question").length) {
     $("button#cancel").removeAttr("disabled"); 
  } else {
    $("button#cancel").attr("disabled", "disabled"); 
  }


}

function valToPos(val, axis) {
  if(axis == "y") {
    return ((1 - ((val + 1) / 2)) * 100);
  }
  if(axis == "x") {
    return (((val + 1) / 2) * 100);
  }
}

$(function() {



  $("input").change((event) => {
    check_and_disable_cancelconfirm();
  });

  // 'cancel' button
  $("button#cancel").click((event) => {
    clearInput();
  });

  // confirm button
  $("button#confirm").click((event) => {

    var allResults = rensis.getResults();

    console.log(allResults);

    var posOption = {};
    _.each(questionData.axes, function(v, k) {
      if(v.axis == "y") {
        posOption.top = valToPos(allResults[k], "y") + "%";
        $("#axis_ymin").html(v.labels[0]);
        $("#axis_ymax").html(v.labels[1]);
      }
      if(v.axis == "x") {
        posOption.left = valToPos(allResults[k], "x") + "%";
        $("#axis_xmin").html(v.labels[0]);
        $("#axis_xmax").html(v.labels[1]);
      }
    });
    $("<div class='mark'>&#9679; " + allResults.name + "</div>").css(posOption).appendTo("#twobytwo #results");
//TODO: axes
    $("#twitterprofile").attr("src", "https://twitter.com/" + allResults.twitter_handle + "/profile_image?size=original");
    $("#personname").html(allResults.name);
    $("#postquestions").fadeIn(500);
    $("#personalityquestions").fadeOut(500);

  });

  $("button#postquestionsmessage").click(function() {
    clearInput();
    check_and_disable_cancelconfirm();
    $("body").scrollTop(0)
    $("#personalityquestions").fadeIn(500);
    $("#postquestions").fadeOut(500);
  })	

  $('.text_question input[type="text"]').on('input propertychange paste', function () {
    check_and_disable_cancelconfirm();
  });

});

