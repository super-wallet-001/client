import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { Loader } from "lucide-react";

export default function NFTs() {

    const [tokenAddress, setTokenAddress] = useState<any>()
    const [tokenId, setTokenId] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [nft, setNFT] = useState<any>(null)

    async function fetchNFT() {
        setLoading(true)
        const alchemySettings = {
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
            network: Network.BASE_GOERLI,
        }
        const alchemy = new Alchemy(alchemySettings)
        const nft = await alchemy.nft.getNftMetadata(tokenAddress, tokenId)
        setNFT(nft)
        setLoading(false)
    }

    useEffect(() => {
        console.log(nft);
    }, [nft]);



    return (
        <Card>
            <CardHeader>
                <CardTitle>Your NFTs</CardTitle>
                <CardDescription>
                    Your NFTs accross all the chains are visible over here.
                </CardDescription>
            </CardHeader>
            <CardContent >
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                        <Image
                            src="/nft.png"
                            fill
                            className="object-contain dark:hidden"
                            alt="Documents"
                        />
                        <Image
                            src="/nft.png"
                            fill
                            className="object-contain hidden dark:block"
                            alt="Documents"
                        />
                    </div>
                    <div className="text-xl font-medium text-secondary-foreground">
                        Nothing here...
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                Buy Now
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[80%]  flex flex-col">
                            <DialogHeader>
                                <DialogTitle>Explore and Purchase NFTs</DialogTitle>
                                <DialogDescription>
                                    Explore and buy NFTs using contract addresses and tokens.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-between gap-4">
                                <div className="grow flex-col gap-1">
                                    <Label htmlFor="address" className="text-right">
                                        Token Address
                                    </Label>
                                    <Input
                                        value={tokenAddress}
                                        onChange={(e) => setTokenAddress(e.target.value)}
                                        id="address"
                                        placeholder="0x133ed..as22"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grow-0 flex-col gap-1">
                                    <Label htmlFor="tokenId" className="text-right">
                                        Token Id
                                    </Label>
                                    <Input
                                        value={tokenId}
                                        onChange={(e) => setTokenId(e.target.value)}
                                        id="tokenId"
                                        placeholder="32"
                                        className="col-span-3"
                                    />
                                </div>
                                <Button className="grow-0 self-end" type="button" onClick={fetchNFT}>
                                    {loading && (
                                        <Loader
                                            className="w-4 h-4 mr-2 animate-spin"
                                        />
                                    )}
                                    Search
                                </Button>
                            </div>

                            <div className="w-full grow flex justify-center items-center">
                                {nft && (
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                        <div className="relative w-80 h-80 md:w-96 md:h-96">
                                            <Image
                                                className="rounded-xl"
                                                fill
                                                src={nft?.media?.[0]?.thumbnail}
                                                alt="Character Image"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-col gap-4 ml-4 md:ml-0">
                                                <h1 className="text-2xl md:text-4xl font-medium">
                                                    {nft?.rawMetadata?.name} #{nft?.tokenId}
                                                </h1>
                                                <p className="text-sm md:text-lg text-muted-foreground">
                                                    {nft?.rawMetadata?.description}
                                                </p>
                                                <div className="flex items-center justify-start">
                                                    <Button className="text-lg w-60 md:w-80 tracking-wide" size={"lg"} disabled>
                                                        Buy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>

        </Card >

    )
}