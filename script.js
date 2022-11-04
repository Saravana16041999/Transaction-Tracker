`use strict`

const MainBalance = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expancesEl = document.getElementById(`money-minus`);
const historyEl = document.getElementById('list');
const SubmitEl = document.getElementById('form');
const TransactionEl = document.getElementById(`transaction`);
const amountEl = document.getElementById('amount')

let transactions = []

transactions = localStorage.getItem('transactions') != null ? 
JSON.parse(localStorage.getItem('transactions')):[];

const init = function(){
    historyEl.innerHTML = null
    transactions.forEach(addTransactionDom)
}

function addTransactionDom(transaction){
    const sign = transaction.amount < 0 ? '-':'+';
    let iteam = document.createElement('li');
    iteam.classList.add(transaction.amount > 0 ? 
        'pluss_iteams':'minus_iteam');
    iteam.innerHTML = `<p>${transaction.transaction}</p> 
    <span>${transaction.amount}</span>
    <button class="delete_btn" onclick="removetran(${transaction.id})">X</button>`
    
    historyEl.appendChild(iteam)
}

function removetran(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions',JSON.stringify(transactions));
    init();
}

function updatevalues(){
    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts.filter((iteam)=> iteam > 0 )
    .reduce((acc,iteam)=> (acc + iteam),0);


    const expances = amounts.filter((iteam)=>iteam < 0)
    .reduce((acc,iteam)=> (acc + iteam),0 )
    console.log(expances)
    total = income + expances

    incomeEl.innerText = `₹ ${income}`
    expancesEl.innerText = `₹ ${expances}`
    MainBalance.innerText = `₹${total}`
}

SubmitEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (TransactionEl.value.trim() === '' || amountEl.value.trim() === ''){
        alert(`need to fill this for farther action`)
    }else{
        const transactioniteam = {
            id : new Date().valueOf(),
            transaction : TransactionEl.value,
            amount : Number(amountEl.value),
        };
        transactions.push(transactioniteam)

        addTransactionDom(transactioniteam)
        updatevalues()

        localStorage.setItem('transactions',JSON.stringify(transactions))
    }
    TransactionEl.value = null;
    amountEl.value = null

})

init()