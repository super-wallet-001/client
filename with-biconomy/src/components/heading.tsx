import { cn } from "@/lib/utils";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { useStateContext } from "@/context";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Heading() {

    const { connect, mainAddress } = useStateContext();
    const router = useRouter();

    async function connectAndNavigate() {
        if (!mainAddress) {
            await connect();
        }
        router.push("/dashboard");
    }

    return (
        <div className="px-4">
            <div className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
                <h1>
                    One Wallet, Multiple Chains
                </h1>
                <div className="text-transparent pb-6 bg-clip-text bg-gradient-to-r from-[#0802A3] to-[#FF4B91]">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Ethereum.",
                                "Polygon.",
                                "Scroll.",
                                "Mantle.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>

            </div>
            <div className="flex items-center justify-center w-full">
                <div className="flex items-center">
                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                        <Image
                            src="/eth.png"
                            fill
                            className="object-contain dark:hidden"
                            alt="Documents"
                        />
                        <Image
                            src="/eth.png"
                            fill
                            className="object-contain hidden dark:block"
                            alt="Documents"
                        />
                    </div>

                </div>
            </div>
            <div className={cn("text-sm sm:text-md md:text-lg lg:text-xl font-light dark:text-zinc-400 text-black mb-6",)}>
                Unlocking the Future of Finance: Seamlessly Transact Across Multiple Chains with a Click!
            </div>
            <div className="w-full flex justify-center">
                <Button className="flex gap-2 md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={connectAndNavigate}>
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}