// Create a class called TTT
class TTT
{
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor () {
        this.xIsNext = true;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            ];
        this.calculateWinner = this.calculateWinner.bind(this);
        /*this.highlightWinner = this.highlightWinner.bind(this);
        this.disableAll = this.disableAll.bind(this);
        this.doNothing = this.doNothing.bind(this);*/
        this.init();
    }

    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local variables
        -   add this to all method calls
        
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);
        */
    
    init() {
        let boardSquares = document.getElementsByName("square");

        for (let i = 0; i < boardSquares.length; i++) 
        {
            this.squares[i] = boardSquares[i];
            boardSquares[i].onclick = this.handleClick.bind(this, i);
        }
    }

      /*CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line*/
            
    calculateWinner() {
        for (let i = 0; i < this.lines.length; i++) {
            let a = this.lines[i][0];
            let b = this.lines[i][1];
            let c = this.lines[i][2];     
            if (this.squares[a] && 
                this.squares[a] === this.squares[b] && 
                this.squares[a] === this.squares[c]) {
                    this.winner = this.squares[a];
                    this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

      /*HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8*/
    
    handleClick(i) {

        // Get the id from the square and put it in a variable
        // Remember that the id is an integer 0 - 8
        let clickedSquare = event.srcElement.id;
        for (i = 0; i < this.squares.length; i++)
        {
            if (i == clickedSquare)
            {
                if (this.xIsNext == true)
                {    
                    // Set the element in the squares array to the player's symbol
                    event.srcElement.innerHTML = "X";
                    this.squares[clickedSquare] = "X";
                    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
                    document.getElementById(clickedSquare).removeEventListener("onclick", this.handleClick);
                    // Update the variable xIsNext
                    this.xIsNext = false;
                    // If calculateWinner returns true
                    if (this.calculateWinner() == true)
                    {
                    // highlight the winner and disable all of the squares
                        this.highlightWinner();
                        this.disableAll();
                    }
                    // otherwise update the status in the UI to display the player
                    else
                        document.getElementById("status").innerHTML = "Next Player: O";
                }
                else
                {
                    // Repeat above, but change "X" to "O"
                    event.srcElement.innerHTML = "O";
                    this.squares[clickedSquare] = "O";
                    document.getElementById(clickedSquare).removeEventListener("onclick", this.handleClick);
                    this.xIsNext = true;
                    if (this.calculateWinner() == true)
                    {
                        this.highlightWinner();
                        this.disableAll();
                    }
                    else
                        document.getElementById("status").innerHTML = "Next Player: X";    
                }
            }
        }
    }

    highlightWinner() {
        if (!this.xIsNext)
        // Update the status in the UI to display the winner
            document.getElementById("status").innerHTML = "Player X Wins!";
        else
            document.getElementById("status").innerHTML = "Player O Wins!";
        // Iterate through the winningLine array.  It contains the indices of the winning squares
        for (let i = 0; i < this.winningLine.length; i++)
        {
            //      get the next square using the current index in the winningLine array as the id
            //      add the class red to the square
            document.getElementById(this.winningLine[i]).style.color = "red";   
        }
        // Disable all of the squares
        this.disableAll();
    }

    disableAll() {
        // Set the onclick handler for all squares to function that does nothing
        // The id of the square is a number 0 - 8
        for (let i = 0; i < this.squares.length; i++)
        {
            this.squares[i].onclick = this.doNothing();
        }
    }
    
    doNothing() {
        return null;
    }
}

// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => { ttt = new TTT(); };