import React from "react";
import { NavTransaction } from "../../../components/transaction";
import TableTransaction from "../../../components/transaction/transactionList";

export default function Transaction() {
    return <>
    <NavTransaction/>
    <TableTransaction/>
    </>
}