import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'

process.on('uncaughtException', error => {
	// console.log('Uncought exeption is detected...');
	errorLogger.error(error)
	process.exit(1);
})

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('BD Connected successfully')

    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect DB', err)
  }

  process.on('unhandledRejection', error => {
	console.log("Unhandled Rejection is detected. We're closing our server... ... ...")
	if(server){
		server.close(() => {
			errorLogger.error(error)
			process.exit(1)
		})
	} else {
		process.exit(1);
	}
	})
}

main()

process.on('SIGTERM', ()=> {
	infoLogger.info('SIGTERM is received')
	if(server){
		server.close()
	}
})