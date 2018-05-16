var bech32 = require('./bech32');
var promisifiedRequests = require('./promisifiedRequests');

let MAGIC_BTC_MAINNET = 0x03;
let MAGIC_BTC_TESTNET = 0x06;

let TXREF_BECH32_HRP_MAINNET = "tx";
let TXREF_BECH32_HRP_TESTNET = "txtest";

let CHAIN_MAINNET = "mainnet";
let CHAIN_TESTNET = "testnet";



var txrefEncode = function (chain, blockHeight, txPos) {
  let magic = chain === CHAIN_MAINNET ? MAGIC_BTC_MAINNET : MAGIC_BTC_TESTNET;
  let prefix = chain === CHAIN_MAINNET ? TXREF_BECH32_HRP_MAINNET : TXREF_BECH32_HRP_TESTNET;
  let nonStandard = chain != CHAIN_MAINNET;

  var shortId;
  shortId = nonStandard ? [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] :
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

  if (
    (nonStandard && (blockHeight > 0x1FFFFF || txPos > 0x1FFF || magic > 0x1F))
    ||
    (nonStandard && (blockHeight > 0x3FFFFFF || txPos > 0x3FFFF || magic > 0x1F))
  ) {
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

  if (nonStandard) {
    // use extended blockheight (up to 0x3FFFFFF)
    // use extended txpos (up to 0x3FFFF)
    shortId[5] |= ((blockHeight & 0xF80000) >> 19);
    shortId[6] |= ((blockHeight & 0x3000000) >> 24);

    shortId[6] |= ((txPos & 0x7) << 2);
    shortId[7] |= ((txPos & 0xF8) >> 3);
    shortId[8] |= ((txPos & 0x1F00) >> 8);
    shortId[9] |= ((txPos & 0x3E000) >> 13);
  } else {
    shortId[5] |= ((blockHeight & 0x180000) >> 19);
    shortId[5] |= ((txPos & 0x7) << 2);
    shortId[6] |= ((txPos & 0xF8) >> 3);
    shortId[7] |= ((txPos & 0x1F00) >> 8);
  }

  let result = bech32.encode(prefix, shortId);

  let breakIndex = prefix.length + 1;
  let finalResult = result.substring(0, breakIndex) + "-" +
    result.substring(breakIndex, breakIndex + 4) + "-" +
    result.substring(breakIndex + 4, breakIndex + 8) + "-" +
    result.substring(breakIndex + 8, breakIndex + 12) + "-" +
    result.substring(breakIndex + 12, result.length);
  return finalResult;
};

var txrefextEncode = function (chain, blockHeight, txPos, utxoIndex) {
  let magic = chain === CHAIN_MAINNET ? MAGIC_BTC_MAINNET : MAGIC_BTC_TESTNET;
  let prefix = chain === CHAIN_MAINNET ? TXREF_BECH32_HRP_MAINNET : TXREF_BECH32_HRP_TESTNET;
  let nonStandard = chain != CHAIN_MAINNET;

  var shortId;
  shortId = nonStandard ? 
  [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] : // 13
  [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]; // 11

  if (
    (nonStandard && (blockHeight > 0x1FFFFF || txPos > 0x1FFF || utxoIndex > 0x1FFF || magic > 0x1F))
    ||
    (nonStandard && (blockHeight > 0x3FFFFFF || txPos > 0x3FFFF || utxoIndex > 0x1FFF || magic > 0x1F))
  ) {
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

  if (nonStandard) {
    // use extended blockheight (up to 0x3FFFFFF)
    // use extended txpos (up to 0x3FFFF)
    shortId[5] |= ((blockHeight & 0xF80000) >> 19);
    shortId[6] |= ((blockHeight & 0x3000000) >> 24);

    shortId[6] |= ((txPos & 0x7) << 2);
    shortId[7] |= ((txPos & 0xF8) >> 3);
    shortId[8] |= ((txPos & 0x1F00) >> 8);
    shortId[9] |= ((txPos & 0x3E000) >> 13);
    shortId[10] |= ((utxoIndex & 0x1F));
    shortId[11] |= ((utxoIndex & 0x3E0) >> 5);
    shortId[12] |= ((utxoIndex & 0x1C00) >> 10);
  } else {
    shortId[5] |= ((blockHeight & 0x180000) >> 19);
    shortId[5] |= ((txPos & 0x7) << 2);
    shortId[6] |= ((txPos & 0xF8) >> 3);
    shortId[7] |= ((txPos & 0x1F00) >> 8);
    shortId[8] |= ((utxoIndex & 0x1F));
    shortId[9] |= ((utxoIndex & 0x3E0) >> 5);
    shortId[10] |= ((utxoIndex & 0x1C00) >> 10);
  }

  let result = bech32.encode(prefix, shortId);

  let breakIndex = prefix.length + 1;
  let finalResult = result.substring(0, breakIndex) + "-" +
    result.substring(breakIndex, breakIndex + 4) + "-" +
    result.substring(breakIndex + 4, breakIndex + 8) + "-" +
    result.substring(breakIndex + 8, breakIndex + 12) + "-" +
    result.substring(breakIndex + 12, result.length);
  return finalResult;
};

var txrefDecode = function (bech32Tx) {
  let stripped = bech32Tx.replace(/-/g, '');

  let result = bech32.decode(stripped);
  if (result === null) {
    return null;
  }
  let buf = result.data;


  let chainMarker = buf[0];
  let nonStandard = chainMarker != MAGIC_BTC_MAINNET;

  var bStart = (buf[1] >> 1) |
    (buf[2] << 4) |
    (buf[3] << 9) |
    (buf[4] << 14);

  var blockHeight = 0;
  var blockIndex = 0;

  if (nonStandard) {
    blockHeight = bStart | (buf[5] << 19);
    blockHeight |= ((buf[6] & 0x03) << 24);

    blockIndex = (buf[6] & 0x1C) >> 2;
    blockIndex |= (buf[7] << 3);
    blockIndex |= (buf[8] << 8);
    blockIndex |= (buf[9] << 13);
  } else {
    blockHeight = bStart | ((buf[5] & 0x03) << 19);
    blockIndex = (buf[5] & 0x1C) >> 2;
    blockIndex |= (buf[6] << 3);
    blockIndex |= (buf[7] << 8);
  }

  let chain = chainMarker === MAGIC_BTC_MAINNET ? CHAIN_MAINNET : CHAIN_TESTNET;

  return {
    "blockHeight": blockHeight,
    "blockIndex": blockIndex,
    "chain": chain
  };
};

var txrefextDecode = function (bech32Tx) {
  let stripped = bech32Tx.replace(/-/g, '');

  let result = bech32.decode(stripped);
  if (result === null) {
    return null;
  }
  let buf = result.data;

  let chainMarker = buf[0];
  let nonStandard = chainMarker != MAGIC_BTC_MAINNET;

  var bStart = (buf[1] >> 1) |
    (buf[2] << 4) |
    (buf[3] << 9) |
    (buf[4] << 14);

  var blockHeight = 0;
  var blockIndex = 0;
  var utxoIndex = 0;

  if (nonStandard) {
    blockHeight = bStart | (buf[5] << 19);
    blockHeight |= ((buf[6] & 0x03) << 24);

    blockIndex = (buf[6] & 0x1C) >> 2;
    blockIndex |= (buf[7] << 3);
    blockIndex |= (buf[8] << 8);
    blockIndex |= (buf[9] << 13);
    utxoIndex = buf[10];
    utxoIndex |= (buf[11] << 5);
    utxoIndex |= (buf[12] << 10);
  } else {
    blockHeight = bStart | ((buf[5] & 0x03) << 19);
    blockIndex = (buf[5] & 0x1C) >> 2;
    blockIndex |= (buf[6] << 3);
    blockIndex |= (buf[7] << 8);
    utxoIndex = buf[8];
    utxoIndex |= (buf[9] << 5);
    utxoIndex |= (buf[10] << 10);
  }

  let chain = chainMarker === MAGIC_BTC_MAINNET ? CHAIN_MAINNET : CHAIN_TESTNET;

  return {
    "blockHeight": blockHeight,
    "blockIndex": blockIndex,
    "utxoIndex": utxoIndex,
    "chain": chain
  };
};

var parseTxDetails = function (txData, chain, txid) {
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
    "txHash": txid
  };
};

function getTxDetails(txid, chain) {

  var theUrl;
  if (chain === CHAIN_MAINNET) {
    theUrl = `https://api.blockcypher.com/v1/btc/main/txs/${txid}?limit=500`;
  } else {
    theUrl = `https://api.blockcypher.com/v1/btc/test3/txs/${txid}?limit=500`;
  }

  return promisifiedRequests.request({url: theUrl})
    .then(data => {
      let txData = JSON.parse(data);
      return parseTxDetails(txData, chain, txid);
    }, error => {
      console.error(error);
      throw error;
    });
}


var txidToTxref = function (txid, chain) {
  return getTxDetails(txid, chain)
    .then(data => {
      var result = txrefEncode(chain, data.blockHeight, data.blockIndex);
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
            "chain": chain
          });
      }, error => {
        console.error(error);
        reject(error);
      })
  });
};

var txDetailsFromTxid = function (txid, chain) {
  return getTxDetails(txid, chain)
    .then(txDetails => {
      var txref = txrefEncode(chain, txDetails.blockHeight, txDetails.blockIndex);
      txDetails.txid = txid;
      txDetails.txref = txref;
      txDetails.chain = chain;
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
      return getTxDetails(txid, chain)
        .then(txDetails => {
          // add other info
          txDetails.txid = txid;
          txDetails.txref = txref;
          txDetails.chain = chain;
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
  txrefextEncode: txrefextEncode,
  txrefextDecode: txrefextDecode,
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

txDetailsFromTxid("2960626c1c538ef120743753d834dd493361177edea2985caf1a678f690e0029", "testnet").then( result => {
 console.log(result);
 });*/


