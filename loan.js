// Function to calculate the loan amount
function calculateLoanAmount() {
  // Get the input values
  var amount = document.getElementById('amount').value;
  var interest = document.getElementById('interest').value;
  var years = document.getElementById('years').value;
  
  // Validate the input values
  if (amount == "" || interest == "" || years == "") {
    alert("Please enter valid input values.");
    return;
  }

  // Calculate the monthly payment, total payment, and total interest
  var principal = parseFloat(amount);
  var monthlyInterest = parseFloat(interest) / 100 / 12;
  var totalPayments = parseFloat(years) * 12;
  var x = Math.pow(1 + monthlyInterest, totalPayments);
  var monthlyPayment = (principal*x*monthlyInterest)/(x-1);
  var totalPayment = monthlyPayment * totalPayments;
  var totalInterest = totalPayment - principal;

  // Get the currency symbol based on the selected currency
  var currency = document.getElementById('currency').value;
  var currencySymbol;
  if (currency === 'usd') {
    currencySymbol = '$';
  } else if (currency === 'eur') {
    currencySymbol = '€';
  } else if (currency === 'gbp') {
    currencySymbol = '£';
  } else {
    currencySymbol = '';
  }

  // Display the loan results with an animation
  var monthlyPaymentEl = document.getElementById('monthly-payment');
  var totalPaymentEl = document.getElementById('total-payment');
  var totalInterestEl = document.getElementById('total-interest');
  var resultsEl = document.getElementById('results');
  resultsEl.style.display = 'none';
  monthlyPaymentEl.value = '';
  totalPaymentEl.value = '';
  totalInterestEl.value = '';
  var counter = 0;
  var interval = setInterval(function() {
    monthlyPaymentEl.value = currencySymbol + (monthlyPayment / 100).toFixed(2);
    totalPaymentEl.value = currencySymbol + (totalPayment / 100).toFixed(2);
    totalInterestEl.value = currencySymbol + (totalInterest / 100).toFixed(2);
    resultsEl.style.display = 'block';
    counter++;
    if (counter === 10) {
      clearInterval(interval);
    }
  }, 100);
}
