const { expect } = require('chai')
const Bicicleta = require('../../models/bicicleta')
const Usuario = require('../../models/usuario')
const Reserva = require('../../models/reserva')
const db = require('../../db/mongoose')

const user1 = {
    nombre: 'Luis',
    password: 'miSuperPass1287word',
    email: 'luis@yo.com',
}

const bicycle1 = {
    code: 1, 
    color: 'green', 
    modelo: 'urban'
}

describe('Testing usuarios', function(){
    beforeEach(async () => {
        await Bicicleta.deleteMany({})
        await Usuario.deleteMany({})
        await Reserva.deleteMany({})
    })

    // Reserve a bicycle
    describe('A user reserves a bicycle', ()=>{
        it('A reservation should exist', async ()=>{
            const user = new Usuario(user1)
            await user.save()

            const bicycle = new Bicicleta(bicycle1)
            await bicycle.save()

            let today = new Date()
            let tomorrow = new Date()
            tomorrow.setDate(today.getDate() + 1)

            await user.reservar(bicycle._id, today, tomorrow)
            
            const reservations = await Reserva.find({}).populate('bicicleta').populate('usuario').exec()

            expect(reservations.length).to.equal(1)
            expect(reservations[0].diasDeReserva()).to.equal(2)
            expect(reservations[0].bicicleta.code).to.equal(1)
            expect(reservations[0].usuario.nombre).to.equal(user.nombre)
        })
    }); 
})

