var bech32 = require('./bech32');
var promisifiedRequests = require('./promisifiedRequests');

let MAGIC_BTC_MAINNET = 0x03;
let MAGIC_BTC_MAINNET_EXTENDED = 0x04;
let MAGIC_BTC_TESTNET = 0x06;
let MAGIC_BTC_TESTNET_EXTENDED = 0x07;

let TXREF_BECH32_HRP_MAINNET = "tx";
let TXREF_BECH32_HRP_TESTNET = "txtest";

let CHAIN_MAINNET = "mainnet";
let CHAIN_TESTNET = "testnet";



var txrefEncode = function (chain, blockHeight, txPos, utxoIndex) {
  let prefix = chain === CHAIN_MAINNET ? TXREF_BECH32_HRP_MAINNET : TXREF_BECH32_HRP_TESTNET;
  let nonStandard = chain != CHAIN_MAINNET;
  let extendedTxref = utxoIndex !== undefined;

  var magic;
  if(extendedTxref) {
    magic = chain === CHAIN_MAINNET ? MAGIC_BTC_MAINNET_EXTENDED : MAGIC_BTC_TESTNET_EXTENDED;
  } else {
    magic = chain === CHAIN_MAINNET ? MAGIC_BTC_MAINNET : MAGIC_BTC_TESTNET;
  }

  var shortId;
  if(extendedTxref) {
    shortId = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]; // 12
  } else {
    shortId = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]; // 9
  }

  if (blockHeight > 0xFFFFFF || txPos > 0x7FFF || magic > 0x1F) {
    return null;
  }

  if(extendedTxref && utxoIndex > 0x7FFF) {
      return null;
  } 

  /* set the magic */
  shortId[0] = magic;

  /* make sure the version bit is 0 */
  shortId[1] &= ~(1 << 0);

  shortId[1] |= ((blockHeight & 0xF) << 1);
  shortId[2] |= ((blockHeight & 0x1F0) >> 4);
  shortId[3] |= ((blockHeight & 0x3E00) >> 9);
  shortId[4] |= ((blockHeight & 0x7C000) >> 14);
  shortId[5] |= ((blockHeight & 0xF80000) >> 19);

  shortId[6] |=  (txPos & 0x1F);
  shortId[7] |= ((txPos & 0x3E0) >> 5);
  shortId[8] |= ((txPos & 0x7C00) >> 10);

  if(extendedTxref) {
    shortId[9]  |=  (utxoIndex & 0x1F);
    shortId[10] |= ((utxoIndex & 0x3E0) >> 5);
    shortId[11] |= ((utxoIndex & 0x7C00) >> 10);
  }

  let result = bech32.encode(prefix, shortId);

  let origLength = result.length;
  let breakIndex = prefix.length + 1;
  let finalResult = result.substring(0, breakIndex) + ":" +
    result.substring(breakIndex, breakIndex + 4) + "-" +
    result.substring(breakIndex + 4, breakIndex + 8) + "-" +
    result.substring(breakIndex + 8, breakIndex + 12) + "-";
  if(origLength-breakIndex < 16) {
    finalResult += result.substring(breakIndex + 12, result.length);
  } else {
    finalResult += result.substring(breakIndex + 12, breakIndex + 16) + "-" +
      result.substring(breakIndex + 16, result.length);
  }

  return finalResult;
};

var txrefDecode = function (bech32Tx) {
  let stripped = bech32Tx.replace(/-/g, '');
  stripped = stripped.replace(/:/g, '');

  let result = bech32.decode(stripped);
  if (result === null) {
    return null;
  }
  let buf = result.data;

  let extendedTxref = buf.length == 12;

  let chainMarker = buf[0];

  var blockHeight = 0;
  var blockIndex = 0;
  var utxoIndex = 0;

  blockHeight = (buf[1] >> 1);
  blockHeight |= (buf[2] << 4);
  blockHeight |= (buf[3] << 9);
  blockHeight |= (buf[4] << 14);
  blockHeight |= (buf[5] << 19);

  blockIndex = buf[6];
  blockIndex |= (buf[7] << 5);
  blockIndex |= (buf[8] << 10);

  if(extendedTxref) {
    utxoIndex = buf[9];
    utxoIndex |= (buf[10] << 5);
    utxoIndex |= (buf[11] << 10);
  }

  var chain;
  if(chainMarker === MAGIC_BTC_MAINNET || chainMarker === MAGIC_BTC_MAINNET_EXTENDED) {
      chain = CHAIN_MAINNET;
  } else {
      chain = CHAIN_TESTNET;
  }

  return {
    "blockHeight": blockHeight,
    "blockIndex": blockIndex,
    "chain": chain,
    "utxoIndex": utxoIndex
  };
};

