/**
 * Variables 
 */
const notification = {
    Success: "succeeded",
    Fail: "failed",
    Max: "max",
    Reset:"reset"
};
const min = 1;
const max = 100;

/**
 * Events
 */
$("#btnResetGame").click(function(){
    pageLoad("reset");
});
$("#btnStartGame").click(function(){
    pageLoad("first-load");
});
$('#btnTryGuess').click(function () {
    guessNumber();
});

/**
 * Methods
 */
function pageLoad(load) {
    $.ajax({
        url: 'http://localhost:4000/loaddata', // Replace with your server URL
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            alert(data.Message);  
            $("#txtGuess").val("");
            disableButtons(load)   ;
        },
        error: function (error) {
            $('#result').text('Error sending data.');
        }
    });
}

function disableButtons(result) {
    if (notification.Success == result) {
        $("#btnResetGame").prop("disabled", true);
        $("#btnTryGuess").prop("disabled", true);
        $("#btnStartGame").prop("disabled", false);
    } else if (notification.Fail == result) {
        $("#btnResetGame").prop("disabled", false);
        $("#btnTryGuess").prop("disabled", false);
        $("#btnStartGame").prop("disabled", true);
    }
    else if (notification.Max == result) {
        $("#btnResetGame").prop("disabled", true);
        $("#btnTryGuess").prop("disabled", true);
        $("#btnStartGame").prop("disabled", false);
    }else if (notification.Reset == result) {
        $("#btnResetGame").prop("disabled", true);
        $("#btnTryGuess").prop("disabled", true);
        $("#btnStartGame").prop("disabled", false);
    }else{
        $("#btnResetGame").prop("disabled", false);
        $("#btnTryGuess").prop("disabled", false);
        $("#btnStartGame").prop("disabled", true);
    }
}

function guessNumber() {
    const guessedNumber = parseInt($("#txtGuess").val()); // Replace with your parameter values

    if(isNaN(guessedNumber) || guessedNumber <= 0 || guessedNumber > 100){
        alert("Please enter a number between 1111 and 100");
    }else{
        $.ajax({
            url: 'http://localhost:4000/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ guessedNumber: guessedNumber }),
            success: function (data) {
                alert(data.Message);
                disableButtons(data.Status);
            },
            error: function (error) {
                $('#result').text('Error sending data.');
            }
        });
    } 
}