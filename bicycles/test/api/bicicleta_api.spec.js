const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const Bicicleta = require('../../models/bicicleta')

let bicyclesApiUrl = '/api/bicicletas/'

describe('Bicicletas API', () => {
    afterEach((done) => {
        Bicicleta.deleteMany({}, (err, success) => {
            if(err) console.log(err)
            done()
        })
    })

    describe('GET BICICLETAS /', () => {
        it('Should return 200 status and no bicycles', async () => {
            const res = await request(app).get(bicyclesApiUrl)
            expect(res.status).to.equal(200)
            expect(res.body.bicicletas).to.be.empty
        })
    })

    describe('POST BICICLETAS /', () => {
        it('Should return 200 status and the created bicycle', async () => {
            const bicyclePost = {
                code: 3,
                color: 'green',
                modelo: 'bmx',
                lat: -99.13,
                lon: 19.28,
            }

            const res = await request(app).post(bicyclesApiUrl + 'create').send(bicyclePost)
            const bicycle = res.body.bicicleta
            
            expect(res.status).to.equal(200)
            expect(bicycle.color).to.equal('green')
            expect(bicycle.ubicacion[0]).to.equal(-99.13)
            expect(bicycle.ubicacion[1]).to.equal(19.28)
        })
    })

    //TODO: add test for removing a bike
})

