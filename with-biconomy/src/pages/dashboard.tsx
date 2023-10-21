"use client";
import RecentTransections from "@/components/recent-transections";
import SendTransection from "@/components/send";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context";
import Image from "next/image";


export default function DashboardPage() {

  const { walletBalances } = useStateContext();

  return (
    <div className="pt-16 h-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">

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
                  <div className="text-2xl font-bold">{walletBalances?.ETH?.scroll && `${walletBalances?.ETH?.scroll} ETH`}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>
                    Mantle Testnet
                  </CardTitle>
                  <svg className="h-5 w-5 text-muted-foreground" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle cx="16" cy="16" fill="#efb914" fillRule="nonzero" r="16" /><path d="M21.002 9.855A7.947 7.947 0 0124 15.278l-2.847-.708a5.357 5.357 0 00-3.86-3.667c-2.866-.713-5.76.991-6.465 3.806s1.05 5.675 3.917 6.388a5.373 5.373 0 005.134-1.43l2.847.707a7.974 7.974 0 01-5.2 3.385L16.716 27l-2.596-.645.644-2.575a8.28 8.28 0 01-1.298-.323l-.643 2.575-2.596-.646.81-3.241c-2.378-1.875-3.575-4.996-2.804-8.081s3.297-5.281 6.28-5.823L15.323 5l2.596.645-.644 2.575a8.28 8.28 0 011.298.323l.643-2.575 2.596.646z" fill="#fff" /></g></svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{walletBalances?.ETH?.mantle && `${walletBalances?.ETH.mantle} MNT`}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>
                    Polygon Mumbai
                  </CardTitle>
                  <svg className="h-5 w-5 text-muted-foreground" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><circle fill="#6F41D8" cx="16" cy="16" r="16" /><path d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V12.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0l-4.244 2.372A1.16 1.16 0 006 11.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z" fill="#FFF" /></g></svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{walletBalances?.ETH?.mumbai && `${walletBalances?.ETH?.mumbai} MATIC`}</div>
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
                  <div className="text-2xl font-bold">{walletBalances?.ETH?.avalanche && `${walletBalances?.ETH?.avalanche} AVAX`}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>
                    Your tokens
                  </CardTitle>
                  <CardDescription>
                    Your tokens across all the chains will be visible here.
                  </CardDescription>
                  <Separator className="my-4" />
                  <CardContent className="pt-2 flex flex-col md:flex-row items-center">
                    {
                      walletBalances?.aUSDC.totalBalance === 0 ? (
                        <>
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
                        </>

                      ) : (
                        <>
                          <HoverCard>
                            <HoverCardTrigger className="w-full">
                              <div className="w-full flex items-center pt-5 justify-between cursor-pointer" >
                                <div className="flex items-center gap-2">
                                  <svg className="h-7 w-7 text-muted-foreground" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><circle fill="#3E73C4" cx="16" cy="16" r="16" /><g fill="#FFF"><path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" /><path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" /></g></g></svg>
                                  <div className="flex flex-col ml-4">
                                    <p className=" text-lg font-bold leading-none">{walletBalances?.aUSDC?.totalBalance} aUSDC</p>
                                    <p className="text-md text-muted-foreground">
                                      Decimals: 6 Type: ERC20
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-5">
                                  {walletBalances?.aUSDC.mumbai !== 0 && (
                                    <svg className="h-5 w-5 text-muted-foreground" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><circle fill="#6F41D8" cx="16" cy="16" r="16" /><path d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V12.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0l-4.244 2.372A1.16 1.16 0 006 11.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z" fill="#FFF" /></g></svg>
                                  )}
                                  {walletBalances?.aUSDC.avalanche !== 0 && (
                                    <svg className="h-5 w-5 text-muted-foreground" width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <rect x="287" y="258" width="928" height="844" fill="white" />
                                      <path fillRule="evenodd" clipRule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </HoverCardTrigger>

                            <HoverCardContent className="w-60">
                              <div className="w-full flex flex-col justify-center px-2">
                                <div className="text-xl font-medium">{walletBalances?.aUSDC?.mumbai && `${walletBalances?.aUSDC?.mumbai} aUSDC`}</div>
                                <h2 className="text-lg text-muted-foreground mt-[-6px]">
                                  Polygon Mumbai
                                </h2>
                              </div>
                              <Separator className="my-2" />
                              <div className="w-full flex flex-col justify-center px-2">
                                <div className="text-xl font-medium">{walletBalances?.aUSDC?.avalanche && `${walletBalances?.aUSDC?.avalanche} aUSDC`}</div>
                                <h2 className="text-lg text-muted-foreground mt-[-6px]">
                                  Avalanche Fuji
                                </h2>
                              </div>
                            </HoverCardContent>
                          </HoverCard>


                        </>
                      )
                    }
                  </CardContent>
                </CardHeader>
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