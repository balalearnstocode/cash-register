function validateNumber() {
  let price = document.getElementById("price").value;
  let payment = document.getElementById("payment").value;
  let cid = "[" + document.getElementById("cid").value + "]";
  document.getElementById("result").innerHTML = JSON.stringify(checkCashRegister(price, payment, JSON.parse(cid)));
}

function clearText() {
  document.getElementById("price").value = "19.5";
  document.getElementById("payment").value = "20";
  document.getElementById("cid").value = `["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]`;
  document.getElementById("result").innerHTML = "";
}
let currency = {
  "ONE HUNDRED": 100,
  "TWENTY": 20,
  "TEN": 10,
  "FIVE": 5,
  "ONE": 1,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01,
}

function checkCashRegister(price, cash, cid) {
  let sum = cid.reduce((total, nextNum) => total + nextNum[1], 0);
  sum = Math.round(sum * 100)/100;
  let change = cash-price;
  let result = [];
  let status = "";
  if ( change === sum ) {
    status = "CLOSED";
    result = cid;
  }else if(change > sum) {
    status = "INSUFFICIENT_FUNDS";
  } else {
    let revCid = cid.reverse();
    for(let i = 0; i < revCid.length; i++) {
      let currencyVal = currency[revCid[i][0]];
      if(change > currencyVal){
        let obj = [];
        obj.push(revCid[i][0]);

        let paid = Math.floor(change/currencyVal) * currencyVal;
        if(paid > revCid[i][1]){
          paid = revCid[i][1];
        }
        obj.push(paid);
        change = Math.round((change-paid)*100)/100;
        result.push(obj);
      }
    }
    status = (cash-price) === sum ? "CLOSED" : "OPEN";

    if(change !== 0){
      status = "INSUFFICIENT_FUNDS";
      result = [];
    }
  }
  return { "status" : status, "change": result };
}
