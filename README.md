burstpay's burst-pool v4
==========


Work in progress.

Roadmap:
- Remove unused code
- Make it ddos-resilient

Changelog:

02.09.2017:
- Added clearingBonus to empty pool's wallet and to give bonuses.
- Fixed mature blocks winning and paying notifications
- Added poolcapacity and miners capacity
- Replaced shares with percentages
- Reworked the share allocation to split the blockreward clearly between current round and historic shares
- Fixed user IP on chat
- Added an emit to send all current round shares on first user connection
- Added pending payments as total and per user 

Initial Release:
- Added support on node v6
- Removed devfee
- Removed pooling from web sockets
- Design changed
- Added maxDeadline limitation
- Blocked all wallet requests except getmininginfo and submit nonce


Credits:

Lexicon - Various fixes and development 

Uraymeiviar - Initial Development

tross - Beta testing and feature support


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
|"cumulativeFundReduction" | % to go to historic shares|
|"logWebsocketToConsole" | output whats sent to peoples browsers into the console window|
|"maxRoundCount" | max rounds to display in all round shares. any that exceed this are deleted|
|"maxRecentPaymentHistory" | max lines to show in payment history|
|"maxDeadline" | Maximum accepted deadline|
|"clearingBonus" | If the pool has a balance larger than 3 times the blockreward, it distributes part of it as block reward (0.2 = 20%)|
