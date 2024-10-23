import React from "react"
import Image from 'next/image'
import StudentList from "../../../components/Home/Students/List"

export default function page() {

    return (
        <main className="main-manage-books">
            <StudentList />
        </main>
    )
}

