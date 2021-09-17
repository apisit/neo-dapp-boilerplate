import React from "react"
import { Link } from 'react-router-dom';
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core/lib";

export default function TopNavbar(props) {

    const walletConnectCtx = useWalletConnect()

    const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

    const [connectedAccount, setConnectedAccount] = React.useState(null);

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible)
    }

    const disconnect = () => {
        walletConnectCtx.disconnect()
    }

    const connect = () => {
        walletConnectCtx.connect()
    }

    React.useEffect(() => {
        var accounts = [];
        walletConnectCtx.accounts.forEach((a) => {
            let [namespace, reference, address] = a.split(":");
            accounts.push({
                namespace: namespace,
                network: reference,
                address: address,
            })
        })
        if (walletConnectCtx.accounts.length > 0) {
            setConnectedAccount(accounts[0])
        }
    }, [walletConnectCtx.accounts])

    return (
        <div>
            <nav className="bg-gray-600 lg:flex items-center w-full z-10">
                <div className="container mx-auto h-16 flex items-center justify-between flex-wrap px-4 ">
                    <Link to="/">
                        <p className="text-white text-lg font-semibold mr-4">NEO dApp Boilerplate</p>
                    </Link>
                    <div className="block lg:hidden">
                        <button onClick={(e) => toggleMobileMenu()} className="focus:outline-none flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                            {
                                mobileMenuVisible ?
                                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    :
                                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            }
                        </button>
                    </div>

                    <div className="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className=" font-medium lg:flex-grow">
                            <Link to="/" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'home' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Home</Link>
                            <Link to="/transfer" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'transfer' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Transfer</Link>
                            <Link to="/smartcontract" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'smartcontract' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Smart Contract</Link>
                        </div>
                        <div className="hidden lg:block">
                            {connectedAccount ?

                                <div className="flex space-x-4 items-center">
                                    <div className="">
                                        <div className="font-medium leading-none text-white text-xs">{connectedAccount.address}</div>
                                        <div className="text-xs font-medium text-gray-400">{connectedAccount.namespace} · {connectedAccount.network}</div>
                                    </div>
                                    <div>
                                        <button className="px-2 py-2 font-medium text-sm rounded bg-gray-700 text-white" onClick={(e) => { disconnect() }}>Disconnect</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <button className="px-2 py-2 font-medium text-sm rounded bg-gray-700 text-white" onClick={(e) => { connect() }}>Connect Wallet</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile menu, toggle classes based on menu state. Open: "block", closed: "hidden" */}

                <div className={mobileMenuVisible === true ? "block" : "hidden"}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'home' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Home</Link>
                        <Link to="/transfer" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'transfer' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Transfer</Link>
                        <Link to="/smartcontract" className={"block px-4 py-2 rounded mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 " + (props.active === 'smartcontract' ? 'bg-opacity-50 bg-gray-800 text-white' : 'text-gray-400  hover:bg-gray-800')}>Smart Contract</Link>



                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-700">
                        <div className="">
                            {connectedAccount ?

                                <div className="px-4">
                                    <div className="">
                                        <div className="font-medium leading-none text-white text-xs">{connectedAccount.address}</div>
                                        <div className="text-xs font-medium  text-gray-400">{connectedAccount.namespace} · {connectedAccount.network}</div>
                                    </div>
                                    <button className="mt-4 w-full px-2 py-2 font-medium text-sm rounded bg-gray-700 text-white" onClick={(e) => { disconnect() }}>Disconnect</button>
                                </div>
                                :
                                <div className="px-4">
                                    <button className="w-full px-2 py-2 font-medium text-sm rounded bg-gray-700 text-white" onClick={(e) => { connect() }}>Connect Wallet</button>
                                </div>
                            }
                        </div>

                    </div>
                </div>
                {/* end mobile menu */}
            </nav>
        </div>
    )
}