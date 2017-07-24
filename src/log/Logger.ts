import LogCodes from "./LogCodes"

export default class Logger{
	
	public static log(code:string,message:string){
		console.log(`${code} | ${message}`)
	}
	
	public static debug(message:string){
		console.log(`${LogCodes.DEBUG} | ${message}`)
	}

	public static info(message:string){
		console.info(`${LogCodes.INFO} | ${message}`)
	}

	public static warn(message:string){
		console.warn(`${LogCodes.WARNING} | ${message}`)
	}

	public static err(message:string){
		console.error(`${LogCodes.ERROR} | ${message}`)
	}

	public static fatal(message:string){
		console.error(`${LogCodes.FATAL} | ${message}`)
	}

}