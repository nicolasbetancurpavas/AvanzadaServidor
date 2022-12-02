import express from 'express'
import { ControladorHabitacion } from '../Controllers/ControladorHabitacion.js'
import { ControladorReservas } from '../Controllers/ControladorReservas.js'

let controladorHabitacion = new ControladorHabitacion()//Usando el controlador
let controladorReservas = new ControladorReservas()

export let rutas = express.Router()

rutas.get('/hotelmarshall/habitaciones', controladorHabitacion.buscarHabitaciones)
rutas.get('/hotelmarshall/habitacion/:idHabitacion', controladorHabitacion.buscarHabitacionPorId)
rutas.post('/hotelmarshall/habitacion', controladorHabitacion.registrarHabitacion)
rutas.put('/hotelmarshall/habitacion/:idHabitacion', controladorHabitacion.editarHabitacion)

rutas.get('/hotelmarshall/reservas', controladorReservas.buscarReservas)
rutas.get('/hotelmarshall/reserva/:idReserva', controladorReservas.buscarReservasPorId)
rutas.post('/hotelmarshall/reserva', controladorReservas.registrarReserva)
rutas.put('/hotelmarshall/reserva/:idReserva', controladorReservas.editarReserva)
rutas.delete('/hotelmarshall/reserva/:idReserva', controladorReservas.borrarReserva)