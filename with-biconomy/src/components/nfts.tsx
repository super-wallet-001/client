import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function NFTs() {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Your NFTs</CardTitle>
                <CardDescription>
                    Your NFTs accross all the chains are visible over here.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

            </CardContent>
        </Card>

    )
}