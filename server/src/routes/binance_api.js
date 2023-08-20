const express = require('express');
const {
  pairs,
  ticker,
  listen_key,
  assets_balance,
  deposit_history,
} = require('../controllers/binance_controller');
const verifyToken = require('../middlewares/Verify_jwt');
const router = express.Router();

router.get('/pairs', pairs);
router.get('/ticker', ticker);
router.get('/listen_key', verifyToken, listen_key);
router.get('/assets_balance', verifyToken, assets_balance);
router.get('/desposit_history', verifyToken, deposit_history);

module.exports = router;
