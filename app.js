import * as dotenv from 'dotenv' // variables de entorno 
dotenv.config()

import { ServidorAPI } from './API/ServidorApi.js'

let servidorHoteles = new ServidorAPI() //Intancia de una clase (OBJETO)
servidorHoteles.despertarServidor()

