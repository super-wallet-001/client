import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { LayoutDashboard } from "lucide-react";
import { useStateContext } from "@/context";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const font = Poppins({
    weight: "600",
    subsets: ['latin']
})

const routes = [
    {
        icon: LayoutDashboard,
        href: "/dashboard",
        label: "Dashboard",
        logined: false
    }
]

export default function Navbar() {

    const { mainAddress } = useStateContext();
    const router = useRouter();

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary/10 h-16">
            <div className="flex items-center">
                <MobileSidebar />
                <Link
                    href={"/"}
                >
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
                        superwallet
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {mainAddress && (
                    <div className="hidden md:flex gap-6 pr-20">
                        {
                            routes.map((route) => {
                                return (
                                    <Button variant={"ghost"} onClick={() => router.push(route.href)}>
                                        {route.label}
                                    </Button>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}