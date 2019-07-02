const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

// 检查文件是否存在
module.exports.isFileExist = (fileName) => {
  return fs.existsSync(__dirname + fileName)
}

// 检查文件是否可写
module.exports.isFileWritable = (fileName) => {
  fs.accessSync(__dirname + fileName, fs.constants.W_OK);
}

// 生成一个随机的密钥储存在本地
module.exports.createKey = () => {

  // try {
  //   this.isFileExist('/key.text')
  //   fs.readFileSync(__dirname + '/key.text', (err, data) => {
  //     if (err) throw new Error(err)
  //     return data
  //   })
  // } catch (err) {
  //   const key =  crypto.randomBytes(256).toString('hex');
  //   fs.writeFile(__dirname + '/key.text', key, (err) => {
  //     if (err) throw new Error(err)
  //   })
  //   return key
  // }
  if (this.isFileExist('/key.text')) {
    const key =  fs.readFileSync(__dirname + '/key.text', 'utf8')
    return key

  } else {
    const key =  crypto.randomBytes(256).toString('hex');
    fs.writeFile(__dirname + '/key.text', key, (err) => {
      if (err) throw new Error(err)
    })
    return key
  }
  
}
