Game = function() {
  this.id;
  this.qtdPlayers;
  this.boardSize;
  this.boardsCounter;
  this.tips;  
  this.boards = new Array();
  this.players = new Array();

  this.init = function() {
    this.createPlayers();
    this.resetPlayersPoints();
    this.createNewBoard();
    this.selectPlayerStart();
  }
  this.createNewBoard = function() {
    this.boards.push(new Boards());
    currentBoard = this.getCurrentBoard()
    currentBoard.setId(this.getBoardsCounter());
    currentBoard.setSize(this.getBoardSize());    
    currentBoard.setWinnerId(null);
    currentBoard.setClassName("boards");
    currentBoard.setStyleMargin("auto");
    currentBoard.setStyleBorderCollapse("collapse");
    currentBoard.dimensionate(350);
    currentBoard.init();
    this.changePlayerTurn();
  }
  this.createPlayers = function() {
    do {
      this.players.push(new Players());
      currentPlayer = this.players[this.players.length - 1]
      currentPlayer.setId(this.players.length - 1);
      currentPlayer.setMyTurn(false);
      switch (this.players.length) {
        case 1:
          selectedSymbol = 'X';
          break;
        case 2:
          selectedSymbol = 'O';
          break;
        default:
          selectedSymbol = String.fromCharCode(Math.ceil((Math.random() * 26) + 65));
          usedSymbols = new Array();
          this.players.forEach(function(player) {
            usedSymbols.push(player.getSymbol());
          });
          while (usedSymbols.includes(selectedSymbol)) {
            selectedSymbol = String.fromCharCode(Math.ceil((Math.random() * 26) + 65));
          }
      }
      currentPlayer.setSymbol(selectedSymbol);
    } while (this.players.length < this.getQtdPlayers())
  }
  this.resetPlayersPoints = function() {
    this.players.forEach(function(player) {
      player.resetPoints();
    })
  }
  this.selectPlayerStart = function() {
    playerTurn = this.boardsCounter % this.qtdPlayers;
    this.players[playerTurn].setMyTurn(true);
  }
  this.getCurrentPlayer = function() {
    return this.players.filter(function(player) {
      return player.getMyTurn();
    })[0]
  }
  this.changePlayerTurn = function() {
    playerTurn = this.getBoardsCounter() + this.getCurrentBoard().getMovements();
    playerTurn = playerTurn % this.getQtdPlayers();
    this.players.forEach(function(player) {
      player.setMyTurn(false);    })
    this.players[playerTurn].setMyTurn(true);
  }
  this.tryMovement = function(lineId, columnId) {
    currentBoard = this.getCurrentBoard();
    if (currentBoard.getWinnerId() == null) {
      isFilled = currentBoard.lines[lineId].columns[columnId].getFilled();
      if (!isFilled) {
        return true;
      }
    }
  }
  this.checkVictory = function(lineId, columnId) {
    currentBoard = this.getCurrentBoard();
    currentPlayer = this.getCurrentPlayer();
    currentSymbol = currentPlayer.getSymbol();
    result = currentBoard.checkVictorySequence(currentSymbol, lineId, columnId, 0);
    if (result) {
      currentBoard.setWinnerId(currentPlayer.getId());
      currentPlayer.setVictoryBoards(currentBoard.getId());
      alert("Vitória do jogador: " + currentPlayer.getSymbol());
    }
    return result;
  }
  this.setId = function(id) {
    this.id = id;
  }
  this.setQtdPlayers = function(qtdPlayers) {
    this.qtdPlayers = qtdPlayers;
  }  
  this.setBoardSize = function(boardSize) {
    this.boardSize = boardSize;
  }
  this.setBoardsCounter = function(boardsCounter) {
    this.boardsCounter = boardsCounter;
  }
  this.setTips = function(tips) {
    this.tips = tips;
  }
  this.getId = function() {
    return this.id;
  }
  this.getQtdPlayers = function() {
    return this.qtdPlayers;
  }
  this.getBoardSize = function() {
    return this.boardSize;
  }
  this.getBoardsCounter = function() {
    return this.boardsCounter;
  }
  this.getTips = function() {
    return this.tips;
  }
  this.getCurrentBoard = function() {
    return this.boards[this.boards.length - 1]
  }
}

