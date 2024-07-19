import fs from 'fs'
import readline from 'readline'


const  readStream = fs.createReadStream('dummy.csv' , {highWaterMark : 1024})


const writeStream = fs.createWriteStream('dummy2.csv' , {highWaterMark : 1024})



// reading line by line

// const r1 = readline.createInterface({input : readStream})
// r1.on('line', (line)=>{
//     console.log(line, 'this line', count)
//     count++
// })

// r1.on('close', ()=>{
//     console.log('reading file completed')
// })

// reading chunks........................

readStream.on('data' , (chunk)=>{
    console.log(`reading ${chunk} lenght of data in bytes`)
    writeStream.write(chunk)

})

readStream.on('end', ()=>{
    console.log('file reading completed')

})


