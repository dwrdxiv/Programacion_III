import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true, // Debe estar en true
  origin: ['http://localhost:5173'], // Aquí va la URL de tu proyecto de Vue
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: [
    'Content-Type',
    'Accept',
    'Authorization', // ¡IMPORTANTE! Sin esto no podrás enviar el Token en el futuro
  ],
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig