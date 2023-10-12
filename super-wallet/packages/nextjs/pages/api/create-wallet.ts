import type { NextApiResponse } from "next";
import { prisma } from "~~/utils/db";
import { walletFactoryContract } from "~~/utils/getContracts";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";


type ResponseData = {
    response?:{
        id: number;
        address: string;
        signers: string[];
        isDeployed: boolean;
        salt: string;
    }
    message:string;
}


export default async function handler(
    req:NextRequest,
    res:NextApiResponse<ResponseData>
) {
    if(req.method==="POST"){
        try{

            const {signers}:{signers:string[]} = req.body;
    
            const salt = Math.floor(Math.random()*1000000);

            const walletAddress = await walletFactoryContract.getAddress(signers,salt);

            const response = await prisma.wallet.create({
                data:{
                    salt:salt.toString(),
                    signers:signers.map((s)=>s.toLowerCase()),
                    isDeployed:false,
                    address:walletAddress
                }
            })

            res.status(201).json({response,message:"Wallet Created Successfully!"});

        }catch(error){
            console.log('[ERROR_WHILE_CREATING_NEW_SMART_CONTRACT_WALLET]: ',error);
            return NextResponse.json({error});
        }

    }
}