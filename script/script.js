/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bomb", "fa fa-bicycle", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bomb", "fa fa-bicycle"];

shuffle(icons);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardsContainer = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];

// Starting the game Function

function startGame() {
    for (let i = 0; i < icons.length; i++) {
    const card = document.createElement('li');
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);
    
    clickCards(card);
    
}}

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Create the click Event 
    
function clickCards(card){
    card.addEventListener("click", function (){
        
        const currentCard = this;
        const previousCard = openedCards[0];
        
        if (openedCards.length === 1) {
    
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            
            // Comparing Cards
            
            comaparingCards(currentCard, previousCard);
            
        } else {
            
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}

// Comparing Cards Function

function comaparingCards(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
                
                // Matched Cards
                
                currentCard.classList.add("match");
                previousCard.classList.add("match");
                
                matchedCards.push(currentCard, previousCard);
                
                openedCards = [];
                
                // Ending the game if all cards are matched
                
                isOver();
                
            } else {
                
                setTimeout(function(){
                    previousCard.classList.remove("open", "show", "disable");
                    currentCard.classList.remove("open", "show", "disable");                
                },500);

                
                openedCards = [];
            }
            addMoves();
        }

// Checking if the game is over Function

function isOver() {
    if(icons.length === matchedCards.length) {
        alert(`Congratulations!\n You took ${moves} moves`);
    }
}

// Restart the Game

const restartBtn = document.querySelector('.restart');

restartBtn.addEventListener('click', function(){
   
    // Delete all cards in the deck
    
    cardsContainer.innerHTML = "";
    
    // Start the Game again
    
    startGame();
     
    // Empty any variable that may contain any data from previous game
    
    matchedCards = [];
    
    moves = 0;
    
    movesCount.innerHTML = 0;

    starsCount.innerHTML = star + star + star;



});

// Counting the moves 

const movesCount = document.querySelector('.moves');

let moves = 0;

function addMoves() {
    moves++;
    movesCount.innerHTML = moves;
    rating();
}

// Ratings

const starsCount = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsCount.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsCount.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsCount.innerHTML = star + star;
    } else {
        starsCount.innerHTML = star;
    }
}

