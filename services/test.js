/**
 * @Author        Scipline
 * @Since         2023-11-18 04:41:44
 * @LastEditor    Scipline
 * @LastEditTime  2023-11-18 22:52:39
 * @FileName      test.js
 * @Description   
 */
const Level = require('./LevelDB')
const path = require('path')
const database = path.resolve(__dirname, '../example/database')
// 建议所有的数据库都写在一个文件夹，除非有特别需求
const db = new Level(database)
async function test() {
  // const res = await db.put('testkey','testvalue') //ok
  // const res = await db.del('testkey') // ok
  // const res = await db.get('testkey') //testvalue or error
  // console.log( res)

  const res = await db.getAllData().then((result) => {
    if (result.code === 1) {
      console.log(result.data)
      // console.dir(result.data, { depth: null }) // 打印多层嵌套对象
    } else {
      console.error(result.message)
    }
  })
}
test()
