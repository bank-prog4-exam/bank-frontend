"use client"
import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import { deleteTransfer } from ".";

interface Transfer {
    id: string,
    idSenderAccount: string,
    idReceiverAccount: string,
    transferAmount: number,
    reason: string,
    effectiveDate: Date,
    registrationDate: Date,
    status: string,
    reference: string,
    label: string
}

export function useGetTransfers() {
    const [transfers, setTransfers] = useState<Transfer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/all_transfers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransfers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    return transfers;
}

export default function TableTransfer() {
    const data = useGetTransfers();

    const handleDelete = async (id: string) => {
        try {
            await deleteTransfer(id);
            alert('deleted transfer succeful');
            window.location.reload();

        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sender Account ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Receiver Account ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
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
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reference
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Label
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(transfer => (
                        <tr key={transfer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{transfer.idSenderAccount}</td>
                            <td className="px-6 py-4">{transfer.idReceiverAccount}</td>
                            <td className="px-6 py-4">{transfer.transferAmount}</td>
                            <td className="px-6 py-4">{transfer.reason}</td>
                            <td className="px-6 py-4">{new Date(transfer.effectiveDate).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(transfer.registrationDate).toLocaleString()}</td>
                            <td className="px-6 py-4">{transfer.status}</td>
                            <td className="px-6 py-4">{transfer.reference}</td>
                            <td className="px-6 py-4">{transfer.label}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(transfer.id)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
