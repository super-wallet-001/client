import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Defi() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>De-Fi</CardTitle>
                    <CardDescription>
                        Single click gateway to the world of decentraized finance.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                            <Image
                                src="/defi.png"
                                fill
                                className="object-contain dark:hidden"
                                alt="Documents"
                            />
                            <Image
                                src="/defi.png"
                                fill
                                className="object-contain hidden dark:block"
                                alt="Documents"
                            />
                        </div>
                        <div className="text-xl text-secondary-foreground">
                            Coming Soon...
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}