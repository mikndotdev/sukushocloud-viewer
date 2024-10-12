// app/image/[id]/page.tsx
export const runtime = "experimental-edge";
import ImageComponent from "@/app/components/ImageComponent";

interface PageProps {
    params: { slug: string };
}

export default function Page({ params }: PageProps) {
    return (
        <div className="relative">
            <ImageComponent id={params.slug} />
        </div>
    );
}
