setTimeout(calculateLoanAmount,2000);
function calculateLoanAmount()
{

    UIamount=document.getElementById("amount");
    UIinterest=document.getElementById("interest");
    UIyears=document.getElementById("years");
    UImonthlyPayment=document.getElementById("monthly-payment");
    UItotalPayment=document.getElementById("total-payment");
    UItotalInterest=document.getElementById("total-interest");

    principal=parseFloat(UIamount.value);
    calculatedInterest=parseFloat(UIinterest.value)/100/12;
    calculatedPayment=parseFloat(UIyears.value)*12;

    x=Math.pow(1+calculatedInterest,calculatedPayment);
    monthly=(principal*x*calculatedInterest)/(x-1);

    if(principal<0)
        alert('Please Enter Positive Amount for Principal...!!');
    else if(calculatedInterest<0)
        alert('Please Enter Positive Interest Rate');
    else if(calculatedPayment<0)
        alert('Please Enter Positive Amount');
    else if(isFinite(monthly)){
        UImonthlyPayment.value=monthly.toFixed(2);
        UItotalPayment.value=(monthly*calculatedPayment).toFixed(2);
        UItotalInterest.value=((monthly*calculatedPayment)-principal).toFixed(2);
        document.getElementById('results').style.display='block';
    }
    else
        alert("Please Check Entered Amount");
}

function calculateAmortization(){
    var loanAmount=parseFloat(document.getElementById("amount").value);
    var interestRate=parseFloat(document.getElementById("interest").value);
    var years=parseFloat(document.getElementById("years").value);

    var monthlyInterestRate=interestRate/(100*12);
    var numberOfPayments=years*12;

    var monthlyPayment=calculateLoanAmount();

    var tableBody=document.getElementById("amortization-body");

    var balance=loanAmount;
    var today=new Date();
    var totalInterest=0;

    tableBody.innerHTML="";

    for(var i=0; i<numberOfPayments; i++){
        var interest=balance*monthlyInterestRate;
        var principal=monthlyPayment-interest;
        balance-=principal;
        totalInterest+=interest;

        var date=new Date(today.getTime());
        date.setMonth(today.getMonth()+i+1);

        var tableRow=document.createElement("tr");

        var paymentNumberColumn=document.createElement("td");
        paymentNumberColumn.innerHTML=i+1;

        var dateColumn=document.createElement("td");
        dateColumn.innerHTML=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();

        var startingBalanceColumn=document.createElement("td");
        startingBalanceColumn.innerHTML=balance+principal;

        var paymentColumn=document.createElement("td");
        paymentColumn.innerHTML=monthlyPayment.toFixed(2);

        var principalColumn=document.createElement("td");
        principalColumn.innerHTML=principal.toFixed(2);

        var interestColumn=document.createElement("td");
        interestColumn.innerHTML=interest.toFixed(2);

        var endingBalanceColumn=document.createElement("td");
        endingBalanceColumn.innerHTML=balance.toFixed(2);

        tableRow.appendChild(paymentNumberColumn);
        tableRow.appendChild(dateColumn);
        tableRow.appendChild(startingBalanceColumn);
        tableRow.appendChild(paymentColumn);
        tableRow.appendChild(principalColumn);
        tableRow.appendChild(interestColumn);
        tableRow.appendChild(endingBalanceColumn);

        tableBody.appendChild(tableRow);
    }

    document.getElementById("total-interest").value=totalInterest.toFixed(2);
    document.getElementById("amortization").style.display="block";
}
