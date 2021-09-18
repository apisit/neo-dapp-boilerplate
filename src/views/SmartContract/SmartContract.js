import React from "react"
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core/lib";
import TopNavbar from '../Shared/TopNavbar'

export default function SmartContract(props) {
    const walletConnectCtx = useWalletConnect()

    const [selectedManifestFile, setSelectedManifestFile] = React.useState(null)
    const [manifest, setManifest] = React.useState(null)
    const [scripthash, setScripthash] = React.useState("")
    const [results, setResults] = React.useState({})
    const [invokeParams, setInvokeParams] = React.useState({});

    // const manifest = JSON.parse(`{
    //     "name": "VLATokenContract",
    //     "groups": [],
    //     "features": {},
    //     "supportedstandards": ["NEP-17"],
    //     "abi": {
    //         "methods": [{
    //             "name": "symbol",
    //             "offset": 1608,
    //             "safe": false,
    //             "returntype": "String",
    //             "parameters": []
    //         }, {
    //             "name": "decimals",
    //             "offset": 1623,
    //             "safe": false,
    //             "returntype": "Integer",
    //             "parameters": []
    //         }, {
    //             "name": "totalSupply",
    //             "offset": 50,
    //             "safe": true,
    //             "returntype": "Integer",
    //             "parameters": []
    //         }, {
    //             "name": "balanceOf",
    //             "offset": 95,
    //             "safe": true,
    //             "returntype": "Integer",
    //             "parameters": [{
    //                 "name": "owner",
    //                 "type": "Hash160"
    //             }]
    //         }, {
    //             "name": "transfer",
    //             "offset": 455,
    //             "safe": false,
    //             "returntype": "Boolean",
    //             "parameters": [{
    //                 "name": "from",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "to",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }, {
    //                 "name": "data",
    //                 "type": "Any"
    //             }]
    //         }, {
    //             "name": "_deploy",
    //             "offset": 1047,
    //             "safe": false,
    //             "returntype": "Void",
    //             "parameters": [{
    //                 "name": "data",
    //                 "type": "Any"
    //             }, {
    //                 "name": "update",
    //                 "type": "Boolean"
    //             }]
    //         }, {
    //             "name": "getOwner",
    //             "offset": 993,
    //             "safe": false,
    //             "returntype": "Hash160",
    //             "parameters": []
    //         }, {
    //             "name": "verify",
    //             "offset": 1096,
    //             "safe": false,
    //             "returntype": "Boolean",
    //             "parameters": []
    //         }, {
    //             "name": "mint",
    //             "offset": 1108,
    //             "safe": false,
    //             "returntype": "Void",
    //             "parameters": [{
    //                 "name": "account",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }]
    //         }, {
    //             "name": "burn",
    //             "offset": 1152,
    //             "safe": false,
    //             "returntype": "Void",
    //             "parameters": [{
    //                 "name": "account",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }]
    //         }, {
    //             "name": "update",
    //             "offset": 1196,
    //             "safe": false,
    //             "returntype": "Boolean",
    //             "parameters": [{
    //                 "name": "nefFile",
    //                 "type": "ByteArray"
    //             }, {
    //                 "name": "manifest",
    //                 "type": "String"
    //             }]
    //         }, {
    //             "name": "destroy",
    //             "offset": 1251,
    //             "safe": false,
    //             "returntype": "Boolean",
    //             "parameters": []
    //         }, {
    //             "name": "onNEP17Payment",
    //             "offset": 1300,
    //             "safe": false,
    //             "returntype": "Void",
    //             "parameters": [{
    //                 "name": "from",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }, {
    //                 "name": "data",
    //                 "type": "Any"
    //             }]
    //         }, {
    //             "name": "withdrawNEO",
    //             "offset": 1471,
    //             "safe": false,
    //             "returntype": "Boolean",
    //             "parameters": [{
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }]
    //         }, {
    //             "name": "_initialize",
    //             "offset": 1534,
    //             "safe": false,
    //             "returntype": "Void",
    //             "parameters": []
    //         }],
    //         "events": [{
    //             "name": "Transfer",
    //             "parameters": [{
    //                 "name": "from",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "to",
    //                 "type": "Hash160"
    //             }, {
    //                 "name": "amount",
    //                 "type": "Integer"
    //             }]
    //         }]
    //     },
    //     "permissions": [{
    //         "contract": "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
    //         "methods": ["transfer"]
    //     }, {
    //         "contract": "0xfffdc93764dbaddd97c48f252a53ea4643faa3fd",
    //         "methods": ["destroy", "getContract", "update"]
    //     }, {
    //         "contract": "*",
    //         "methods": ["onNEP17Payment"]
    //     }],
    //     "trusts": [],
    //     "extra": {
    //         "Author": "Apisit",
    //         "Email": "apisit@coz.io",
    //         "Description": "VLA v1.4"
    //     }
    // }`)

    const invokeTypeMap = {
        "Hash160": "Address",
        "Integer": "Integer"
    }
    const invoke = async (method, params, test) => {
        const methodName = method.name;

        const address = WcSdk.getAccountAddress(walletConnectCtx.session)

        const parameters = [];

        method.parameters.map((p) => {
            if (p.value !== undefined) {
                let invokeType = invokeTypeMap[p.type]
                const param = { type: invokeType, value: p.value };
                parameters.push(param)
            }
            if (p.type === "Any") {
                const args = { type: 'Array', value: [] }
                parameters.push(args)
            }
        })

        console.log(parameters);


        if (test === true) {
            const resp = await walletConnectCtx.testInvoke(scripthash, methodName, parameters);
            console.log(resp);
            setResults({ ...results, [methodName]: resp });
        } else {
            const resp = await walletConnectCtx.invokeFunction(scripthash, methodName, parameters);
            console.log(resp);
            setResults({ ...results, [methodName]: resp });
        }
    }

    const onChangeParams = (method, param, value) => {

        // var m = manifest.abi.methods.find((m) => m.name === method.name)

        let p = method.parameters.find((p) => p.name === param.name)
        if (p !== null) {
            if (p.type === "Integer") {
                p["value"] = Number(value)
            } else {
                p["value"] = value
            }

        }
        console.log(method)

    }

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedManifestFile(e.target.result);
                setManifest(JSON.parse(e.target.result))
            }
            reader.readAsText(file)
        }
    }

    const renderInput = (method, param) => {
        switch (param.type) {
            case 'Hash160':
                return (
                    <label className="block">
                        <span>{param.name}: {param.type}</span>
                        <input type="text" className="mt-1 w-full rounded" onChange={(e) => { onChangeParams(method, param, e.target.value) }} />
                    </label>
                )
            case 'String':
                return (
                    <label className="block">
                        <span>{param.name}: {param.type}</span>
                        <input type="text" className="mt-1 w-full rounded" onChange={(e) => { onChangeParams(method, param, e.target.value) }} />
                    </label>
                )
            case 'ByteArray':
                return (
                    <label className="block">
                        <span>{param.name}: {param.type}</span>
                        <input type="text" className="mt-1 w-full rounded" onChange={(e) => { onChangeParams(method, param, e.target.value) }} />
                    </label>
                )
            case 'Any':
                return (
                    <label className="block">
                        <span>{param.name}: {param.type}</span>
                        <input type="text" className="mt-1 w-full rounded" onChange={(e) => { onChangeParams(method, param, e.target.value) }} />
                    </label>
                )
            case "Integer":
                return (
                    <label className="block">
                        <span>{param.name}: {param.type}</span>
                        <input type="number" className="mt-1 w-full rounded" onChange={(e) => { onChangeParams(method, param, e.target.value) }} />
                    </label>
                );
            default:
                return (
                    <div>
                        {param.name} {param.type}
                    </div>
                );
        }
    }

    return (
        <div>
            <TopNavbar active="smartcontract"></TopNavbar>
            <div className="container mx-auto py-6 px-4">
                <p className="text-xl font-bold mb-6">Smart Contract</p>

                <label className="block">
                    <span>Smart Contract script hash</span>
                    <input type="text" className="mt-1 block w-full rounded" onChange={(e) => { setScripthash(e.target.value.trim()) }}></input>
                </label>

                <label className="block mt-4">
                    <span>Select your smart contract manifest.json</span>
                    <input type="file" className="mt-1 block w-full rounded" accept=".json" onChange={onSelectFile}></input>
                </label>

                
                

                {
                    manifest === null ? null
                    :

                        <div>
                            <div className="my-6">
                                <p className="text-lg font-semibold">{manifest.name}</p>
                                <p className="mb-2 text-gray-600">{manifest.extra.Description}</p>
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-xs text-gray-600">Author</p>
                                        <p>{manifest.extra.Author}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Email</p>
                                        <p>{manifest.extra.Email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Supported Standards</p>
                                        <p>{manifest.supportedstandards.join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {manifest.abi.methods.map((method) => (
                                    <div key={method.name} className="w-full border rounded-lg p-4">
                                        <p className="font-medium mb-2">{method.name}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {
                                                method.parameters.map((param) => (
                                                    <div key={param.name}>
                                                        {renderInput(method, param)}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="mt-2">
                                            <button className="bg-gray-600 text-white px-2 py-2 rounded mr-2" onClick={(e) => { invoke(method, method.parameters, true) }}>Test Invoke</button>
                                            <button className="bg-gray-600 text-white px-2 py-2 rounded" onClick={(e) => { invoke(method, method.parameters, false) }}>Invoke</button>
                                        </div>
                                        {
                                            results[method.name] ?
                                                <div className="mt-4 border-t pt-2">
                                                    <p className="mb-1">Result</p>
                                                    <textarea className="rounded w-full border border-gray-300" readOnly value={JSON.stringify(results[method.name])}></textarea>
                                                </div>
                                                : null
                                        }

                                    </div>
                                ))
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}