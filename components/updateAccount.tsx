"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUrl } from 'nextjs-current-url';
import { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'Next.js - Coding Beauty',
    description: 'Next.js Tutorials by Coding Beauty',
  };

interface FormValues {
    id: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    monthlyNetSalary: number;
    uniqueAccountNumber: string;
    overdraftStatus: string;
    principalBalance: number;
}

export function UpdateAccount() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { pathname} = useUrl() ?? {};
    const id = pathname ? pathname.substring(9) : "";
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const updatedFormData = { ...data, id };
            const response = await fetch('http://localhost:8080/new_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData) 
            });

            if (!response.ok) {
                throw new Error('Failed to add account');
            }
              
            alert('Update account successfully!');
          
            
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("id")} /> 
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("lastName")} placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("firstName")} placeholder="First Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="date" {...register("dateOfBirth")} placeholder="Date of Birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="number" {...register("monthlyNetSalary")} placeholder="Monthly Net Salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="text" {...register("uniqueAccountNumber")} placeholder="Unique Account Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <select {...register("overdraftStatus")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <input type="number" {...register("principalBalance")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Principal balance"  />
            </label>
            <a href="/account" >
            <input type="submit" value="Update" className="btn btn-primary mt-2" />   
            </a> 
        </form>
    );
}
