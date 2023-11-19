/**
 * @Author        Scipline
 * @Since         2023-11-17 21:32:30
 * @LastEditor    Scipline
 * @LastEditTime  2023-11-18 20:48:57
 * @FileName      script.js
 * @Description
 */
const BASE_URL = 'http://localhost:5501'
const keyInput = document.getElementById('keyInput')
const valueInput = document.getElementById('valueInput')
const result = document.getElementById('result')
async function sendRequest(url, method, body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${BASE_URL}${url}`, options)

    // 直接使用 response.json()
    let data = await response.json()
    if (typeof data === 'string') {
      throw new Error(data)
    } else if (typeof data === 'object') {
      if (data.status !== 1) {
        throw new Error(data.message)
      }
    }

    return data
  } catch (error) {
    result.value = `Error occurred: ${error.message}`
    throw error
  }
}

async function loadDB() {
  const dbPath = document.getElementById('dbPath').value
  const data = await sendRequest('/loadDB', 'POST', { dbPath })
  result.value = data.message
}

async function closeDB() {
  const data = await sendRequest('/closeDB', 'POST', { dbPath })
  result.value = data.message
  document.getElementById('json-display').style.display = 'none'
}

async function readKV() {
  const keyValue = keyInput.value
  const data = await sendRequest('/readKV', 'POST', { key: keyValue })
  result.value = data.message
}

async function writeKV() {
  const keyValue = keyInput.value
  const valueValue = valueInput.value
  await sendRequest('/writeKV', 'POST', { key: keyValue, value: valueValue })
  result.value = 'The key-value pair was successfully written.'
}

async function deleteKV() {
  const keyValue = keyInput.value
  await sendRequest('/deleteKV', 'POST', { key: keyValue })
  result.value = 'The key-value pair was successfully deleted.'
}

async function readAllKV() {
  const data = await sendRequest('/readAllKV', 'POST')
  document.getElementById('json-display').style.display = 'block'
  new JsonEditor('#json-display', data.message)
}
