import React from "react"
import Image from 'next/image'
import ReservationsAdmin from "../../../components/Home/Reservations/AdminReservation"
import { DialogProvider } from "../../../lib/GlobalDialog"

export default function page() {

    return (
        <main className="main-manage-books">
            <DialogProvider>
                <ReservationsAdmin />
            </DialogProvider>
        </main>
    )
}

