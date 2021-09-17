import React from "react"
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core/lib";
import TopNavbar from '../Shared/TopNavbar'
export default function Home(props) {

    const walletConnectCtx = useWalletConnect()

    const connectWallet = () => {
        walletConnectCtx.connect()
    }

    const accounts = () => {
        var accounts = [];
        walletConnectCtx.accounts.forEach((a) => {
            let [namespace, reference, address] = a.split(":");
            accounts.push({
                namespace: namespace,
                network: reference,
                address: address,
            })
        })
        return accounts
    }

    return (
        <div>
            <TopNavbar active="home"></TopNavbar>

            <div className="container mx-auto py-6 px-4">
                <p className="text-xl font-bold mb-4">Welcome to NEO dApp Boilerplate</p>
                {walletConnectCtx.session ?
                    <div className="">
                        {
                            accounts().map((account) => (
                                <div>
                                    <p>{account.namespace}</p>
                                    <p>{account.network}</p>
                                    <p>{account.address}</p>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                    <button className="px-2 py-2 rounded w-full bg-blue-600 text-white font-medium" onClick={(e) => connectWallet()}>Connect Wallet</button>
                    </div>
                }

            </div>
        </div>
    )
}