import Logs from '@helpers/logs';

const logs = new Logs('cherrytopframework:8082', 'background: #222; color: #bad;');
logs.log('Hello and welcome! This is a test: ', 'Additional info', 123);

console.logs = logs.log;
// custom.d.ts
declare global {
    interface Console {
        logs: (...args: any[]) => void;
    }
    interface StringConstructor {
        capFirst: (str: string) => string;
    }
};

// ** 
// * Capitalize the first letter of a string for use in JSX
// * @param {string} str
// * @returns {string}
// *
String.capFirst = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export default logs;