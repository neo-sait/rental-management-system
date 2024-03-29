const data = [
    {
      "Num": 1,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 2,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 3,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Deposit Charged",
      "Transact": "Neither",
      "Note": "For the deposit, Darcy paid $1650 cash + $300 for Living Room Curtains and Back Door Knob"
    },
    {
      "Num": 4,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Deposit Paid",
      "Transact": "Revenue",
      "Note": "For the deposit, Darcy paid $1650 cash + $300 for Living Room Curtains and Back Door Knob"
    },
    {
      "Num": 5,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$730.00 ",
      "Method": "Bank Draft",
      "Type": "Property Tax",
      "Transact": "Expense",
      "Note": "Property Tax for Aug 28 to Dec 31 2015"
    },
    {
      "Num": 6,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/28/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$199.00 ",
      "Method": "Bank Draft",
      "Type": "Lawyer Fee",
      "Transact": "Expense",
      "Note": "Weeks Law contingency fee"
    },
    {
      "Num": 7,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2015",
      "Year": 2015,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 8,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2015",
      "Year": 2015,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$137.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 9,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2015",
      "Year": 2015,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$300.00 ",
      "Method": "Cash",
      "Type": "Expense",
      "Transact": "Expense",
      "Note": "Back Door Knob, Living Room Curtains, Hot Water Tank Accessory"
    },
    {
      "Num": 10,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2015",
      "Year": 2015,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$31.00 ",
      "Method": "Visa",
      "Type": "Expense",
      "Transact": "Expense",
      "Note": "Cost for Rent Faster Ad"
    },
    {
      "Num": 11,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2015",
      "Year": 2015,
      "Month": 9,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 12,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 13,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 14,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 15,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/13/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$200.00 ",
      "Method": "Bank",
      "Type": "Lawyer Fee",
      "Transact": "Revenue",
      "Note": "Weeks Law contingency returned"
    },
    {
      "Num": 16,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/30/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 17,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/30/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 18,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/1/2015",
      "Year": 2015,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 19,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/1/2015",
      "Year": 2015,
      "Month": 11,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 20,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/30/2015",
      "Year": 2015,
      "Month": 11,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 21,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/30/2015",
      "Year": 2015,
      "Month": 11,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 22,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/1/2015",
      "Year": 2015,
      "Month": 11,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 23,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/1/2015",
      "Year": 2015,
      "Month": 12,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 24,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2016",
      "Year": 2015,
      "Month": 12,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 25,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 26,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 27,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 28,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/26/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 29,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/26/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 30,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/1/2016",
      "Year": 2016,
      "Month": 1,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 31,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/1/2016",
      "Year": 2016,
      "Month": 2,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 32,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/19/2016",
      "Year": 2016,
      "Month": 2,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 33,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/19/2016",
      "Year": 2016,
      "Month": 2,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 34,
      "Address": "Property 1",
      "House": 1,
      "Date": "3/1/2016",
      "Year": 2016,
      "Month": 2,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 35,
      "Address": "Property 1",
      "House": 1,
      "Date": "3/1/2016",
      "Year": 2016,
      "Month": 3,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 36,
      "Address": "Property 1",
      "House": 1,
      "Date": "3/16/2016",
      "Year": 2016,
      "Month": 3,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 37,
      "Address": "Property 1",
      "House": 1,
      "Date": "3/16/2016",
      "Year": 2016,
      "Month": 3,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 38,
      "Address": "Property 1",
      "House": 1,
      "Date": "4/1/2016",
      "Year": 2016,
      "Month": 3,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 39,
      "Address": "Property 1",
      "House": 1,
      "Date": "4/1/2016",
      "Year": 2016,
      "Month": 4,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 40,
      "Address": "Property 1",
      "House": 1,
      "Date": "4/15/2016",
      "Year": 2016,
      "Month": 4,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 41,
      "Address": "Property 1",
      "House": 1,
      "Date": "4/15/2016",
      "Year": 2016,
      "Month": 4,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 42,
      "Address": "Property 1",
      "House": 1,
      "Date": "5/1/2016",
      "Year": 2016,
      "Month": 4,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 43,
      "Address": "Property 1",
      "House": 1,
      "Date": "5/1/2016",
      "Year": 2016,
      "Month": 5,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 44,
      "Address": "Property 1",
      "House": 1,
      "Date": "5/30/2016",
      "Year": 2016,
      "Month": 5,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 45,
      "Address": "Property 1",
      "House": 1,
      "Date": "5/30/2016",
      "Year": 2016,
      "Month": 5,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 46,
      "Address": "Property 1",
      "House": 1,
      "Date": "6/1/2016",
      "Year": 2016,
      "Month": 5,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 47,
      "Address": "Property 1",
      "House": 1,
      "Date": "6/1/2016",
      "Year": 2016,
      "Month": 6,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 48,
      "Address": "Property 1",
      "House": 1,
      "Date": "6/29/2016",
      "Year": 2016,
      "Month": 6,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 49,
      "Address": "Property 1",
      "House": 1,
      "Date": "6/29/2016",
      "Year": 2016,
      "Month": 6,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 50,
      "Address": "Property 1",
      "House": 1,
      "Date": "6/30/2016",
      "Year": 2016,
      "Month": 6,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$2,139.00 ",
      "Method": "Bank",
      "Type": "Property Tax",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 51,
      "Address": "Property 1",
      "House": 1,
      "Date": "7/1/2016",
      "Year": 2016,
      "Month": 6,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 52,
      "Address": "Property 1",
      "House": 1,
      "Date": "7/1/2016",
      "Year": 2016,
      "Month": 7,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$68.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 53,
      "Address": "Property 1",
      "House": 1,
      "Date": "7/30/2016",
      "Year": 2016,
      "Month": 7,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 54,
      "Address": "Property 1",
      "House": 1,
      "Date": "7/30/2016",
      "Year": 2016,
      "Month": 7,
      "Payer": "Tenant 1",
      "Title": "Tenant",
      "Amount": "$1,950.00 ",
      "Method": "E-Transfer",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 55,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/1/2016",
      "Year": 2016,
      "Month": 7,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 56,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/1/2016",
      "Year": 2016,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$0.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 57,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/1/2016",
      "Year": 2016,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$250.00 ",
      "Method": "Cash",
      "Type": "Expense",
      "Transact": "Expense",
      "Note": "Washer and Dryer Cost"
    },
    {
      "Num": 58,
      "Address": "Property 1",
      "House": 1,
      "Date": "8/31/2016",
      "Year": 2016,
      "Month": 8,
      "Payer": "Tenant 1",
      "Title": "Owner",
      "Amount": "$975.00 ",
      "Method": "Cash",
      "Type": "Deposit Returned",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 59,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2016",
      "Year": 2016,
      "Month": 8,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 60,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 61,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/1/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$31.00 ",
      "Method": "Visa",
      "Type": "Expense",
      "Transact": "Expense",
      "Note": "Cost for Rent Faster Ad"
    },
    {
      "Num": 62,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/12/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 63,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/12/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 64,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/12/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Tenant 1",
      "Title": "Owner",
      "Amount": "$975.00 ",
      "Method": "E-Transfer",
      "Type": "Deposit Returned",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 65,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/22/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$900.00 ",
      "Method": "E-Transfer",
      "Type": "Deposit Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 66,
      "Address": "Property 1",
      "House": 1,
      "Date": "9/22/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$900.00 ",
      "Method": "E-Transfer",
      "Type": "Deposit Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 67,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2016",
      "Year": 2016,
      "Month": 9,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 68,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/1/2016",
      "Year": 2016,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 69,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/7/2016",
      "Year": 2016,
      "Month": 10,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 70,
      "Address": "Property 1",
      "House": 1,
      "Date": "10/7/2016",
      "Year": 2016,
      "Month": 10,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "Cash",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 71,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/1/2016",
      "Year": 2016,
      "Month": 10,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 72,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/1/2016",
      "Year": 2016,
      "Month": 11,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 73,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/2/2016",
      "Year": 2016,
      "Month": 11,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 74,
      "Address": "Property 1",
      "House": 1,
      "Date": "11/2/2016",
      "Year": 2016,
      "Month": 11,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 75,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/1/2016",
      "Year": 2016,
      "Month": 11,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 76,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/1/2016",
      "Year": 2016,
      "Month": 12,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 77,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/1/2016",
      "Year": 2016,
      "Month": 12,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$100.00 ",
      "Method": "Cash",
      "Type": "Expense",
      "Transact": "Expense",
      "Note": "Furnace modification"
    },
    {
      "Num": 78,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/5/2016",
      "Year": 2016,
      "Month": 12,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 79,
      "Address": "Property 1",
      "House": 1,
      "Date": "12/5/2016",
      "Year": 2016,
      "Month": 12,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 80,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2017",
      "Year": 2016,
      "Month": 12,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 81,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/1/2017",
      "Year": 2017,
      "Month": 1,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 82,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/27/2017",
      "Year": 2017,
      "Month": 1,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,800.00 ",
      "Method": "",
      "Type": "Monthly Rent Charged",
      "Transact": "Neither",
      "Note": ""
    },
    {
      "Num": 83,
      "Address": "Property 1",
      "House": 1,
      "Date": "1/27/2017",
      "Year": 2017,
      "Month": 1,
      "Payer": "Tenant 2",
      "Title": "Tenant",
      "Amount": "$1,500.00 ",
      "Method": "",
      "Type": "Monthly Rent Paid",
      "Transact": "Revenue",
      "Note": ""
    },
    {
      "Num": 84,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/1/2017",
      "Year": 2017,
      "Month": 1,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$1,510.00 ",
      "Method": "Bank",
      "Type": "Mortgage",
      "Transact": "Expense",
      "Note": ""
    },
    {
      "Num": 85,
      "Address": "Property 1",
      "House": 1,
      "Date": "2/1/2017",
      "Year": 2017,
      "Month": 2,
      "Payer": "Landlord",
      "Title": "Owner",
      "Amount": "$71.00 ",
      "Method": "Bank",
      "Type": "Insurance",
      "Transact": "Expense",
      "Note": ""
    }

]

module.exports={data};