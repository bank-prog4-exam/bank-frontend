"use client"
import React, { useState } from "react";
import { useRouter } from "next/router";

export function RegisterTransaction() {
    const [formData, setFormData] = useState({
        id_account: "",
        transaction_amount: 0,
        transaction_type: "",
        reason: "",
        effective_date: "",
        registration_date: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const router = useRouter();
        e.preventDefault();
        console.log(formData);
        // Ajoutez ici la logique pour soumettre les données .

        router.push('/transactions');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Account ID:
                <input type="text" name="id_account" value={formData.id_account} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transaction Amount:
                <input type="number" name="transaction_amount" value={formData.transaction_amount} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transaction Type:
                <input type="text" name="transaction_type" value={formData.transaction_type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Reason:
                <input type="text" name="reason" value={formData.reason} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Effective Date:
                <input type="datetime-local" name="effective_date" value={formData.effective_date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Registration Date:
                <input type="datetime-local" name="registration_date" value={formData.registration_date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
    );
}
