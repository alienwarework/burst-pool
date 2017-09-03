module.exports = {
    wallets : [
        {
            walletIP : '127.0.0.1',
            walletPort : 8125,
            walletUrl : 'http://127.0.0.1:8125'
        }
    ],
    redirection : {
        enabled : false,
        target : 'http://google.com:8124'
    },
    walletIndex: 0,
    blockMature : 4,
    txFeePercent : 0.0005,
    poolFee : 0.01,
    poolDiff : 1000000,
    poolDiffCurve : 0.75,
    poolPort : 8124,
    poolPvtKey : 'Passphrase here', 
     poolPublicRS : 'Account ID',
       poolPublic : 'Numeric Account ID',
       poolFeePaymentAddr : 'Numeric Account ID Fees',
    defaultPaymentDeadline : 1440,
    poolFeePaymentTxFeeNQT : 100000000,
    httpPort : 8080,
    websocketPort : 4443,
    enablePayment : true,
    minimumPayout : 50.0,
    clearingMinPayout : 50.0,
    lastSessionFile : 'last-session.json',
    cumulativeFundReduction : 0.4,
    logWebsocketToConsole : true,
    maxRoundCount : 10,
    sharePenalty : 0.001,
    maxRecentPaymentHistory : 50,
    clearingBonus: 0.20,
    maxDeadline: 2592000

};

/*
SubmitNonce = {
      secretPhrase, (private-key) ---> secretAccount (public-key)   <----------+
  +-- nonce,                                                                   |
  |   accountId ---> getRewardRecipient() ---> rewardId (public-pool-address) -+
  |            |                                  ^
} |            |                                  |
  V            V                                  |
nonce + genAccount                                |
  |            |                                  |
  +____________+                                  |
         |                                        |
         V                                        |
     Deadline                                     |
         |    (if smallest)                       |
         V                                        |
     Forge() ------> getRewardRecipient() --------+
 */
