let currentTotal = 0;

let debounce = false;

let num = 0;

const winArray = ["00","27","10","25","29","12","8","19"
    ,"31","18","6","21","33","16","4","23","35","14","2",
    "0","28","9","26","30","11","7","20","32","17","5","22",
    "34","15","3","24","36","13","1"]


function spinOut(type, value, bet){
    let newNum = Math.ceil(Math.random() * 38);
    console.log(num);
    let result = parseInt(winArray[newNum]);

    moveWheel(newNum);

    if (type === "Even"){
        if ((result%2 === 0)&&(newNum!==0)&&(newNum!==19)){
            return bet*2;
        } else {
            return -bet;
        }
    } else if (type === "Odd"){
        if ((result%2 === 1)&&(newNum!==0)&&(newNum!==19)){
            return bet*2;
        } else {
            return -bet;
        }
    } else if (type === "Individual Number"){
        if (result === value){
            return bet*10;
        } else {
            return -bet;
        }
    } else if (type === "Red") {
        if ((newNum%2 === 1)&&(newNum!==0)&&(newNum!==19)){
            return bet*2;
        } else {
            return -bet;
        }
    } else if (type === "Black") {
        if ((newNum%2 === 0)&&(newNum!==0)&&(newNum!==19)){
            return bet*2;
        } else {
            return -bet;
        }
    }
}

function moveWheel(new_num){
    if (!debounce) {
        debounce = !debounce;
        let wheel = document.getElementById("wheel");
        wheel.style.transform = "rotate(" + calcDeg(new_num) + "deg)";
    }

    debounce = !debounce;
}

function calcDeg(newNum){
    //solidity
    console.log("newNum:"+newNum+" num:"+num+" diff:"+(newNum-num));
    //solidity
    currentTotal -= 360+((newNum-num)/38)*360;
    num = newNum;
    return currentTotal;
}