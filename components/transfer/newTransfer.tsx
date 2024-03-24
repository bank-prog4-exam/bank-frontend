"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAccount } from "../table";
import { v4 as uuidv4 } from 'uuid'; 

interface TransferFormValues {
    id: string;
    idSenderAccount: string;
    idReceiverAccount: string;
    transferAmount: number;
    reason: string;
    effectiveDate: string; 
    registrationDate: string; 
    status: string;
    reference: string;
    label: string;
}

export function RegisterTransfer() {
    const { register, handleSubmit } = useForm<TransferFormValues>();
    const accounts = useGetAccount();

    const onSubmit: SubmitHandler<TransferFormValues> = async (data) => {
        try {
            const id = uuidv4();
            const updatedFormData = { ...data, id };

            console.log("Transfer Data:", updatedFormData);

            const response = await fetch('http://localhost:8080/new_transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData) 
            });

            if (!response.ok) {
                throw new Error('Failed to add transfer');
            }

            alert('Transfer added successfully!');
            
        } catch (error) {
            console.error('Error adding transfer:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("id")} /> 
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <select {...register("idSenderAccount")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Account sender :</option>
                {accounts.map(account => (
                    <option key={account.id} value={account.id}>{`${account.lastName} ${account.firstName}`}</option>
                ))}
        </select> 
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <select {...register("idReceiverAccount")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select Account :</option>
                {accounts.map(account => (
                    <option key={account.id} value={account.id}>{`${account.lastName} ${account.firstName}`}</option>
                ))}
        </select> 
       </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="number" {...register("transferAmount")} placeholder="Transfer Amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="text" {...register("reason")} placeholder="Reason" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="datetime-local" {...register("effectiveDate")} placeholder="Effective Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="datetime-local" {...register("registrationDate")} placeholder="Registration Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="text" {...register("status")} placeholder="Status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="text" {...register("reference")} placeholder="Reference" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="text" {...register("label")} placeholder="Label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </label>
        <input type="submit" value="Register" className="btn btn-primary" />
    </form>
    );
}
