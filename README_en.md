# Instructions

## Environment Configuration

You need a Node.js environment.
```bash
npm install
```

## Run Backend

```bash
cd services
node main.js
```

## Start Using

You can start a local server environment to run or directly open `index.html` in the browser. Enter the absolute path of the local LevelDB database folder and start enjoying it!

## Operations

1. Database: Load DB (open/new), Read DB (read all content), Close DB (close)
2. Key-Value: Read (read specified key), Write (write/overwrite key value), Delete (delete specified key)

## Notes

1. The absolute folder path cannot be `%LocalAppData%`.
2. You cannot open an already opened database or open a database of a running browser. Although the operation interface of this project requires opening a browser, you can open it in another browser or copy a copy for operation.
3. `xx\xx\xx\LocalStorage\leveldb\` includes all website's LocalStorage, the data will be large, there is a high probability of read/write failure, possibly due to the operation failure of the `Level` library, ~~perhaps to display the recursion of converting all nested objects to JSON objects more elegantly~~, or it may fail due to the failure of HTTP protocol to transmit large data, ~~or maybe because of my code problem~~. (Be careful to operate, improper operation will cause data loss of all websites locally).

## Appendix

Example LevelDB path:

Chrome:

- localStorage.getItem:`"%LocalAppData%\BraveSoftware\Brave-Browser\User Data\Default\Local Storage\leveldb"`

Extension:

- chrome.storage.local.get:`%LocalAppData%\BraveSoftware\Brave-Browser\User Data\Default\Local Extension Settings\akapkckdchfdkhbgmnkboidpaljnlimb`

## Improvements:

- [ ] Open all website's local storage database failed(If need it, you can use the file in the **extra** directory, but only read)
- [ ] Cannot read and modify the value of the object, only string
- [ ] Develop new platforms.....