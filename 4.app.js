
const BASE_URL =
  "https://v6.exchangerate-api.com/v6/2f0a49d25d168bd94634ca5e/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(code in countryList){
//   console.log(code,countryList[code]);
// };

// to get list of all country currency in dropdown
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selctkrooo";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selctkrooo";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExhangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value,toCurr.value);

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
  let response = await fetch(URL);
  // console.log(response);
  let data = await response.json();
  let rate = data.conversion_rate;
  // console.log(data);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
};

// to change the image also when currency selected
const updateFlag = (element) => {
  let currCode = element.value;
  //  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// on pressing exchange button
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //isse jo kuch bhi pehle ho rha tha button press krne se wo nhi hoga e.g refresh
  updateExhangeRate();
});

window.addEventListener("load",
  () => {
    updateExhangeRate();
  });
