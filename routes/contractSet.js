const ABI  = require('../container/abi.json')
const { transection } = require('../utils/transaction')
const { approves } = require('../utils/approves')
const { decallowance } = require('../utils/decAllowance')
const { incallowance } = require('../utils/incAllowance')
const express = require('express')
const router = express.Router()

const Web3 = require('web3')
const req = require('express/lib/request')
const rpcURL = "https://rinkeby.infura.io/v3/c3950d5fe0814e3e9bd30ba0fcd21aa2"
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

//const address = '0xB65b9eD35D399301B42ecE4265E69c63F2bb0340'
const address = '0xA37EaE6410d135Df34faf00fCaf70eA2e5269f1f'
const contract =  new web3.eth.Contract(ABI, address)

// posting the transaction 
router.post('/tra',async function (req, res) {
   let { status, hash } = await transection(
        process.env.RINKEBY_FROM_ADDRESS,
        process.env.RINKEBY_TO_ADDRESS,
        10,
        process.env.RINKEBY_TEST_PRIVATE_KEY
      );
      console.log(transection)
      res.status(status).json({
        status: status,
        hash
      })
      
})

//posting the approve of the tokenaddress

router.post('/approve', async function (req,res) {
    amount = await web3.utils.toHex(web3.utils.toWei('5', 'gwei'))
    let { status, hash} = await approves(process.env.RINKEBY_TO_ADDRESS,5);
	console.log(transection)
      res.status(status).json({
        status: status,
        hash
      }) 
})

//posting the decreasing the allowance of the user address
router.post('/decreaseallowance', async function (req,res) {
    let { status, hash} = await decallowance(process.env.RINKEBY_FROM_ADDRESS,5)
    console.log(transection)
      res.status(status).json({
        status: status,
        hash
      })
})

//posting the increasing the allowance of the user address
router.post('/increaseallowance', async function (req,res) {
    let { status, hash} = await incallowance(process.env.RINKEBY_FROM_ADDRESS,5)
    console.log(transection)
    res.status(status).json({
      status: status,
      hash
    })
})


module.exports = router