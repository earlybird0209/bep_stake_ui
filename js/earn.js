async function TakeAction(id, action) {
    try {
        //0 = compound
        //1 = claim
        //2 = withdraw
        return;
        await contractStake.methods.InitiateAction(id.toString(), action.toString())
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

async function Claim() {
    try {
        await contractStake.methods.Claim()
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
        await contractStake.methods.Withdraw()
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
        await contractStake.methods.Compound()
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

        await contractStake.methods.deposit(value)
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

async function IsFriday(time) {
    try {
        var Friday = await GetFriday();

        if (Math.floor((time - Friday) / oneDaySecond) % cycleDays == 0) {
            return true;
        }        

        return false;
    }
    catch {
        return false;
    }
}

async function GetFriday() {
    try {
        //var val = await contractBscStake.methods.Friday().call();
        return Number(1682640000);
    }
    catch (error) {
        console.log(error);
        return 0;
    }
}

async function Approve_Stake() {
    try {
        contractUSD.methods.approve(caStake, web3.utils.toWei("50000"))
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
        var amount = await contractUSD.methods.allowance(account, caStake).call();
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
        await contractStake.methods.Compound()
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
        await contractStake.methods.InitiateClaim()
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
        await contractStake.methods.InitiateWithdrawal(deposit.toString())
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
        await contractStake.methods.Withdraw(deposit.toString())
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
        await contractStake.methods.RelockDeposit(id.toString())
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

        await contractStake.methods.changeWithdrawalAddress(target)
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
