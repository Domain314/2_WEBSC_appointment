//this big function means: load this function AFTER the document loading finished
$(document).ready(function () {
    //CLOSE NEW APPOINTMENT FORM
    $("#close_appointment_form").on('click', function () {
        $("#appointment-form").fadeOut(300);
        console.log("hiding appointment form");
    });
    //OPEN NEW APPOINTMENT FORM
    $("#add_new_appointment").on('click', function () {
        $("#appointment-form").fadeIn(300);
        console.log("show appointment form");
    });
});
