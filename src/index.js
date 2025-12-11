const fs = require('fs');
const readline = require('readline');

const STARTING_VALUE = 50;
const INPUT_PATH = 'static/input.txt';

const startup = async(path) => {
    let actualValue = STARTING_VALUE;
    let zeroCounter = 0;
    try {
        const fileStream = fs.createReadStream(path);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const direction = line.charAt(0);
            const amount = Number(line.substring(1));

            if (direction === 'R') {
                actualValue = (actualValue + amount) % 100;
            }

            if (direction === 'L') {
                actualValue = (actualValue - amount) % 100;

            }
            if (actualValue === 0) zeroCounter++;
        }

        console.log('The final position is:', actualValue);
        console.log('The zero count is:', zeroCounter);
    }
    catch (err) {
        console.log('There was an error reading an input file.', err);
    }
}

startup(INPUT_PATH);

