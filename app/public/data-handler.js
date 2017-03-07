// Get Users answeres
  $("#submit").on("click", function(){

      // Validate
      function isValidated() {
          var isValid = true;
          $(".form-control").each(function() {
              if ($(this).val() === '')
                  isValid = false;
          });

          $(".selection").each(function() {
              if ($(this).val() === '')
                  isValid = false;
          });
          return isValid;
      }

        // If its validated
        if (isValidated() == true) {
            // user's data
            var userData = {
                "name": $("#name").val(),
                "photo": $("#photo").val(),
                "scores": [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            var baseURL = window.location.origin;
            $.post(`${baseURL}/api/friends`, userData, function(data) {
                var user = data;
                console.log(`User From Response: ${user.animal}`);

                $("#matchName").text(user.name);
                $('#matchImg').attr("src", user.photo);

                $("#resultsModal").modal('toggle');

            });
        } else {
            $("#alertModal").modal('toggle')
        }

        return false;
});
