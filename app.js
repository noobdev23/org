setTimeout(calculateLoanAmount,2000);

function calculateLoanAmount() {

    // Get user input
    const principal = parseFloat(document.getElementById("amount").value);
    const interestRate = parseFloat(document.getElementById("interest").value) / 100;
    const years = parseFloat(document.getElementById("years").value);
    const currency = document.getElementById("currency").value;

    // Calculate monthly payment
    const monthlyInterestRate = interestRate / 12;
    const totalPayments = years * 12;
    const x = Math.pow(1 + monthlyInterestRate, totalPayments);
    const monthlyPayment = (principal * x * monthlyInterestRate) / (x - 1);

    // Check for valid input
    if (isNaN(principal) || isNaN(interestRate) || isNaN(years) || principal < 0 || interestRate < 0 || years < 0) {
        alert("Please enter valid input values");
        return;
    }

    // Calculate amortization table
    const table = document.getElementById("amortization-body");
    table.innerHTML = "";
    let balance = principal;
    for (let i = 1; i <= totalPayments; i++) {
        const paymentDate = new Date();
        paymentDate.setMonth(paymentDate.getMonth() + i);
        const startingBalance = balance;
        const interest = balance * monthlyInterestRate;
        const principalPaid = monthlyPayment - interest;
        balance -= principalPaid;

        const row = table.insertRow();
        const paymentNo = row.insertCell(0);
        const date = row.insertCell(1);
        const starting = row.insertCell(2);
        const payment = row.insertCell(3);
        const principal = row.insertCell(4);
        const interestCell = row.insertCell(5);
        const ending = row.insertCell(6);

        paymentNo.innerHTML = i;
        date.innerHTML = paymentDate.toLocaleDateString();
        starting.innerHTML = `${currency} ${startingBalance.toFixed(2)}`;
        payment.innerHTML = `${currency} ${monthlyPayment.toFixed(2)}`;
        principal.innerHTML = `${currency} ${principalPaid.toFixed(2)}`;
        interestCell.innerHTML = `${currency} ${interest.toFixed(2)}`;
        ending.innerHTML = `${currency} ${balance.toFixed(2)}`;
    }

    // Display results
    document.getElementById("monthly-payment").value = `${currency} ${monthlyPayment.toFixed(2)}`;
    document.getElementById("total-payment").value = `${currency} ${(monthlyPayment * totalPayments).toFixed(2)}`;
    document.getElementById("total-interest").value = `${currency} ${(monthlyPayment * totalPayments - principal).toFixed(2)}`;
    document.getElementById("results").style.display = "block";
    document.getElementById("amortization").style.display = "block";
 }

// Create an array to hold the data for the chart
var chartData = [];

// Loop through each row in the amortization table and add it to the chart data array
var tableRows = document.getElementById("amortization-body").getElementsByTagName("tr");
for (var i = 0; i < tableRows.length; i++) {
    var row = tableRows[i].getElementsByTagName("td");
    chartData.push({
        x: row[1].textContent,
        y: parseFloat(row[6].textContent)
    });
}

// Get the canvas element and create a new Chart object with the data
var canvas = document.getElementById("amortization-chart");
var chart = new Chart(canvas, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Ending Balance',
            data: chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'month'
                }
            }]
        }
    }
});
