//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../index')
var should = chai.should()

var Links = require('../model/Links')

chai.use(chaiHttp)

describe('Links', () => {

  beforeEach((done) => {
    //Before each test we empty the database
    Links.clear()
    done()
  })

  describe('/GET link', () => {
    it('should return link when management hash is valid', (done) => {
      var url = 'http://test.com'
      var { hash, managementHash } = Links.create(url)
      chai.request(server)
        .get('/links/' + managementHash)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('url').eql(url)
          res.body.should.have.property('hash').eql(hash)
          done()
        })
    })
    it('should return 404 when management hash is NOT valid', (done) => {
      chai.request(server)
        .get('/links/abcd')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          done()
        })
    })
  })

  describe('/POST link', () => {
    it('should create a new link', (done) => {

      var link = {
        url: 'http://test.com'
      }

      chai.request(server)
        .post('/links')
        .send(link)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('hash')
          res.body.should.have.property('managementHash')
          done()
        })
    })
  })

  describe('/PUT link', () => {
    it('should update existing link', (done) => {
      // Create link that we would like to update and persist it
      var { hash, managementHash } = Links.create('http://test.com')
      var newUrl = 'http://google.com'
      var newManagementHash = '1234567890'
      var update = {
        url: newUrl,
        managementHash: newManagementHash
      }
      chai.request(server)
        .put('/links/'+managementHash)
        .send(update)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('url').eql(newUrl)
          res.body.should.have.property('managementHash').eql(newManagementHash)
          done()
        })
    })
    it('should return 404 when hash is not in database', (done) => {
      // Database should be empty (check beforeEach hook)
      var managementHash = 'should-fail'
      var update = {
        url: 'http://test.com',
        managementHash: managementHash
      }
      chai.request(server)
        .put('/links/'+managementHash)
        .send(update)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          done()
        })
    })
    it('should return 400 when no url is given in update data', (done) => {
      // Create link that we would like to update and persist it
      var { hash, managementHash } = Links.create('http://test.com')
      var newUrl = ''
      var newManagementHash = '1234567890'
      var update = {
        url: newUrl,
        managementHash: newManagementHash
      }
      chai.request(server)
        .put('/links/'+managementHash)
        .send(update)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          done()
        })
    })
  })

  describe('/DELETE link', () => {
    it('should delete existing link', (done) => {
      // Create link that we would like to delete
      var { hash, managementHash } = Links.create('http://test.com')
      chai.request(server)
        .delete('/links/'+managementHash)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          done()
        })
    })
    it('should return 404 when the link does not exist', (done) => {
      var managementHash = 'abcdefgh'
      chai.request(server)
        .delete('/links/'+managementHash)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          done()
        })
    })
  })
})