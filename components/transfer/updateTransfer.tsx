import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid'; 
import { useUrl } from 'nextjs-current-url';
import { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'Next.js - Coding Beauty',
    description: 'Next.js Tutorials by Coding Beauty',
  };


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

export function UpdateTransfer() {
    const { register, handleSubmit } = useForm<TransferFormValues>();
    const { pathname} = useUrl() ?? {};
    const id = pathname ? pathname.substring(10) : "";

    const onSubmit: SubmitHandler<TransferFormValues> = async (data) => {
        try {
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

            alert('Update Transfer successfully!');
            
        } catch (error) {
            console.error('Error adding transfer:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("id")} /> 
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("idSenderAccount")} placeholder="Sender Account ID" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("idReceiverAccount")} placeholder="Receiver Account ID" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="number" {...register("transferAmount")} placeholder="Transfer Amount" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("reason")} placeholder="Reason" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="datetime-local" {...register("effectiveDate")} placeholder="Effective Date" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="datetime-local" {...register("registrationDate")} placeholder="Registration Date" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("status")} placeholder="Status" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("reference")} placeholder="Reference" className="..." />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("label")} placeholder="Label" className="..." />
            </label>
            <input type="submit" value="Register" className="btn btn-primary" />
        </form>
    );
}
