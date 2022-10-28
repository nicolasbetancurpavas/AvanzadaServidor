import { ServicioReservas } from '../services/ServicioReservas.js'
import { ServicioHabitacion } from '../services/ServicioHabitacion.js'

export class ControladorReservas {

    constructor() { }

    async buscarReservas(request, response) {

        let objetoServicioReserva = new ServicioReservas()

        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta",
                "datos": await objetoServicioReserva.buscarReservas(),
            })
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la reserva" + error,
                "datos": null,
            })
        }
    }

    async buscarReservasPorId(request, response) {
        let idReserva = request.params.idReserva
        let objetoServicioReserva = new ServicioReservas()

        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta " + idReserva,
                "datos": await objetoServicioReserva.buscarReservasPorId(idReserva)
            })
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la reserva" + error,
                "datos": null,
            })
        }
    }

    async registrarReserva(request, response) {

        let datosReserva = request.body
        let objetoServicioReserva = new ServicioReservas()
        let objetoServicioHabitacion = new ServicioHabitacion()

        console.log(datosReserva);
        try {

            let datosHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion);
            let maxPersonas = datosHabitacion.numeroMaximoPersonas
            let numeroPersonas = datosReserva.numeroNinos + datosReserva.numeroAdultos;
            let entrada = new Date(datosReserva.fechaEntrada);
            let salida = new Date(datosReserva.fechaSalida);
            const diffInDays = Math.floor((salida - entrada) / (1000 * 60 * 60 * 24));
            let costo = 0
            if (diffInDays > 0) {

                if (maxPersonas >= numeroPersonas) {

                    costo = Number(datosHabitacion.valorNoche) * Number(diffInDays)
                    datosReserva.costoReserva = costo;
                    await objetoServicioReserva.agregarReservaEnBD(datosReserva)

                    response.status(200).json({
                        "mensaje": "Exito agregando la reserva",
                        "datos": datosReserva,
                        "estado": true
                    })
                } else {
                    response.status(400).json({
                        "mensaje": "Error en la reserva" + error,
                        "datos": null,
                        "estado": false
                    })
                }
            } else {
                response.status(400).json({
                    "mensaje": "Error en la reserva" + error,
                    "datos": null,
                    "estado": false
                })
            }

            console.log(datosHabitacion);
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la reserva" + error,
                "datos": null,
                "estado": false
            })
        }
    }

    async editarReserva(request, response) {

        let id = request.params.idReserva
        let datosReserva = request.body
        let objetoServicioReserva = new ServicioReservas()

        try {
            await objetoServicioReserva.editarReserva(id, datosReserva)
            response.status(200).json({
                "mensaje": "Exito editando la reserva " + id,
                "datos": datosReserva
            })
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la reserva" + error,
                "datos": null,
            })
        }
    }
    async borrarReserva(request, response) {

        let id_del = request.params.idReserva
        let objetoServicioReserva = new ServicioReservas()
        console.log(id_del);

        try {
            await objetoServicioReserva.borrarReserva(id_del)
            response.status(200).json({
                "mensaje": "Exito eliminando la reserva " + id_del,
                "datos": null
            })

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error eliminando la reserva" + error,
                "datos": null,
            })
        }
    }

}