# TXRef conversion javascript library

## About

Javascript library for Bech32 Encoded TX References, ported from Jonas Schnelli's [reference implementation](https://github.com/jonasschnelli/bitcoin_txref_code) for the Rebooting Web Of Trust's [BTCR Hackathon](https://github.com/WebOfTrustInfo/btcr-hackathon). It uses Peter Wuille's [Bech32 library](https://github.com/sipa/bech32) for Bech32 encoding and decoding.

For more details, see the [Bech32 Encoded Transaction Position References](https://github.com/bitcoin/bips/blob/master/bip-0136.mediawiki) BIP. 

This implementation works as follows:

- Encoding: 
  - Given a txid and chain (testnet/mainnet), fetch the block height and position from a blockchain explorer
  - Convert to a short id as shown in [btc_txref_encode](https://github.com/jonasschnelli/bitcoin_txref_code/blob/master/ref/c/txref_code.c)

- Decoding: 
  - Decodes the bech32-encoded txref 
  - Extracts the block height and position as shown in [btc_txref_decode](https://github.com/jonasschnelli/bitcoin_txref_code/blob/master/ref/c/txref_code.c)
  - Find the txid corresponding to the blockheight and position from a blockchain explorer

This library is for prototype use only. Some future improvements would include:
- Checking confirmation count from the API results; warn if less than 6 (or some other threshold).
- Compare results from multiple blockchain explorer APIs
- Flexible accessor if a local bitcoin node is available.
- Robust error checking

You can use this as a node package or in a browser. The browserified script is available as `txrefConverter-browserified.js`.

## Preview

You can experiment with this library in the [BTCR TX Playground](https://weboftrustinfo.github.io/btcr-tx-playground.github.io/)


## Examples

In these examples, note the following:
- Prefixes: mainnet tx refs start with the `tx1` prefix, whereas testnet tx refs start with `txtest1`

### Convert a TXID to a TXref

```
let txrefConverter = require('./txrefConverter');

txrefConverter.txidToTxref("016b71d9ec62709656504f1282bb81f7acf998df025e54bd68ea33129d8a425b", 
    txrefConverter.CHAIN_MAINNET)
  .then(result => {
    console.log(result); // expect "tx1:rk63-uqnf-zscg-527"
  });
  
```

### Convert a TXref to a TXID

```
let txrefConverter = require('./txrefConverter');

txrefToTxid("tx1:rk63-uqnf-zscg-527", "mainnet")
  .then(result => {
    console.log(result)
  });

```

Expected output:
```
{
  txid: '016b71d9ec62709656504f1282bb81f7acf998df025e54bd68ea33129d8a425b',
  chain: 'mainnet',
  utxoIndex: 0
}

```

### Finer grained functions 

#### Given the chain, block height and position, encode as a TXref

Mainnet:

```
let txrefConverter = require('./txrefConverter');

let result = txrefConverter.txrefEncode("mainnet", 0, 0);
console.log(result); // expect "tx1:rqqq-qqqq-qmhu-qhp"
```

Testnet:

```
let txrefConverter = require('./txrefConverter');

let result = txrefConverter.txrefEncode("testnet", 1152194, 1);
console.log(result); // expect "txtest1:xyv2-xzpq-q9wa-p7t"
```

#### Given a TXref, extract the chain, block height and position

```
let txrefConverter = require('./txrefConverter');

let result = txrefConverter.txrefDecode('tx1:rzqq-qqqq-qgqu-t84');
console.log(result);

// Expected: { blockHeight: 1, blockIndex: 0, chain: 'mainnet', utxoIndex: 0 }

```

#### Get transaction details

Given a txid and chain, lookup the transaction details:

```
let txrefConverter = require('./txrefConverter');

getTxDetails("f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107", "testnet")
    .then(data => {
      console.log(data.numConfirmations); // and other transaction data obtained from the explorer
      var result = txrefEncode("testnet", data.blockHeight, data.blockIndex);
      return result
    }, error => {
      console.error(error);
    });

```

## Install

```
npm install

```
## Using in a browser

`npm run build` generates the browserified script `txrefConverter-browserified.js`, which you can include in your web project.

The following shows how you can use it: 

```
<script src="./txrefConverter-browserified.js"></script>

txrefConverter.txidToTxref(txid, chain)
  .then(function (result, err) {
      // populate widget with result
});
```

See the BTCR playground code repository [btcr-tx-playground](https://github.com/WebOfTrustInfo/btcr-tx-playground.github.io) for working code samples. 

## Running tests

```
npm run test
```

