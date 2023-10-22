import { useStateContext } from "@/context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function RecentTransections() {
    const {transactions}=useStateContext();
    return (
        <div className="space-y-8 mt-3">
            {
                transactions && transactions.map((transaction, index) => {
                    return (
                        <div className="flex items-center" key={index}>
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{transaction.receiverAddress}</p>
                            </div>
                            <div className="ml-auto font-medium">{transaction.amountSend} aUSDC</div>
                        </div>
                    )
                })
            }

        </div>
    )
}