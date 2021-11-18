$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("keyup", function() {
    const charLimit = 140;
    let charCount = charLimit - $(this).val().length;
    const counter = $(this).closest(".new-tweet").find('.counter');
    counter.text(charCount); //jquery .text method

    if (charCount < 0) {
      counter.addClass('charCountRed'); //adds a class to make text red if negative number
    } else {
      counter.removeClass('charCountRed'); //alternatively, removes class when no longer negative
    }

  });
});