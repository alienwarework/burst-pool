module.exports = {
    wallets : [
        {
            walletIP : 'wallet2.burstpay.net',
            walletPort : 8125,
            walletUrl : 'http://wallet2.burstpay.net:8125'
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
    poolPvtKey : 'flat enter consume dart dress thread chill came pink drop distance blend',   //no funds here, just testing :)
     poolPublicRS : 'BURST-MJHZ-LPEP-TEAN-3C8MK',
       poolPublic : '1787025894957236735',
       poolFeePaymentAddr : '12039060282554059773',
    defaultPaymentDeadline : 1440,
    poolFeePaymentTxFeeNQT : 100000000,
    httpPort : 8080,
    websocketPort : 4443,
    enablePayment : true,
    minimumPayout : 250.0,
    clearingMinPayout : 2.0,
    lastSessionFile : 'last-session.json',
    cumulativeFundReduction : 0.5,
    logWebsocketToConsole : true,
    maxRoundCount : 10,
    sharePenalty : 0.001,
    maxRecentPaymentHistory : 50,
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
