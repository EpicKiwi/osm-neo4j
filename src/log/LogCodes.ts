export default class LogCodes {
	public static DEBUG = "DEBG"
	public static INFO = "INFO"
	public static WARNING = "WARN"
	public static ERROR = "ERRO"
	public static FATAL = "FATL"
	public static code(from:string){
		return from.toUpperCase().substr(0,4)
	}
}