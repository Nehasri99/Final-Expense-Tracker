import React, { useEffect, useState, useCallback, useMemo } from 'react'; // --- New: Added useMemo ---
import { ToastContainer, toast } from 'react-toastify';
import { getExpenses, addTransaction, deleteExpense, getExpensesByDateRange } from '../services/apiService';
import Header from '../components/layout/Header';
import BalanceSummary from '../components/dashboard/BalanceSummary';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import ExpenseTable from '../components/dashboard/ExpenseTable';
import ExpenseChart from '../components/dashboard/ExpenseChart'; // --- New: Import the chart component ---
import './Home.css';

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');

    // --- New: This block processes your expense data for the chart ---
    const processedChartData = useMemo(() => {
        // Filter for expenses only (negative amounts)
        const expenseData = expenses.filter(item => item.amount < 0);

        // Group expenses by category and sum their totals
        const groupedData = expenseData.reduce((acc, current) => {
            const category = current.category;
            const amount = Math.abs(current.amount);

            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += amount;
            return acc;
        }, {});

        // Convert the final object into an array that Recharts can use
        return Object.entries(groupedData).map(([name, value]) => ({
            name,
            value,
        }));
    }, [expenses]); // This logic re-runs only when the 'expenses' state changes

    const fetchAllExpenses = useCallback(async () => {
        try {
            const result = await getExpenses();
            setExpenses(result.data);
        } catch (error) {
            toast.error("Failed to fetch expenses.");
            console.error("Fetch Expenses Error:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllExpenses();
    }, [fetchAllExpenses]);

    const handleAddTransaction = async (data) => {
        try {
            const result = await addTransaction(data);
            toast.success(result.message);
            fetchAllExpenses();
        } catch (error) {
            toast.error(error.message || "Failed to add transaction.");
            console.error("Add Transaction Error:", error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            const result = await deleteExpense(id);
            toast.success(result.message);
            fetchAllExpenses();
        } catch (error) {
            toast.error(error.message || "Failed to delete transaction.");
            console.error("Delete Expense Error:", error);
        }
    };
    
    const handleFilterExpenses = async (startDate, endDate) => {
        try {
            const result = await getExpensesByDateRange(startDate, endDate);
            setExpenses(result.data);
            toast.success("Transactions filtered!");
        } catch(error) {
            toast.error(error.message || "Failed to filter transactions.");
            console.error("Filter Error:", error);
        }
    };

    return (
        <div className="home-container">
            <ToastContainer />
            <Header onFilter={handleFilterExpenses} />

            <div className="tabs">
                <button 
                    className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('transactions')}
                >
                    Transactions
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'dashboard' && (
                    <>
                        <BalanceSummary expenses={expenses} />
                        {/* --- New: Render the chart component with the processed data --- */}
                        <ExpenseChart data={processedChartData} />
                    </>
                )}

                {activeTab === 'transactions' && (
                    <>
                        <ExpenseForm addTransaction={handleAddTransaction} />
                        <ExpenseTable expenses={expenses} deleteExpense={handleDeleteExpense} />
                    </>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;