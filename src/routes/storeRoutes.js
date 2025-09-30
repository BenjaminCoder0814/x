const express = require('express');
const { createStore, getStoreById, updateStore, deleteStore } = require('../controllers/storeController');

const router = express.Router();

router.post('/', createStore);
router.get('/:id', getStoreById);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);

module.exports = router;
