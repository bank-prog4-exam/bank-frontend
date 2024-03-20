"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetAccount } from "../table";

export function ListBalance() { 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const accounts = useGetAccount();

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-center mb-4">
                <DatePicker selected={selectedDate} onChange={handleDateChange} />
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Account ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Principal balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Loans
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Loan interest
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{account.unique_account_number}</td>
                            <td className="px-6 py-4">${account.principal_balance}</td>
                            <td className="px-6 py-4">${0}</td>
                            <td className="px-6 py-4">${0}</td>
                            <td className="px-6 py-4">{selectedDate.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
