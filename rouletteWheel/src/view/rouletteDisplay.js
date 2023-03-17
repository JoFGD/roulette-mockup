rt.view.rouletteDisplay = {
    setupUserInterface: function () {
        var formEl = document.forms['spreadsheet'], selectEl = formEl.selectBet, betTotal = formEl.betAmount;
        var totalChips = document.getElementById("chips");
        var betOptions = ["Odd", "Even", "Individual Number", "Red", "Black"];
        var spinButton = document.getElementById("spin");
        let x = true;

        for (let i=0; i < betOptions.length; i++) {
            let option = betOptions[i];
            let optionEl = document.createElement("option");
            optionEl.text = option;
            if(x){optionEl.style.color = "#da615f"} else{optionEl.style.color = "#000000"}
            selectEl.add(optionEl, null);
        }

        selectEl.addEventListener("change", function () {
            let key = selectEl.value;

            if (key==="Individual Number") {
                let selectEl2 = document.createElement("select");
                selectEl2.id = "tempOptions"
                selectEl.parentElement.appendChild(selectEl2);

                let tempOption = document.createElement("option");
                tempOption.text = "00"
                selectEl2.add(tempOption, null);

                for (let i=0; i < 37; i++){
                    let option = i.toString();
                    let optionEl2 = document.createElement("option");
                    optionEl2.text = option;
                    selectEl2.add(optionEl2, null);
                }
            }  else {
                let elementExists = document.getElementById("tempOptions");
                if (elementExists != null) {
                    elementExists.remove()
                }
            }
        });

        spinButton.onclick = function (){
            let chips = parseInt(totalChips.innerText);
            let bet = betTotal.value;
            console.log(chips, bet, betOptions.includes(selectEl.value))

            if (testSpin(bet, chips, selectEl.value)) {
                console.log("test passed...")
                let elementExists = document.getElementById("tempOptions");
                let result;

                if (elementExists !== null) {
                    result = spinOut(selectEl.value, elementExists.value, bet);
                } else {
                    result = spinOut(selectEl.value, null, bet);
                }

                chips += result;

                totalChips.innerText = chips.toString();
                selectEl.selectedIndex = 0;

                if (elementExists !== null) {
                    elementExists.remove()
                }
                formEl.reset();
            } else {
                console.log("test rejected...")
            }
        }

        function testSpin(_bet, _chips, _type){
            if (isNaN(parseInt(_bet))){
                return false
            }
            if (_bet > _chips){
                return false;
            }
            return (betOptions.includes(_type));
        }

    },
}