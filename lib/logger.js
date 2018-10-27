const chalk = require("chalk");
const moment = require("moment");

const toUpper = string => string.charAt(0).toUpperCase() + string.slice(1);

class Logger {
    constructor() {
        throw new Error(`${this.constructor.name} class cannot be instantiated`);
    }

    static time() {
        return moment().format("HH:mm:ss");
    }

    static log(style, name, message, stacktrace) {
        if (typeof style !== "function") {
            style = chalk.white;
        }

        if (Array.isArray(message)) {
            for (const item of message) console.log(style.bold(`[${Logger.time()} ${toUpper(name)}]`), style(item));
            return false;
        } else if (stacktrace) {
            console.log(style.bold(`[${Logger.time()} ${toUpper(name)}]`), style(message));
            return console.trace(require("util").format(message));
        } else {
            message = typeof message === "string" ? message.replace(/\r?\n|\r/g, " ") : message;
            return console.log(style.bold(`[${Logger.time()} ${toUpper(name)}]`), style(message));
        }
    }

    static success(name, message) {
        return Logger.log(chalk.green, name, message);
    }

    static error(name, message, stacktrace) {
        return Logger.log(chalk.red, name, message, stacktrace);
    }

    static warn(name, message) {
        return Logger.log(chalk.yellow, name, message);
    }

    static info(name, message) {
        return Logger.log(chalk.blue, name, message);
    }

    static debug(name, message) {
        return Logger.log(chalk.magenta, name, message);
    }

    static fatal(name, message, stacktrace) {
        throw Logger.log(chalk.bgRed.white, name, message, stacktrace);
    }
}

module.exports = Logger;