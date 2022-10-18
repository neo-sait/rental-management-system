//this module provides the calculations for three parameters:
// cash flow, equity, and total gains

// the parameter for every calculation accepts an array
// these calculations have to be made on multiple properties
// the array parameter is assumed to be formatted in the following manner:
/*
[ 
    Property: { 
        timeOfPurchasePrice : number ,
        currentPrice : number,
        Category2: { <-- assumed to be named Category2, as per the specifications in the project document
            currentTotalRevenue : number,
            currentTotalExpense : number,
        },
        currentPrincipal : number
    } 

]
*/

// Cash Flow Equation (as given in the document)
// a - b
// whereas
// a = Total revenue to date
// b = Total expenses to date
// note: These two pieces of data are from Category 2, Col 11. (Project Doc)

const cashFlow = (array) =>{
    let netRevenue = 0;
    let netExpense = 0;

    for (let i = 0; i < array.length; i++){
        netRevenue += array[i].Category2["currentTotalRevenue"];
        netExpense += array[i].Category2["currentTotalExpense"];
    }

    return (netRevenue-netExpense);
}

// Equity Equation (as given in the document)
// (b + d) - (a + c) + (g + h)
// whereas
// term (b + d) is the sum of all properties' current price
// term (a + c) is the sum of all properties' price at the time of purcahse
// term (g + h) is the sum of all properties' principal to date

const equity = (array) =>{
    let result;
    let netCurrentPrice = 0;
    let netTimeOfPurchasePrice = 0;
    let netPrincipal = 0;

    for (let i = 0; i < array.length; i++){
        netCurrentPrice += array[i].currentPrice;
        netTimeOfPurchasePrice += array[i].timeOfPurchasePrice;
        netPrincipal += array[i].currentPrincipal;
    }

    // according  to BEDMAS rules, subtraction in equation take priority over addition
    // this section ensures this confirms
    result = netCurrentPrice - netTimeOfPurchasePrice;
    result += netTimeOfPurchasePrice;

    return result;
}

// Total Gains Equation (as given in the document)
// (e - f) + (b + d) - (a + c) + (g + h)
// whereas
// term (e - f) is the cash flow
// expression (b + d) - (a + c) + (g + h) is the equity

const totalGains = (array) =>{
    let netCashFlow = cashFlow(array);
    let netEquity = equity(array);
    
    return (netCashFlow + netEquity);
}

module.exports = {cashFlow, equity, totalGains};