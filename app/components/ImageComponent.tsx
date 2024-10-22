import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./shadcn/Card";
import Image from "next/image";
import { FaDownload, FaLink } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "./shadcn/Button";
import InteractiveCardFooter from "./interactiveFooter";

export async function getMetadata({ id }: { id: string }) {
    const fileData = await fetch(
        `https://manager.sukusho.cloud/getFile?id=${id}&key=${process.env.BACKEND_SIGNING_KEY}`,
    );

    const userJson = await fileData.json();
    const userId = userJson.userId;

    const userData = await fetch(
        `https://manager.sukusho.cloud/getInfo?id=${userId}&key=${process.env.BACKEND_SIGNING_KEY}`,
    );

    const userDataJson = await userData.json();

    return {
        header: userDataJson.embedHeader,
        footer: userDataJson.embedFooter,
        url: userJson.url,
        color: userDataJson.embedColor,
    };
}

export async function ImageComponent({ id }: { id: string }) {
    let imageData;
    let userData;
    let error = null;

    try {
        const response = await fetch(
            `https://manager.sukusho.cloud/getFile?id=${id}&key=${process.env.BACKEND_SIGNING_KEY}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        imageData = await response.json();

        const authID = process.env.LOGTO_M2M_ID;
        const authSecret = process.env.LOGTO_M2M_SECRET;

        if (!authID || !authSecret) {
            throw new Error("Logto credentials are not defined");
        }

        const BasicAuth = Buffer.from(`${authID}:${authSecret}`).toString(
            "base64",
        );

        const LogtoResponse = await fetch(
            "https://auth.mikandev.com/oidc/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${BasicAuth}`,
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "all",
                    resource: "https://default.logto.app/api",
                }),
            },
        );

        if (!LogtoResponse.ok) {
            throw new Error(
                `Failed to get Logto token: ${LogtoResponse.statusText}`,
            );
        }

        const data = await LogtoResponse.json();
        const token = data.access_token;

        userData = await fetch(
            `https://auth.mikandev.com/api/users/${imageData.userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        userData = await userData.json();
    } catch (err: any) {
        error = err.message || "An error occurred while fetching the image.";
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[350px] h-[200px] flex items-center justify-center bg-[#2f1c42] border-[#2f1c42]">
                    <div className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl text-white">
                                404
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-2xl text-white">
                                File not found!
                            </CardDescription>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-0">
            <Card className="w-full max-w-4xl mx-auto bg-[#2f1c42] border-[#2f1c42]">
                <div className="flex-col justify-center">
                    <CardHeader className="flex items-center space-x-2">
                        <CardTitle className="text-white text-lg sm:text-xl break-all sm:break-normal">
                            {imageData.name}
                        </CardTitle>
                    </CardHeader>
                </div>
                <Card className="w-full max-w-3xl mx-auto bg-[#412e55] border-[#412e55] h-auto sm:h-[100px] flex items-center justify-between p-4">
                    <div className="flex flex-col justify-center">
                        <CardTitle className="text-xl sm:text-2xl text-white">
                            Uploaded by:
                        </CardTitle>
                        <CardDescription className="text-lg sm:text-2xl text-white">
                            {userData?.username}
                        </CardDescription>
                    </div>
                    <Image
                        src={userData?.avatar}
                        alt="User avatar"
                        width={70}
                        height={70}
                        className="rounded-full ml-4"
                        unoptimized
                    />
                </Card>
                <CardContent className="relative">
                    <div className="relative w-full pb-[70%]">
                        <Image
                            src={imageData.url}
                            alt={imageData.name}
                            fill
                            className="object-contain mt-5 mb-5"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center mt-5">
                    <InteractiveCardFooter
                        imageUrl={imageData.url}
                        imageName={imageData.name}
                        shortUrl={imageData.shortUrl}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}
