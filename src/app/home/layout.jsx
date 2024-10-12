import DrawerAppBar from "@/components/DrawerAppBar"


export default async function DashboardLayout({
    children, 
}) {

    return (
        <main className="pt-20">
            {/* Include shared UI here e.g. a header or sidebar */}
            <DrawerAppBar />
            {children}
        </main>
    )
}