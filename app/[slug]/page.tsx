// app/image/[id]/page.tsx
export const runtime = "experimental-edge";
import Image from "next/image";
import Link from "next/link";
import { getMetadata, ImageComponent } from "@/app/components/ImageComponent";

import { Card, CardTitle } from "../components/shadcn/Card";
import { FaRegStar } from "react-icons/fa";
import { Button } from "../components/shadcn/Button";
import KawaiiLogo from "../assets/mikan-vtube.svg";

interface PageProps {
    params: { slug: string };
}

export async function generateViewport({ params }: PageProps) {
    const id = params.slug;
    const userData = await getMetadata({ id });

    return {
        themeColor: userData.color,
    };
}

export async function generateMetadata({ params }: PageProps) {
    const id = params.slug;
    const userData = await getMetadata({ id });

    return {
        title: userData.header,
        description: userData.footer,
        robots: {
            index: false,
        },
        openGraph: {
            images: [
                {
                    url: userData.url,
                },
            ],
        },
    };
}

export default function Page({ params }: PageProps) {
    return (
        <main>
        <div className="relative">
            <ImageComponent id={params.slug} />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
                <Card className="mt-10 mb-5 w-10/12 bg-[#2f1c42] border-[#2f1c42] h-20 flex items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col justify-center mr-5">
                        <CardTitle className="text-xl text-white">
                            Screenshot hosted by sukushocloud
                        </CardTitle>
                        <CardTitle className="text-md text-[#ff9900]">
                            a MikanDev service
                        </CardTitle>
                        </div>
                        <Link href="https://sukusho.cloud/">
                        <Button className="text-white">
                            <FaRegStar className="text-xl mr-3" />
                            Try it free!
                        </Button>
                        </Link>
                    </div>
                    <Link href="https://mikn.dev/">
                    <Image src={KawaiiLogo.src} alt="Logo" width={100} height={100} />
                    </Link>
                </Card>
            </div>
        </main>
    );
}
