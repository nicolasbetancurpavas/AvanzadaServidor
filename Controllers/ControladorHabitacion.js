//RECIBIR PETICIONES, LOGICA DE NEGOCIO Y ENVIO DE RESPUESTAS
import { ServicioHabitacion } from '../services/ServicioHabitacion.js'

export class ControladorHabitacion {

    constructor() { }

    async buscarHabitaciones(request, response) {

        let objetoServicioHabitacion = new ServicioHabitacion()

        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta",
                "datos": await objetoServicioHabitacion.buscarHabitaciones(),
            })

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta" + error,
                "datos": null,
            })
        }
    }

    async buscarHabitacionPorId(request, response) {

        let idHabitacion = request.params.idHabitacion //Recibo id de la peticion
        let objetoServicioHabitacion = new ServicioHabitacion()

        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta " + idHabitacion,
                "datos": await objetoServicioHabitacion.buscarHabitacionPorId(idHabitacion)
            })

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta" + error,
                "datos": null,
            })
        }
    }

    async registrarHabitacion(request, response) {
        //response.send("Estoy agregando una habitacion desde el controlador")

        let datosHabitacion = request.body //obtengo datos del body
        let objetoServicioHabitacion = new ServicioHabitacion()

        try {
            console.log(datosHabitacion);
            //console.log(datosHabitacion.numeroMaximoPersonas)
            if (datosHabitacion.numeroMaximoPersonas < 8) {

                await objetoServicioHabitacion.agregarHabitacionEnBD(datosHabitacion)

                response.status(200).json({
                    "mensaje": "Exito agregando una habitacion",
                    "datos": datosHabitacion
                })

            } else {
                response.status(400).json({
                    "mensaje": "La habitacion tsiene un limite de personas",
                    "datos": null
                })
            }



        } catch (error) {
            response.status(400).json({
                "mensaje": "Error agregando una habitacion" + error,
                "datos": null
            })
        }
    }

    async editarHabitacion(request, response) {
        //response.send("Estoy editando una habitacion desde el controlador")

        let id = request.params.idHabitacion
        let datosHabitacion = request.body
        let objetoServicioHabitacion = new ServicioHabitacion()

        try {
            await objetoServicioHabitacion.editarHabitacion(id, datosHabitacion)
            response.status(200).json({
                "mensaje": "Exito editando una habitacion " + id,
                "datos": null,
            })

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta" + error,
                "datos": null,
            })
        }
    }
}