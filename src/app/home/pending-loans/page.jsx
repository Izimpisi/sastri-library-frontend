import React from "react"
import Image from 'next/image'
import AdminLoan from "../../../components/Home/Loans/AdminLoan"
import { DialogProvider } from "../../../lib/GlobalDialog"

export default function page() {

    return (
        <main className="main-loan-books">
            <DialogProvider>
                <AdminLoan />
            </DialogProvider>
        </main>
    )
}

