import { cn } from "@/lib/utils";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { useStateContext } from "@/context";
import { useRouter } from "next/router";

export default function Heading() {

    const { connect,mainAddress } = useStateContext();
    const router = useRouter();

    async function connectAndNavigate() {
        if(!mainAddress){
            await connect();
        }
        router.push("/dashboard");
    }

    return (
        <div className="mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
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
            <div className={cn("text-md sm:text-lg md:text-xl lg:text-2xl font-light text-zinc-400", true && "text-slate-900")}>
                A multichain smart contract wallet.
            </div>
            <div>
                <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold" onClick={connectAndNavigate}>
                    Get Started!
                </Button>
            </div>
        </div>
    )
}