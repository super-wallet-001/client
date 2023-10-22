import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react"
import { useRouter } from "next/router"


const routes = [
    {
        icon: LayoutDashboard,
        href: "/dashboard",
        label: "Dashboard",
        logined: false
    }
]

export default function Sidebar() {

    const router = useRouter();

    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary p-2">
            <div className="p-3 flex flex-1 justify-center">
                <div className="space-y-2">
                    {routes.map((route) => {
                        return (
                            <div
                                onClick={() => router.push(route.href)}
                                key={route.href}
                                className={cn("text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                    router.asPath === route.href && "bg-primary/10 text-primary")}>
                                <div className="flex flex-col flex-1 gap-y-2 items-center ">
                                    <route.icon className="h-5 w-5" />
                                    {route.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}