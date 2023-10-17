import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function RecentTransections() {
    return (
        <div className="space-y-8 mt-3">
            {
                [1, 2, 3, 4].map((_, index) => {
                    return (
                        <div className="flex items-center" key={index}>
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">0xf23..222</p>
                            </div>
                            <div className="ml-auto font-medium">0.21 ETH</div>
                        </div>
                    )
                })
            }

        </div>
    )
}