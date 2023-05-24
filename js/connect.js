var timerChain = null;

async function CheckChain() {
    var chainid = web3.currentProvider.chainId;
    var network = web3.currentProvider.networkVersion;

    try {
        chainid = Number(chainid);
    }
    catch {
        try {
            chainid = Number(network);
        }
        catch {
            // No Chain found
        }
    }

    var rpc;
    for (let l in rpcs) {
        if (chainid == rpcs[l].chainid) {
            rpc = rpcs[l];
        }
    }

    if (rpc !== undefined) {
        if (rpc.chainid !== 56) {
            //Not BSC
            try {
                $("#wrongchain").show();
                return;
            }
            catch { }
        } else {
            $("#wrongchain").hide();
        }
    }

    if (account !== "") {
        var balance = await web3.eth.getBalance(account);
        balance = web3.utils.fromWei(balance.toString());
        $("#gasbalance").text(Number(balance).toFixed(2) + " " + rpc.rpcToAdd.nativeCurrency.symbol);
        $("#gasbalance2").text(Number(balance).toFixed(2) + " " + rpc.rpcToAdd.nativeCurrency.symbol);        
    }
}

async function SwapChain(rpc) {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(rpc.chainid) }],
        });
    } catch (e) {
        if (e.toString().includes("available")) {
            alert("Please change your chain through your wallet menu.");
        }

        if (e.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [rpc.rpcToAdd],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
        console.error(e)
    }

}

async function IsConnected() {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            return true;
        } else {
            return false;
        }
    }
    catch {
        return false;
    }
}

async function Connect() {
    if (typeof ethereum !== 'undefined') {
        try {
            web3.setProvider(Web3.givenProvider);
            var acc = await ethereum.request({ method: 'eth_requestAccounts' });
            account = acc.toString();
            $("#walletModal").modal("hide");
            Init_Master();
        }
        catch (error) {
            console.log(error);
            if (error.code === 4001) {
                alert("Connection Rejected");
            }
        }
    } else {
        if (provider.connected == true) {
            ConnectWC();
        }
    }
}

const WalletConnectProvider = window.WalletConnectProvider.default;
var provider;

async function ConnectWC() {
    try {
        const provider = new WalletConnectProvider({
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                1: "https://mainnet.infura.io/v3/",
                137: "https://polygon-rpc.com/",
                43114: "https://api.avax.network/ext/bc/C/rpc",
                25: "https://rpc.artemisone.org/cronos"
            }
        });

        if (provider.connected != true) {
            var acc = await provider.enable();
            web3.setProvider(provider);
            account = acc[0];
            $("#walletModal").modal("hide");
            Init_Master();
        }
        else {
        }
    } catch (error) {
        provider = null;
        console.log(error);
        if (error.code === 4001) {
            alert("Connection Rejected");
        }
    }
}

async function Disconnect() {
    $("#btn-connect").show();
    $("#btn-disconnect").hide();
    $("#btn-connect-mob").show();
    $("#btn-disconnect-mob").hide();
    $("#walletModal").modal("hide");

    $("#disconnect-menu").hide(400);
    $("#walletaddress").text("Not Connected");

    account = "";
    if (provider.connected == true) { await provider.disconnect(); }
    CheckChain();
    Init_Master();
}

ethereum.on("accountsChanged", async function() {
    var acc = await ethereum.request({ method: 'eth_requestAccounts' });
    account = acc.toString();
    await CheckChain();
    Init_Master();
});

ethereum.on("chainChanged", async function () {
    await CheckChain();
    Init_Master();
});