"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid'; 
import { useGetAccount } from "../table";

interface FormValues {
    id: string;
    idAccount: string;
    transactionAmount: number;
    transactionType: string;
    reason: string;
    effectiveDate: string;
    registrationDate: string;
}

export function RegisterTransaction() {
    const { register, handleSubmit } = useForm<FormValues>();
    const accounts = useGetAccount();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const id = uuidv4(); 
            const updatedFormData = { ...data, id };

            console.log("FormData:", updatedFormData);

            const response = await fetch('http://localhost:8080/new_transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData) 
            });

            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }

            alert('Transaction added successfully!');
            
          
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("id")} /> 
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Account ID:
                <select {...register("idAccount")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select Account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{`${account.lastName} ${account.firstName}`}</option>
                    ))}
                </select>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transaction Amount:
                <input type="number" {...register("transactionAmount")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transaction Type:
                <input type="text" {...register("transactionType")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Reason:
                <input type="text" {...register("reason")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Effective Date:
                <input type="datetime-local" {...register("effectiveDate")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Registration Date:
                <input type="datetime-local" {...register("registrationDate")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
    );
}
