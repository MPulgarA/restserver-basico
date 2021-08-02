const { Router } = require('express');
const { getUsers,
        putUsers,
        postUsers,
        deleteUsers } = require('../controllers/user');


const router = Router();

router.get('/', getUsers);

// párametro de segmento
router.put('/:id', putUsers);

router.post('/', postUsers);

router.delete('/', deleteUsers);

module.exports = router;