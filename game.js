var arrayColour = new Array("red", "yellow", "green", "blue");
var choosenColour = new Array();
var generatedColour = new Array();
var stats_gameover = false;
var level = 0;
var player_play = false;
var indexinput = 0;

loser();
startgame();

function startgame() {

  $(document).on("keydown", function(event) {
    if (event.key.toLowerCase() == "a" && stats_gameover == false && level == 0) {
      game();
    } else if (stats_gameover == true) {
      game();
    }
  });
}

$(".btn").on("click", function() {
  if (player_play == true) {
    var chosen = $(this).attr("id");
    $("#" + chosen).addClass("pressed");
    setTimeout(function() {
      $("#" + chosen).removeClass("pressed");
    }, 150);
    choosenColour.push(chosen);
    checkAnswer();
  }
});

function checkAnswer() {
  if (generatedColour[indexinput] != choosenColour[indexinput]) {
    stats_gameover = true;
    $("#man_start").show();
    player_play = false;
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").html("Game Over, Press any key to start or click ");
    level = 0;
    indexinput = 0;
    choosenColour.length = 0;
    generatedColour.length = 0;
    loser();
  } else if (generatedColour[indexinput] == choosenColour[indexinput]) {
    indexinput++;
    if (level == indexinput && stats_gameover == false) {
      player_play = false;
      choosenColour.length = 0;
      indexinput = 0;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

function game() {
  if (stats_gameover == true) {
    $("#man_start").hide();
    stats_gameover = false;
    $(".image-lose").hide();
    nextSequence();
  } else {
    $("#man_start").hide();
    $("h1").html("Are you ready !");
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function loser() {
  if (stats_gameover == false) {
    $(".image-lose").hide();
  } else if (stats_gameover == true) {
    $(".image-lose").show();
  }
}


function nextSequence() {
  level++;
  $("h1").html("Level " + level);
  var randomNumbers = Math.floor(Math.random() * 4);
  generatedColour.push(arrayColour[randomNumbers]);
  $("." + arrayColour[randomNumbers]).fadeOut(100);
  $("." + arrayColour[randomNumbers]).fadeIn(100);
  player_play = true;
}
