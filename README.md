burstpay's burst-pool v4
==========


Work in progress.

Roadmap:
- Make it work on node v6/v8 and keep it updated for new versions.
- Remove devfee
- Remove pooling
- Change design
- Remove unused code
- Increase code and wallet security
- Add deadline limit
- Remove unused code
- Make it ddos-resilient


Credits:

Lexicon - Various fixes and development 

Uraymeiviar - Initial Development


**Config**

| Setting | Description |
| --- | --- |
|"blockMature" | amount of blocks the pool goes back and checks for block winner|
|"txFeePercent" | Currently not implemented. tx fee is currently added to block reward and then a pool fee is applied to that total - 0.01 = 1% |
|"poolFee" | the percent a pool owner charges for hosting etc. 0.01 = 1%|
|"poolPort" | the port the pool is run on. default 8124|
|"poolPvtKey" | pool private key|
|"poolPublicRS" | pool public BURST- Address|
|"poolPublic" | Pool numerical burst address|
|"poolFeePaymentAddr" | where the fees for Pool Fee should get sent|
|"cumulativeFundReduction" | % to reserve for each prior round.|
|"logWebsocketToConsole" | output whats sent to peoples browsers into the console window|
|"maxRoundCount" | max rounds to display in all round shares. any that exceed this are deleted|
|"maxRecentPaymentHistory" | max lines to show in payment history|
