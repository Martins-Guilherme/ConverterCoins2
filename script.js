const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const button = document.getElementById("converterBtn");
const resetButton = document.getElementById("resetBtn");

const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

// const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const convertMoney = async () => {
  loading.style.display = "block";
  resetButton.style.display = "block";

  button.style.display = "none";
  error.style.display = "none";
  result.style.display = "none";

  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;
  const amountValue = Number(amount.value).toFixed(2);
  try {
    const response = await fetch(
      `https://apiconvertercoins2.onrender.com/api/enchange/${fromValue}`
    );

    const data = await response.json();
    console.log(data);

    const rates = data.rates[toValue].toFixed(2);
    const convertedValue = (amountValue * rates).toFixed(2);

    result.style.display = "block";
    convertedAmount.value = convertedValue;
    result.innerHTML = `
      <div style="font-size: 1.4rem;">
        <p>${amountValue} ${fromValue} = ${convertedValue} ${toValue}</p>
        <div style="font-size: 0.9rem; opacity: 0.8;margin-top: 0.2rem">
          <p>Taxa de conversão: 1 ${fromValue} = ${rates} ${toValue}</p>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    error.style.display = "block";
    error.innerHTML = `
      <p>Erro ao converter moeda. <br>Tente novamente.</p>
    `;
  }
  loading.style.display = "none";
};

form.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  convertMoney();
});

form.addEventListener("reset", function () {
  // Reset the result and error messages when the form is reset
  convertedAmount.value = "";
  result.style.display = "none";
  error.style.display = "none";
  loading.style.display = "none";
  resetButton.style.display = "none";
  button.style.display = "block";
});
