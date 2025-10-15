const form = document.getElementById("converterForm")
const amount = document.getElementById("amount")
const formCurrency = document.getElementById("formCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const toCurrency = document.getElementById("toCurrency")
const loading = document.querySelector(".loading")
const result = document.querySelector(".result")
const error = document.querySelector(".error")

const API_URL = "https://api.exchangerate-api.com/v4/latest/"



async function convertMoney() {


    loading.style.display = "block"
    result.style.display = "none"
    error.style.display = "none"

    try {
        const response = await fetch(API_URL + formCurrency.value)
        const data = await response.json()

        const rate = data.rates[toCurrency.value]
        const ConvertedValue = (amount.value * rate).toFixed(2)

        convertedAmount.value = ConvertedValue
        result.style.display = "block"

        result.innerHTML = `
        <div style="font-size: 1.4rem;">
            ${amount.value} ${formCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>

        <div style="font-size: 0.9rem; opacity: 0.8;margin-top: 10px;">
            Taxa: 1 ${formCurrency.value} = ${rate} ${toCurrency.value}
        </div>

        `

    }
    catch (err) {
        error.style.display = "block"
        error.innerHTML = `Falha ao converter moeda! Tente novamente`
    }

    loading.style.display = "none"
}

form.addEventListener("submit", function (e) {
    e.preventDefault()
    convertMoney()
})