Boards = function() {
	this.id;
  this.size;
  this.dimension;
  this.winnerId;
  this.movements;
  this.className;
  this.styleMargin;
  this.styleBorderCollapse;
  this.styleWidth;
  this.styleHeight;
  this.styleFontSize;
  this.lines = new Array();
	this.init = function() {
		do {
      this.setMovements(0);
			this.lines.push(new Lines());
      currentLine = this.lines[this.lines.length - 1]
      currentLine.setId(this.lines.length - 1);
      currentLine.setClassName("lines");
      currentLine.setSize(this.getSize());
      styleHeight = parseInt(100 / this.getSize());
      currentLine.setStyleHeight(String(styleHeight) + "%");
			currentLine.init();
		} while (this.lines.length < this.getSize())
    this.drawColumnsBorders(this);
	}
  this.drawColumnsBorders = function(board) {
    board.lines.forEach(function(line) {
      line.columns.forEach(function(column) {
        if (board.getSize() == 0) {
          column.setStyleBorderWidth("3px");
        } 
        else if (line.getId() == 0) {
          if (column.getId() == 0) {
            column.setStyleBorderWidth("0 3px 3px 0");
          }
          else if ((column.getId() + 1) == board.getSize()) {
            column.setStyleBorderWidth("0 0 3px 3px"  );
          }          
          else if (column.getId() != 0 && (column.getId() + 1) != board.getSize()) {
            column.setStyleBorderWidth("0 3px 3px 3px");
          }
          
        }
        else if ((line.getId() + 1) == board.getSize()) {
          if (column.getId() == 0) {
            column.setStyleBorderWidth("3px 3px 0 0");
          }
          else if ((column.getId() + 1) == board.getSize()) {
            column.setStyleBorderWidth("3px 0 0 3px");
          }          
          else if (column.getId() != 0 && (column.getId() + 1) != board.getSize()) {
            column.setStyleBorderWidth("3px 3px 0 3px");
          }          
        }
        else if (line.getId() != 0 && (line.getId() + 1) != board.getSize()) {
          if (column.getId() == 0) {
            column.setStyleBorderWidth("3px 3px 3px 0");
          }
          else if ((column.getId() + 1) == board.getSize()) {
            column.setStyleBorderWidth("3px 0 3px 3px"  );
          }          
          else if (column.getId() != 0 && (column.getId() + 1) != board.getSize()) {
            column.setStyleBorderWidth("3px");
          }          
        }
      })
    })
  }
  this.checkVictorySequence = function(currentSymbol, lineId, columnId, level, direction = null) {
    victory = false;
    neighborSymbols = new Array();
    (lineId - level > 0 && columnId - level > 0 && [null, 0].includes(direction)) ? neighborSymbols.push(this.lines[lineId - level - 1].columns[columnId - level - 1].getFilled()) : neighborSymbols.push(null);
    (lineId - level > 0 && [null, 1].includes(direction)) ? neighborSymbols.push(this.lines[lineId - level - 1].columns[columnId].getFilled()) : neighborSymbols.push(null);
    (lineId - level > 0 && columnId + level < this.getSize() - 1 && [null, 2].includes(direction)) ? neighborSymbols.push(this.lines[lineId - level - 1].columns[columnId + level + 1].getFilled()) : neighborSymbols.push(null);    
    (columnId + level < this.getSize() - 1 && [null, 3].includes(direction)) ? neighborSymbols.push(this.lines[lineId].columns[columnId + level + 1].getFilled()) : neighborSymbols.push(null);
    (lineId + level < this.getSize() - 1  && columnId + level < this.getSize() - 1 && [null, 4].includes(direction)) ? neighborSymbols.push(this.lines[lineId + level + 1].columns[columnId + level + 1].getFilled()) : neighborSymbols.push(null);
    (lineId + level < this.getSize() - 1  && [null, 5].includes(direction)) ? neighborSymbols.push(this.lines[lineId + level + 1].columns[columnId].getFilled()) : neighborSymbols.push(null);
    (lineId + level < this.getSize() - 1  && columnId - level > 0 && [null, 6].includes(direction)) ? neighborSymbols.push(this.lines[lineId + level + 1].columns[columnId - level - 1].getFilled()) : neighborSymbols.push(null);
    (columnId - level > 0 && [null, 7].includes(direction)) ? neighborSymbols.push(this.lines[lineId].columns[columnId - level - 1].getFilled()) : neighborSymbols.push(null);
    if (level == 0) {
      self = this;
      for (index = 0; index < neighborSymbols.length; index++) {
        if (currentSymbol == neighborSymbols[index]) {
          reverseIndex = index + 4;
          if (index > 3) { reverseIndex = reverseIndex % 4;  }
          if (currentSymbol == neighborSymbols[reverseIndex]) {
            victory = true;
          }
          else {
            victory = self.checkVictorySequence(currentSymbol, lineId, columnId, level + 1, index);
          }
        }
        if (victory) { break; }
      }
    }  
    else {
      victory = neighborSymbols.includes(currentSymbol);
      }
    return victory;
  }
  this.dimensionate = function(newDimension) {
    currentBoard.setDimension(newDimension);
    currentBoard.setStyleWidth(String(currentBoard.getDimension()) + 'px');
    currentBoard.setStyleHeight(String(currentBoard.getDimension()) + 'px');
    fontSize = (currentBoard.getDimension() * ((0.75 - currentBoard.getSize() / 100) / currentBoard.getSize())).toFixed(2);
    if (currentBoard.getStyleFontSize() != undefined) { fontSize = fontSize - 3}
    currentBoard.setStyleFontSize(String(fontSize) + 'px');
  }
	this.setQtdPlayers = function(qtdPlayers) {
		this.qtdPlayers = qtdPlayers;
	}	
	this.setId = function(id) {
		this.id = id;
	}
  this.setSize = function(size) {
    this.size = size;
  }
  this.setDimension = function(dimension) {
    this.dimension = dimension;
  }
  this.setWinnerId = function(winnerId) {
    this.winnerId = winnerId;
  }
  this.setMovements = function(movements) {
    this.movements = movements;
  }
  this.setClassName = function(className) {
    this.className = className;
  }
  this.setStyleMargin = function(styleMargin) {
    this.styleMargin = styleMargin;
  }
  this.setStyleBorderCollapse = function(styleBorderCollapse) {
    this.styleBorderCollapse = styleBorderCollapse;
  }
  this.setStyleWidth = function(styleWidth) {
    this.styleWidth = styleWidth;
  }
  this.setStyleHeight = function(styleHeight) {
    this.styleHeight = styleHeight;
  }
  this.setStyleFontSize = function(styleFontSize) {
    this.styleFontSize = styleFontSize;
  }
  this.getId = function() {
    return this.id;
  }
  this.getSize = function() {
    return this.size;
  }
  this.getDimension = function() {
    return this.dimension;
  }
	this.getWinnerId = function() {
		return this.winnerId;
	}
  this.getMovements = function() {
    return this.movements;
  }
  this.getClassName = function() {
    return this.className;
  }
  this.getStyleMargin = function() {
    return this.styleMargin;
  }
  this.getStyleBorderCollapse = function() {
    return this.styleBorderCollapse;
  }
  this.getStyleWidth = function() {
    return this.styleWidth;
  }
  this.getStyleHeight = function() {
    return this.styleHeight;
  }
  this.getStyleFontSize = function() {
    return this.styleFontSize;
  }
}

