//get access
const select = document.querySelectorAll('#currency')
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const button = document.querySelector('#btn');
const endpoint = "https://api.frankfurter.app";

//get name of currences throught API
getData();
async function getData () {
    const res = await fetch (`${endpoint}/currencies`);
    const result = await res.json();
    
    display(result);
}

//display names in the drop down list
function display(result){
    const entries = Object.entries(result);
    for(let i = 0; i < entries.length; i++){
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
}

//add event to the button to make convert currencies.
button.addEventListener('click', getResult);

function getResult(){
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = input.value;

    if(currency1 != currency2){
        convert(currency1, currency2, value);
    }
    else{
        Swal.fire({
            icon: 'error',
            
            text: 'Choose Different Currencies!!!',
            
          })
          
        // alert("Choose Different Currencies!!!")
    }
}

async function convert (currency1, currency2, value){
    const resCurrencies = await fetch(`${endpoint}/latest?amount=${value}&from=${currency1}&to=${currency2}`);
    const resultCurrencies = await resCurrencies.json();
    console.log(resultCurrencies);
    displayCurrencies(resultCurrencies)
}

function displayCurrencies(resultCurrencies){
    result.value = (Object.values(resultCurrencies.rates)[0]).toFixed(2);
}








