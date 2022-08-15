const fs = require('fs')

const formatEntries = (entries) => {
  const formattedEntries = []

  entries.forEach((entry) => {
    const {date, amount, description} = entry
    const stringifiedEntry = date + ',' + amount + ',' + description
    formattedEntries.push(stringifiedEntry)
  })

  return formattedEntries.reverse()
}


const writeToFile = (content) => {
  const writeStream = fs.createWriteStream('formatted.txt');
  const pathName = writeStream.path;
 
  let array = ['1','2','3','4','5','6','7'];
    
  // write each value of the array on the file breaking line
  content.forEach(value => writeStream.write(`${value}\n`));

  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
  });

  // handle the errors on the write process
  writeStream.on('error', (err) => {
      console.error(`There is an error writing the file ${pathName} => ${err}`)
  });

  // close the stream
  writeStream.end();
}

fs.readFile('./expense.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  
  const expenses = data.split(/\r?\n/)
  const entries = expenses.map((expense, idx) => {
    const line = expenses[idx].split(' ')
    const entry = {
      date: line[line.length - 1] + '/2022',
      amount: line[0].substring(1),
      description: line.slice(1, line.length - 1).join(' ')
    }

    return entry
  })
  
  const content = formatEntries(entries)

  writeToFile(content)
})
