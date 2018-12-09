'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;

let txrefConverter = require('./txrefConverter');


describe('Bech32 TX', function () {

  describe('encoding', function () {
    it('encodes a tx with block height 0 and pos 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rqqq-qqqq-qmhu-qhp');
      done();
    });

    it('encodes a tx with block height 1 and pos 0', function (done) {
      let blockHeight = 1;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rzqq-qqqq-qgqu-t84');
      done();
    });

    it('encodes a tx with block height 2097151 and pos 1000', function (done) {
      let blockHeight = 2097151;
      let txPos = 1000;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrgl-qqsy-mff');
      done();
    });

    it('encodes a tx with block height 2097151 and pos 8191', function (done) {
      let blockHeight = 2097151;
      let txPos = 8191;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrll-8xwc-yjp');
      done();
    });

    it('encodes a tx with block height 2097151 and pos 0', function (done) {
      let blockHeight = 2097151;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrqq-q32l-zcx');
      done();
    });

    it('encodes a tx with block height 0 and pos 8191', function (done) {
      let blockHeight = 0;
      let txPos = 8191;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rqqq-qqll-8vnm-xax');
      done();
    });

    it('encodes a tx with block height 467883 and pos 2355', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rk63-uqnf-zscg-527');
      done();
    });

    it('encodes a tx with block height 0x1FFFFF and pos 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x00;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:r7ll-lrqq-q32l-zcx");
      done();
    });

    it('encodes a tx with block height 0x71F69 and pos 0x89D', function (done) {
      let blockHeight = 0x71F69;
      let txPos = 0x89D;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:rjk0-uqay-zsrw-hqe");
      done();
    });

    it('encodes a tx with block height 466793 and pos 2205', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:rjk0-uqay-zsrw-hqe");
      done();
    });

    it('encodes a testnet tx with block height 467883 and pos 2355', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xk63-uqnf-zasf-wgq");
      done();
    });

    it('encodes a testnet tx with block height 0 and pos 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xqqq-qqqq-qkla-64l");
      done();
    });

    it('encodes a testnet tx with block height 1152194 and pos 1', function (done) {
      let blockHeight = 1152194;
      let txPos = 1;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xyv2-xzpq-q9wa-p7t");
      done();
    });
    //  txid: f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107
  });

  describe('decode', function () {
    it('decodes tx ref tx1:rqqq-qqqq-qmhu-qhp', function (done) {
      let blockHeight = 0;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:rqqq-qqqq-qmhu-qhp');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:rzqq-qqqq-qgqu-t84', function (done) {
      let blockHeight = 1;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:rzqq-qqqq-qgqu-t84');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:r7ll-lrgl-qqsy-mff', function (done) {
      let blockHeight = 2097151;
      let txPos = 1000;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrgl-qqsy-mff');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:r7ll-lrll-8xwc-yjp', function (done) {
      let blockHeight = 2097151;
      let txPos = 8191;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrll-8xwc-yjp');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:r7ll-lrqq-q32l-zcx', function (done) {
      let blockHeight = 2097151;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrqq-q32l-zcx');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);

      done();
    });

    it('decodes tx ref tx1:rqqq-qqll-8vnm-xax', function (done) {
      let blockHeight = 0;
      let txPos = 8191;

      let result = txrefConverter.txrefDecode('tx1:rqqq-qqll-8vnm-xax');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:rk63-uqnf-zscg-527', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefDecode('tx1:rk63-uqnf-zscg-527');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:r7ll-lrqq-q32l-zcx', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x00;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrqq-q32l-zcx');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:rjk0-uqay-zsrw-hqe', function (done) {
      let blockHeight = 0x71F69;
      let txPos = 0x89D;

      let result = txrefConverter.txrefDecode('tx1:rjk0-uqay-zsrw-hqe');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref tx1:rjk0-uqay-zsrw-hqe', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;

      let result = txrefConverter.txrefDecode('tx1:rjk0-uqay-zsrw-hqe');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes tx ref txtest1:xk63-uqnf-zasf-wgq', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;

      let result = txrefConverter.txrefDecode('txtest1:xk63-uqnf-zasf-wgq');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });

    it('decodes tx ref txtest1:xqqq-qqqq-qkla-64l', function (done) {
      let blockHeight = 0;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('txtest1:xqqq-qqqq-qkla-64l');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });

    it('decodes tx ref txtest1:xyv2-xzpq-q9wa-p7t', function (done) {
      let blockHeight = 1152194;
      let txPos = 1;

      let result = txrefConverter.txrefDecode('txtest1:xyv2-xzpq-q9wa-p7t');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });
    //  txid: f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107
  });

  describe('encoding extended', function () {
    it('encodes a txref-ext with block height 0, pos 0, utxo index 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qqqq-ksvh-26');
      done();
    });
    
    it('encodes a txref-ext with block height 0, pos 0, utxo index 100', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qyrq-0ks7-gt');
      done();
    });
    
    it('encodes a txref-ext with block height 0, pos 0, utxo index 0x1FFF', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0x1FFF;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qll8-p5t3-qa');
      done();
    });
    
    it('encodes a txref-ext with block height 0, pos 0x1FFF, utxo index 0', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqll-8qqq-rtzm-52');
      done();
    });
    
    it('encodes a txref-ext with block height 0, pos 0x1FFF, utxo index 100', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqll-8yrq-6d7j-km');
      done();
    });
    
    it('encodes a txref-ext with block height 0x1FFFFF, pos 0, utxo index 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrqq-qqqq-3pfz-cl');
      done();
    });
    
    it('encodes a txref-ext with block height 0x1FFFFF, pos 0x1FFF, utxo index 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrll-8qqq-y68w-x0');
      done();
    });
    
    it('encodes a txref-ext with block height 0x1FFFFF, pos 0x1FFF, utxo index 100', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrll-8yrq-aum8-y7');
      done();
    });
  });

  describe('decode extended', function () {
    it('decodes txef-ext tx1:yqqq-qqqq-qqqq-ksvh-26', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qqqq-ksvh-26');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:yqqq-qqqq-qyrq-0ks7-gt', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qyrq-0ks7-gt');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:yqqq-qqqq-qll8-p5t3-qa', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0x1FFF;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qll8-p5t3-qa');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:yqqq-qqll-8qqq-rtzm-52', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqll-8qqq-rtzm-52');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:yqqq-qqll-8yrq-6d7j-km', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqll-8yrq-6d7j-km');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });
  
    it('decodes txef-ext tx1:y7ll-lrqq-qqqq-3pfz-cl', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrqq-qqqq-3pfz-cl');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:y7ll-lrll-8qqq-y68w-x0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrll-8qqq-y68w-x0');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txef-ext tx1:y7ll-lrll-8yrq-aum8-y7', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrll-8yrq-aum8-y7');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });
  });

  describe('end-to-end', function () {

    it('bech32 encode txid (testnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txidToTxref("f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107", "testnet")
          .then(result => {
            expect(result).to.equal("txtest1:xyv2-xzpq-q9wa-p7t");
            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('bech32 encode txid (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txidToTxref("016b71d9ec62709656504f1282bb81f7acf998df025e54bd68ea33129d8a425b", "mainnet")
          .then(result => {
            expect(result).to.equal("tx1:rk63-uqnf-zscg-527");
            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('bech32 decode txid (testnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txrefToTxid("txtest1:xyv2-xzpq-q9wa-p7t")
          .then(result => {
            expect(result.txid).to.equal("f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107");
            expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);

            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('bech32 decode txid (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txrefToTxid("tx1:rk63-uqnf-zscg-527")
          .then(result => {
            expect(result.txid).to.equal("016b71d9ec62709656504f1282bb81f7acf998df025e54bd68ea33129d8a425b");
            expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('tx not found (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txidToTxref("f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107", "mainnet")
          .then(result => {
            assert.fail();
            done();
          }, error => {
            assert.isOk(error);
            done();
          });
      });
    }, 5000);


    it('could not convert to txid (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txrefToTxid("tx1-rk63-uvxf-9pqc-sr", "mainnet")
          .then(result => {
            assert.fail();
            done();
          }, error => {
            assert.isOk(error);
            done();
          });
      });
    }, 5000);

  })

});
