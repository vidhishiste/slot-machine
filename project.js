// 1. deposit some money
// 2. determine the number of lines to bet on
// 3. collect a bet amt
// 4. spin the slot machine
//  5. check if the user won 
// 6. give the user their winnings
// 7. play again

// note that all of the tasks defined above have been coded into several functions of code.this makes the code reusable and clean 
// also easy in debugging if somewhere the code is going wrong I can easily spot the function and change it .
// all the below code is written in terms of different functions 
// /this helps us to debug the code easily


const prompt = require("prompt-sync")();
  // calling the function ... importing the prompt package 
  const ROWS = 3;
  const COLS = 3;
  const SYMBOL_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
  }

  const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
  }
 
const deposit = () => {
  while(true){
    const depositMoney = prompt("Enter a deposit amt : ");
    const amt = parseFloat(depositMoney);
    if(isNaN(amt) || amt <= 0){
      console.log("Invalid Input , try again");
    }
    else{
      return amt;
    }
  }
};

const no_of_lines = () => {
  while(true){
  const lines = prompt("Enter the number of lines to bet on (1-3) :");
  const numberOfLines = parseFloat(lines);
    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
      console.log("Invalid Input , try again");
    }
    else{
      return numberOfLines;
    }
  }
};

const get_bet = (balance,number_lines) => {
  while(true){
    const betAmt = prompt("Enter a bet amt per line : ");
    const BettingAmt = parseFloat(betAmt);
    if(isNaN(BettingAmt) || BettingAmt > balance/number_lines || BettingAmt <=0){
      console.log("Invalid Input , try again");
    }
    else{
      return BettingAmt;
    }
  }
};

const spin = () => {
  const symbols = [];
  for(const [symbol , count] of Object.entries(SYMBOL_COUNT)){
      for(let i=0 ; i<count ; i++){
        symbols.push(symbol);
      }
  }

const reels = [];
for(let i = 0 ; i< COLS ; i++){   
  reels.push([]);
    const reelsymbols = [...symbols];                       // generating the available symbols from above array of symbols
  for(let j = 0 ; j< ROWS ; j++){
    const randomIndex = Math.floor(Math.random() *(reelsymbols.length))
      const selected_symbols = reelsymbols[randomIndex];
      reels[i].push(selected_symbols);
      reelsymbols.splice(randomIndex,1);   // splice helps in removing an element from a given index
      // here we pass a random index using a math. random function  this will generate a number between 0 and 1. this random number after multiplying 
     // with 3 will give a number , take its floor value and pass it as an index
  }
}
return reels;
};

const transpose = (reels) => {
  const rows = [];

  for(let i = 0 ; i< ROWS ; i++){
    rows.push([]);
    for(let j = 0 ; j< COLS ; j++){
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printrows = (rows) =>{
  for(const row of rows){
    let rowstring = "";
    for(const [i,symbol] of row.entries()) {
      rowstring  += symbol;
      if(i != row.length - 1){
        rowstring += " | ";
      }
    }
    console.log(rowstring);
  }
};

const getWinnings = (rows , bet , number_lines) => {
  let winnings = 0;
  for(let row = 0 ; row < number_lines ; row++){
        const letters = rows[row];
       let issame = true;
       for(symbol of letters){
        if(symbol != letters[0]){
          issame = false;
          break;
        }
        else{
          issame = true;
        }
       }
       if(issame){
        winnings += bet*SYMBOL_VALUES[letters[0]];
       }
  }

return(winnings);
};
 
const game = () => {

  let balance =  deposit();
  while(true){
    console.log("The current balance amount is : $"+balance);
const number_lines = no_of_lines();
const bet = get_bet(balance , number_lines);
balance -= bet*number_lines;
const reels = spin();
const rows = transpose(reels);
printrows(rows);
const winnings = getWinnings(rows,bet,number_lines);
balance += winnings;
console.log("Your winning amount : $ "+winnings);

if(balance < 0) 
{
  console.log("Insufficient balance !")
  break;
}
const playagain = prompt("Do want to still continue playing type (y/n)")
if(playagain != "y"){
  break;
}
}

};

game();
