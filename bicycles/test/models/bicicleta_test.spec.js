const { expect } = require('chai')
const Bicicleta = require('../../models/bicicleta')
const db = require('../../db/mongoose')

const bicycle1 = {
    code: 1,
    color: 'green',
    modelo: 'urban',
    ubicacion: [19.28, -80.13]
}

const bicycle2 = {
    code: 2,
    color: 'white',
    modelo: 'mountain',
    ubicacion: [19.28, -80.13],
}

describe('Testing bicicletas', () => {
    beforeEach(async () => {
        await Bicicleta.deleteMany({})
    })

    //Checar el createInstance
    describe('Bicicleta.createInstance', () => {
        it('Creates a bicycle instance', () => {
            const bicycle = new Bicicleta(bicycle1)

            expect(bicycle.code).to.equal(1)
            expect(bicycle.color).to.equal('green')
            expect(bicycle.modelo).to.equal('urban')
            expect(bicycle.ubicacion[0]).to.equal(19.28)
            expect(bicycle.ubicacion[1]).to.equal(-80.13)
        })
    })

    //Checar el allBicis
    describe('Bicicleta.allBicis', () => {
        it('Starts empty', async () => {
            const bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(0)
        })
    })

    //Add a bike
    describe('Bicicletas.create', () => {
        it('Adds a bicycle', async () => {
            await Bicicleta.create(bicycle1)

            const bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(1)
            expect(bicycles[0].code).to.equal(bicycle1.code)
        })
    })

    //Find by code
    describe('Find a bicycle by its code', () => {
        it('should return bike with code 1', async () => {
            let bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(0)
            
            await Bicicleta.create(bicycle1)
            await Bicicleta.create(bicycle2)

            bicycles = await Bicicleta.allBicis()

            expect(bicycles.length).to.equal(2)

            const targetBicycle = await Bicicleta.findByCode(1)
            expect(targetBicycle.code).to.equal(bicycle1.code)
            expect(targetBicycle.color).to.equal(bicycle1.color)
            expect(targetBicycle.modelo).to.equal(bicycle1.modelo)
        })
    })

    // Remove by code
    describe('Remove a bicycle by its code', () => {
        it('should delete bike with code 1', async () => {
            let bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(0)

            await Bicicleta.create(bicycle1)
            bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(1)

            await Bicicleta.removeByCode(1)
            bicycles = await Bicicleta.allBicis()
            expect(bicycles.length).to.equal(0)
        })
    })
})
