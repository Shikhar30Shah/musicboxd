import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Layout(props) {
    return (
        <main className="font-sans">
            <Navbar />
            {props.children}
        </main>
    )
}