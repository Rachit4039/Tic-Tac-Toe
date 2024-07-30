let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //if this is true then o will be printed else x 

const winPatterns = [[0,1,2] , [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];


const resetGame = () => {
    turn0 = true;
    enabledboxes();
    msgcontainer.classList.add("hide");
};



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box clicked");
        if(turn0){

            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText="X";
            turn0 = true;
        }
        box.disabled = true; // once the box is clicked it does not get clicked for 2nd time
        checkwinner();
        if (!checkwinner()) {
            checkDraw();
          }
        
    });
});

const disabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner=(winner)=>{
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
}
const checkwinner = () =>{
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!="" ){
            if(pos1val === pos2val && pos2val===pos3val){

                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

const checkDraw = () => {
    let allFilled = true;
    for (let box of boxes) {
      if (box.innerText === "") {
        allFilled = false;
        break; 
      }
    }
  
    
    if (allFilled ) { 
      msg.innerText = `It's a Draw!`;
      msgcontainer.classList.remove("hide");
      disabledboxes();
    }
  };



newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);