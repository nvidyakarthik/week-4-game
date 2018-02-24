$(document).ready(function () {
  var objName = {
    harry: { healthPoints: 120, attackPower: 8, counterAttackPower: 8 },
    hermione: { healthPoints: 100, attackPower: 5, counterAttackPower: 5 },
    snape: { healthPoints: 150, attackPower: 6, counterAttackPower: 20 },
    malfoy: { healthPoints: 180, attackPower: 7, counterAttackPower: 25 }

  }
  var upPower = 1;
  var player = "";
  var opponent = "";

  //This function moves the characters down to enemy area
  $('#characterbox').on('click', '.character', function () {
    $(this).removeClass('character');
    $(this).addClass('selected');
    player = $(this).attr('id');
    console.log("I am player 1" + player);
    $(this).css('background-color', '#e8fce8');
    $('.character').css('background-color', '#ffe3e1');
    $('#enemy').append($('#characterbox >.character'));
  });


  //This function moves a character to the defender region 
  $('#enemy').on('click', '.character', function () {
    if(!$.trim($('#defender').html()).length){
      $(this).removeClass('character');
      $(this).addClass('selected');
      opponent = $(this).attr('id');
      console.log("I am player 2" + opponent);
      $("#line1").html("");
      $("#line2").html("");
      $('#' + opponent).css('background-color', '#e8fce8');
      $('#defender').append($('#enemy >.selected'));
    }
  });

  
$(".glyphicon").on("click",function() {
  alert("test");
  
});

  //The restart button is dynamically added so adding a onclick on restart button won't work
  //Do the onclick function on the div that encloses restart button
  $("#line2").on('click', '#restart', function () {
    location.reload();
  });

  //This function has all the logic when the user clicks the attack button
  $("#attack").click(function () {

    //This condition checks if there is an enemy in the defender area if not prints a message
    //always use trim there is spaces around the div where the condition won't work
    if (!$.trim($('#defender').html()).length) {
      $("#line1").html("No enemy here pick a new one.")

    }
    else {
      //This condition checks if the healthpoints of both the player is not negative
      if (objName[opponent]["healthPoints"] >= 0 && objName[player]["healthPoints"] >= 0) {

        //player attacking opponent
        var opponentDamage = objName[player]["attackPower"] * (upPower++);
        $("#line1").html("you attacked " + opponent + " for " + opponentDamage + " damage.");
        //reducing opponents healthpoints
        objName[opponent]["healthPoints"] = objName[opponent]["healthPoints"] - opponentDamage;
        //checking if the opponent has negative health points if yes prints a message saying player wins
        if (objName[opponent]["healthPoints"] < 0) {
          console.log("test" + !$.trim($('#enemy').html()).length);
          if (!$.trim($('#enemy').html()).length) {
            $("#" + opponent).remove();
            $("#line1").html("You win!!!");
            $("#line2").html("");
            $("#line2").append("<button id='restart' type='submit' class='btn btn-primary'>Restart</button>");
          }
          else {
            $("#" + opponent).remove();
            $("#line1").html("You have defeated " + opponent + " you can choose to fight another enemy.");
            $("#line2").html("");
          }
        }
        else {
          $("#" + opponent + " .hPoint").html(objName[opponent]["healthPoints"]);
          //opponent attacks player now
          //line printed in user screen
          $("#line2").html(opponent + " attacked  you back for " + objName[opponent]["counterAttackPower"] + " damage.");
          //reducing player healthpoints and storing it in object
          objName[player]["healthPoints"] = objName[player]["healthPoints"] - objName[opponent]["counterAttackPower"];
          $("#" + player + " .hPoint").html(objName[player]["healthPoints"]);

          if (objName[player]["healthPoints"] < 0) {
            //updating in User 
            $("#line1").html("You have been defeated GAME OVER!!!");
            $("#line2").html("");
            $("#line2").append("<button id='restart' type='submit' class='btn btn-primary'>Restart</button>");
          }
        }

      }
    }
  });
});