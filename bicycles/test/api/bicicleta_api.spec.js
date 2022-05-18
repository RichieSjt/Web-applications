const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const Bicicleta = require('../../models/bicicleta')

let bicyclesApiUrl = '/api/bicicletas/'

const bicycle1 = {
    code: 3,
    color: 'green',
    modelo: 'bmx',
    lat: -99.13,
    lon: 19.28,
}

describe('Bicicletas API', () => {
    beforeEach(async () => {
        await Bicicleta.deleteMany({})
    })

    describe('GET BICICLETAS /', () => {
        it('Should return 200 status and no bicycles', async () => {
            const res = await request(app).get(bicyclesApiUrl)
            expect(res.status).to.equal(200)
            expect(res.body.bicicletas).to.be.empty
        })
    })

    describe('POST BICICLETAS /create', () => {
        it('Should return 200 status and the created bicycle', async () => {
            const res = await request(app).post(bicyclesApiUrl + 'create').send(bicycle1)
            const bicycleRes = res.body.bicicleta

            expect(res.status).to.equal(200)
            expect(bicycleRes.color).to.equal('green')
            expect(bicycleRes.ubicacion[0]).to.equal(-99.13)
            expect(bicycleRes.ubicacion[1]).to.equal(19.28)
        })
    })

    describe('POST BICICLETAS /delete', () => {
        it('Should return 204 status and delete the bicycle', async () => {
            await Bicicleta.create(bicycle1)

            const res2 = await request(app).post(bicyclesApiUrl + 'delete').send({code: bicycle1.code})
            expect(res2.status).to.equal(204)
        })
    })
})
