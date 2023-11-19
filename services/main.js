/**
 * @Author        Scipline
 * @Since         2023-11-18 02:46:40
 * @LastEditor    Scipline
 * @LastEditTime  2023-11-18 20:05:56
 * @FileName      main.js
 * @Description   服务端入口文件
 */
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
/**
 * CORS配置选项
 * @type {Object}
 * @property {string} origin - 定义了哪些源可以访问资源
 * @property {number} optionsSuccessStatus - 定义了预检请求成功的HTTP状态码
 * 对于一些旧的浏览器（如IE11，各种智能电视），它们可能无法处理204状态码，因此这里设置为200
 */
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json()) // for parsing application/json  == const bodyParser = require('body-parser')
const port = process.env.PORT || 5501

const Level = require('./LevelDB')
const path = require('path')
// // const database = path.resolve(__dirname, '../database')
// const database = path.resolve(__dirname, '../database')
// const db = new Level(database)
let db = null
app.post('/loadDB', async (req, res, next) => {
  const dbPath = req.body.dbPath
  try {
    console.log('Loading database from ' + '"' + dbPath + '"')
    if (db) {
      await db.close()
    }
    const database = path.resolve(dbPath)
    db = new Level(database)

    res.json({ status: 1, message: 'Database loaded successfully!' })
  } catch (err) {
    next(err)
  }
})

app.post('/readKV', async (req, res, next) => {
  const key = req.body.key
  try {
    if (!db) {
      return res.json({ status: -1, message: 'Database not loaded. Please call loadDB first.' })
    }
    const value = await db.get(key)
    res.json({ status: 1, message: value })
  } catch (err) {
    next(err)
  }
})

app.post('/writeKV', async (req, res, next) => {
  const key = req.body.key
  const value = req.body.value
  try {
    if (!db) {
      return res.json({ status: -1, message: 'Database not loaded. Please call loadDB first.' })
    }
    await db.put(key, value)
    res.json({ status: 1, message: 'Write success!' })
  } catch (err) {
    next(err)
  }
})

app.post('/deleteKV', async (req, res, next) => {
  const key = req.body.key
  try {
    if (!db) {
      return res.json({ status: -1, message: 'Database not loaded. Please call loadDB first.' })
    }
    await db.del(key)
    res.json({ status: 1, message: 'Delete success!' })
  } catch (err) {
    next(err)
  }
})

app.post('/readAllKV', async (req, res, next) => {
  try {
    if (!db) {
      return res.json({ status: -1, message: 'Database not loaded. Please call loadDB first.' })
    }
    const result = await db.getAllData()
    if (result) {
      res.json({ status: 1, message: result })
    } else {
      console.error(result)
      res.status(500).json({ status: -1, message: result })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/closeDB', async (req, res, next) => {
  try {
    if (!db) {
      return res.json({ status: -1, message: 'Database not loaded. Please call loadDB first.' })
    }
    await db.close()
    db = null
    res.json({ status: 1, message: 'Database closed successfully!' })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  // 500 Status Code: Internal Server Error
  res.status(500).send(err.message)
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
