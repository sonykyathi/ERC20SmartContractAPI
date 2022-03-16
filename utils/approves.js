var Web3 = require('web3');

const Tx = require('ethereumjs-tx').Transaction

var Accounts = require('web3-eth-accounts');

const Common = require('ethereumjs-common')
const ABI  = require('../container/abi.json')


const common = Common.default.forCustomChain('rinkeby', {
  name: 'rinkeby',
  networkId: 4,
  chainId: 4
}, 'petersburg');
// const common = Common.default.forCustomChain(
//     'testnet',{
//       name: 'bnb',
//       networkId: rinkeby,
//       chainId: 97
//     },
//     'petersburg'
//   )

//let tokenAddress = '0xB65b9eD35D399301B42ecE4265E69c63F2bb0340'
let tokenAddress = '0xA37EaE6410d135Df34faf00fCaf70eA2e5269f1f'
var web3 = new Web3('https://rinkeby.infura.io/v3/c3950d5fe0814e3e9bd30ba0fcd21aa2');
exports.approves = (toAddress, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      let private = await Buffer.from(process.env.BINANCE_TEST_PRIVATE_KEY, 'hex')
      let contract = await new web3.eth.Contract(ABI, tokenAddress, { from: process.env.BINANCE_FROM_ADDRESS })
      balance = await contract.methods.balanceOf(process.env.BINANCE_FROM_ADDRESS).call();
      const amount1 = await web3.utils.toWei(amount.toString(), 'ether');
      count = await web3.eth.getTransactionCount(process.env.BINANCE_FROM_ADDRESS)
      let rawTransaction = {
        'from': await process.env.BINANCE_FROM_ADDRESS,
        'gasPrice': await web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
        'gasLimit': await web3.utils.toHex(90000),
        'to': await tokenAddress,
        'value': 0x0,
        'data': await contract.methods.approve(toAddress, amount1).encodeABI(),
        'nonce': await web3.utils.toHex(count)
      }
      console.log(rawTransaction, "=====================================================")
      let transaction = new Tx(rawTransaction, {
        common
      })
      trx = await transaction.sign(private)
      console.log(trx, "========trx");
      hash = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      console.log(hash, "========hash");
     return  resolve({ status: 200, hash: { trx, hash } })
    } catch (error) {
      return resolve({ status: 401 , hash: {} })
    }
  });



}


