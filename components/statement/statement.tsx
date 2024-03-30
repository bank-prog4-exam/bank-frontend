"use client"
import React, { useEffect, useState } from 'react';
import { useGetAccount } from '..';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

interface Statement {
    id: string;
    idAccount: string;
    statementDate: string;
    reference: string;
    operationMotive: string;
    creditAmount: number;
    debitAmount: number;
    balance: number;
}

export default function Statement() {
    const [statements, setStatements] = useState<Statement[]>([]);
    const listAccount = useGetAccount();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>();

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    }

    const handleEndDateChange = (date: Date) => {
        setEndDate(date);
    }

    const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedAccountId(selectedId);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!selectedAccountId) return;

                const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss");;
                const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss");;

                const url = `http://localhost:8080/account_statement/${selectedAccountId}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setStatements(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedAccountId, startDate, endDate]);

    return (
        <div>
            <div className="flex justify-center gap-2 mb-4">
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    placeholderText='Start date'
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    placeholderText='End date'
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleAccountChange}
                    >
                        <option value="">Select Account :</option>
                        {listAccount.map(account => (
                            <option key={account.id} value={account.id}>{`${account.lastName} ${account.firstName}`}</option>
                        ))}
                    </select>
                </label>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Account ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Référence
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Motif
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Credit MGA
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Débit MGA
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Solde
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {statements.map((statement, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{statement.idAccount}</td>
                            <td className="px-6 py-4">{statement.statementDate}</td>
                            <td className="px-6 py-4">{statement.reference}</td>
                            <td className="px-6 py-4">{statement.operationMotive}</td>
                            <td className="px-6 py-4">{statement.creditAmount}</td>
                            <td className="px-6 py-4">{statement.debitAmount}</td>
                            <td className="px-6 py-4">{statement.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
