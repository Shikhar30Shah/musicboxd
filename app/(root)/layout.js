import Image from "next/image";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/sonner"

export default function Layout(props) {
    return (
        <main className="font-sans">
            <Navbar />
            {props.children}
            <Toaster />
        </main>
    )
}