"use client";


import { Button } from "./ui/button";
import { Copy, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStateContext } from "@/context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useToast } from "./ui/use-toast";


type Props = {

};

export default function UserProfileNav() {

    const { mainAddress, removeFromLocalStorage } = useStateContext();
    const {toast}=useToast();

    function logout() {
        removeFromLocalStorage();
    }

    function copyToClipboard() {
        if (!mainAddress) {
            return;
        }
        navigator.clipboard.writeText(mainAddress);
        toast({
            description: "Address copied to clipboard",
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="/02.png" alt="Avatar" />
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href="/dashboard" className="mr-3">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                    {mainAddress && (
                        <div className="group flex w-full items-center">
                            <p className="font-secondary-foreground/20">
                                {mainAddress.slice(0, 6)}...{mainAddress.slice(-4)}
                            </p>
                            <Button
                                className="opacity-0 group-hover:opacity-100 transition"
                                onClick={copyToClipboard}
                                size="icon"
                                variant="ghost"
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={() => {
                        logout()
                    }}
                    className="text-red-600 cursor-pointer"
                >
                    Logout
                    <LogOut className="w-4 h-4 ml-2" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}