'use strict'

const fs = require('fs')

fs.mkdir('./fs/register', () => {
  for (let i = 0; i < 10; i++) {
    fs.writeFile(`./fs/register/name${i}.txt`, `name${i}`, 'utf-8', () => {
      console.log(`name${i}, Done.`)
    })
  }
})