"use client";
import Portfolio from "@/components/portfolio";
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
            <TabsTrigger value="nfts">
              NFTs
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
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
            <SendTransection />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}