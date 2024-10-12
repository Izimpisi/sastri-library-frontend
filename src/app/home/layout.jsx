import DrawerAppBar from "@/components/DrawerAppBar"


export default async function DashboardLayout({
    children, 
}) {

    return (
        <main>
            {/* Include shared UI here e.g. a header or sidebar */}
            <DrawerAppBar />
            {children}
        </main>
    )
}