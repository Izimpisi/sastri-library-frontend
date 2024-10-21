import React from 'react'
import Loan from '../../../components/Home/Loans/Loans'
import { DialogProvider } from '../../../lib/GlobalDialog'

function page() {
    return (
        <main className="main-loan-books">
            <DialogProvider>
                <Loan />
            </DialogProvider>
        </main>
    )
}

export default page
