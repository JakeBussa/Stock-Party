import { readFile } from 'fs';

readFile('a.txt', 'utf8', (error, data) => {
  if (error) {
    console.log(error)
  }

  console.log(data);
});