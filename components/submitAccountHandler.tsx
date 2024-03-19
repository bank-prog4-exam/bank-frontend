"use client"
import React, { useState } from "react";
import { useRouter } from "next/router";

export function RegisterAccount() {
    const [formData, setFormData] = useState({
        last_name: "",
        first_name: "",
        date_of_birth: "",
        monthly_net_salary: 0,
        unique_account_number: "",
        overdraft_status: "false",
        principal_balance: 0
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
        // Ajoutez ici la logique pour soumettre les données à votre backend, par exemple.
        
        router.push('/accounts')
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} placeholder="Date of Birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="number" name="monthly_net_salary" value={formData.monthly_net_salary} onChange={handleChange} placeholder="Monthly Net Salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" name="unique_account_number" value={formData.unique_account_number} onChange={handleChange} placeholder="Unique Account Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <select name="overdraft_status" value={formData.overdraft_status} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="number" name="principal_balance" value={formData.principal_balance} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Principale balance "  />
            </label>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
    );
}
