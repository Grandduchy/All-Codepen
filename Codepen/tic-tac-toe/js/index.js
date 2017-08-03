$(document).ready(function() {
  var playerChoice = "",computerChoice = "",playerTurn = true, computerFirstTurn = true,
      boardEntries = [],boardValues = [],
      computerPosition,computerStrategy,blockingStrategy,winStrategy,
      playerWins = 0, computerWins = 0;

var board = {
	topLeft : null,        topMiddle : null,        topRight : null,
	middleLeft : null,     middleMiddle : null,     middleRight : null,
	bottomLeft : null,     bottomMiddle : null,     bottomRight : null
};
  function resetGame () {
	  
    board = {
  topLeft : null,        topMiddle : null,        topRight : null,
	middleLeft : null,     middleMiddle : null,     middleRight : null,
	bottomLeft : null,     bottomMiddle : null,     bottomRight : null
    }
    for (var x in board) {
      $("#boxes").find("#" + x).empty();
    }
      playerChoice = "",
        computerChoice = "",
        playerTurn = true,
        computerFirstTurn = true,
        boardEntries = [],
        boardValues = [],
        computerPosition = undefined,
        computerStrategy = undefined,
        blockingStrategy = undefined,
        winStrategy = undefined;
        $(".wrapper").css("display","none");
        $(".choose").css("display","block");
  }
  function checkBoard(){
    boardEntries = [];
    boardValues = [];
    for (var x in board) {
      boardEntries.push(x);
      boardValues.push(board[x]);
    }
  }
  checkBoard();
  
  function playRandom () {
    return boardEntries[Math.floor(Math.random()*10)];
  }
  var randomPlay = playRandom();
  
  function X_or_O () {
     if (playerChoice == "X") {
      playerTurn = true;
      computerChoice = "O";
    }
    else {
      playerTurn = false;
      computerChoice ="X";
    }
  }// X_or_O
  
    function canBlock () {
      //-----checking horizontal------//
      if ( (board["topLeft"] == playerChoice && board["topMiddle"] == playerChoice && board["topRight"] == null) ||
          (board["topMiddle"] == playerChoice && board["topRight"] == playerChoice && board["topLeft"] == null) ||
          (board["topLeft"] == playerChoice && board["topRight"] == playerChoice && board["topMiddle"] == null) ) {
        blockingStrategy = ["topLeft","topMiddle","topRight"];
        return true;
      }
      else if  ( (board["middleLeft"] == playerChoice && board["middleMiddle"] == playerChoice && board["middleRight"] == null)||
                (board["middleMiddle"] == playerChoice && board["middleRight"] == playerChoice && board["middleLeft"] == null)||
                (board["middleLeft"] == playerChoice && board["middleRight"] == playerChoice && board["middleMiddle"] == null) ) {
        blockingStrategy = ["middleLeft","middleMiddle","middleRight"];
        return true;
      } 
      else if ( (board["bottomLeft"] == playerChoice && board["bottomMiddle"] == playerChoice && board["bottomRight"] == null)||
               (board["bottomMiddle"] == playerChoice && board["bottomRight"] == playerChoice && board["bottomLeft"] == null) ||
               (board["bottomLeft"] == playerChoice && board["bottomRight"] == playerChoice) && board["bottomMiddle"] == null) {
        blockingStrategy = ["bottomLeft", "bottomMiddle","bottomRight"];
        return true;
      }
      //-------checking vertical ----//
      else if ( (board["topLeft"] == playerChoice && board["middleLeft"] == playerChoice && board["bottomLeft"] == null)||
               ( board["middleLeft"] == playerChoice && board["bottomLeft"] == playerChoice && board["topLeft"] == null) ||
               (board["topLeft"] == playerChoice && board["bottomLeft"] == playerChoice && board["middleLeft"] == null) ) {
        blockingStrategy = ["topLeft","middleLeft","bottomLeft"];
        return true;
      }
      else if ( (board["topMiddle"] == playerChoice && board["middleMiddle"] == playerChoice && board["bottomMiddle"] == null)||
               ( board["middleMiddle"] == playerChoice && board["bottomMiddle"] == playerChoice && board["topMiddle"] == null) ||
               (board["topMiddle"] == playerChoice && board["bottomMiddle"] == playerChoice && board["middleMiddle"] == null) ) {
        blockingStrategy = ["topMiddle","middleMiddle","bottomMiddle"];
        return true;
      }
      else if ( (board["topRight"] == playerChoice && board["middleRight"] == playerChoice && board["bottomRight"] == null) ||
               (board["middleRight"] == playerChoice && board["bottomRight"] == playerChoice && board["topRight"] == null) ||
               (board["topRight"] == playerChoice && board["bottomRight"] == playerChoice && board["middleRight"] == null)) {
        blockingStrategy = ["topRight","middleRight","bottomRight"];
        return true;
      }
      //-----checking diagonal ----//
      else if ( (board["topLeft"] == playerChoice && board["middleMiddle"] == playerChoice && board["bottomRight"] == null)||
               (board["middleMiddle"] == playerChoice && board["bottomRight"] == playerChoice && board["topLeft"] == null) ||
               (board["topLeft"] == playerChoice && board["bottomRight"] == playerChoice && board["middleMiddle"] == null)) {
        blockingStrategy = ["topLeft","middleMiddle","bottomRight"];
        return true;
      }
      else if ( (board["topRight"] == playerChoice && board["middleMiddle"] == playerChoice && board["bottomLeft"] == null) ||
               (board["middleMiddle"] == playerChoice && board["bottomLeft"] == playerChoice && board["topRight"] == null) ||
               (board["topRight"] == playerChoice && board["bottomLeft"] == playerChoice) && board["middleMiddle"]== null) {
        blockingStrategy = ["topRight","middleMiddle","bottomLeft"];
        return true;
      }
      else {
        return false;
      }
    }
    
    function canWin() {
      if ( (board["topLeft"] == computerChoice && board["topMiddle"] == computerChoice && board["topRight"] == null) ||
          (board["topMiddle"] == computerChoice && board["topRight"] == computerChoice && board["topLeft"] == null) ||
          (board["topLeft"] == computerChoice && board["topRight"] == computerChoice && board["topMiddle"] == null) ) {
        winStrategy = ["topLeft","topMiddle","topRight"];
        return true;
      }
      else if  ( (board["middleLeft"] == computerChoice && board["middleMiddle"] == computerChoice && board["middleRight"] == null)||
                (board["middleMiddle"] == computerChoice && board["middleRight"] == computerChoice && board["middleLeft"] == null)||
                (board["middleLeft"] == computerChoice && board["middleRight"] == computerChoice && board["middleMiddle"] == null) ) {
        winStrategy = ["middleLeft","middleMiddle","middleRight"];
        return true;
      } 
      else if ( (board["bottomLeft"] == computerChoice && board["bottomMiddle"] == computerChoice && board["bottomRight"] == null)||
               (board["bottomMiddle"] == computerChoice && board["bottomRight"] == computerChoice && board["bottomLeft"] == null) ||
               (board["bottomLeft"] == computerChoice && board["bottomRight"] == computerChoice) && board["bottomMiddle"] == null) {
        winStrategy = ["bottomLeft", "bottomMiddle","bottomRight"];
        return true;
      }
      //-------checking vertical ----//
      else if ( (board["topLeft"] == computerChoice && board["middleLeft"] == computerChoice && board["bottomLeft"] == null)||
               ( board["middleLeft"] == computerChoice && board["bottomLeft"] == computerChoice && board["topLeft"] == null) ||
               (board["topLeft"] == computerChoice && board["bottomLeft"] == computerChoice && board["middleLeft"] == null) ) {
        winStrategy = ["topLeft","middleLeft","bottomLeft"];
        return true;
      }
      else if ( (board["topMiddle"] == computerChoice && board["middleMiddle"] == computerChoice && board["bottomMiddle"] == null)||
               ( board["middleMiddle"] == computerChoice && board["bottomMiddle"] == computerChoice && board["topMiddle"] == null) ||
               (board["topMiddle"] == computerChoice && board["bottomMiddle"] == computerChoice && board["middleMiddle"] == null) ) {
        winStrategy = ["topMiddle","middleMiddle","bottomMiddle"];
        return true;
      }
      else if ( (board["topRight"] == computerChoice && board["middleRight"] == computerChoice && board["bottomRight"] == null) ||
               (board["middleRight"] == computerChoice && board["bottomRight"] == computerChoice && board["topRight"] == null) ||
               (board["topRight"] == computerChoice && board["bottomRight"] == computerChoice && board["middleRight"] == null)) {
        winStrategy = ["topRight","middleRight","bottomRight"];
        return true;
      }
      //-----checking diagonal ----//
      else if ( (board["topLeft"] == computerChoice && board["middleMiddle"] == computerChoice && board["bottomRight"] == null)||
               (board["middleMiddle"] == computerChoice && board["bottomRight"] == computerChoice && board["topLeft"] == null) ||
               (board["topLeft"] == computerChoice && board["bottomRight"] == computerChoice && board["middleMiddle"] == null)) {
        winStrategy = ["topLeft","middleMiddle","bottomRight"];
        return true;
      }
      else if ( (board["topRight"] == computerChoice && board["middleMiddle"] == computerChoice && board["bottomLeft"] == null) ||
               (board["middleMiddle"] == computerChoice && board["bottomLeft"] == computerChoice && board["topRight"] == null) ||
               (board["topRight"] == computerChoice && board["bottomLeft"] == computerChoice) && board["middleMiddle"]== null) {
        winStrategy = ["topRight","middleMiddle","bottomLeft"];
        return true;
      }
      else {
        return false;
      }
    }
  
    function didPlayerWin() {
      ////--------------horizontal------////
      if (board["topLeft"] == playerChoice && board["topMiddle"] == playerChoice && board["topRight"] == playerChoice) {
        return true;
      }
      else if (board["middleLeft"] == playerChoice && board["middleMiddle"] == playerChoice && board["middleRight"] == playerChoice) {
        return true;
      }
      else if (board["bottomLeft"] == playerChoice && board["bottomMiddle"] == playerChoice && board["bottomRight"] == playerChoice) {
        return true;
      }
      ////---------vertical--------///
      if (board["topLeft"] == playerChoice && board["middleLeft"] == playerChoice && board["bottomLeft"] == playerChoice) {
        return true;
      }
      else if (board["topMiddle"] == playerChoice && board["middleMiddle"] == playerChoice && board["bottomMiddle"] == playerChoice) {
        return true;
      }
      else if (board["topRight"] == playerChoice && board["middleRight"] == playerChoice && board["bottomRight"] == playerChoice) {
        return true;
      }
      ////---------Diagonal ------//
      else if (board["bottomLeft"] == playerChoice && board["middleMiddle"] == playerChoice && board["topRight"] == playerChoice) {
        return true;
      }
      else if (board["topLeft"] == playerChoice && board["middleMiddle"] == playerChoice && board["bottomRight"] == playerChoice) {
        return true;
      }
      else {
        return false;
      }
    }
    function didComputerWin () {
      var hasWon = true;
      counter = 0;
      for (var x of computerStrategy) {//computer wins 
        counter++;
         if (board[x] !== computerChoice) {
              hasWon = false;
           }
        }
            
       if (hasWon) {
         alert(computerChoice + " has won!")
         resetGame();
		 randomPlay = playRandom();
         computerWins++;
         $(".scoreboard").html("<p>Player - "+playerWins+" Computer - "+computerWins+"</p>")
      }
      else {
        return;
      }
    }
    function computerBlocked () {
      if (!!computerStrategy) {
        for (var x of computerStrategy) {
          if (board[x] === playerChoice)
            return true;
        }
        return false;
      }
      else {
        return false;
      }
    }
    function draw() {
      for (var x in board) {
        if (board[x] == null)
          return false;
      }
      return true;
    }
  
    function computerPlay () {
      checkBoard();
    if (computerFirstTurn && board[randomPlay] === null) { //if player chooses O on beginning screen
        computerFirstTurn = false;
        $("#boxes").find("#"+randomPlay).html("<h2 class = 'text-center'>" + computerChoice + "</h2>");
      playerTurn = true;
      board[randomPlay] = computerChoice;
      
    }
    else if (computerFirstTurn && board[randomPlay] !== null) { // if player goes first but random makes the computer choose the player's square
        randomPlay = playRandom();
        return computerPlay();
    }
        else {//run strategy

          if ( computerBlocked() && computerStrategy !== undefined) {
            computerStrategy = undefined;
            return computerPlay();
          }
          
          if (canWin() ) {
            computerStrategy = winStrategy;
          }
          else if (canBlock() ) {//check if computer can block player
            computerStrategy = blockingStrategy;
          }
          
          else if (computerStrategy === undefined){
            checkBoard();
            var horizontal = true,counter = 0,horizontalEntries;
            //----------- Horizontal -----------------//
            function checkHorizontal () {
              horizontalEntries = boardEntries.filter(function(value) {
                if (counter == 0 && /^top/.test(value)) {
                    return true;
                }
                else if (counter == 1 && /^middle/.test(value)) {
                  return true;
                }
                else if (counter == 2 && /^bottom/.test(value)){
                  return true;
                }
                else {
                  return false
                }
              });
              counter++;
              return horizontalEntries;
            }
            checkHorizontal();
           (function checkHorizontalLineForPlayer () {
            for (var x of horizontalEntries) {
              if (board[x] === playerChoice) {
                horizontal = false;
                if (counter < 3) {
                  checkHorizontal();
                    return checkHorizontalLineForPlayer();
                }
              }
              else if (x == horizontalEntries[2]){
                horizontal = true;
                break;
              }
            }
             
           })();
          //--------------Horizontal End-----------//
            counter = 0;
            var vertical = true,verticalEntries = [];
          //--------------Vertical ---------------//
            function checkVertical() {
               verticalEntries = boardEntries.filter(function(value) {
                if (counter == 0 && /Left$/.test(value)) {
                    return true;
                }
                else if (counter == 1 && /Middle$/.test(value)) {
                  return true;
                }
                else if (counter == 2 && /Right$/.test(value)){
                  return true;
                }
                else {
                  return false
                }
              });
              counter++;
              return verticalEntries;
            }
            checkVertical();
            (function checkVerticalLineForPlayer() {
              for (var x of verticalEntries) {
                if (board[x] === playerChoice) {
                  vertical = false;
                  if (counter < 3) {
                    checkVertical();
                      return checkVerticalLineForPlayer();
                  }
                }
                else if (x == verticalEntries[x]){
                  vertical = true;
                }
              }
            })();
            //-----------Vertical End ---------//
            counter = 0;
            var diagonal = true,diagonalEntries;
            //----------Diagonal-------------//
            function checkDiagonal () {
              if (counter === 0) {
                diagonalEntries = ["topLeft","middleMiddle","bottomRight"];
              }
              else {
                diagonalEntries = ["topRight","middleMiddle","bottomLeft"];
              }
              counter++;
            }
            checkDiagonal();
            (function checkDiagonalForPlayer() {
              for (var x of diagonalEntries) {
                if (board[x] == playerChoice) {
                  diagonal = false;
                    if (counter<=1) {
                      checkDiagonal();
                      return checkDiagonalForPlayer();
                    }
                }
                /*else {
                  diagonal = true;
                  break;
                }*/
              }
            })();
            //-------Diagonal End--------//
            counter = 0;
            var computerGoodMove = false;
            //Now check what move is best to do since we have all available strategies.
           function checkEntries() {
              if (diagonal||vertical||horizontal) {
                 if (diagonal && counter == 0)
                   checkComputerBestMove(diagonal,diagonalEntries);
                else if (vertical && counter == 1)
                  checkComputerBestMove(vertical,verticalEntries);
                else
                  checkComputerBestMove(horizontal,horizontalEntries);
              }
             counter++;
            }
            function checkComputerBestMove (typeOfStrat, stratEntries) {
              for (var x of stratEntries) {
                if (board[x] == computerChoice) {
                  computerGoodMove = stratEntries;
                  break;
                }
              }
              if (counter <2) {
                counter++;
                return checkEntries();
              }
            }
            checkEntries();
            if (!computerGoodMove) {
              if (diagonal) 
                computerGoodMove = diagonalEntries;
              else if (horizontal)
                computerGoodMove = horizontalEntries;
              else if (vertical)
                computerGoodMove = verticalEntries;
            }
            if (!computerGoodMove) {
              for (var x in board) {
                if (board[x] === null) {
                  computerGoodMove = "random";
                } 
              }
            }
            computerStrategy = computerGoodMove;
          }//computerstrategy = undefined
          
          playerTurn = true;
          if (typeof computerStrategy != "string") {
            for (var x of computerStrategy ) {
              if (board[x] == null) {
                $("#boxes").find("#"+x).html("<h2 class = 'text-center'>" + computerChoice + "</h2>");
                board[x] = computerChoice;
                setTimeout(function() {
                  didComputerWin();
                },500)
                if (draw() ) {
					resetGame();
					randomPlay = playRandom();
                  setTimeout(function() {
                    alert("Draw!");
                  },500)
                }
                return;
              }
            }
          }
          else {
            for (var x in board) {//changed from x of to x in
              if (board[x] == null) {
                computerPosition = x;
                board[x] = computerChoice;
                break;
              }
            }
            $("#boxes").find("#"+computerPosition).html("<h2 class = 'text-center'>" + computerChoice + "</h2>");
            setTimeout(function() {
              didComputerWin();
            },500)
            
            if (draw() ) {
				alert("Draw!");
                setTimeout(function() {
					resetGame();
					randomPlay = playRandom();
                },500)
             }
          }
          
          
        }//run strategy
        //blockingStrategy -- typeof computerStrategy check if string, then random.
      
    
  }//function computerplay()
  $("#reset").click(function() {
    resetGame();
	randomPlay = playRandom();
  });
  $(".start").find("button").click(function() {
    playerChoice = $(this).text();
    X_or_O();
    $(".wrapper").css("display","inline");
    $(".choose").css("display","none");
    if (playerChoice == "O") {
      setTimeout(function() {
        computerPlay();
      },500)
    }
  });

  $("#boxes").find(".box").click(function() {
    if (playerTurn && board[$(this).attr("id")] === null) {
      $(this).html("<h2 class = 'text-center'>"+playerChoice+"</h2>");
      board[$(this).attr("id")] = playerChoice;
      playerTurn = false;
      
      if (draw() ) {
        alert("Draw!")
        setTimeout(function() {
          resetGame();
		  randomPlay = playRandom();
        },500);
      }
      
      else if (didPlayerWin() == false) {
        setTimeout(function() {
          computerPlay()
          },500)
        }
      
      else {
        alert(playerChoice + " has won!");
        playerWins++;
        $(".scoreboard").html("<p>Player - "+playerWins+" Computer - "+computerWins+"</p>")
        setTimeout(function() {
          resetGame();
		  randomPlay = playRandom();
        },500)
      }
    }
  });
  });