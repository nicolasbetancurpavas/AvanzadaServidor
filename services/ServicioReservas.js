//QUERIES O CONSULTAS A LA BD
import { modeloReserva } from '../Models/ModeloReservas.js'

export class ServicioReservas {


    //Programo metodos para cada una de las consultas que quiero hacer en BD
    async buscarReservas() {
        let reservas = await modeloReserva.find()
        return reservas
    }

    async buscarReservasPorId(id) {
        let reserva = await modeloReserva.findById(id)
        return reserva
    }

    async agregarReservaEnBD(datos) {
        let datosValidados = new modeloReserva(datos)
        return await datosValidados.save()
    }

    async editarReserva(id, datosEditar) {
        return await modeloReserva.findByIdAndUpdate(id, datosEditar)
    }

    async borrarReserva(id) {
        return await modeloReserva.findByIdAndDelete(id);
    }
}