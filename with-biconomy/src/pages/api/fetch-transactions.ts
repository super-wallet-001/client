import { prisma } from "@/lib/db";
import { Transaction } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  allTransactions?:Transaction[]
  error?: string
}

export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method==="GET"){
    const {walletAddress}=req.body;
    try{
      const transactions = await prisma.transaction.findMany({
        where:{
          senderAddress:walletAddress
        }
      })
      res.status(200).json({ allTransactions:transactions })
    }catch(error){
      console.log('[ERROR_WHILE_FETCHING_ALL_TRANSACTIONS]: ',error);
      res.status(500).json({ error:"Could not fetch transections" })
    }
    
  }else {
    res.status(404).json({ error:"Invalid Method" })
  }
}
