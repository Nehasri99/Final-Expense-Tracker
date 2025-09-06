import React from 'react';
// The import statement for ExpenseDetails has been removed to fix the error.

function BalanceSummary({ expenses }) {
    const incomeAmt = expenses
        .filter(item => item.amount > 0)
        .reduce((acc, item) => acc + item.amount, 0);

    const expenseAmt = expenses
        .filter(item => item.amount < 0)
        .reduce((acc, item) => acc + Math.abs(item.amount), 0);
        
    const balance = incomeAmt - expenseAmt;

    return (
        <div className="card balance-section">
            <h2>Your Balance</h2>
            <p className="balance-amount">₹{balance.toFixed(2)}</p>
            <ExpenseDetails incomeAmt={incomeAmt.toFixed(2)} expenseAmt={expenseAmt.toFixed(2)} />
        </div>
    );
}

// This component is defined and used within the same file, so no import is needed.
function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div className="summary-details">
            <div className="income-card">
                <h3 className="summary-title">Income</h3>
                <p className="summary-value">₹{incomeAmt}</p>
            </div>
            <div className="expense-card">
                <h3 className="summary-title">Expense</h3>
                <p className="summary-value">₹{expenseAmt}</p>
            </div>
        </div>
    );
}

export default BalanceSummary;