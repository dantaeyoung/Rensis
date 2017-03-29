import $ from 'jquery';

class QuizUI {


	constructor () {
    console.log("test");
	}

  clearInput () {
    $("input:checked").prop("checked", false)
    $(".text_question input").val("");
  }

  check_and_disable_cancelconfirm() {

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


  docReady() {
    $("input").change((event) => {
      check_and_disable_cancelconfirm();
      console.log("oh oh");
    });

    // 'cancel' button
    $("button#cancel").click((event) => {
      clearInput();
    });


    // confirm button
    $("button#confirm").click((event) => {

      var allResults = Question.mergeResults(_.map(allQuestions, function(q) {
        return q.getResult();
      }));

      console.log(allResults);

      var data = {};
      data.sender = "personalityquiz";
      data.time = {'mode': 'personality_quiz', 'value': moment().format() };
      data.quizResults = allResults;

      // send data
      socket.emit('broadcast', data);

      $("#personname").html(allResults.name);
      $("#thankyou").fadeIn(1000);

    });

    $("button#thankyoumessage").click(function() {
      clearInput();
      check_and_disable_cancelconfirm();
      $("#thankyou").fadeOut(1000);
    })	
  }
}

module.exports = QuizUi;
