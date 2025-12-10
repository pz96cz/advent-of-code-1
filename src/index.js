const { readFile: fsReadFile } = require('node:fs/promises');

const STARTING_VALUE = 50;
const INPUT_PATH = 'static/input.txt';

const processData = (data) => {
    const lines = data.split(/\r?\n|\r|\n/g);
    let actualValue = STARTING_VALUE;

    for (const line in lines) {
        console.log(line);
        const direction = line.charAt(0);
        const amount = line.substring(1);

        //console.log(direction, amount);

        if (direction === 'R') {
            actualValue = (actualValue + amount) % 100;
        }

        if (direction === 'L') {
            if (amount > actualValue) {
                actualValue = 100 - (amount - actualValue);
            }
            else {
                actualValue = actualValue - amount;
            }
        }
    }

    console.log('The final position is', actualValue);
}

const startup = async(path, processFun) => {
    try {
        const data = await fsReadFile(path, { encoding: 'utf8' });
        processFun(data);
    }
    catch (err) {
        console.log('There was an error reading an input file.', err);
    }
}

startup(INPUT_PATH, processData);