Lines = function() {
	this.id;
  this.size;
  this.className;
  this.styleHeight;
  this.columns = new Array();

	this.init = function() {
		do {
			this.columns.push(new Columns());
      currentColumn = this.columns[this.columns.length - 1]
      currentColumn.setId(this.columns.length - 1);
      currentColumn.setClassName("columns");
      styleWidth = parseInt(100 / this.getSize());
      currentColumn.setStyleWidth(String(styleWidth) + "%");
      currentColumn.setStyleBorder("solid black");
      currentColumn.setEventListener("move");
      currentColumn.setFilled('');

		} while (this.columns.length < this.getSize());
	}
	this.setId = function(id) {
    this.id = id;
  }
  this.setSize = function(size) {
    this.size = size;
  }
  this.setClassName = function(className) {
    this.className = className;
  }
  this.setStyleHeight = function(styleHeight) {
    this.styleHeight = styleHeight;
  }
  this.getId = function() {
    return this.id;
  }
  this.getSize = function() {
    return this.size;
  }
  this.getClassName = function() {
    return this.className;
  }
  this.getStyleHeight = function() {
    return this.styleHeight;
  }
}

Columns = function() {
  this.id;
  this.className;
  this.styleWidth;
  this.styleBorder;
  this.styleBorderWidth;
  this.eventListener;
	this.filled;
  this.setId = function(id) {
    this.id = id;
  }
  this.setClassName = function(className) {
    this.className = className;
  }
  this.setStyleWidth = function(styleWidth) {
    this.styleWidth = styleWidth;
  }
  this.setStyleBorder = function(styleBorder) {
    this.styleBorder = styleBorder;
  }
  this.setStyleBorderWidth = function(styleBorderWidth) {
     this.styleBorderWidth = styleBorderWidth;
  }
  this.setEventListener = function(eventListener) {
    this.eventListener = eventListener;
  }
  this.setFilled = function(filled) {
    this.filled = filled;
  }
  this.getId = function() {
    return this.id;
  }
  this.getClassName = function() {
    return this.className;
  }
  this.getStyleWidth = function() {
    return this.styleWidth;
  }
  this.getStyleBorder = function() {
    return this.styleBorder;
  }
  this.getStyleBorderWidth = function() {
    return this.styleBorderWidth;
  }
  this.getEventListener = function() {
    return this.eventListener;
  }
  this.getFilled = function() {
    return this.filled;
  }
}

