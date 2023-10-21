"use client";
import Defi from "@/components/defi";
import NFTs from "@/components/nfts";
import Portfolio from "@/components/portfolio";
import SendTransection from "@/components/send";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context";


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
            <TabsTrigger value="nfts">
              NFTs
            </TabsTrigger>
            <TabsTrigger value="defi">
              Defi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="portfolio" className="space-y-4" >
            <Portfolio />
          </TabsContent>
          <TabsContent value="send">
            <SendTransection />
          </TabsContent>
          <TabsContent value="nfts">
            <NFTs />
          </TabsContent>
          <TabsContent value="defi">
            <Defi />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}