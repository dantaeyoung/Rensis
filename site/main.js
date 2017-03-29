import $ from 'jquery';
import _ from 'lodash';

import './main.scss';
import Rensis from './Rensis';
import questions_data from './questions_data';

var questionData = questions_data.question1;



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


$(function() {

  var allQuestions = [];


  console.log(questionData);
  var rensis = new Rensis(questionData);

  rensis.addHtml({
    "title": "#title",
    "description": "#description",
    "questions": "#questions"
  });



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
        console.log("y = ");console.log(v);
        posOption.top = ((1 - ((allResults[k] + 1) / 2)) * 100) + "%";
      }
      if(v.axis == "x") {
        posOption.left = (((allResults[k] + 1) / 2) * 100) + "%";
      }
    });
    $("<div class='mark'>&#9679; " + allResults.name + "</div>").css(posOption).appendTo("#twobytwo #results");
//TODO: axes
    $("#twitterprofile").attr("src", "https://twitter.com/" + allResults.twitter_handle + "/profile_image?size=original");
    $("#personname").html(allResults.name);
    $("#thankyou").fadeIn(1000);

  });

  $("button#thankyoumessage").click(function() {
    clearInput();
    check_and_disable_cancelconfirm();
    $("#thankyou").fadeOut(1000);
  })	


});

