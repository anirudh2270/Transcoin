const { Test_postRequest, getRequest } = require('../helpers/Api');
const { Spot } = require('@binance/connector');
const mainnet = new Spot(process.env.KEY, process.env.SECRET);
const testnet = new Spot(process.env.TEST_KEY, process.env.TEST_SECRET, {
  baseURL: process.env.TEST_BASE_URL,
});

const pairs = async (req, res) => {
  mainnet
    .exchangeInfo()
    .then((response) => {
      const pairs = [];
      for (let i = 0; i < response.data.symbols.length; i++) {
        if (response.data.symbols[i].quoteAsset == 'USDT') {
          pairs.push({
            baseAsset: response.data.symbols[i].baseAsset,
            symbol: response.data.symbols[i].symbol,
          });
        }
      }
      res.status(200).json(pairs);
    })
    .catch((err) => {
      mainnet.logger.error(err.response.data);
      res.status(500).json({ message: err.response.data.msg });
    });
};

const ticker = async (req, res) => {
  mainnet
    .ticker24hr()
    .then((response) => {
      const new_data = {};
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].symbol.slice(-4) === 'USDT') {
          delete response.data[i].prevClosePrice;
          delete response.data[i].weightedAvgPrice;
          new_data[response.data[i].symbol] = response.data[i];
        }
      }

      res.status(200).json(new_data);
    })
    .catch((err) => {
      mainnet.logger.error(err.response.data);
      res.status(500).json({ message: err.response.data.msg });
    });
};

const listen_key = async (req, res) => {
  try {
    const response = await Test_postRequest('/api/v3/userDataStream', null, {
      'X-MBX-APIKEY':
        'ySllHWorTFzuKdlmXAlGhg885aM2APSFbeQ7Au1Rk0dGFAowy0jlfz7o0wNzVcuT',
    });

    res.status(200).json(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Something went wrong...please try again later!' });
  }
};

const assets_balance = async (req, res) => {
  testnet
    .account()
    .then((response) => {
      const new_data = {};

      for (let i = 0; i < response.data.balances.length; i++) {
        new_data[response.data.balances[i].asset] = response.data.balances[i];
      }

      res.status(200).json(new_data);
    })
    .catch((err) => {
      testnet.logger.error(err.response.data);
      res.status(500).json({ message: err.response.data.msg });
    });
};

module.exports = {
  pairs,
  ticker,
  listen_key,
  assets_balance,
};
