// app/image/[id]/page.tsx
export const runtime = "experimental-edge";
import { getMetadata, ImageComponent } from "@/app/components/ImageComponent";

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
        <div className="relative">
            <ImageComponent id={params.slug} />
        </div>
    );
}
