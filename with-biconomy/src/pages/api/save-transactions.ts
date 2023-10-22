import { prisma } from "@/lib/db";
import { Transaction } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  transaction?:Transaction
  error?: string
}

export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method==="POST"){
    const {walletAddress,receiverAddress,amountSend,txHash}=req.body;
    try{
      const transaction = await prisma.transaction.create({
        data:{
          senderAddress:walletAddress,
          receiverAddress:receiverAddress,
          amountSend:amountSend,
          txHash:txHash
        }
      })
      res.status(200).json({ transaction:transaction })
    }catch(error){
      console.log('[ERROR_WHILE_FETCHING_ALL_TRANSACTIONS]: ',error);
      res.status(500).json({ error:"Could not fetch transections" })
    }
  }else {
    res.status(404).json({ error:"Invalid Method" })
  }
}
