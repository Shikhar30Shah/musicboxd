import React from "react";
import { notFound } from "next/navigation";
import { auth } from "../../../../auth";
import { client } from "../../../../sanity/lib/client";
import { USER_BY_ID_QUERY } from "../../../../sanity/lib/queries";
import Image from "next/image";

const Page = async ({params}) => {

    const id = (await params)?.id
    const session = await auth();

    const user = await client.fetch(USER_BY_ID_QUERY, { id });

    if(!user)
        return notFound();
    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <p className="text-[24px] text-center uppercase text-black">{user.name}</p>
                    </div>

                    <Image
                        src={user.image}
                        alt={user.name}
                        width={220}
                        height={220}
                        className="profile_image"
                    />

                    <p className="text-[24px] mt-7 text-center">
                        {user.email}
                    </p>
                    <p className="mt-1 text-center text-14-normal">{user.bio}</p>
                </div>
            </section>
        </>
    );
}

export default Page;