import React from 'react';

const ExpenseTable = ({ expenses, deleteExpense }) => {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="card expense-table-container">
                <p style={{ textAlign: 'center', color: '#666' }}>No transactions to display.</p>
            </div>
        );
    }

    // Sort expenses by date, newest first
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="card expense-table-container">
            <h2>Transaction History</h2>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map((transaction) => (
                        <tr key={transaction._id}>
                            <td className={`transaction-type ${transaction.amount > 0 ? 'income' : 'expense'}`}>
                                {transaction.amount > 0 ? '+' : '-'}
                            </td>
                            <td>{transaction.text}</td>
                            <td>{transaction.amount < 0 ? transaction.category : 'N/A'}</td>
                            <td className={transaction.amount > 0 ? 'transaction-amount positive' : 'transaction-amount negative'}>
                                ₹{Math.abs(transaction.amount)}
                            </td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteExpense(transaction._id)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;