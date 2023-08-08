$(function () {

    $("#UserRegistrationModal input[name = 'AcceptUserAgreement']").click(onAcceptUserAgreementClick);

    $("#UserRegistrationModal button[name = 'register']").prop("disabled", true);

    function onAcceptUserAgreementClick () {
        if ($(this).is(":checked")) {
            $("#UserRegistrationModal button[name = 'register']").prop("disabled", false);
        }
        else {
            $("#UserRegistrationModal button[name = 'register']").prop("disabled", true);
        }
    }

    $("#UserRegistrationModal input[name = 'Email']").blur(function () {
        var email = $("#UserRegistrationModal input[name = 'Email']").val();

        var url = "UserAuth/UserNameExists?userName=" + email;

        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                if (data == true) {
                    let alertHtml = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
                        '<strong>Invalid Email!</strong> This email address has already been used.' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>';


                    $("#alert_placeholder_register").html(alertHtml);
                }
                else {
                    $("#alert_placeholder_register").html("");
                }
            },
            error: function (xhr,ajaxOptions,thrownError) {
                console.error(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });

    let registerUserButton = $("#UserRegistrationModal button[name = 'register']").click(onUserRegisterClick); 

    function onUserRegisterClick()
    {
        let url = "/UserAuth/RegisterUser";

        let antiForgeryToken = $("#UserRegistrationModal input[name = '__RequestVerificationToken']").val();

        let email = $("#UserRegistrationModal input[name = 'Email']").val();

        let password = $("#UserRegistrationModal input[name = 'Password']").val();

        let confirmPassword = $("#UserRegistrationModal input[name = 'ConfirmPassword']").val();

        let firstName = $("#UserRegistrationModal input[name = 'FirstName']").val();

        let lastName = $("#UserRegistrationModal input[name = 'LastName']").val();

        let address1 = $("#UserRegistrationModal input[name = 'Address1']").val();

        let address2 = $("#UserRegistrationModal input[name = 'Address2']").val();

        let postCode = $("#UserRegistrationModal input[name = 'PostCode']").val();

        let phoneNumber = $("#UserRegistrationModal input[name = 'PhoneNumber']").val();

        //let acceptUserAgreement = $("#UserRegistrationModal input[name = 'AcceptUserAgreement']").prop('checked');


        let userInput = {
            __RequestVerificationToken: antiForgeryToken,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            FirstName: firstName,
            LastName: lastName,
            Address1: address1,
            Address2: address2,
            PostCode: postCode,
            PhoneNumber: phoneNumber,
            AcceptUserAgreement: true
        };

        $.ajax({
            type: "POST",
            url: url,
            data: userInput,
            success: function (data) {
                let parsed = $.parseHTML(data);

                let hasErrors = $(parsed).find("input[name = 'RegistrationInValid']").val() == "true";

                if (hasErrors) {
                    $("#UserRegistrationModal").html(data);

                    registerUserButton = $("#UserRegistrationModal button[name = 'register']").click(onUserRegisterClick);

                    let form = $("#UserRegistrationForm");
                    $(form).removeData("validator");
                    $(form).removeData("unobtrusiveValidation");
                    $.validator.unobtrusive.parse(form);


                }
                else
                {
                    location.href = '/Home/Index';
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });

    }
});