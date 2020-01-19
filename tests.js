'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;

let txrefConverter = require('./txrefConverter');


describe('Txref tests', function () {

  describe('encoding', function () {
    it('encodes a mainnet tx with block height 0 and pos 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rqqq-qqqq-qygr-lgl');
      done();
    });

    it('encodes a mainnet tx with block height 1 and pos 0', function (done) {
      let blockHeight = 1;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rzqq-qqqq-qhlr-5ct');
      done();
    });

    it('encodes a mainnet tx with block height 2097151 and pos 1000', function (done) {
      let blockHeight = 2097151;
      let txPos = 1000;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrgl-ql0m-ykh');
      done();
    });

    it('encodes a mainnet tx with block height 2097151 and pos 8191', function (done) {
      let blockHeight = 2097151;
      let txPos = 8191;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrll-8e38-mdl');
      done();
    });

    it('encodes a mainnet tx with block height 2097151 and pos 0', function (done) {
      let blockHeight = 2097151;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:r7ll-lrqq-qw4q-a8c');
      done();
    });

    it('encodes a mainnet tx with block height 0 and pos 8191', function (done) {
      let blockHeight = 0;
      let txPos = 8191;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rqqq-qqll-8nvy-ezc');
      done();
    });

    it('encodes a mainnet tx with block height 467883 and pos 2355', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal('tx1:rk63-uqnf-z08h-t4q');
      done();
    });

    it('encodes a mainnet tx with block height 0x1FFFFF and pos 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x00;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:r7ll-lrqq-qw4q-a8c");
      done();
    });

    it('encodes a mainnet tx with block height 0x71F69 and pos 0x89D', function (done) {
      let blockHeight = 0x71F69;
      let txPos = 0x89D;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:rjk0-uqay-z0u3-gl8");
      done();
    });

    it('encodes a mainnet tx with block height 466793 and pos 2205', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:rjk0-uqay-z0u3-gl8");
      done();
    });

    it('encodes a mainnet tx with block height 0 and pos 0x7FFF', function (done) {
      let blockHeight = 0;
      let txPos = 0x7FFF;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:rqqq-qqll-lceg-dfk");
      done();
    });

    it('encodes a mainnet tx with block height 0xFFFFFF and pos 0x7FFF', function (done) {
      let blockHeight = 0xFFFFFF;
      let txPos = 0x7FFF;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos);
      expect(result).to.equal("tx1:r7ll-llll-lte5-das");
      done();
    });

    it('encodes a testnet tx with block height 467883 and pos 2355', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xk63-uqnf-zz0k-3h7");
      done();
    });

    it('encodes a testnet tx with block height 0 and pos 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xqqq-qqqq-qfqz-92p");
      done();
    });

    it('encodes a testnet tx with block height 0xFFFFFF and pos 0x7FFF', function (done) {
      let blockHeight = 0xFFFFFF;
      let txPos = 0x7FFF;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:x7ll-llll-lx34-hlw");
      done();
    });

    it('encodes a testnet tx with block height 1152194 and pos 1', function (done) {
      //  txid: f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107
      let blockHeight = 1152194;
      let txPos = 1;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos);
      expect(result).to.equal("txtest1:xyv2-xzpq-q63z-7p4");
      done();
    });

  });

  describe('decode', function () {
    it('decodes txref tx1:rqqq-qqqq-qygr-lgl', function (done) {
      let blockHeight = 0;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:rqqq-qqqq-qygr-lgl');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:rzqq-qqqq-qhlr-5ct', function (done) {
      let blockHeight = 1;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:rzqq-qqqq-qhlr-5ct');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:r7ll-lrgl-ql0m-ykh', function (done) {
      let blockHeight = 2097151;
      let txPos = 1000;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrgl-ql0m-ykh');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:r7ll-lrll-8e38-mdl', function (done) {
      let blockHeight = 2097151;
      let txPos = 8191;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrll-8e38-mdl');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:r7ll-lrqq-qw4q-a8c', function (done) {
      let blockHeight = 2097151;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrqq-qw4q-a8c');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);

      done();
    });

    it('decodes txref tx1:rqqq-qqll-8nvy-ezc', function (done) {
      let blockHeight = 0;
      let txPos = 8191;

      let result = txrefConverter.txrefDecode('tx1:rqqq-qqll-8nvy-ezc');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:rk63-uqnf-z08h-t4q', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;
      let result = txrefConverter.txrefDecode('tx1:rk63-uqnf-z08h-t4q');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:r7ll-lrqq-qw4q-a8c', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x00;

      let result = txrefConverter.txrefDecode('tx1:r7ll-lrqq-qw4q-a8c');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:rjk0-uqay-z0u3-gl8', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;

      let result = txrefConverter.txrefDecode('tx1:rjk0-uqay-z0u3-gl8');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref txtest1:xk63-uqnf-zz0k-3h7', function (done) {
      let blockHeight = 467883;
      let txPos = 2355;

      let result = txrefConverter.txrefDecode('txtest1:xk63-uqnf-zz0k-3h7');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });

    it('decodes txref txtest1:xqqq-qqqq-qfqz-92p', function (done) {
      let blockHeight = 0;
      let txPos = 0;

      let result = txrefConverter.txrefDecode('txtest1:xqqq-qqqq-qfqz-92p');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });

    it('decodes txref txtest1:xyv2-xzpq-q63z-7p4', function (done) {
      //  txid: f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107
      let blockHeight = 1152194;
      let txPos = 1;

      let result = txrefConverter.txrefDecode('txtest1:xyv2-xzpq-q63z-7p4');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.chain).to.equal(txrefConverter.CHAIN_TESTNET);
      done();
    });
  });

  describe('encoding extended', function () {
    it('encodes a mainnet txref with block height 0, pos 0, utxo index 0', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qqqq-f0ng-4y');
      done();
    });
    
    it('encodes a mainnet txref with block height 0, pos 0, utxo index 100', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qyrq-sf0p-h4');
      done();
    });
    
    it('encodes a mainnet txref with block height 0, pos 0, utxo index 0x1FFF', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0x1FFF;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqqq-qll8-7t5w-lr');
      done();
    });
    
    it('encodes a mainnet txref with block height 0, pos 0x1FFF, utxo index 0', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqll-8qqq-u5ay-t5');
      done();
    });
    
    it('encodes a mainnet txref with block height 0, pos 0x1FFF, utxo index 100', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yqqq-qqll-8yrq-9jpd-f9');
      done();
    });

    it('encodes a mainnet txref with block height 0x1FFFFF, pos 0, utxo index 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrqq-qqqq-w7ka-8p');
      done();
    });

    it('encodes a mainnet txref with block height 0x1FFFFF, pos 0, utxo index 200', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0;
      let utxoIndex = 200;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrqq-qgxq-4j80-r2');
      done();
    });

    it('encodes a mainnet txref with block height 0x1FFFFF, pos 0x1FFF, utxo index 0', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrll-8qqq-m9c3-e3');
      done();
    });

    it('encodes a mainnet txref with block height 0x1FFFFF, pos 0x1FFF, utxo index 100', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:y7ll-lrll-8yrq-zryc-mq');
      done();
    });

    it('encodes a mainnet txref with block height 466793, pos 2205, utxo index 10', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;
      let utxoIndex = 10;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_MAINNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('tx1:yjk0-uqay-z2qq-fycf-mp');
      done();
    });

    it('encodes a testnet txref with block height 0, pos 0x7FFF, utxo index 100', function (done) {
      let blockHeight = 0;
      let txPos = 0x7FFF;
      let utxoIndex = 100;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('txtest1:8qqq-qqll-lyrq-ywmh-57');
      done();
    });

    it('encodes a testnet txref with block height 0xFFFFFF, pos 0, utxo index 200', function (done) {
      let blockHeight = 0xFFFFFF;
      let txPos = 0;
      let utxoIndex = 200;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('txtest1:87ll-llqq-qgxq-hlrz-n2');
      done();
    });

    it('encodes a testnet txref with block height 466793, pos 2205, utxo index 10', function (done) {
      let blockHeight = 466793;
      let txPos = 2205;
      let utxoIndex = 10;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('txtest1:8jk0-uqay-z2qq-8uhz-cx');
      done();
    });

    it('encodes a testnet txref with block height 1152194, pos 1, utxo index 0', function (done) {
      let blockHeight = 1152194;
      let txPos = 1;
      let utxoIndex = 0;
      let result = txrefConverter.txrefEncode(txrefConverter.CHAIN_TESTNET, blockHeight, txPos, utxoIndex);
      expect(result).to.equal('txtest1:8yv2-xzpq-qqqq-6m8x-vg');
      done();
    });

  });

  describe('decode extended', function () {
    it('decodes txref tx1:yqqq-qqqq-qqqq-f0ng-4y', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qqqq-f0ng-4y');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:yqqq-qqqq-qyrq-sf0p-h4', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qyrq-sf0p-h4');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:yqqq-qqqq-qll8-7t5w-lr', function (done) {
      let blockHeight = 0;
      let txPos = 0;
      let utxoIndex = 0x1FFF;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqqq-qll8-7t5w-lr');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:yqqq-qqll-8qqq-u5ay-t5', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqll-8qqq-u5ay-t5');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:yqqq-qqll-8yrq-9jpd-f9', function (done) {
      let blockHeight = 0;
      let txPos = 0x1FFF;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:yqqq-qqll-8yrq-9jpd-f9');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });
  
    it('decodes txref tx1:y7ll-lrqq-qqqq-w7ka-8p', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrqq-qqqq-w7ka-8p');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:y7ll-lrll-8qqq-m9c3-e3', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 0;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrll-8qqq-m9c3-e3');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });

    it('decodes txref tx1:y7ll-lrll-8yrq-zryc-mq', function (done) {
      let blockHeight = 0x1FFFFF;
      let txPos = 0x1FFF;
      let utxoIndex = 100;

      let result = txrefConverter.txrefDecode('tx1:y7ll-lrll-8yrq-zryc-mq');
      expect(result.blockHeight).to.equal(blockHeight);
      expect(result.blockIndex).to.equal(txPos);
      expect(result.utxoIndex).to.equal(utxoIndex);
      expect(result.chain).to.equal(txrefConverter.CHAIN_MAINNET);
      done();
    });
  });

  describe('end-to-end', function () {

    it('txref encode txid (testnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txidToTxref("f8cdaff3ebd9e862ed5885f8975489090595abe1470397f79780ead1c7528107", "testnet")
          .then(result => {
            expect(result).to.equal("txtest1:xyv2-xzpq-q63z-7p4");
            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('txref encode txid (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txidToTxref("016b71d9ec62709656504f1282bb81f7acf998df025e54bd68ea33129d8a425b", "mainnet")
          .then(result => {
            expect(result).to.equal("tx1:rk63-uqnf-z08h-t4q");
            done();
          }, error => {
            console.error(error);
            done();
          });
      });
    }, 5000);

    it('txref decode txid (testnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txrefToTxid("txtest1:xyv2-xzpq-q63z-7p4")
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

    it('txref decode txid (mainnet)', function (done) {
      setTimeout(function () {
        txrefConverter.txrefToTxid("tx1:rk63-uqnf-z08h-t4q")
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