var parseTxDetails = function (txData, chain, txid, utxoIndex) {
  let blockHash = txData.block_hash;
  let blockHeight = txData.block_height;
  let blockIndex = txData.block_index;
  let fees = txData.fees;
  let inputs = txData.inputs.map((x) => {
    return {"script": x.script, "addresses": x.addresses, "outputValue": x.output_value, "previousHash": x.prev_hash};
  });
  let outputs = txData.outputs.map((x) => {
    if (x.value === 0) {
      return {
        "script": x.script,
        "dataHex": x.data_hex,
        "dataString": x.data_string,
        "outputValue": x.value,
        "scriptType": x.script_type
      };
    }
    return {"script": x.script, "addresses": x.addresses, "outputValue": x.value, "scriptType": x.script_type};
  });
  return {
    "blockHash": blockHash,
    "blockHeight": blockHeight,
    "blockIndex": blockIndex,
    "txReceived": txData.received,
    "txConfirmed": txData.confirmed,
    "numConfirmations": txData.confirmations,
    "inputs": inputs,
    "outputs": outputs,
    "chain": chain,
    "fees": fees,
    "txHash": txid,
    "utxoIndex": utxoIndex
  };
};

function getTxDetails(txid, chain, utxoIndex) {

  var theUrl;
  if (chain === CHAIN_MAINNET) {
    theUrl = `https://api.blockcypher.com/v1/btc/main/txs/${txid}?limit=500`;
  } else {
    theUrl = `https://api.blockcypher.com/v1/btc/test3/txs/${txid}?limit=500`;
  }

  return promisifiedRequests.request({url: theUrl})
    .then(data => {
      let txData = JSON.parse(data);
      return parseTxDetails(txData, chain, txid, utxoIndex);
    }, error => {
      console.error(error);
      throw error;
    });
}


var txidToTxref = function (txid, chain, utxoIndex) {
  return getTxDetails(txid, chain, utxoIndex)
    .then(data => {
      var result = txrefEncode(chain, data.blockHeight, data.blockIndex, data.utxoIndex);
      return result
    }, error => {
      console.error(error);
      throw error;
    });
}


var txrefToTxid = function (txref) {
  return new Promise((resolve, reject) => {

    let blockLocation = txrefDecode(txref);
    if (blockLocation === null) {
      reject(new Error("Could not decode txref " + txref));
    }

    let blockHeight = blockLocation.blockHeight;
    let blockIndex = blockLocation.blockIndex;
    let chain = blockLocation.chain;
    var theUrl;
    if (chain === CHAIN_MAINNET) {
      theUrl = `https://api.blockcypher.com/v1/btc/main/blocks/${blockHeight}?txstart=${blockIndex}&limit=1`;
    } else {
      theUrl = `https://api.blockcypher.com/v1/btc/test3/blocks/${blockHeight}?txstart=${blockIndex}&limit=1`;
    }

    promisifiedRequests.request({url: theUrl})
      .then(data => {
        let txData = JSON.parse(data);
        resolve({
            "txid": txData.txids[0],
            "chain": chain,
            "utxoIndex": blockLocation.utxoIndex
          });
      }, error => {
        console.error(error);
        reject(error);
      })
  });
};

var txDetailsFromTxid = function (txid, chain, utxoIndex) {
  return getTxDetails(txid, chain, utxoIndex)
    .then(txDetails => {
      var txref = txrefEncode(chain, txDetails.blockHeight, txDetails.blockIndex, utxoIndex);
      txDetails.txid = txid;
      txDetails.txref = txref;
      txDetails.chain = chain;
      txDetails.utxoIndex = utxoIndex;
      return txDetails;
    }, error => {
      console.error(error);
      throw error;
    });
};

var txDetailsFromTxref = function (txref) {
  return txrefToTxid(txref)
    .then(results => {
      let txid = results.txid;
      let chain = results.chain;
      let utxoIndex = results.utxoIndex;
      return getTxDetails(txid, chain, utxoIndex)
        .then(txDetails => {
          // add other info
          txDetails.txid = txid;
          txDetails.txref = txref;
          txDetails.chain = chain;
          txDetails.utxoIndex = utxoIndex;
          return txDetails;
        }, error => {
          console.error(error);
          throw error;
        });
    }, error => {
      console.error(error);
      throw error;
    })
};

module.exports = {
  txrefDecode: txrefDecode,
  txrefEncode: txrefEncode,
  txidToTxref: txidToTxref,
  txrefToTxid: txrefToTxid,
  getTxDetails: getTxDetails,
  txDetailsFromTxid: txDetailsFromTxid,
  txDetailsFromTxref: txDetailsFromTxref,
  MAGIC_BTC_MAINNET: MAGIC_BTC_MAINNET,
  MAGIC_BTC_TESTNET: MAGIC_BTC_TESTNET,
  TXREF_BECH32_HRP_MAINNET: TXREF_BECH32_HRP_MAINNET,
  TXREF_BECH32_HRP_TESTNET: TXREF_BECH32_HRP_TESTNET,
  CHAIN_MAINNET: CHAIN_MAINNET,
  CHAIN_TESTNET: CHAIN_TESTNET,
  promisifiedRequest: promisifiedRequests.request
};

/*
txrefToTxid("tx1-rk63-uvxf-9pqc-sy")
  .then(result => {
    console.log(result);
  }, error => {
    console.error(error);
  });


txDetailsFromTxid("2960626c1c538ef120743753d834dd493361177edea2985caf1a678f690e0029", "testnet", 1).then( result => {
 console.log(result);
 });*/


