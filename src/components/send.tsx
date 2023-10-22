import { useStateContext } from "@/context";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import * as z from "zod";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";



export default function SendTransection() {

  const { walletBalances,executeSendToken} = useStateContext();
  const { toast } = useToast();

  // const formSchema = z.object({
  //   receiversChain: z.string().refine((val) => ["mumbai", "avalanche", "scroll", "mantle"].includes(val)),
  //   receiverAddress: z.string().min(42).max(42).refine((val) => val.startsWith("0x"), {
  //     message: "Invalid address",
  //   }),
  //   amount: z.string().refine((val) => parseInt(val) <= walletBalances!.aUSDC.totalBalance,{
  //     message: `Available balance is ${walletBalances!.aUSDC.totalBalance} aUSDC`,
  //   }),
  //   token: z.string().refine((val) => ["eth", "aUSDC"].includes(val)),
  //   tokenFromChains: z.object({
  //     mumbai: z.string().refine((val) => parseInt(val) <= walletBalances!.aUSDC.mumbai,{
  //       message: `Available balance is ${walletBalances!.aUSDC.mumbai} aUSDC`,
  //     }),
  //     avalanche: z.string().refine((val) => parseInt(val) <= walletBalances!.aUSDC.avalanche,{
  //       message: `Available balance is ${walletBalances!.aUSDC.avalanche} aUSDC`,
  //     }),
  //     scroll: z.string().refine((val) => parseInt(val) <= walletBalances!.aUSDC.scroll,{
  //       message: `Available balance is ${walletBalances!.aUSDC.scroll} aUSDC`,
  //     }),
  //     mantle: z.string().refine((val) => parseInt(val) <= walletBalances!.aUSDC.mantle,{
  //       message: `Available balance is ${walletBalances!.aUSDC.mantle} aUSDC`,
  //     }),
  //   }),
  // })
  const formSchema = z.object({
    receiversChain: z.string().refine((val) => ["mumbai", "avalanche", "scroll", "mantle"].includes(val)),
    receiverAddress: z.string().min(42).max(42).refine((val) => val.startsWith("0x"), {
      message: "Invalid address",
    }),
    amount: z.string(),
    token: z.string().refine((val) => ["eth", "aUSDC"].includes(val)),
    tokenFromChains: z.object({
      mumbai: z.string(),
      avalanche: z.string(),
      scroll: z.string(),
      mantle: z.string(),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiversChain: "mumbai",
      token: "aUSDC",
      amount: "0",
      receiverAddress: "0xabc...def",
      tokenFromChains: {
        mumbai: "0",
        avalanche: "0",
        scroll: "0",
        mantle: "0",
      }
    }
  })

  async function handleOnSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try{
      await executeSendToken(data.receiverAddress,data.receiversChain,data.token,parseInt(data.tokenFromChains.avalanche),parseInt(data.tokenFromChains.mumbai));
      toast({
        title: "Success",
        description: "Transaction sent successfully!",
      })
    }catch(error){
      console.log('[ERROR_WHILE_EXECUTING_THE_MULTICHAIN_TRANSECTION]: ',error);
      toast({
        variant:"destructive",
        title: "Error",
        description: "There was some error while sending the multichain transection, try again later!",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Send funds across chains</CardTitle>
            <CardDescription>
              Select the chain and amount of tokens needed to send, Super Wallet can make cross chain transactions as well.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              name="receiversChain"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2 text-md">
                    <FormLabel htmlFor="area">Receiver&apos;s Chain</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12" id="area">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="scroll">Scroll</SelectItem>
                        <SelectItem value="mantle">Mantle</SelectItem>
                        <SelectItem value="mumbai">Polygon Mumbai</SelectItem>
                        <SelectItem value="avalanche">Avalanche Fuji</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="receiverAddress"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2 text-md">
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                      {...field}
                      className="h-12"
                      id="address"
                      placeholder="Wallet Address"
                    />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="token"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="area">Token</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="area" className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={"eth"}>
                        <SelectItem value="eth" disabled>
                          <div className="w-full flex justify-around items-center">
                            <svg className="h-7 w-7 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" fillRule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA" /><g fill="#FFF" fillRule="nonzero"><path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" /><path d="M16.498 4L9 16.22l7.498-3.35z" /><path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" /><path d="M16.498 27.995v-6.028L9 17.616z" /><path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" /><path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" /></g></g></svg>
                            <div className="flex flex-col ml-4">
                              <p className=" text-lg font-medium leading-none">ETH</p>
                              <p className="text-md text-muted-foreground">
                                Available: {walletBalances?.ETH.mumbai} ETH
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="aUSDC">
                          <div className="w-full flex justify-around items-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><circle fill="#3E73C4" cx="16" cy="16" r="16" /><g fill="#FFF"><path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" /><path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" /></g></g></svg>
                            <div className="flex flex-col items-start ml-4">
                              <p className=" text-lg font-medium leading-none">aUSDC</p>
                              <p className="text-md text-muted-foreground">
                                Available: {walletBalances?.aUSDC.totalBalance} aUSDC
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )
              }}
            />
            <div className="flex gap-2 items-end">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="grow">
                      <FormLabel htmlFor="amount">Amount</FormLabel>
                      <Input
                        {...field}
                        className="h-12"
                        id="amount"
             
                        placeholder="Amount"
                      />
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <div className="grow-0">
                <Popover>
                  <PopoverTrigger asChild className="h-12">
                    <Button variant="outline">Network wise selection</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Select Amount</h4>
                        <p className="text-sm text-muted-foreground">
                          Customize amount to be used for each chain.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          name="tokenFromChains.mumbai"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem className="grid grid-cols-3 items-center gap-4">
                                <FormLabel htmlFor="mumbaiAmount">Mumbai</FormLabel>
                                <Input
                                  {...field}
                                  className="h-12"
                                  id="mumbaiAmount"
                                 
                                  placeholder="Amount"
                                />
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          name="tokenFromChains.avalanche"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem className="grid grid-cols-3 items-center gap-4">
                                <FormLabel htmlFor="avalancheAmount">Avalanche</FormLabel>
                                <Input
                                  {...field}
                                  className="h-12"
                                  id="avalancheAmount"
                               
                                  placeholder="Amount"
                                />
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          name="tokenFromChains.scroll"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem className="grid grid-cols-3 items-center gap-4">
                                <FormLabel htmlFor="scrollAmount">Scroll</FormLabel>
                                <Input
                                  {...field}
                                  className="h-12"
                                  id="scrollAmount"
                           
                                  placeholder="Amount"
                                />
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                        <FormField
                          name="tokenFromChains.mantle"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem className="grid grid-cols-3 items-center gap-4">
                                <FormLabel htmlFor="mantleAmount">Mantle</FormLabel>
                                <Input
                                  {...field}
                                  className="h-12"
                                  id="mantleAmount"
                           
                                  placeholder="Amount"
                                />
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-8 space-x-2">
            <Button className="w-full text-lg font-medium" >Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}