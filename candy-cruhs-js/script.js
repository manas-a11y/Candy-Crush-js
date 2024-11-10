var candies = ["Blue", "Green", "Red", "Yellow","Orange", "Purple"];
var board = [];
var columns = 9;
var rows = 9;
var score = 0;

var currTile;
var otherTile;


window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushcandy();
        slidecandy();
        genratecandy();
    },100);
}
function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];

}

function startGame(){
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c= 0; c < columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + c.toString();
            tile.src = "/image/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragover);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart(){
    currTile = this;
}
function dragover(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){

}
function dragDrop(){
     otherTile = this;
}
function dragEnd(){
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    let currchords = currTile.id.split("");
    let r = parseInt(currchords[0]);
    let c = parseInt(currchords[1]);

    let otherchords = otherTile.id.split("");
    let r2 = parseInt(otherchords[0]);
    let c2 = parseInt(otherchords[1]);

    let moveleft = c2 ==c-1 && r == r2;
    let moveright = c2 == c+1 && r == r2;

    let moveup = r2 == r-1 && c == c2;
    let movedown = r2 == r + 1 && c == c2;

    let isAdjacent = moveleft || moveright || moveup || movedown;

    if(isAdjacent){
        let currimg = currTile.src;
        let otherimg = otherTile.src;
        currTile.src = otherimg;
        otherTile.src = currimg;

        let validmove = checkvalid();
        if(!validmove){
            let currimg = currTile.src;
            let otherimg = otherTile.src;
            currTile.src = otherimg;
            otherTile.src = currimg;
        }
    } 
}
function crushcandy(){
    crushthree()
    document.getElementById("score").innerHTML = score;
}
function crushthree(){
    for(let r=0; r<rows;r++){
        for(let c = 0;c<columns-2;c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "image/blank/blank.png";
                candy2.src = "image/blank/blank.png";
                candy3.src = "image/blank/blank.png";
                score+=30;
                
            }
        }
    }
    for(let c=0; c<columns;c++){
        for(let r = 0;r<rows-2;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "image/blank/blank.png";
                candy2.src = "image/blank/blank.png";
                candy3.src = "image/blank/blank.png";
                score+=30;
                
            }
        }
    }   
}

function checkvalid(){
    for(let r=0; r<rows;r++){
        for(let c = 0;c<columns-2;c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
               return true;
            }
        }
    }
    for(let c=0; c<columns;c++){
        for(let r = 0;r<rows-2;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
                
            }
        }
    }  
    return false;
}
function slidecandy(){
    for(let c= 0;c<columns;c++){
        let ind = rows-1 ;
        for(let r = columns-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for(let r=ind;r>=0;r-- ){
            board[r][c].src ="image/blank/blank.png";
        }
    }
}

function genratecandy(){
    for(let c = 0;c < columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = "/image/" + randomCandy() + ".png";
        }
    }
}