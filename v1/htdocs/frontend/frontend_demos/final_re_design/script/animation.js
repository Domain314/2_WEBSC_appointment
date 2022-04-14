$(document).ready(function () {

    $("#add-new-appointment").click(function() {
        $('html,body').animate({
            scrollTop: $("#add-new-appointment-container").offset().top},
            'slow');
    });

    $("#go-up").click(function() {
        $('html,body').animate({
            scrollTop: 0},
            'slow');
    });

    //SHOW STATS
    $("#show-stats").on('click', function () {
        $("#statistics").fadeIn(300);
        console.log("show stats");
    });
    //HIDE STATS
    $("#hide-stats").on('click', function () {
        $("#statistics").fadeOut(300);
        console.log("hide stats");
    });
});