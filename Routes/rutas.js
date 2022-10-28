import express from 'express'
import { ControladorHabitacion } from '../Controllers/ControladorHabitacion.js'
import { ControladorReservas } from '../Controllers/ControladorReservas.js'

let controladorHabitacion = new ControladorHabitacion()//Usando el controlador
let controladorReservas = new ControladorReservas()

export let rutas = express.Router()

rutas.get('/hotelesgelus/habitaciones', controladorHabitacion.buscarHabitaciones)
rutas.get('/hotelesgelus/habitacion/:idHabitacion', controladorHabitacion.buscarHabitacionPorId)
rutas.post('/hotelesgelus/habitacion', controladorHabitacion.registrarHabitacion)
rutas.put('/hotelesgelus/habitacion/:idHabitacion', controladorHabitacion.editarHabitacion)

rutas.get('/hotelesgelus/reservas', controladorReservas.buscarReservas)
rutas.get('/hotelesgelus/reserva/:idReserva', controladorReservas.buscarReservasPorId)
rutas.post('/hotelesgelus/reserva', controladorReservas.registrarReserva)
rutas.put('/hotelesgelus/reserva/:idReserva', controladorReservas.editarReserva)
rutas.delete('/hotelesgelus/reserva/:idReserva', controladorReservas.borrarReserva)