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
  $('#characterbox').on('click', '.character', function () {
    $(this).removeClass('character');
    $(this).addClass('selected');
    player = $(this).attr('id');
    console.log("I am player 1" + player);
    $('#enemy').append($('#characterbox >.character'));
  });

  $('#enemy').on('click', '.character', function () {
    $(this).removeClass('character');
    $(this).addClass('selected');
    opponent = $(this).attr('id');
    console.log("I am player 2" + opponent);
    $("#line1").html("");
    $("#line2").html("");
    $('#defender').append($('#enemy >.selected'));
  });
  $("#line2").on('click','#restart', function () {
      location.reload();
    //console.log("inside")
    //alert("test");

  });

  $("#attack").click(function () {
    if(!$.trim( $('#defender').html() ).length){
       $("#line1").html("No enemy here pick a new one.")

    }

    if (objName[opponent]["healthPoints"] >= 0 && objName[player]["healthPoints"] >= 0) {

      //player attacking opponent
      var opponentDamage = objName[player]["attackPower"] * (upPower++);
      $("#line1").html("you attacked " + opponent + " for " + opponentDamage + " damage.");
      //reducing opponents healthpoints
      objName[opponent]["healthPoints"] = objName[opponent]["healthPoints"] - opponentDamage;
      if (objName[opponent]["healthPoints"] < 0) {
        console.log("test"+ !$.trim( $('#enemy').html() ).length );
        if(!$.trim( $('#enemy').html() ).length ) {
          $("#"+opponent).remove();
          $("#line1").html("You win!!!");
          $("#line2").html("");
          $("#line2").append("<button id='restart' type='submit' value='restart'>Restart</button>");
        }
        else{
          $("#"+opponent).remove();
          $("#line1").html("You have defeated the "+opponent+" you can choose to fight another enemy.");
          $("#line2").html("");
        }       
      }
      else{
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
        $("#line2").append("<button id='restart' type='submit' value='restart'>Restart</button>");
      }
    }
      
    }
  });



});