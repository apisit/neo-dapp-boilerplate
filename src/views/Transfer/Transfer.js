import React from "react"
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core/lib";
import TopNavbar from '../Shared/TopNavbar'

export default function Transfer(props) {

    const walletConnectCtx = useWalletConnect()
    const NativeContract = {
        neo: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
        gas: "0xd2a4cff31913016155e38e474a2c06d08be276cf"
    }

    const [selectedAsset, setSelectedAsset] = React.useState(NativeContract.neo)
    const [toAddress, setToAddress] = React.useState("")
    const [amount, setAmount] = React.useState(0);



    const send = async (e) => {
        e.preventDefault();

        const scripthash = selectedAsset // GAS token

        const methodName = 'transfer';

        const senderAddress = WcSdk.getAccountAddress(walletConnectCtx.session)
        console.log(scripthash, toAddress, senderAddress);

        const from = { type: 'Address', value: senderAddress };
        const recipient = { type: 'Address', value: toAddress }; // NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv

        var sendingAmount = amount;
        if (selectedAsset === NativeContract.gas) {
            sendingAmount = Number(sendingAmount) * (10 ^ 8)
        }
        const value = { type: 'Integer', value: sendingAmount };
        const args = { type: 'Array', value: [] }

        const parameters = [from, recipient, value, args];
        const resp = await walletConnectCtx.invokeFunction(scripthash, methodName, parameters);

        console.log(resp);
    }


    return (
        <div>
            <TopNavbar active="transfer"></TopNavbar>

            <div className="container mx-auto py-6 px-4">
                <p className="text-xl font-bold mb-6">Transfer NEO or GAS</p>

                <form className="bg-white rounded-lg border p-6 grid grid-cols-1 gap-3" onSubmit={(e) => send(e)}>
                    <div className="">
                        <span className="text-gray-700 mb-1">Asset</span>
                        <div className="mt-1 flex space-x-4">
                            <label className="inline-flex items-center">
                                <input type="radio" name="asset" value="0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5"
                                    checked={selectedAsset === NativeContract.neo}
                                    onChange={() => { setSelectedAsset(NativeContract.neo) }} />
                                <span className="ml-1">NEO</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" name="asset" value="0xd2a4cff31913016155e38e474a2c06d08be276cf"
                                    checked={selectedAsset === NativeContract.gas}
                                    onChange={() => { setSelectedAsset(NativeContract.gas) }} />
                                <span className="ml-1">GAS</span>
                            </label>
                        </div>
                    </div>
                    <label className="block">
                        <span className="text-gray-700">To Address</span>
                        <input type="text" className="mt-1 block w-full rounded" placeholder="" required onChange={(e) => { setToAddress(e.target.value) }} />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Amount</span>
                        <input type="number" min={selectedAsset === NativeContract.neo ? "1" : "0.00000001"} className="mt-1 block w-full rounded" placeholder="" required />
                    </label>
                    <div className="mt-4">
                        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded font-semibold">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}