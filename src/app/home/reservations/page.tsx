import React from "react"
import Image from 'next/image'
import ReservationStudent from "../../../components/Home/Reservations/ReservationStudent"
import { DialogProvider } from "../../../lib/GlobalDialog"

export default function page() {

    return (
        <main className="main-manage-books">
            <DialogProvider>
                <ReservationStudent />
            </DialogProvider>
        </main>
    )
}

