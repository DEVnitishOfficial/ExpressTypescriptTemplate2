import express from 'express'
import { pingHandler } from '../../controllers/ping.controller'

const v2Router = express.Router()

v2Router.use('/ping', pingHandler)

export default v2Router;