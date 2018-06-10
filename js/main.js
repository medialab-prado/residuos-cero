$(document).ready(function() {
  $(".action").on("click", function(e) {
    var next = $(this).data("next");
    var prev = $(this).data("prev");
    $("section").animate(
      {
        opacity: "hide"
      },
      "slow"
    );
    $("section#" + next).animate(
      {
        opacity: "show"
      },
      "slow"
    );
    console.log(next);
    console.log(prev);
  });
  $(".action-footer").on("click", function(e) {
    var next = $(this).data("target");
    $("section").animate(
      {
        opacity: "hide"
      },
      "fast"
    );
    $(next).animate(
      {
        opacity: "show"
      },
      "slow"
    );
    console.log(next.replace('#','.'));
    $('#main-container').removeClass();
    $('#main-container').addClass("container-fluid "+next.replace('#',''));
  });

});
