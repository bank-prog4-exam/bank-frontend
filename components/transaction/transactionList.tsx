"use client"
import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';

interface Transaction {
    id: string,
    id_account: string,
    transaction_amount: number,
    transaction_type: string,
    reason: string,
    effective_date: Date,
    registration_date: Date
}

function useGetTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/transactions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    return transactions;
}

export default function TableTransaction() {
    const data = useGetTransactions();
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Transaction ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Account ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reason
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Effective Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Registration Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(transaction => (
                        <tr key={transaction.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{transaction.id}</td>
                            <td className="px-6 py-4">{transaction.id_account}</td>
                            <td className="px-6 py-4">{transaction.transaction_amount}</td>
                            <td className="px-6 py-4">{transaction.transaction_type}</td>
                            <td className="px-6 py-4">{transaction.reason}</td>
                            <td className="px-6 py-4">{new Date(transaction.effective_date).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(transaction.registration_date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
