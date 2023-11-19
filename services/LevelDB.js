const { Level } = require('level')
const path = require('path')
const winston = require('winston')

// Set the log directory to the parent directory of the current directory
const logDirectory = path.resolve(__dirname, '.', 'logs')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'leveldb' },
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'leveldb.log') }),
  ],
})

/**
 * LevelDB 是一个简单的键值对数据库操作类，提供了基本的增删改查功能。
 * 
 * @class
 * @classdesc 通过 LevelDB 类，可以方便地操作 LevelDB 数据库。
 * 
 * @example
 * const db = new LevelDB('./mydb')
 * await db.put('key', 'value')
 * const value = await db.get('key')
 * console.log(value) // 'value'
 * await db.del('key')
 * 
 */
class LevelDB {
  constructor(path) {
    // Create a new database or open an existing database
    this.db = new Level(path, { valueEncoding: 'json' })
  }
  async get(key) {
    return new Promise((resolve, reject) => {
      this.db.get(key, (err, value) => {
        if (err) {
          logger.error('Error reading value from LevelDB', { error: err })
          reject(err)
        } else {
          logger.info('Value read from LevelDB', { key: key, value: value })
          resolve(value)
        }
      })
    })
  }

  async put(key, value) {
    return new Promise((resolve, reject) => {
      this.db.put(key, value, (err) => {
        if (err) {
          logger.error('Error writing value to LevelDB', { error: err })
          reject(err)
        } else {
          logger.info('Value written to LevelDB', { key: key, value: value })
          resolve('Write success!')
        }
      })
    })
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.db.del(key, (err) => {
        if (err) {
          logger.error('Error deleting value from LevelDB', { error: err })
          reject(err)
        } else {
          logger.info('Value deleted from LevelDB', { key: key })
          resolve('Delete success!')
        }
      })
    })
  }

  convertObjectToStrings(obj) {
    if (typeof obj === 'object' && obj !== null) {
      // If the value is an object, create a new object and copy all properties from the original object to the new object,
      // converting all values to strings.
      let newObj = Array.isArray(obj) ? [] : {}
      for (let key in obj) {
        // console.log(obj[key])
        newObj[key] = this.convertObjectToStrings(obj[key])
      }
      return newObj
    } else {
      // Otherwise, convert the value to a string and return.
      return String(obj)
    }
  }
  
  async getAllData() {
    try {
      let data = {}
      for await (const [key, value] of this.db.iterator()) {
        data[key] = this.convertObjectToStrings(value)
        // data[key] = value
      }
      // console.dir(data, { depth: null }) 
      return data
    } catch (error) {
      return error
    }
  }
  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = LevelDB
