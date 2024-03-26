"use client"
import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';



interface Account {
    id: string,
    lastName: string,
    firstName: string,
    dateOfBirth: Date,
    monthlyNetSalary: number,
    uniqueAccountNumber: string,
    overdraftStatus: boolean,
    principalBalance: number,
    lastOverdraftActivity: string
}

export function useGetAccount() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/all_accounts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    return accounts
}

export default function TableAccount() {
    const data = useGetAccount();

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            First name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date of birth
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Net salary month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Unique account number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Principal Balance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            overdraft
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Update
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(account => (
                        <tr key={account.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.lastName}</td>
                            <td className="px-6 py-4">{account.firstName}</td>
                            <td className="px-6 py-4">{new Date(account.dateOfBirth).toLocaleDateString()}</td>
                            <td className="px-6 py-4">${account.monthlyNetSalary}</td>
                            <td className="px-6 py-4">{account.uniqueAccountNumber}</td>
                            <td className="px-6 py-4">${account.principalBalance}</td>
                            <td className="px-6 py-4">${account.lastOverdraftActivity}</td>
                            <td className="px-6 py-4">
                                <button >
                                    <a href={`/account/${account.id}`}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
