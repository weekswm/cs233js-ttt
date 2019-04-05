// start with these global variables
var xIsNext = true;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

window.onload = init;  

function init()
{
    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event
    var boardSquares = document.getElementsByName("square");

    for (var i = 0; i < boardSquares.length; i++) 
    {
        squares[i] = boardSquares[i];
        boardSquares[i].onclick = handleClick;
    }
}

function handleClick() {

    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var clickedSquare = event.srcElement.id;
    for (var i = 0; i < squares.length; i++)
    {
        if (i == clickedSquare)
        {
            if (xIsNext == true)
            {    
                // Set the element in the squares array to the player's symbol
                event.srcElement.innerHTML = "X";
                squares[clickedSquare] = "x";
                // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
                document.getElementById(clickedSquare).removeEventListener("onclick", handleClick);
                // Update the variable xIsNext
                xIsNext = false;
                // If calculateWinner returns true
                if (calculateWinner() == true)
                {
                // highlight the winner and disable all of the squares
                    highlightWinner();
                    disableAll();
                }
                // otherwise update the status in the UI to display the player
                else
                    document.getElementById("status").innerHTML = "Next Player: O";
            }
            else
            {
                event.srcElement.innerHTML = "O";
                squares[clickedSquare] = "O";
                document.getElementById(clickedSquare).removeEventListener("onclick", handleClick);
                xIsNext = true;
                if (calculateWinner() == true)
                {
                    highlightWinner();
                    disableAll();
                }
                else
                    document.getElementById("status").innerHTML = "Next Player: X";    
            }
        }
    }
}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}

//
function highlightWinner() {
    if (!xIsNext)
    // Update the status in the UI to display the winner
        document.getElementById("status").innerHTML = "Player X Wins!";
    else
        document.getElementById("status").innerHTML = "Player O Wins!";
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    for (var i = 0; i < winningLine.length; i++)
    {
        //      get the next square using the current index in the winningLine array as the id
        //      add the class red to the square
        document.getElementById(winningLine[i]).style.color = "red";   
    }
    // Disable all of the squares
    disableAll();
}

function disableAll() {

    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    for (var i = 0; i < squares.length; i++)
    {
        squares[i].onclick = doNothing;
    }
}

function doNothing() {
    return null;
}

// When the page has finished loading, call the function init  
