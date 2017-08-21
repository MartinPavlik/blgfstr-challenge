//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../index')
var should = chai.should()

var Links = require('../model/Links')

chai.use(chaiHttp)

describe('Index', () => {

  beforeEach((done) => {
    //Before each test we empty the database
    Links.clear()
    done()
  })

  describe('/GET', () => {
    it('should redirect to url associated with a valid hash', (done) => {
      // Create link
      var url = 'http://localhost/123456'
      var { hash, managementHash } = Links.create(url)
      chai.request(server)
        .get('/' + hash)
        .end((err, res) => {
          res.should.redirectTo(url)
          done()
        })
    })
    it('should return 404 when invalid hash is given (but with a valid hash length)', (done) => {
      chai.request(server)
        .get('/abcdef')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
    it('should return 404 when no route is matched', (done) => {
      chai.request(server)
        .get('/foo')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})