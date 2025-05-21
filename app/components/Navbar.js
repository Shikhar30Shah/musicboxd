import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {

    const session  = await auth();

    return (
        <header className="px-5 py-3 ---background shadow-sm shadow-white">
            <nav className="flex justify-between items-center">
                <Link href="/" className="--foreground">
                    <Image style={{display: 'inline-block', marginRight: '8px'}} src="/MusicBoxd.png" alt="logo" width={60} height={60} />
                    <span className="text-3xl" style={{display: 'inline-block'}}>MusicBoxd</span>
                </Link>

                <div className="flex items-center gap-5 --foreground">
                    {session && session.user ? (
                        <>
                            <Link className="cursor-pointer" href="/track/reviews">
                                <span>Reviews</span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut({redirectTo: "/"})
                            }}>
                                <button className="cursor-pointer" type="submit">
                                    LogOut
                                </button>
                            </form>

                            <Link href={`/user/${session.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                            
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('spotify')
                        }}>
                            <button className="cursor-pointer" type="submit">
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar