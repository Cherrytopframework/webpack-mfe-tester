class Log {
    private label: string;
    private color: string;

    constructor(label: string, color: string) {
        this.label = label;
        this.color = color;
    }

    log(...args: any[]) {
        return console.log(
            `%c [${this.label}]: ${args[0]}`, 
            this.color, 
            ...args.slice(1)
        );
    }
};

export default Log;

// // Example usage
// const fitnessLog = new Log('openfitness', 'background: #222; color: #badaff');

// // You can call it like this:
// fitnessLog.log('This is a message', 'Additional info', 123);

// // Exporting the instance for use in other modules
// export { fitnessLog };
