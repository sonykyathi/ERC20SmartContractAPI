const ABI  = require('../container/abi.json')
const express = require('express')
const router = express.Router()

const Web3 = require('web3')
const rpcURL = "https://rinkeby.infura.io/v3/c3950d5fe0814e3e9bd30ba0fcd21aa2"
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

//const address = '0xB65b9eD35D399301B42ecE4265E69c63F2bb0340'
const address = '0xA37EaE6410d135Df34faf00fCaf70eA2e5269f1f'
const contract =  new web3.eth.Contract(ABI, address)


//get the symbol of the contract

router.get('/api/symbol' ,async function (req , res){

	let val1 = await contract.methods.symbol().call()
	console.log(val1)
	
	 res.send({  "symbol: " :val1 });
 
 });

 // get the balance of the contract

 router.get('/api/balance',async function (req, res) {
	
		let val = await contract.methods.balanceOf(process.env.RINKEBY_FROM_ADDRESS).call()
		console.log(val)
	
		res.send({  " balance: " :val });
	  });

 // get decimal of the total supply of the contract

 router.get('/decimal',async function (req, res)
 {
     const dec = await contract.methods.decimals().call()
     console.log(dec)
     res.send({ "decimal:" :dec });
 })
 
 //get the name of the contract

 router.get('/name',async function (req, res)
 
 {
     const nam = await contract.methods.name().call()
     console.log(nam)
     res.send({"name:" : nam });
 })

 // get the totalsupply of the contract

 router.get('/totalsupply',async function (req, res)
 {
     const ts = await contract.methods.totalSupply().call()
     console.log(ts)
     res.send({"totalsupply" :ts})
 })

 //get the allowance of the address
 router.get('/allowance',async function (req, res)
 {
     const allowance = await contract.methods.allowance(process.env.RINKEBY_FROM_ADDRESS,process.env.RINKEBY_TO_ADDRESS).call()
     console.log(allowance)
     res.send({"allowance" :allowance})
 })

module.exports = router