"use client"
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; 
import { useGetAccount } from "../table";

interface AccountData {
    loan: number;
    principalBalance: number;
    loanInterest: number;
}

export function ListBalance() { 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [accountData, setAccountData] = useState<AccountData[] | null>(null);
    const accounts = useGetAccount();

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedDate = format(selectedDate, "yyyy-MM-dd HH:mm:ss");
                const promises = accounts.map(async account => {
                    const response = await fetch(`http://localhost:8080/account_balance/${account.id}/${formattedDate}`);
                    return response.json();
                });
                const data: AccountData[] = await Promise.all(promises);
                setAccountData(data);
            } catch (error) {
                console.error('Error fetching account balance:', error);
            }
        };
    
        fetchData();
    }, [selectedDate, accounts]);
    

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-center mb-4">
                <DatePicker selected={selectedDate} onChange={handleDateChange} showTimeSelect timeFormat="HH:mm" timeIntervals={1} dateFormat="dd/MM/yyyy HH:mm:ss" />
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
                    {accountData && accountData.map((data: AccountData, index: number) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{accounts[index].id}</td>
                            <td className="px-6 py-4">${data.principalBalance}</td>
                            <td className="px-6 py-4">${data.loan}</td>
                            <td className="px-6 py-4">${data.loanInterest}</td>
                            <td className="px-6 py-4">{format(selectedDate, 'dd/MM/yyyy HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
