
import NavBar from "@/components/NavBar/NavBar"


export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        <NavBar />
        <main style={{ padding: "30px 50px" }}>
            {children}
        </main>
    </>)
}