"use client";
import RecentTransections from "@/components/recent-transections";
import SendTransection from "@/components/send";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context";
import { getETHBalance } from "@/lib/getETHBalance";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function DashboardPage() {

    const { mainAddress } = useStateContext();
    const [scrollBalance, setScrollBalance] = useState("0.0");
    const [mantleBalance, setMantlebalance] = useState("0.0");
    const [maticBalance, setMaticBalance] = useState("0.0");
    const [avalancheBalance, setAvalancheBalance] = useState("0.0");

    useEffect(() => {
        if (mainAddress) {
            getETHBalance(534351, mainAddress).then((balance) => {
                setScrollBalance(parseFloat(balance).toFixed(2));
            })
            getETHBalance(80001, mainAddress).then((balance) => {
                setMaticBalance(parseFloat(balance).toFixed(2));
            })
            getETHBalance(43114, mainAddress).then((balance) => {
                setAvalancheBalance(parseFloat(balance).toFixed(2));
            })
            getETHBalance(5001, mainAddress).then((balance) => {
                setMantlebalance(parseFloat(balance).toFixed(2));
            })
        }

    })

    return (
        <div className="pt-16 h-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="flex items-center space-x-2">
                        {/* <Button>
                            Logout
                        </Button> */}
                    </div>
                </div>
                <Tabs defaultValue="portfolio" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                        <TabsTrigger value="send">
                            Send
                        </TabsTrigger>
                        <TabsTrigger value="nfts" disabled>
                            NFTs
                        </TabsTrigger>
                        <TabsTrigger value="notifications" disabled>
                            Notifications
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="portfolio" className="space-y-4" >
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>
                                        Scroll Sepolia
                                    </CardTitle>
                                    <img src="scroll.png" className="absolute top-3 right-[1px] h-10 w-20 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{mainAddress && `${scrollBalance} ETH`}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>
                                        Mantle Testnet
                                    </CardTitle>
                                    <svg className="h-5 w-5 text-muted-foreground" enableBackground="new 0 0 1920 1920" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="m960 730.9-539.8 245.4 539.8 319.1 539.8-319.1z" opacity=".6" /><path d="m420.2 976.3 539.8 319.1v-564.5-650.3z" opacity=".45" /><path d="m960 80.6v650.3 564.5l539.8-319.1z" opacity=".8" /><path d="m420.2 1078.7 539.8 760.7v-441.8z" opacity=".45" /><path d="m960 1397.6v441.8l540.2-760.7z" opacity=".8" /></svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{mainAddress && `${mantleBalance} ETH`}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>
                                        Polygon Mumbai
                                    </CardTitle>
                                    <svg className="h-5 w-5 text-muted-foreground" enableBackground="new 0 0 1920 1920" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="m960 730.9-539.8 245.4 539.8 319.1 539.8-319.1z" opacity=".6" /><path d="m420.2 976.3 539.8 319.1v-564.5-650.3z" opacity=".45" /><path d="m960 80.6v650.3 564.5l539.8-319.1z" opacity=".8" /><path d="m420.2 1078.7 539.8 760.7v-441.8z" opacity=".45" /><path d="m960 1397.6v441.8l540.2-760.7z" opacity=".8" /></svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{mainAddress && `${maticBalance} MATIC`}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>
                                        Avalanche Fuji
                                    </CardTitle>
                                    <svg className="h-5 w-5 text-muted-foreground" width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="287" y="258" width="928" height="844" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142" />
                                    </svg>

                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{mainAddress && `${scrollBalance} AVAX`}</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>
                                        Your tokens
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2 flex flex-col md:flex-row items-center">
                                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                                        <Image
                                            src="/wallet.png"
                                            fill
                                            className="object-contain dark:hidden"
                                            alt="Documents"
                                        />
                                    </div>
                                    <div className="h-full w-full flex flex-col items-center justify-center">
                                        <h2 className="text-xl">
                                            No tokens yet.
                                        </h2>
                                        <a className="mt-2 px-8 text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-primary" href="https://uniswap.org/">Buy now</a>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3 md:col-span-4">
                                <CardHeader>
                                    <CardTitle>
                                        Recent Transections
                                    </CardTitle>
                                    <CardDescription>
                                        Your recent transections across all the chains should be visible here.
                                    </CardDescription>
                                    <Separator className="my-4" />
                                    <CardContent>
                                        <RecentTransections />
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="send">
                        <SendTransection />
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}