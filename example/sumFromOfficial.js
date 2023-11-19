/**
 * @Author        XiaoZong
 * @Since         2023-11-18 02:35:17
 * @LastEditor    XiaoZong
 * @LastEditTime  2023-11-18 02:41:53
 * @FileName      sumFromOffice.js
 * @Description   
 */
// 引入level库
const level = require('level');

// 创建或打开一个名为'mydb'的数据库
const db = level('mydb');

// 插入数据（键值对）
db.put('key', 'value', (err) => {
  if (err) return console.log('插入数据失败', err);
  console.log('插入数据成功');
});

// 读取数据（根据键）
db.get('key', (err, value) => {
  if (err) return console.log('读取数据失败', err);
  console.log('读取数据成功，值为:', value);
});

// 删除数据（根据键）
db.del('key', (err) => {
  if (err) return console.log('删除数据失败', err);
  console.log('删除数据成功');
});

// 批量操作（插入、修改、删除）
db.batch()
  .put('key1', 'value1')
  .put('key2', 'value2')
  .del('key3')
  .write((err) => {
    if (err) return console.log('批量操作失败', err);
    console.log('批量操作成功');
  });

// 创建一个键值范围内的可读流
db.createReadStream({ gte: 'key1', lte: 'key2' })
  .on('data', (data) => {
    console.log('键:', data.key, '值:', data.value);
  })
  .on('error', (err) => {
    console.log('创建可读流失败', err);
  })
  .on('end', () => {
    console.log('可读流结束');
  });

// 创建一个键范围内的可读流
db.createKeyStream({ gte: 'key1', lte: 'key2' })
  .on('data', (key) => {
    console.log('键:', key);
  })
  .on('error', (err) => {
    console.log('创建键可读流失败', err);
  })
  .on('end', () => {
    console.log('键可读流结束');
  });

// 创建一个值范围内的可读流
db.createValueStream({ gte: 'key1', lte: 'key2' })
  .on('data', (value) => {
    console.log('值:', value);
  })
  .on('error', (err) => {
    console.log('创建值可读流失败', err);
  })
  .on('end', () => {
    console.log('值可读流结束');
  });
