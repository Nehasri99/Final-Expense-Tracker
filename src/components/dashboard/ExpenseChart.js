import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define some colors for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const ExpenseChart = ({ data }) => {
    // If there's no data, show a message
    if (!data || data.length === 0) {
        return (
            <div className="chart-container card">
                <h3>Expense Summary</h3>
                <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                    No expense data to display. Add some transactions to see the chart.
                </p>
            </div>
        );
    }

    return (
        <div className="chart-container card">
            <h3>Expense Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => entry.name}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;