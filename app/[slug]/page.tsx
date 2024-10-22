// app/image/[id]/page.tsx
export const runtime = "edge";
import Image from "next/image";
import Link from "next/link";
import { getMetadata, ImageComponent } from "@/app/components/ImageComponent";

import { Card, CardTitle } from "../components/shadcn/Card";
import { FaRegStar } from "react-icons/fa";
import { Button } from "../components/shadcn/Button";
import KawaiiLogo from "../assets/mikan-vtube.svg";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateViewport(props: PageProps) {
    const params = await props.params;
    const id = params.slug;
    const userData = await getMetadata({ id });

    return {
        themeColor: userData.color,
    };
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
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

export default async function Page(props: PageProps) {
    const params = await props.params;
    return (
        <main>
            <div className="relative">
                <ImageComponent id={params.slug} />
            </div>
            <div className="flex flex-col items-center justify-center w-full px-4 sm:px-0">
                <Card className="mt-10 mb-5 w-full sm:w-10/12 bg-[#2f1c42] border-[#2f1c42] min-h-[80px] flex flex-col sm:flex-row items-center justify-between p-4 space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex flex-col justify-center text-center sm:text-left">
                            <CardTitle className="text-lg sm:text-xl text-white">
                                Screenshot hosted by sukushocloud
                            </CardTitle>
                            <CardTitle className="text-sm sm:text-md text-[#ff9900]">
                                a MikanDev service
                            </CardTitle>
                        </div>
                        <Link href="https://sukusho.cloud/">
                            <Button className="text-white w-full sm:w-auto">
                                <FaRegStar className="text-xl mr-3" />
                                Try it free!
                            </Button>
                        </Link>
                    </div>
                    <Link href="https://mikn.dev/" className="mt-4 sm:mt-0">
                        <Image
                            src={KawaiiLogo.src}
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </Card>
            </div>
        </main>
    );
}
