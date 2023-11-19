[English](./README_en.md)
## 使用说明
1. 环境配置
需要node环境
```bash
npm install
```
2. 运行后端
```bash
cd services
node main.js
```
3. 开始使用
    开启本地server环境运行或者直接浏览器打开`index.html`，输入本地LevelDB数据库绝对文件夹路径，开始享用！

## 操作

1. 数据库：Load DB(打开/新建)，Read DB(读取所有内容)，Close DB(关闭)
2. 键值：Read(读取指定键)，Write(写入/覆盖键值)，Delete(删除指定键)

## 注意

1. 绝对文件夹路径，不能为`%LocalAppData%`
2. 不能重复开启已经打开的数据库或者打开正在运行的浏览器的数据库。尽管这个项目的操作界面需要打开浏览器，但可以用另外浏览器打开或者拷贝一份进行操作
3. `xx\xx\xx\LocalStorage\leveldb\`包括全部网站的LocalStorage，数据会很大，大概率读写失败，可能是`Level`库操作读取失败，~~可能是为了更优雅显示递归将所有嵌套对象转换为JSON对象而导致~~，也可能会因为用HTTP协议传输数据过大而失败，~~或者就是因为我的代码问题~~。。。（谨慎操作，操作不当所有网站本地数据丢失）

## 附录

示例LevelDB路径：

Chrome：

- localStorage.getItem:`"%LocalAppData%\BraveSoftware\Brave-Browser\User Data\Default\Local Storage\leveldb"`

Extension：

- chrome.storage.local.get:`%LocalAppData%\BraveSoftware\Brave-Browser\User Data\Default\Local Extension Settings\akapkckdchfdkhbgmnkboidpaljnlimb`

## 改进：

- [ ]  打开所有网站的本地存储数据库失败(有需求可以用**extra**目录下的文件，但仅读)
- [ ]  不能读改值为的对象，只能字符串
- [ ]  开发新的平台.....
## 感谢：
Level:[https://github.com/Level/level](https://github.com/Level/level)
