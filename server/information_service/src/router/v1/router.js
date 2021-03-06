var express =require('express')
var PostAPI = require('../../API/postAPI')
var SearchAPI = require('../../API/search')
var AddressAPI = require('../../API/Res_addressAPI')
var MapAPI = require('../../API/MapAPI')
var router = express.Router()
router.use('/post',PostAPI)
router.use('/address',AddressAPI)
router.use('/search',SearchAPI)
router.use('/map',MapAPI)
module.exports = router;