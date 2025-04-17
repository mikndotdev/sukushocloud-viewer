"use client";

import { FaDownload, FaLink } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { Button } from "./shadcn/Button";
import { toast } from "sonner";
import Link from "next/link";

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
		<div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
			<Link
				href={imageUrl}
				download={imageName}
				className="w-full sm:w-auto"
			>
				<Button className="w-full sm:w-auto">
					<FaDownload className="text-xl mr-3" />
					Download
				</Button>
			</Link>
			<Button
				onClick={() => copyURL(shortUrl)}
				className="w-full sm:w-auto"
			>
				<FaLink className="text-xl mr-3" />
				Copy short URL
			</Button>
			<Link
				href={`mailto:abuse@mikn.dev?subject=sukushocloud%20Abuse%20Report&body=Hello%3B%0A%0AI%20believe%20that%20${imageUrl}%20hosted%20on%20the%20sukushocloud%20platform%20may%20be%20against%20the%20Terms.`}
				className="w-full sm:w-auto"
			>
				<Button className="text-red-500 w-full sm:w-auto">
					<PiWarningFill className="text-xl mr-3" />
					Report abuse
				</Button>
			</Link>
		</div>
	);
};

export default InteractiveCardFooter;
