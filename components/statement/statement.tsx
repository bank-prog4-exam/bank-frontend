"use client"
import React, { useState } from 'react';



export default function Statement() { 
    return (
        <div className="relative overflow-x-auto">
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
                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{"abcf-dflz"}</td>
                            <td className="px-6 py-4">{'11/03/2024'}</td>
                            <td className="px-6 py-4">{'VIR_2024_03'}</td>
                            <td className="px-6 py-4">{'Salaire'}</td>
                            <td className="px-6 py-4">{'1.000.000'}</td>
                            <td className="px-6 py-4">{0}</td>
                            <td className="px-6 py-4">{'950.000'}</td>
                        </tr>
                  
                </tbody>
            </table>
        </div>
    );
}
