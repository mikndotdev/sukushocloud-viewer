"use client";
import { FaPlayCircle, FaPauseCircle, FaItunesNote } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/app/components/shadcn/Card";
import { useRef } from "react";

interface AudioPlayerProps {
	src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	if (typeof window !== "undefined" && !audioRef.current) {
		audioRef.current = new Audio(src);
	}

	return (
		<Card className="w-full">
			<CardContent>
				<div className="flex items-center justify-between">
					<FaItunesNote className="text-2xl" />
					<div className="flex items-center space-x-2">
						<button onClick={() => audioRef.current?.play()}>
							<FaPlayCircle className="text-2xl" />
						</button>
						<button onClick={() => audioRef.current?.pause()}>
							<FaPauseCircle className="text-2xl" />
						</button>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<p>Audio Player</p>
			</CardFooter>
		</Card>
	);
}
