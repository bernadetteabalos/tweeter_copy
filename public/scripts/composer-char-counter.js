$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("keyup", function() {
    const charLimit = 140;
    let charCount = charLimit - $(this).val().length;
    const counter = $(this).closest(".new-tweet").find('.counter');
    counter.text(charCount);

    if(charCount < 0) {
      counter.addClass('charCountRed');
    } else {
      counter.removeClass('charCountRed');
    }

  })
});