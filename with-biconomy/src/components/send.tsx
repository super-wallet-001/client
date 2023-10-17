import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

export default function SendTransection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Send funds across chains</CardTitle>
                <CardDescription>
                    Select the chain and amount of ETH needed to send, Super Wallet can make cross chain transactions.
                </CardDescription>
            </CardHeader>
            <Separator className="my-6 mx-8 w-[95%]" />
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="area">Chain</Label>
                        <Select defaultValue="billing">
                            <SelectTrigger id="area">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="team">Scroll</SelectItem>
                                <SelectItem value="billing">Mantle</SelectItem>
                                <SelectItem value="account">Polygon Mumbai</SelectItem>
                                <SelectItem value="deployments">Avalanche Fuji</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Wallet Address" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="Amount in ETH" />
                </div>
            </CardContent>

            <CardFooter className="flex justify-center gap-8 space-x-2">
                <Button className="w-80" variant="ghost">Cancel</Button>
                <Button className="w-80" >Submit</Button>
            </CardFooter>
        </Card>
    )
}