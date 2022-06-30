We made this code : https://github.com/MetagemsOfficial/dAppMetaGems/blob/main/FuturSolidityCode(Lands).gitignore

The goal of this Smart contract is to claim from a same webpage , 5 differents lands based on 2 differents contract and many functions based on token ID 
* Let's start with the 4 land in the WOMLand contract, most important for the launch on 07 july.

First, we already have this mint page that already work and exist : https://mint.metagems.world that is link to this contract : https://etherscan.io/address/0x44cc59bde0dea5f928bc25c71a3191a0693670aa

We put the visual studio folder project in the github as well, based from it we can duplicate and reorganise the page for 5 items (Things that is far from knowledge for us)

We also need the connect button for the wallet, every time he refresh the page and not connected (same way as the simgle mint page worked now)

From there, we want to link this new visual studio build to the right smart contract function with (+ -) buttons and for a max supply of 50 per wallet and 5 or 10 per transaction based on the type of land (this variable and function is not set in anyplace in the smart contract we will need to implamente it with you guys if possible between line 1463	and 1464 )
For the minting function that we need to bound is from Line : 1515 to 1558 

Also, we want to add a airdrop function that we can enter in etherscan the adresse to send a specific ammount of NFT to this person. 
We also want to understand the line 1638 (adding presale user / removing ) if it's for airdop

**If we have time, we can also integrate the actual mint button for the claim button we want to make for the metagems genesis land and the backend for it. We also have made the code if you want to take a look : https://github.com/MetagemsOfficial/dAppMetaGems/blob/main/LandClaimSolidityCode(ChosenLandsClaim).gitignore
-> Easily you can find the free mint function at line : 1268 but we want to be sure each token id is bound to the right token id that the holder want to claim and be sure it not claimable twice 

Everything optimized for blockchain mainnet launch and also for holder package or single mint gas fee (but i think for that is already optimized, but you can confirm me) 
Thanks. 
