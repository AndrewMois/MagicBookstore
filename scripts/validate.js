$(document).ready(function () {

    function validateForm() {
        let isValid = true;

        //Name validation (empty and longer then 20)
        let name = $("#Name").val().trim();
        if (name == '') {
            $("#Name").attr("placeholder", "Name is required");
            $("#Name").addClass("error");
            isValid = false;
        } else if (name.length > 20) {
            $("#Name").val("");
            $("#Name").attr("placeholder", "Name must be less than 20 characters");
            $("#Name").addClass("error");
            isValid = false;
        } else {
            $("#Name").removeClass("error");
            localStorage.setItem("Name", $("#Name").val());
        }

        // Email validation
        let email = $("#Email").val().trim();
        if (email == '') {
            $("#Email").attr("placeholder", "Email is required");
            $("#Email").addClass("error");
            isValid = false;
        } else {
            $("#Email").removeClass("error");
            localStorage.setItem("Email", $("#Email").val());
        }

        //Phone validation

        let phone = $("#Phone").val().trim();
        if (phone == '') {
            $("#Phone").attr("placeholder", "Phone is required");
            $("#Phone").addClass("error");
            isValid = false;
        } else if (phone.length != 10) {
            $("#Phone").val("");
            $("#Phone").attr("placeholder", "Phone must be 10 digits");
            $("#Phone").addClass("error");
            isValid = false;
        } else {
            $("#Phone").removeClass("error");
            localStorage.setItem("Phone", $("#Phone").val());
        }

        //Date validation (not in the past)
        let GivenDate = $("#Date").val();
        if (GivenDate !== '') {
            // converting given data in the correct format (Doesnt work)
            // it counts tomorrow as today's date
            // GivenDate = new Date(GivenDate);
            // GivenDate.setHours(0,0,0,0);

            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            // in this case if parsed given date is less parced the current date then it will return true
            // for some reason, if I converted selected dato to Date object, it counted tomorrow as today
            // So I had to use this workaround
            if (Date.parse(CurrentDate) - Date.parse(GivenDate) > 0) {
                $("#Date").val("");
                $("#Date").attr("placeholder", "Date must be in the future");
                $("#Date").addClass("error");
                isValid = false;
            } else {
                $("#Date").removeClass("error");
                localStorage.setItem("Date", $("#Date").val());
            }
        }

        // Delivery address validation
        let address = $("#Address").val().trim();
        if (address == '') {
            $("#Address").attr("placeholder", "Address is required");
            $("#Address").addClass("error");
            isValid = false;
        } else {
            $("#Address").removeClass("error");
            localStorage.setItem("Address", $("#Address").val());
        }

        // Province validation
        let province = $("#Province").val().trim();
        // this creates a valid object in case it finds a correct province in the datalist
        var objCheck = $("#provinces").find("option[value='" + province + "']");
        if (province == '') {
            $("#Province").attr("placeholder", "Province is required");
            $("#Province").addClass("error");
            isValid = false;
            // It appears that Jquery selector by default has 2 keys in the object
            // so I am checking if the object has more than 2 keys
        } else if (Object.keys(objCheck).length <= 2) {
            $("#Province").val("");
            $("#Province").attr("placeholder", "This is not a valid province");
            $("#Province").addClass("error");
            isValid = false;
        }
        else {
            $("#Province").removeClass("error");
            localStorage.setItem("Province", $("#Province").val());
        }

        // Delivery type radio button validation
        // Trying to create a variable. It is undefined by default and has value if checked
        let deliveryType = $("input[name='deliveryType']:checked").val();
        if (deliveryType == undefined) {
            $("legend").text("Please select one");
            $("legend").css("color", "brown");
            $("fieldset").addClass("error");
            isValid = false;
        } else {
            $("legend").text("Choose your delivery type*:");
            $("legend").css("color", "black");
            $("fieldset").removeClass("error");
            localStorage.setItem("deliveryType", $("input[name='deliveryType']:checked").val());
        }




        return isValid;
    }


    // EVENTS

    // Date event
    // To set error in the placeholder I come up with this solution
    // It's possible to set error in the span tag, but this needs more time for styling and I don't have it
    // Hope you understand
    $("#Date").focus(function () {
        $(this).attr("type", "date");
    });
    $("#Date").blur(function () {
        $(this).attr("type", "text");
    });



    $("#submitBtn").click(function () {

        validation = validateForm();
        if (validation == false) {
            console.log("Form is not valid");
            return false;
        } else {

            return true;

        }


    });


});