import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const cache = new Map<string, string>();
let cacheHits = 0;
let wordcount = 0;

const createTempFile = (id: string): string => {
    const tempDir = os.tmpdir();
    const tempFileName = `tempfile-${id}.txt`;
    return path.join(tempDir, tempFileName);
};
/*
const _blink = (initialState: string): [string, string] => {
  let newState = '';
  let stone = '';

  let stones = initialState.map(' ');
  const stonesToProcess = initialState[initialState.length - 1] === ' ' ? stones : stones.slice(0, -1);
  const lastElement = initialState[initialState.length - 1] === ' ' ? '' : stones.slice(-1)[0];

  for (let i = 0; i < initialState.length; i++) {
    if (i < initialState.length && initialState[i] !== ' ') {
      stone += initialState[i];
      continue;
    }

    wordcount++;
    if (wordcount % 10000000 === 0) console.log('   -- cache hit ' + cacheHits);

    if (cache.has(stone)) {
      newState += cache.get(stone);
      cacheHits++;
    }
    else {
      cacheHits--;
      let stoneNewState = '';

      const val = parseInt(stone);

      if (val === 0) {
        stoneNewState += ' 1';
      }

      else if (stone.length % 2 === 0) {
        const middle = Math.ceil(stone.length / 2);
        const left = parseInt(stone.slice(0, middle)).toString();
        const right = parseInt(stone.slice(middle)).toString();
        stoneNewState += ' ' + left + ' ' + right;
      }

      else {
        const newVal = val * 2024;
        stoneNewState += ' ' + newVal;
      }

      cache.set(stone, stoneNewState);
      newState += stoneNewState;
    }

    stone = '';
  }

  return [ newState.trim(), lastElement ];
}
*/

const _blink = (initialState: string): [string, string] => {
    let newState: number[] = [];
    let stone = '';

    for (let i = 0; i < initialState.length; i++) {
        if (initialState[i] !== ' ') {
            stone += initialState[i];
            continue;
        }

        if (cache.has(stone)) {
            newState.push(...cache.get(stone)!.split(' ').map(Number));
        } else {
            const val = parseInt(stone);
            let stoneNewState = '';

            if (val === 0) {
                stoneNewState = '1';
            } else if (stone.length % 2 === 0) {
                const middle = Math.ceil(stone.length / 2);
                const left = parseInt(stone.slice(0, middle)).toString();
                const right = parseInt(stone.slice(middle)).toString();
                stoneNewState = `${left} ${right}`;
            } else {
                const newVal = val * 2024;
                stoneNewState = newVal.toString();
            }

            cache.set(stone, stoneNewState);
            newState.push(...stoneNewState.split(' ').map(Number));
        }

        stone = '';
    }

    return [newState.join(' '), stone];
};


const streamBlink = (inputFilePath: string, outputFilePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
      const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });
      let appendix = '';

      readStream.on('data', (chunk: string) => {
        const [ processedChunk, newAppendix ] = _blink(appendix + chunk);
        appendix = newAppendix;
        if (!writeStream.write(processedChunk)) {
          readStream.pause(); // Pause reading if write buffer is full
          writeStream.once('drain', () => readStream.resume()); // Resume when write buffer is drained
        }
      });

      readStream.on('end', () => {
        console.log('Finished reading input file.');
        writeStream.end();
      });

      readStream.on('error', (err) => {
        console.error('Error reading file:', err);
      });

      writeStream.on('finish', () => {
        console.log('Finished writing output file.');

        if (appendix.length > 0) {
          const finalBit = _blink(appendix);
          fs.appendFileSync(outputFilePath, ' ' + finalBit, { encoding: 'utf8' });
        }

        resolve();
      });

      writeStream.on('error', (err) => {
        reject(new Error(`Error writing file: ${err.message}`));
      });
    });
}


export const blink = async (initialState: string, blinks: number): Promise<string> => {
  let inputFilePath = createTempFile('input');
  console.log(inputFilePath);
  let outputFilePath = createTempFile('output');
  fs.writeFileSync(inputFilePath, initialState, { encoding: 'utf8' });

  for (let i = 0; i < blinks; i++) {
    fs.writeFileSync(outputFilePath, '', { encoding: 'utf8' });

    try {
        await streamBlink(inputFilePath, outputFilePath);
        console.log(` -- blink ${i} processing complete.`);
    } catch (err) {
        console.error('Error:', err);
    }

    let ts = inputFilePath;
    inputFilePath = outputFilePath;
    outputFilePath = ts;
  }

  return inputFilePath;
}

const countSpaces = (filePath: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
      let count = 0;

      readStream.on('data', (chunk: string) => {
        count += chunk.split(' ').length;
      });

      readStream.on('end', () => {
        console.log('Finished reading input file.');
        resolve(count);
      });

      readStream.on('error', (err) => {
        console.error('Error reading file:', err);
      });
    });
}

export const getSizeAfterBlinks = async (initialState: string, blinks: number): Promise<number> => {
  const outputFilePath = await blink(initialState, blinks);
  const count = await countSpaces(outputFilePath);
  return count;
}
