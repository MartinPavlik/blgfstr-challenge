var express = require('express')
var router = express.Router()
var Links = require('../model/Links')


var links = Links

router.get('/:managementHash', function(req, res) {
  var { managementHash } = req.params

  // Find link's hash
  var hash = links.findHashByManagementHash(managementHash)
  if (!hash) {
    res.status(404)
    res.json({message: "Not found"})
    return
  }

  // Find link by hash
  var link = links.get(hash)
  if (!link ) {
    res.status(404)
    res.json({message: "Not Found"})
  } else {
    res.json(link)
  }
})

router.post('/', function(req, res) {
  var { url } = req.body
  var newLink = links.create(url)

  if (newLink) {
    res.json(newLink)
  } else {
    res.status(400)
    res.send({message: "Please, enter valid url"})
  }
})

router.put('/:managementHash', function(req, res) {
  var { managementHash } = req.params
  var hash = links.findHashByManagementHash(managementHash)

  if (!hash) {
    res.status(404)
    res.json({message: "Not found"})
    return
  }

  var { url, managementHash } = req.body

  var updatedLink = links.update(hash, url, managementHash)

  if (updatedLink) {
    res.json(updatedLink)
  } else {
    res.status(400)
    res.send({message: "Link can not be updated"})
  }
})

router.delete('/:managementHash', function(req, res) {
  var { managementHash } = req.params
  var hash = links.findHashByManagementHash(managementHash)

  if (!hash) {
    res.status(404)
    res.json({message: "Not found"})
    return
  }

  links.remove(hash)
  res.send({message: "Link has been deleted"})
})

module.exports = router
