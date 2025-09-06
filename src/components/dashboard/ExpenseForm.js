import React, { useState } from 'react';
import { handleError } from '../../utils';

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        type: 'expense',
        category: ''
    });

    const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount' && parseFloat(value) < 0) return;

        setExpenseInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, text, type, category } = expenseInfo;
        if (!amount || !text) return handleError('Please add transaction details.');
        if (type === 'expense' && !category) return handleError('Please select a category for expenses.');
        
        const transactionAmount = type === 'income' ? Math.abs(parseFloat(amount)) : -Math.abs(parseFloat(amount));

        addTransaction({ text, amount: transactionAmount, category });
        setExpenseInfo({ amount: '', text: '', type: 'expense', category: '' });
    };

    return (
        <div className='card expense-form'>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='text'>Transaction Detail</label>
                    <input onChange={handleChange} type='text' name='text' placeholder='e.g., Coffee, Movie Tickets...' value={expenseInfo.text} required />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input onChange={handleChange} type='number' name='amount' placeholder='Enter amount...' value={expenseInfo.amount} required />
                </div>
                <div>
                    <label htmlFor='type'>Type</label>
                    <select name="type" onChange={handleChange} value={expenseInfo.type}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
                {expenseInfo.type === 'expense' && (
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category" onChange={handleChange} value={expenseInfo.category} required>
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button type='submit'>Add Transaction</button>
            </form>
        </div>
    );
}

export default ExpenseForm;