/*global $,tutorialAnimationFinished, playerGo*/
var diceGameEvg = (function () {
    var aColors = ['p_white', 'p_red', 'p_blue', 'p_green'],
        chessBoardSides = ['bottom', 'left', 'top', 'right'],
        $ch_outer = null,
        $diceDlg = null,
        $dice = null,
        $isTutorial = false,
        players = [], //the player's opponents, contains PlayerClass objects
        currentPlayerIndex = null, //the index of the player in 'players' array
        diceNumberThrown = 0, //The number that was thrown on the dice
        aCheckWhoFirstColors = null,
        //array containing the results for 'who goes first' test. Contains {color:"",dice:0} objects
        whoGoesFirstResults = [],
        //number of milliseconds between the dice changes during the rolling
        iRollDiceDelay = null,
        iDelayMax = 100,
        throwSpeed = 1.15,
        diceToRoll = null, //element for the dice being rolled
        diceRollFunction = null,
        diceNumbersHistory = [],
        diceRollResultPredefined = null,
        reminderDiceTimer = null,

        //positions of all pieces ralative to current player coordinates. Contains 'PieceOnBoard' objects
        piecesPositions = [],
        piecesCanMove = [],

        reminderAnimationTimer = null,

        pieceToMoveQueue = null,
        positionToMoveQueue = null,

        tutorialTextScrollAmount = 0,
        tutorialScrollTimeout = null,
        $tutorialScrollAminationElement = null,
        tutorialPageNo = 0,
        tutorialPieceMove = 3,
        selectPieceDlgAnimationTimer = null,
        $selectPieceDlgTitle = null;


    function PlayerClass(color, side) {
        this.color = color;
        this.side = side;
        this.pieces = []; //contains the pieces, PieceClass objects
    }

    function PieceClass() {
        //the relative position of the piece on the board (from 0 to 31).
        //If the piece is not in game it has negative position (from -1 to -4)
        this.position = null;
        this.element = null; //the DOM element for this piece
    }

    function randOrd() {
        return (Math.round(Math.random()) - 0.5);
    }

    function getMyColor() {
        if (players.length === 0) {
            return null;
        }
        return players[0].color;
    }

    //Show and hides the dialog
    function scrollDialog(strDialogName, scrolledFunc) {
        var $dialog = $ch_outer.children("#" + strDialogName),
            leftPosition = $dialog.position().left;
        if (leftPosition < 0) {
            //the dialog was already used. Return it to default position
            $ch_outer.children("#" + strDialogName).css('left', '250px');
        }
        $dialog.animate({ left: "-=217px" }, 1000, null, scrolledFunc);
    }

    function stopSelectPieceDlgAnimation() {
        if (selectPieceDlgAnimationTimer !== null) {
            clearTimeout(selectPieceDlgAnimationTimer);
            selectPieceDlgAnimationTimer = null;
        }
    }

    function startSelectPieceDlgAnimation() {
        stopSelectPieceDlgAnimation();
        selectPieceDlgAnimationTimer = setTimeout(function () {
            var color = "Red";
            if ($selectPieceDlgTitle.hasClass('color-toggled') === true)
            {
                color = "Gray";
            }
            $selectPieceDlgTitle.css('color', color).toggleClass('color-toggled');
            startSelectPieceDlgAnimation();
        }, 500);
    }

    function setPieceHoverImage($piece, isHover) {
        var x, y;
        if ($piece.hasClass("p_white")) {
            x = 0;
        } else if ($piece.hasClass("p_red")) {
            x = -25;
        } else if ($piece.hasClass("p_blue")) {
            x = -50;
        } else if ($piece.hasClass("p_green")) {
            x = -75;
        }
        if (isHover) {
            y = -25;
        } else {
            y = 0;
        }
        $piece.css({ backgroundPosition: x + "px " + y + "px" });
    }

    //Returns the color of the piece
    function getPieceColor(oElement) {
        for (var iColor in aColors) {
            if (oElement.hasClass(aColors[iColor])) {
                return aColors[iColor];
            }
        }
    }

    function getPlayerIDByColor(color) {
        for (var i in players) {
            if (players[i].color === color) {
                return parseInt(i, 10);
            }
        }
        return null;
    }

    // function returns the position of the square as if the board
    // was rotated clockwise and bottom side bacame 'rotateBottomSideTo'
    function rotateChessBoard(position, rotateBottomSideTo) {
        var tstore;
        switch (rotateBottomSideTo) {
        case 'top':
            position.top = 9 - position.top;
            position.left = 9 - position.left;
            break;
        case 'left':
            tstore = position.left;
            position.left = 9 - position.top;
            position.top = tstore;
            break;
        case 'right':
            tstore = position.top;
            position.top = 9 - position.left;
            position.left = tstore;
            break;
        }
        return position;
    }

    function getPieceAbsolutePositionSquare(side, relativePosition) {
        var position = { top: null, left: null },
            iSideIndex;
        if (relativePosition < 0) {
            position.top = 9;
            position.left = 10 + relativePosition;
        } else if (relativePosition < 7) {
            position.top = 8;
            position.left = 8 - relativePosition;
        } else if (relativePosition >= 7 && relativePosition < 29) {
            iSideIndex = $.inArray(side, chessBoardSides);
            iSideIndex += Math.floor(relativePosition / 7);
            iSideIndex %= 4;
            position = getPieceAbsolutePositionSquare(chessBoardSides[iSideIndex], relativePosition % 7);
            return position;
        } else if (relativePosition >= 28) {
            position.top = 36 - relativePosition;
            position.left = 36 - relativePosition;
        }

        position = rotateChessBoard(position, side);
        return position;
    }

    //returns the position for the peice on the chess board,
    //where xSquare and ySquare are the chess board square numbers from left to right and from top to down
    function getPieceAbsolutePositionPixel(position) {
        position.top = position.top * 25;
        position.left = position.left * 25;
        return position;
    }

    function bindPieceHover($piece) {
        $piece.hover(function () {
            $(this).addClass('hovered');
        }, function () {
            $(this).removeClass('hovered');
        });
    }

    function placePiecesInitially(oPiece, side, functionOnFinish) {
        var piecePosition = { top: 0, left: 0 },
            outer = $ch_outer,
            player = players[getPlayerIDByColor(getPieceColor(oPiece))],
            iPosition,
            newPiece,
            positionOnBoard,
            pieceNewPosition,
            piece;

        piecePosition.top = $(oPiece).offset().top - outer.offset().top;
        piecePosition.left = $(oPiece).offset().left - outer.offset().left;

        for (iPosition = -1; iPosition > -5; iPosition = iPosition - 1) {
            newPiece = $("<div class='piece'></div>").addClass(getPieceColor(oPiece));
            newPiece.css("left", piecePosition.left + 'px');
            newPiece.css("top", piecePosition.top + 'px');
            outer.append(newPiece);
            positionOnBoard = getPieceAbsolutePositionSquare(side, iPosition);
            pieceNewPosition = getPieceAbsolutePositionPixel(positionOnBoard);
            newPiece.animate({
                left: pieceNewPosition.left + "px",
                top: pieceNewPosition.top + "px"
            }, 700, null, iPosition === -4 ? functionOnFinish : null);

            //add the piece to player
            piece = new PieceClass();
            piece.position = iPosition;
            piece.element = newPiece[0];
            newPiece.data("pieceIndex", player.pieces.length);
            player.pieces.push(piece);
            if (side === chessBoardSides[0]) {
                bindPieceHover(newPiece);
            }
        }
    }

    function setOpponentsDialog() {
        var aOpponentColors = aColors.slice(0),
            i;

        aOpponentColors.sort(randOrd);
        aOpponentColors.splice($.inArray(getMyColor(), aOpponentColors), 1);

        for (i = 0; i < 3; i += 1) {
            $($ch_outer.find("#play3Opponents .piece")[i]).addClass(aOpponentColors[i]);
        }

        aOpponentColors.sort(randOrd);
        aOpponentColors.pop();
        for (i = 0; i < 2; i += 1) {
            $($ch_outer.find("#play2Opponents .piece")[i]).addClass(aOpponentColors[i]);
        }

        aOpponentColors = aColors.slice(0);
        aOpponentColors.splice($.inArray(getMyColor(), aOpponentColors), 1);
        $($ch_outer.find("#play1Opponent .piece")[0]).addClass(aOpponentColors[Math.floor(Math.random() * 3)]);
    }

    function getLowestPieceIndex(player) {
        var iIndex = null,
            iLowestPos = 100,
            i;
        for (i in player.pieces) {
            if (player.pieces[i].position < iLowestPos) {
                iIndex = i;
                iLowestPos = player.pieces[i].position;
            }
        }
        return iIndex;
    }

    function getPlayerForElement(pieceElement) {
        return players[getPlayerIDByColor(getPieceColor($(pieceElement)))];
    }

    //returns PieceClass object for the html element
    function getPieceForElement(pieceElement) {
        return getPlayerForElement(pieceElement).pieces[$(pieceElement).data("pieceIndex")];
    }

    function bounceAnimate(elemetsToBounce, changeProperty, bounceAnimationSpeed,
            bounceAnimationTime, bounceAnimationShift, onFinished, additionalAnimation) {
        if (bounceAnimationSpeed === null || bounceAnimationSpeed === undefined) {
            bounceAnimationSpeed = 100; //speed of 'bounce' animation
        }
        if (bounceAnimationShift === null || bounceAnimationShift === undefined) {
            bounceAnimationShift = 3; //The bounce shift
        }
        if (bounceAnimationTime === null || bounceAnimationTime === undefined) {
            bounceAnimationTime = 1500;
        }
        if (changeProperty === null || changeProperty === undefined) {
            changeProperty = "marginTop";
        }
        var properties = changeProperty.split(','),
            animationScript = "elemetsToBounce",
            animationLoopCount = Math.floor(bounceAnimationTime / bounceAnimationSpeed / 2) * 2,
            i,
            iProperty;

        for (i = 0; i < animationLoopCount; i += 1) {
            if (i === 1) {
                bounceAnimationShift *= 2;
            }
            if (i === animationLoopCount - 1) {
                bounceAnimationShift /= 2;
            }
            animationScript += ".animate({ ";
            for (iProperty = 0; iProperty < properties.length; iProperty += 1) {
                if (iProperty > 0) {
                    animationScript += ",";
                }
                animationScript += properties[iProperty] + ": '" +
                    (i % 2 === 0 ? "-" : "+") + "=" + bounceAnimationShift + "px' ";
            }
            animationScript += "}, " + bounceAnimationSpeed;
            if (onFinished !== undefined && i === animationLoopCount - 1) {
                animationScript += ",null," + onFinished;
            }
            animationScript += ")";
        }
        if (additionalAnimation !== undefined) {
            animationScript += additionalAnimation;
        }

        eval(animationScript);
    }


    function movePieceAnimate(pieceVar, side, newPosition, onFinishFunction, bounceBeforeMove) {
        var positionInBetween,
            moveDistance,
            absoluteSqPositionOld,
            absoluteSqPositionNew,
            animationTime,
            animationCode,
            bounceAnimationTime,
            absoluteSqPosition;

        if (pieceVar === undefined || side === undefined) {
            pieceVar = pieceToMoveQueue;
            side = getPlayerForElement(pieceVar.element).side;
            newPosition = positionToMoveQueue;
            if ($isTutorial === true) {
                onFinishFunction = tutorialAnimationFinished;
            } else {
                onFinishFunction = playerGo;
            }
        }
        if (pieceVar.position >= 0 && newPosition >= 0 &&
                Math.floor(pieceVar.position / 7) !== Math.floor(newPosition / 7) && newPosition % 7 !== 0) {
            positionInBetween = Math.floor(newPosition / 7) * 7;
            movePieceAnimate(pieceVar, side, positionInBetween, movePieceAnimate);
            return;
        }
        moveDistance = newPosition - pieceVar.position;

        absoluteSqPositionOld = getPieceAbsolutePositionSquare(side, pieceVar.position);

        pieceVar.position = newPosition;
        absoluteSqPositionNew = getPieceAbsolutePositionSquare(side, pieceVar.position);
        if (newPosition < 0) {
            moveDistance = Math.sqrt(Math.pow(absoluteSqPositionOld.top - absoluteSqPositionNew.top, 2) +
                    Math.pow(absoluteSqPositionOld.left - absoluteSqPositionNew.left, 2));
        }
        animationTime = Math.ceil(((moveDistance + 4) * 0.6) * 100);

        absoluteSqPosition = getPieceAbsolutePositionPixel(absoluteSqPositionNew);
        animationCode = ".animate({ left: '" + absoluteSqPosition.left + "px', top: '" +
            absoluteSqPosition.top + "px' }, " + animationTime + ", null, null); ";
        $ch_outer.children(".piece").css('zIndex', '10');
        $(pieceVar.element).css('zIndex', '50'); //make the moving piece above all other pieces
        if (bounceBeforeMove === true) {
            bounceAnimationTime = 1000;
            animationTime += bounceAnimationTime;
            bounceAnimate($(pieceVar.element), null, null, bounceAnimationTime, null, null, animationCode);
        } else {
            animationCode = "$(pieceVar.element)" + animationCode;
            eval(animationCode);
        }
        if (onFinishFunction !== undefined) {
            setTimeout(onFinishFunction, animationTime - animationTime / 4);
        }
    }

    //restart the application
    function initDiceApp() {
        currentPlayerIndex = null;
        diceRollResultPredefined = null;
        $ch_outer.children(".piece").remove();
        $diceDlg.animate({ 'top': '-50px' }, '300');
        players = [];
        $ch_outer.find("#selectOpponentsDlg .piece").removeAttr('class').addClass('piece');
        $ch_outer.find("#whoGoesFirstShow").html('');
        $selectPieceDlgTitle = $('#selectPieceDlg .title', $ch_outer);
        whoGoesFirstResults = [];
        aCheckWhoFirstColors = null;
        piecesPositions = [];
        piecesCanMove = [];
        pieceToMoveQueue = null;
        positionToMoveQueue = null;
        $isTutorial = false;
        scrollDialog('selectPieceDlg', startSelectPieceDlgAnimation);
    }

    function reminderDice() {
        bounceAnimate(diceToRoll);
    }

    function generateDiceRandomNumber() {
        //get random thrown number for the dice
        var iNumberThrownNew = Math.floor(Math.random() * 6) + 1;
        if ($.inArray(iNumberThrownNew, diceNumbersHistory) === -1) {
            if (diceNumbersHistory.length === 2) {
                diceNumbersHistory.pop();
            }
            diceNumbersHistory.unshift(iNumberThrownNew);
            diceNumberThrown = iNumberThrownNew;
        }
        else {
            generateDiceRandomNumber();
        }
    }

    function rollDice(diceElement, onFinishedFunc, isMyDice) {
        if (diceElement !== undefined) {
            //start rolling
            diceToRoll = diceElement;
            iRollDiceDelay = 30 + Math.floor(Math.random() * 40);
            iDelayMax = 100 + Math.floor(Math.random() * 100);
            if ($isTutorial === true) {
                diceRollResultPredefined = 6;
                iDelayMax += 300;
            }
            throwSpeed = 1.10 + Math.random() / 5;
            diceRollFunction = onFinishedFunc;
            diceNumbersHistory = [];
            if (isMyDice) {
                reminderDiceTimer = setInterval(reminderDice, 5000);
                diceToRoll.removeAttr('class').addClass('dice').addClass('dice_q').addClass('hoverable')
                    .hover(
                      function () {
                          $(this).addClass("hovered");
                      },
                      function () {
                          $(this).removeClass("hovered");
                      }
                    )
                    .one('click', function () {
                        clearInterval(reminderDiceTimer);
                        reminderDiceTimer = null;
                        $(this).unbind('mouseenter mouseleave');
                        rollDice();
                    });
                return;
            }
        } else {
            iRollDiceDelay *= throwSpeed;
        }
        generateDiceRandomNumber();
        diceToRoll.removeAttr('class').addClass('dice').addClass('dice_' + diceNumberThrown);

        if (iRollDiceDelay < iDelayMax) {
            setTimeout(function () {
                rollDice();
            }, iRollDiceDelay);
        } else {
            if (diceRollResultPredefined !== null) {
                diceToRoll.removeAttr('class').addClass('dice').addClass('dice_' + diceRollResultPredefined);
            }

            //Finished
            setTimeout(diceRollFunction, (currentPlayerIndex === 0 ? 0 : 1000));
        }
    }

    //-----------------THE TUTORIAL--------------------

    function tutorialChangeLink(linkText) {
        $ch_outer.find("#linkNext").unbind('mouseenter mouseleave').html(linkText)
            .hover(function () {
                $(this).html('\u2192 ' + linkText + ' \u2190');
            },
            function () {
                $(this).html(linkText);
            });
    }

    function tutorialMoveToCorner() {
        var currentPlayer = players[0],
            indexLowestPiece = getLowestPieceIndex(currentPlayer);
        pieceToMoveQueue = currentPlayer.pieces[tutorialPieceMove];
        positionToMoveQueue = 0;
        movePieceAnimate();
    }

    function scrollTutorialText() {
        $tutorialScrollAminationElement = $ch_outer.find("#tutorial" + tutorialPageNo);
        $tutorialScrollAminationElement.animate({ 'marginTop': tutorialTextScrollAmount + 'px' },
                Math.abs(tutorialTextScrollAmount) * 50, 'linear');
    }

    function getTutorialPiece(iNumber) {
        var currentPlayer = players[0];
        return currentPlayer.pieces[iNumber];
    }


    function tutorialNewPage() {
        var IE7,
            $tutorialText,
            textHeight,
            windowHeight,
            i,
            player,
            pieceT;

        tutorialPageNo += 1;
        if ($tutorialScrollAminationElement !== null) {
            $tutorialScrollAminationElement.stop(false, false);
            $tutorialScrollAminationElement = null;
        }
        if (tutorialScrollTimeout !== null) {
            clearTimeout(tutorialScrollTimeout);
            tutorialScrollTimeout = null;
        }

        if (tutorialPageNo > 1) {
            IE7 = (navigator.appVersion.indexOf("MSIE 7.") === -1) ? false : true;
            if (IE7) {
                $ch_outer.find("#tutorial" + (tutorialPageNo - 1)).hide();
            } else {
                $ch_outer.find("#tutorial" + (tutorialPageNo - 1)).slideUp('normal');
            }
        }

        if (tutorialPageNo === 6) {
            tutorialPieceMove -= 1;
            $ch_outer.find("#tutorialDlg").hide();
            tutorialMoveToCorner();
            return;
        }

        if (tutorialPageNo === 9) {
            scrollDialog('tutorialDlg');
            initDiceApp();
            return;
        }

        $tutorialText = $ch_outer.find("#tutorial" + tutorialPageNo);
        $tutorialText.show();

        textHeight = $tutorialText.height();
        windowHeight = $ch_outer.find("#tutorialViewWinow").height();
        if (textHeight > windowHeight) {
            //The text does not fit the window - scroll it
            tutorialTextScrollAmount = windowHeight - textHeight;
            tutorialScrollTimeout = setTimeout(function () {
                scrollTutorialText();
            }, 2000);
        }

        if (tutorialPageNo === 2) {
            for (i = 0; i < 2; i += 1) {
                player = new PlayerClass();
                player.color = aColors[i];
                player.side = chessBoardSides[i * 2];
                players.push(player);

                pieceT = $ch_outer.find("#tutorialDlg .piece")
                    .removeAttr('class').addClass('piece').addClass(player.color);
                placePiecesInitially($(pieceT), player.side);
            }
        }
        if (tutorialPageNo === 3) {
            $ch_outer.find("#linkNext").hide();
            rollDice($tutorialText.children(".dice"), tutorialMoveToCorner, false);
        }
        if (tutorialPageNo === 4) {
            $ch_outer.find("#linkNext").hide();
            pieceToMoveQueue = getTutorialPiece(tutorialPieceMove);
            positionToMoveQueue = 5;
            movePieceAnimate();
        }
        if (tutorialPageNo === 5) {
            tutorialChangeLink('Show Me');
        }

        if (tutorialPageNo === 7) {
            $ch_outer.find('#tutorialDlg').show();
            tutorialChangeLink('Next');
        }

        if (tutorialPageNo === 8) {
            tutorialChangeLink('Start Game');
        }
    }

    function startTutorial() {
        $ch_outer.find("#tutorial1").show();
        tutorialPageNo = 0;
        tutorialPieceMove = 3;
        tutorialChangeLink('Next');
        tutorialScrollTimeout = null;
        $ch_outer.find("#tutorialViewWinow > div").css('marginTop', '0');
        $isTutorial = true;
        $tutorialScrollAminationElement = null;
        scrollDialog('tutorialDlg');
        tutorialNewPage();
    }

    function tutorialAnimationFinished() {
        if (tutorialPageNo === 3) {
            $ch_outer.find("#linkNext").show();
        }
        if (tutorialPageNo === 4 || tutorialPageNo === 6) {
            var positionToReach = 28 + tutorialPieceMove;
            if (positionToMoveQueue < positionToReach) {
                positionToMoveQueue += Math.floor(Math.random() * 3) + 4;
                if (positionToMoveQueue > positionToReach) {
                    positionToMoveQueue = positionToReach;
                }
                movePieceAnimate();
            } else {
                if (tutorialPageNo === 4) {
                    $ch_outer.find("#linkNext").show();
                } else {
                    if (tutorialPieceMove > 0) {
                        tutorialPieceMove -= 1;
                        tutorialMoveToCorner();
                    } else {
                        setTimeout(function () {
                            tutorialNewPage();
                        }, 3000);
                    }
                }
            }
        }
    }

    //-----------------THE TUTORIAL END--------------------

    function startGame() {
        if (players.length > 0) {
            scrollDialog('whoGoesFirstDlg', playerGo);
        }
    }

    function showGoesFirstDiceRoll() {
        if (whoGoesFirstResults.length > 0) {
            //Store the number thrown for previous player
            if (whoGoesFirstResults[whoGoesFirstResults.length - 1].dice === null) {
                whoGoesFirstResults[whoGoesFirstResults.length - 1].dice = diceNumberThrown;
            }
        } else {
            $ch_outer.find("#whoGoesFirstShow").html('');
        }

        var iCnt,
            i,
            t,
            isMyDice;

        if (aCheckWhoFirstColors.length === 0) {
            //all players finished throwing the dice. See who goes first
            whoGoesFirstResults.sort(function (a, b) {
                return b.dice - a.dice;
            });
            iCnt = whoGoesFirstResults.length;
            for (i = 1; i < iCnt; i += 1) {
                if (whoGoesFirstResults[whoGoesFirstResults.length - 1].dice < whoGoesFirstResults[0].dice) {
                    whoGoesFirstResults.pop();
                }
            }

            if (whoGoesFirstResults.length > 1) {
                //players have the same largest dice numbers, they roll the dice again
                for (i = 0; i < whoGoesFirstResults.length; i += 1) {
                    aCheckWhoFirstColors.push(whoGoesFirstResults[i].color);
                    bounceAnimate($ch_outer.find("#whoGoesFirstShow ." +
                                whoGoesFirstResults[i].color), null,
                            null, null, null, (i === whoGoesFirstResults.length - 1) ? showGoesFirstDiceRoll : null);
                }
                aCheckWhoFirstColors.sort(randOrd);
                whoGoesFirstResults = [];

            } else {
                currentPlayerIndex = getPlayerIDByColor(whoGoesFirstResults[0].color);
                bounceAnimate($ch_outer.find("#whoGoesFirstShow ." +
                            whoGoesFirstResults[0].color), null, null, null, null, startGame);
            }

            return;
        }
        t = $("<div class='whoGoesFirstPlayer'><div class='piece'></div><div class='dice'></div></div>");
        t.children('.piece').addClass(aCheckWhoFirstColors[0]);
        $ch_outer.find("#whoGoesFirstShow").append(t);
        whoGoesFirstResults.push({ color: aCheckWhoFirstColors[0], dice: null });
        isMyDice = aCheckWhoFirstColors[0] === getMyColor();
        aCheckWhoFirstColors.shift();
        rollDice(t.children('.dice'), showGoesFirstDiceRoll, isMyDice);
    }

    function setWhoGoesFirstDialog() {
        aCheckWhoFirstColors = [];
        var i;
        for (i = 0; i < players.length; i += 1) {
            aCheckWhoFirstColors.push(players[i].color);
        }
        aCheckWhoFirstColors.sort(randOrd); //randomize the order of players on the dialog

        showGoesFirstDiceRoll();
    }

    function init() {
        if ($ch_outer !== null) {
            return; //already initiated
        }
        $ch_outer = $("#ch_outer");
        $diceDlg = $ch_outer.children("#diceDialog");
        $dice = $diceDlg.children("div:first");
        $ch_outer.find("#selectPeices .hoverable").hover(
          function () {
              setPieceHoverImage($(this), true);
          },
          function () {
              setPieceHoverImage($(this), false);
          }
        ).click(function () {
            if (getMyColor() !== null) {
                return;
            }

            stopSelectPieceDlgAnimation();

            var player = new PlayerClass();
            player.color = getPieceColor($(this));
            player.side = "bottom";
            players.push(player);

            placePiecesInitially($(this), 'bottom', function () {
                setOpponentsDialog();
                scrollDialog('selectPieceDlg');
                scrollDialog('selectOpponentsDlg');
            });
        });

        $ch_outer.find("#tutorialLink").click(function () {
            if (getMyColor() !== null) {
                return;
            }
            var player = new PlayerClass();
            player.color = 'p_white';
            player.side = "bottom";
            players.push(player);
            scrollDialog('selectPieceDlg');
            startTutorial();
            return false;
        });
        $ch_outer.find("#linkNext").click(function () {
            tutorialNewPage();
            return false;
        });


        $ch_outer.find("#play3Opponents, #play2Opponents, #play1Opponent").hover(
          function () {
              $(this).children(".piece").addClass("hoverable").each(function () {
                  setPieceHoverImage($(this), true);
              });
          },
          function () {
              $(this).children(".piece").removeClass("hoverable").each(function () {
                  setPieceHoverImage($(this), false);
              });
          }
        );

        $ch_outer.find("a.my_link").hover(function () {
                $(this).html('\u2192 ' + $(this).html() + ' \u2190');
            },
            function () {
                var strText = $(this).html();
                $(this).html(strText.substring(2, strText.length - 2));
            });
        $ch_outer.find("#gameOverDlg a").click(function () {
            scrollDialog('gameOverDlg');
            initDiceApp();
            return false;
        });

        initDiceApp();

        $ch_outer.find("#selectOpponentsDlg > div").click(function () {
            if (players.length > 1) {
                return;
            }
            var numberOfOpponets = $(this).children(".piece").length,
                chessSideShift = 0;
            if (numberOfOpponets === 1 || (numberOfOpponets === 2 && Math.random() > 0.5)) {
                chessSideShift = 1;
            }

            $(this).children(".piece").each(function (i) {
                var opponentSide = chessBoardSides[i + 1 + chessSideShift],
                    player = new PlayerClass();
                player.color = getPieceColor($(this));
                player.side = opponentSide;
                players.push(player);

                placePiecesInitially($(this), opponentSide, (i === numberOfOpponets - 1) ? function () {
                    $ch_outer.children(".piece").css('zIndex', '10'); //make the pieces below the dialog
                    scrollDialog("selectOpponentsDlg");
                    scrollDialog('whoGoesFirstDlg', setWhoGoesFirstDialog);
                } : null);
            });
        });
    }

    //-------------- AI ------------------
    function AiClass() {
        /*
        The list of move choices that can be made by an opponent.
        'new' - new piece is put into game or move from first square
        'capture' - capture opponent
        'finish' - move piece to a diagonal square
        'save' - run away from an opponent's piece to avoid being captured during the next opponent's move.
        'new_limit' - the value indicates the number of pieces
            in play when new piece is not moved (there are too many pieces already)
        */
        var playerChoices = {
            p_green: { 'new': 10, 'capture': 20, finish: 90, 'save': 60, 'new_limit': 2 },
            p_red: { 'new': 10, 'capture': 90, finish: 50, 'save': 20, 'new_limit': 3 },
            p_white: { 'new': 60, 'capture': 80, finish: 90, 'save': 20, 'new_limit': 4 },
            p_blue: { 'new': 10, 'capture': 60, finish: 80, 'save': 50, 'new_limit': 1 }
        };

        this.decideMove = function () {
            this.collectPiecesData();
            piecesCanMove.sort(function (a, b) {
                if (a.moveWeight !== b.moveWeight) {
                    return b.moveWeight - a.moveWeight;
                } else {
                    return ((Math.random() > 0.2) ? b.position - a.position : a.position - b.position);
                }
            });
            return piecesCanMove[0];
        };

        function addDecisionWeight(position, choice, weight) {
            var player = players[currentPlayerIndex],
                i,
                piece;
            for (i = 0; i < piecesCanMove.length; i += 1) {
                piece = piecesCanMove[i];
                if (position === piece.position) {
                    if (choice !== undefined) {
                        weight = parseInt(playerChoices[player.color][choice], 10);
                    }
                    piece.moveWeight += Math.floor(weight * Math.random());
                    break;
                }
            }
        }

        this.collectPiecesData = function () {
            var currentPlayer = players[currentPlayerIndex],
                bHasNew = false,
                iPiece,
                piece,
                piecesInPlay,
                iPieceInPlay,
                iPosActual,
                pieceBefore,
                iPos,
                vSide,
                iPlayer,
                playerOpponent;

            for (iPiece = 0; iPiece < piecesCanMove.length; iPiece += 1) {
                piece = piecesCanMove[iPiece];
                piece.moveWeight = 0;

                //new
                if (piece.position <= 0) {
                    piecesInPlay = 0; //calculate the number of pieces already in play
                    if (piece.position < 0) {
                        for (iPieceInPlay = 0; iPieceInPlay < currentPlayer.pieces; iPieceInPlay += 1) {
                            if (currentPlayer.pieces[iPieceInPlay].position > 0 &&
                                    currentPlayer.pieces[iPieceInPlay].position < 29) {
                                piecesInPlay += 1;
                            }
                        }
                        if (piecesInPlay >= playerChoices[currentPlayer.color].new_limit) {
                            addDecisionWeight(piece.position, null, -30);
                            bHasNew = true;
                        }
                    }

                    if (!bHasNew) {
                        addDecisionWeight(piece.position, 'new');
                    }
                    bHasNew = true;
                }

                //capture
                if ((piece.position >= 0 && piecesPositions[piece.position + diceNumberThrown] !== undefined) ||
                    (piece.position < 0 && piecesPositions[0] !== undefined)) {
                    addDecisionWeight(piece.position, 'capture');
                }

                //finish
                if ((piece.position + diceNumberThrown) > 28) {
                    addDecisionWeight(piece.position, 'finish');
                }

                //save
                if (piece.position >= 0) {
                    for (iPos = piece.position - 1; iPos >= (piece.position - 6); iPos -= 1) {
                        iPosActual = iPos;
                        if (iPos < 0) {
                            iPosActual = 28 + iPos;
                        }
                        if (piecesPositions[iPosActual] === null || piecesPositions[iPosActual] === undefined) {
                            continue;
                        }

                        pieceBefore = piecesPositions[iPosActual];
                        if (pieceBefore.player.color !== players[currentPlayerIndex].color) {
                            if ((Math.floor(piece.position / 7) !== Math.floor(iPosActual / 7) &&
                                        piece.position % 7 !== 0) || iPosActual % 7 === 0) {
                                //check if the previous opponent's piece will go diagonally,
                                //thus not be able to capture us
                                if (pieceBefore.piece.position > 23) {
                                    break;
                                }
                            }

                            addDecisionWeight(piece.position, 'save');
                        }
                        break;
                    }
                    //check if we are on the opponent's corner - so there is a threat of being captured by new piece
                    if (piece.position > 0 && piece.position < 28 && piece.position % 7 === 0) {
                        vSide = $.inArray(players[currentPlayerIndex].side, chessBoardSides);
                        vSide += Math.floor(piece.position / 7);

                        if (vSide > 3) {
                            vSide = vSide % 4;
                        }
                        for (iPlayer = 0; iPlayer < players.length; iPlayer += 1) {
                            playerOpponent = players[iPlayer];
                            if (playerOpponent.side === chessBoardSides[vSide] &&
                                    playerOpponent.pieces[getLowestPieceIndex(playerOpponent)].position < 0) {
                                addDecisionWeight(piece.position, 'save');
                                break;
                            }
                        }
                    }
                }
            }
        };
    }
    //---------------- AI Class END --------------------


    //------------------THE GAME---------------------

    function isMyTurn() {
        return currentPlayerIndex === 0;
    }

    function PieceOnBoard(player, piece) {
        this.player = player;
        this.piece = piece;
    }

    function reminderAnimation() {
        var arrayElementsToAnimate = [],
            iPiece,
            piece;
        for (iPiece = 0; iPiece < piecesCanMove.length; iPiece += 1) {
            piece = piecesCanMove[iPiece];
            arrayElementsToAnimate.push(piece.element);
        }
        bounceAnimate($(arrayElementsToAnimate));
    }

    //The functions captures opponent's piece if possible
    function captureOpponnets() {
        if (piecesPositions[positionToMoveQueue] === undefined) {
            movePieceAnimate();
            if (diceNumberThrown < 6) {
                currentPlayerIndex += 1;
                if (currentPlayerIndex > players.length - 1) {
                    currentPlayerIndex = 0;
                }
            }
            return false;
        }
        var opponentsPiece = piecesPositions[positionToMoveQueue].piece,
            opponent = piecesPositions[positionToMoveQueue].player,
            positionToReturn = opponent.pieces[getLowestPieceIndex(opponent)].position;
        if (positionToReturn >= 0) {
            positionToReturn = 0;
        }
        positionToReturn -= 1;

        movePieceAnimate(opponentsPiece, opponent.side, positionToReturn, movePieceAnimate, true);
        return true;
    }


    function movePiece(piece) {
        var currentPlayer = players[currentPlayerIndex],
            indexLowestPiece,
            newPosition;
        if (piece.position < 0) {
            //clicked a not-in-game piece, place the leftmost one on board
            indexLowestPiece = getLowestPieceIndex(currentPlayer);
            pieceToMoveQueue = currentPlayer.pieces[indexLowestPiece];
            positionToMoveQueue = 0;
        } else {
            newPosition = piece.position + diceNumberThrown;
            pieceToMoveQueue = piece;
            positionToMoveQueue = newPosition;
        }
        captureOpponnets();
    }


    function playerTurnDiceRolled() {
        //check which pieces can move
        piecesCanMove = [];

        //Get the positions of all pieces ralative to current player coordinates
        piecesPositions = [];
        var iPlayer,
            player,
            iPiece,
            piecePositionForCurrentPlayer,
            currentSideIndex,
            playerSideIndex,
            positionDiff,
            currentPlayer,
            piece,
            pieceNewPosition,
            pieceInTheWay,
            iPosition,
            iPieceNewPosition,
            oAI;

        for (iPlayer = 0; iPlayer < players.length; iPlayer += 1) {
            player = players[iPlayer];
            for (iPiece = 0; iPiece < player.pieces.length; iPiece += 1) {
                piece = player.pieces[iPiece];
                if (piece.position >= 0) {
                    piecePositionForCurrentPlayer = piece.position;
                    if (iPlayer !== currentPlayerIndex) {//the opponent's piece
                        if (piece.position > 28) {
                            continue; //opponent's piece is out of reach
                        }
                        //get the position of the piece
                        //relative to the current player's coordinates
                        currentSideIndex = $.inArray(players[currentPlayerIndex].side, chessBoardSides);
                        playerSideIndex = $.inArray(player.side, chessBoardSides);
                        if (currentSideIndex > playerSideIndex) {
                            playerSideIndex += 4;
                        }
                        positionDiff = playerSideIndex - currentSideIndex;
                        piecePositionForCurrentPlayer = positionDiff * 7 + piece.position;
                        if (piecePositionForCurrentPlayer > 28) {
                            piecePositionForCurrentPlayer -= 28;
                        }
                    }

                    piecesPositions[piecePositionForCurrentPlayer] = new PieceOnBoard(player, piece);

                    //assign to both 0 and 28 because they overlap
                    if (piecePositionForCurrentPlayer === 28) {
                        piecesPositions[0] = piecesPositions[piecePositionForCurrentPlayer];
                    } else if (piecePositionForCurrentPlayer === 0) {
                        piecesPositions[28] = piecesPositions[piecePositionForCurrentPlayer];
                    }
                }
            }
        }

        currentPlayer = players[currentPlayerIndex];

        //go through all the player's piece and see which can move
        for (iPiece = 0; iPiece < currentPlayer.pieces.length; iPiece += 1) {
            piece = currentPlayer.pieces[iPiece];
            if (piece.position < 0) {
                //check if we can move a new piece into the game
                if (diceNumberThrown === 6 &&
                        (piecesPositions[0] === undefined ||
                         piecesPositions[0].player.color !== currentPlayer.color)) {
                    piecesCanMove.push(piece);
                    continue;
                }
            } else {
                iPieceNewPosition = piece.position + diceNumberThrown;
                if (iPieceNewPosition > 31) {
                    continue;
                }
                //check if there is a piece in the way
                pieceInTheWay = false;
                for (iPosition = piece.position + 1; iPosition < iPieceNewPosition; iPosition += 1) {
                    if (piecesPositions[iPosition] !== undefined) {
                        pieceInTheWay = true;
                        break;
                    }
                }
                if (pieceInTheWay) {
                    continue;
                }
                if (piecesPositions[iPieceNewPosition] === undefined ||
                        piecesPositions[iPieceNewPosition].player.color !== currentPlayer.color) {
                    piecesCanMove.push(piece);
                    continue;
                }
            }
        }

        if (piecesCanMove.length === 0) {
            //Current player can not move, take turns
            setTimeout(playerGo, currentPlayerIndex === 0 ? 1000 : 0);
            currentPlayerIndex += 1;
            if (currentPlayerIndex > players.length - 1) {
                currentPlayerIndex = 0;
            }

            return;
        } else {
            if (isMyTurn()) {
                //make the piece that can move clickable
                reminderAnimationTimer = setInterval(reminderAnimation, 5000);
                $.each(piecesCanMove, function () {
                    piece = this;
                    $(piece.element).addClass('hoverable').hover(
                          function () {
                              setPieceHoverImage($(this), true);
                          },
                          function () {
                              setPieceHoverImage($(this), false);
                          }
                        )
                        .one('click', function () {
                            clearInterval(reminderAnimationTimer);
                            reminderAnimationTimer = null;
                            piece = getPieceForElement(this);
                            $ch_outer.children("." + players[0].color)
                                .removeClass('hoverable').css('cursor', '')
                                .unbind('mouseenter mouseleave').unbind('click').each(function () {
                                setPieceHoverImage($(this), false);
                                bindPieceHover($(this));
                            });
                            movePiece(piece);
                        });
                    if ($(piece.element).hasClass('hovered')) {
                        setPieceHoverImage($(piece.element), $(piece.element).hasClass('hovered'));
                        $(piece.element).css('cursor', 'pointer');
                    }
                });
            } else {
                oAI = new AiClass();
                movePiece(oAI.decideMove());
            }
        }
    }

    function rollGameDice() {
        rollDice($dice, playerTurnDiceRolled, isMyTurn());
    }

    //checks if the game is over
    function checkWin() {
        var iPlayer,
            player,
            bPlayerWin = false,
            piece,
            iPiece,
            gameOverDlg;

        $.each(players, function () {
            player = this;
            bPlayerWin = true;
            for (iPiece = 0; iPiece < player.pieces.length; iPiece += 1) {
                piece = player.pieces[iPiece];
                if (piece.position < 28) {
                    bPlayerWin = false;
                }
            }
            if (bPlayerWin === true) {
                gameOverDlg = $ch_outer.find("#gameOverDlg");
                currentPlayerIndex = iPlayer;
                bounceAnimate($ch_outer.children("." + player.color + ":odd"), null, null, 30000);
                bounceAnimate($ch_outer.children("." + player.color + ":even"), null, 120, 30000);
                if (currentPlayerIndex === 0) {
                    //the human wins
                    gameOverDlg.children("#opponnetWins").hide();
                    gameOverDlg.children("#youWin").show();
                } else {
                    //machine wins
                    gameOverDlg.find("#opponnetWins > .piece").removeAttr('class').addClass('piece ' + player.color);
                    gameOverDlg.children("#opponnetWins").show();
                    gameOverDlg.children("#youWin").hide();
                }
                setTimeout(function () {
                    scrollDialog('gameOverDlg');
                }, 3000);
                return false;
            }
        });

        return bPlayerWin;
    }

    function playerGo() {
        if (checkWin()) {
            return;
        }
        //Show dice
        var position = { top: 6, left: 4 },
            currentPosition,
            diceDialogPosition;
        switch (players[currentPlayerIndex].side) {
        case 'top':
            position.left = 4;
            position.top = 2;
            break;
        case 'left':
            position.left = 2;
            position.top = 4;
            break;
        case 'right':
            position.left = 6;
            position.top = 4;
            break;
        }
        diceDialogPosition = getPieceAbsolutePositionPixel(position);
        diceDialogPosition.top += 5;
        diceDialogPosition.left += 5;
        currentPosition = $diceDlg.position();
        if (currentPosition.top === diceDialogPosition.top && currentPosition.left === diceDialogPosition.left) {
            //the dice is already in place
            rollGameDice();
        } else {
            //move the dice to the player's side
            $diceDlg.animate({ 'left': diceDialogPosition.left + 'px',
                'top': diceDialogPosition.top + 'px' }, 400, null, rollGameDice);
        }
    }

    return {
        init: init
    };
}());