Players = function() {
  this.id;
  this.myTurn;
	this.victoryBoards = new Array();
	this.symbol;

  this.resetPoints = function() {
     this.victoryBoards = new Array();
  }
  this.setId = function(id) {
    this.id = id;
  }
  this.setMyTurn = function(myTurn) {
    this.myTurn = myTurn;
  }
	this.setSymbol = function(symbol) {
		this.symbol = symbol;
	}
	this.setVictoryBoards = function(victoryBoard) {
		this.victoryBoards.push(victoryBoard)
	}
  this.getId = function() {
    return this.id;
  }
  this.getMyTurn = function() {
    return this.myTurn;
  }
	this.getSymbol = function() {
		return this.symbol;
	}
	this.getVictoryBoards = function() {
		return this.victoryBoards;
	}
}

Elements = function() {

  this.createBoardElement = function(boards, events = true) {

    currentBoard = boards[boards.length - 1]

    elementTable = document.createElement("table");
    elementTable.id = "board" + currentBoard.getId();
    elementTable.className = currentBoard.getClassName();
    elementTable.style.margin = currentBoard.getStyleMargin();
    elementTable.style.borderCollapse = currentBoard.getStyleBorderCollapse();
    elementTable.style.fontSize = currentBoard.getStyleFontSize();
    elementTable.style.width = currentBoard.getStyleWidth();
    elementTable.style.height = currentBoard.getStyleHeight();

    currentBoard.lines.forEach(function(line) {

      elementLine = document.createElement("tr");
      elementLine.id = "line" + line.getId()
      elementLine.className = line.getClassName();
      elementLine.style.height = line.getStyleHeight();
      elementLine.style.maxHeight = line.getStyleHeight();

      line.columns.forEach(function(column) {

        elementColumn = document.createElement("td");
        elementColumn.id = "column" + column.getId();
        elementColumn.className = column.getClassName();
        elementColumn.style.width = column.getStyleWidth();
        elementColumn.style.border = column.getStyleBorder();
        elementColumn.style.borderWidth = column.getStyleBorderWidth();
        elementColumn.innerHTML = column.getFilled();
        if (events) {
          elementColumn.addEventListener("click", Movement);
          elementColumn.addEventListener("mouseenter", Premovement);
          elementColumn.addEventListener("mouseleave", Premovement);
        }
        elementLine.append(elementColumn);

      })

      elementTable.append(elementLine);

    })

    return elementTable;
  }

  this.createScoreElement = function(players) {

    elementScore = document.createElement("dl");
    elementScore.className = "Score";

    players.forEach(function(player,index1) {

      elementPlayer = document.createElement("dt");
      elementPlayer.id = "player" + index1;
      elementPlayer.innerHTML = "Jogador " + player.getSymbol() + " = " + player.getVictoryBoards().length;

      elementScore.append(elementPlayer);

    });

    return elementScore;
  }

}

