

async function Claim() {
    try {
        await contractBscStake.methods.Claim()
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function Withdraw() {
    try {
        await contractBscStake.methods.Withdraw()
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function Compound() {
    try {
        console.log(new Date().getTime() / 1000);
        await contractBscStake.methods.Compound()
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function Deposit() {
    try {
        var value = $("#inputDeposit").val();

        var userData = await GetUserInfoAccount();
        if (userData !== null) {
            if (Number(userData.TotalDeposits) <= 0) {
                if (Number(value) < 1000) {
                    alert("First Deposit has a minimum of 1000 USDT");
                    return;
                }
            }
        }

        value = web3.utils.toWei(value);

        await contractBscStake.methods.Deposit(value)
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Master();
            })
            .on("error", function (error) {
                alert(error.message);
            });
    }
    catch (error) {
        console.log(error);
    }
}

async function GetUsersInfo() {
    try {
        var result = await contractBscStake.methods.UsersInfo().call();
        return result;
    }
    catch (error) {
        return null;
    }
}

async function GetUserInfoAccount() {
    try {
        var result = await contractBscStake.methods.userInfo(account).call();
        return result;
    }
    catch (error) {
        return null;
    }
}



async function Approve_Stake() {
    try {
        contractBscUSD.methods.approve(caStake, web3.utils.toWei("50000"))
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Master();
            })
            .on("error", function (error) {
                alert(error.message);
            });
    }
    catch (error) {
        return false;
    }
}

async function IsAllowed_Stake() {
    try {
        var amount = await contractBscUSD.methods.allowance(account, caStake).call();
        amount = Number(web3.utils.fromWei(amount));        

        if (amount >= 1000) {
            return true;
        }

        return false;
    }
    catch (error) {
        return false;
    }
}

async function Reinvest() {
    try {
        await contractBscStake.methods.Compound()
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function InitiateRewards() {
    try {
        await contractBscStake.methods.InitiateClaim()
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function InitiateWithdraw(deposit) {
    try {
        await contractBscStake.methods.InitiateWithdrawal(deposit.toString())
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function WithdrawDeposit(deposit) {
    try {
        await contractBscStake.methods.Withdraw(deposit.toString())
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function RelockDeposit(id) {
    try {
        await contractBscStake.methods.RelockDeposit(id.toString())
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {
        alert(error.message);
    }
}

async function ChangeWithdrawAddr() {
    try {
        var target = $("#inputChangeAdr").val();

        if (!web3.utils.isAddress(target)) {
            alert("Invalid address");
            return;
        }

        await contractBscStake.methods.ChangeWithdrawalAddress(target)
            .send({
                from: account
            })
            .on("receipt", function (receipt) {
                Init_Earn();
            })
            .on("error", function (error) {

            });
    }
    catch (error) {

    }
}
