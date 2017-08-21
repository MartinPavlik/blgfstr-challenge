var HASH_LENGTH = 6;
var MANAGEMENT_HASH_LENGTH = 24;

function getRandomString(length) {

  var result = ''

  while (result.length < length) {
    // Because Math.random().toString(36) is able to generate shorter
    // string than <2, length>, next iteration of this call should be applied
    result += Math.random().toString(36).substring(2, length);
    result = result.substring(0, length);
  }

  return result;
}

function Links() {

  /*
    Map of links where hash is a key and value is a link object
  */
  var links = {
    '123456': {
      url: 'http://google.com',
      managementHash: '1234567890'
    }
  }

  // For testing purposes
  function clear() {
    links = {};
  }

  function remove(hash) {
    delete links[hash];
  }

  function validate(url) {
    if (typeof url !== 'string') {
      return false
    }
    if (url === '' || url.trim() === '') {
      return false
    }
    return true
  }

  function findHashByManagementHash(managementHash) {
    var hashes = Object.keys(links)
      .filter(hash => links[hash].managementHash === managementHash)

    if (hashes.length == 1) {
      return hashes[0]
    }
    return null
  }

  function update(hash, url, managementHash) {

    if (!validate(url)) {
      return null
    }

    links[hash] = {
      url,
      managementHash
    }

    return links[hash]
  }

  function get(hash) {
    return links[hash] ? links[hash] : null
  }

  function create(url) {
    if (!validate(url)) {
      return null
    }

    // TODO - check hash conflicts
    var hash = getRandomString(HASH_LENGTH);
    var managementHash = getRandomString(MANAGEMENT_HASH_LENGTH);

    var newLink = {
      url: url,
      managementHash: managementHash
    }

    links[hash] = newLink;

    return {
      hash,
      managementHash
    }
  }

  return {
    get,
    create,
    validate,
    update,
    findHashByManagementHash,
    clear,
    remove
  }
}

module.exports = Links();