"use client"
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import { useGetAccount } from '../../components';
import { useGetTransactions } from '../../components/transaction';

export default function Home() {
  const accounts = useGetAccount();
  const transactions = useGetTransactions();
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    setTotalAccounts(accounts.length);
    setTotalTransactions(transactions.length);
  }, [accounts, transactions]);

  return (
    <>
    <section className='justify-center'>
    <div className="flex justify-center gap-6">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body gap-5">
            <br />
            <h2 className="card-title">Total account  </h2>
            <br />
            <h1 className='text-5xl text-gray-900 dark:text-white '>{totalAccounts}</h1>
            <hr className='text-blue-400'/>
            <br />
            <h2 className="card-title">Total Transaction </h2>
            <br />
            <h1 className='text-5xl text-gray-900 dark:text-white'>{totalTransactions}</h1>
            <hr className='text-blue-400'/>
          </div>
        </div>
        <img  src="/diagrame.png" alt="image description"/>
      </div>     
       
    </section> 
    </>
  );
}
