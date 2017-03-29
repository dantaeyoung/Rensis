import $ from 'jquery';
import _ from 'lodash';

//import './main.sass';
import Rensis from './Rensis';
import questions from './questions';
var questionData = questions.question1;


var socket = io();
window.socket = socket; // fer debugging
/*socket.on('message', function(data) {
  console.log(data);
});*/


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


/*******************************/
/* WRITE QUESTIONS HEREEE */////
/*******************************/

/*


*Human being personality axes:*
*PartyGoer.js personality axes: *

sociability 
  - the higher, the more extroverted
impatience
  - the higher, the more quickly you get bored
metabolism
  - the higher, the more hungry you get
tolerance
  - the higher, the slower you get drunk
impulsiveness
  - the higher, the noisier decisions are

*/


/*******************************/
/* END    QUESTIONS HEREEE */////
/*******************************/
  console.log(questionData);
  var rensis = new Rensis(questionData);

  rensis.addHtml({
    "title": "#title",
    "description": "#description",
    "questions": "#questions"
  });


//   FOR DEBUGGINg
  $("#question_name input").val("Dan"); 
  $("#question_twitter_handle input").val("dantaeyoung"); 
  $("input").prop("checked", "checked");
  check_and_disable_cancelconfirm();

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

    var data = {};
    data.sender = "personalityquiz";
    data.time = {'mode': 'personality_quiz', 'value': moment().format() };
    data.quizResults = allResults;

    // send data
		socket.emit('broadcast', data);

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
    $("<div class='mark'>" + allResults.name + "</div>").css(posOption).appendTo("#twobytwo");

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