Start = function() {

	qtdLines = document.getElementById("qtdLines");
  qtdLines.readOnly = true;
  qtdLines.disabled = true;
	qtdLines = parseInt(qtdLines.value);

	qtdPlayers = document.getElementById("qtdPlayers");
  qtdPlayers.readOnly = true;
  qtdPlayers.disabled = true;
	qtdPlayers = parseInt(qtdPlayers.value);

  containerBoards = document.getElementById("containerBoards");
  qtdBoards = containerBoards.childElementCount;

	containerHistories = document.getElementById("containerHistories");
  qtdBoardsHistory = containerHistories.childElementCount;

  containerScores = document.getElementById("containerScores");
  qtdScores = containerScores.childElementCount;

  boardsCounter = qtdBoardsHistory + qtdBoards

  if (boardsCounter == 0) {

    document.getElementById("containerScores").innerHTML = '';
    document.getElementById("containerHistories").innerHTML = '';
    document.getElementById("containerBoards").innerHTML = '';
    
    game = new Game();
    game.setId(qtdScores);
    game.setBoardSize(qtdLines);
    game.setQtdPlayers(qtdPlayers);
    game.setBoardsCounter(boardsCounter);
    currentBoard = game.getCurrentBoard();

    game.init();

    elements = new Elements();

    boardElement = elements.createBoardElement(game.boards);
    scoreElement = elements.createScoreElement(game.players);

    document.getElementById("containerScores").append(scoreElement);
    document.getElementById("containerBoards").append(boardElement);

  } else {
    game.setBoardsCounter(boardsCounter);
    currentBoard = game.getCurrentBoard();
    currentBoard.dimensionate(100);
    currentBoard.setStyleMargin('8px');

    currentBoard = elements.createBoardElement(game.boards, false);
    document.getElementById("containerHistories").append(currentBoard);
    
    containerBoards.innerHTML = '';

    game.createNewBoard();
    newBoardElement = elements.createBoardElement(game.boards);
    document.getElementById("containerBoards").append(newBoardElement);
  }

}

ResetPoints = function () {

  game.resetPlayersPoints();
  document.getElementById("containerScores").innerHTML = '';
  scoreElement = elements.createScoreElement(game.players);
  document.getElementById("containerScores").append(scoreElement);


}

ResetAll = function () {

  document.getElementById("qtdPlayers").readOnly = false;
  document.getElementById("qtdPlayers").disabled = false;
  document.getElementById("qtdLines").readOnly = false;
  document.getElementById("qtdLines").disabled = false;
  document.getElementById("containerBoards").innerHTML = '';
  document.getElementById("containerScores").innerHTML = '';
  document.getElementById("containerHistories").innerHTML = '';

}

Movement = function(e) {

  lineId = e.target.parentNode.id;
  lineId = parseInt(lineId.slice(4));
  columnId = e.target.id;
  columnId = parseInt(columnId.slice(6));

  currentBoard = game.getCurrentBoard();
  currentPlayer = game.getCurrentPlayer();
  
  isValid = game.tryMovement(lineId, columnId);

  if (isValid) {
    symbol = currentPlayer.getSymbol();
    e.target.innerHTML = symbol;
    e.target.style.opacity = '1';
    movements = currentBoard.getMovements();
    currentBoard.setMovements(movements + 1);
    currentBoard.lines[lineId].columns[columnId].setFilled(symbol);
    victory = game.checkVictory(lineId, columnId);
    if (!victory) {
      game.changePlayerTurn();
      if (currentBoard.getMovements() >= (currentBoard.getSize() ** 2)) {
      alert("Velha - Empate");
      }
    }
    else {
      document.getElementById("containerScores").innerHTML = '';
      scoreElement = elements.createScoreElement(game.players);
      document.getElementById("containerScores").append(scoreElement);
    }
  }
  else {
    if (currentBoard.getWinnerId() != null) {
      currentPlayer = game.getCurrentPlayer();
      alert("O jogo já foi vencido pelo jogador: " + currentPlayer.getSymbol());
    }
    else if ((currentBoard.getMovements() + 1) >= (currentBoard.getSize() ** 2)) {
      alert("Velha - Empate");
    }
  }
}

Premovement = function(e) {
  if (e.target.innerHTML == '') {
    currentPlayer = game.getCurrentPlayer();
    e.target.innerHTML = currentPlayer.getSymbol();
    e.target.style.opacity = '0.2';
  }
  else {

    lineId = e.target.parentNode.id;
    lineId = parseInt(lineId.slice(4));
    columnId = e.target.id;
    columnId = parseInt(columnId.slice(6));
    currentBoard = game.getCurrentBoard();

    if (currentBoard.lines[lineId].columns[columnId].getFilled() == '') {
      e.target.innerHTML = '';
      e.target.style.opacity = '1';
    }    
  }
}