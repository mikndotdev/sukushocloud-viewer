"use client";

import { FaDownload, FaLink } from "react-icons/fa";
import { Button } from "./shadcn/Button";
import { toast } from "sonner";

interface InteractiveCardFooterProps {
    imageUrl: string;
    imageName: string;
    shortUrl: string;
}

const InteractiveCardFooter: React.FC<InteractiveCardFooterProps> = ({
    imageUrl,
    imageName,
    shortUrl,
}) => {
    const copyURL = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard");
    };

    return (
        <div className="flex items-center space-x-3">
            <a href={imageUrl} download={imageName}>
                <Button>
                    <FaDownload className="text-xl mr-3" />
                    Download
                </Button>
            </a>
            <Button onClick={() => copyURL(shortUrl)}>
                <FaLink className="text-xl mr-3" />
                Copy short URL
            </Button>
        </div>
    );
};

export default InteractiveCardFooter;
