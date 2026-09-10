const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const store = getStore('giftboxes');

  if (event.httpMethod === 'GET') {
    const key = event.queryStringParameters && event.queryStringParameters.key;
    if (!key) return { statusCode: 400, body: 'missing key' };
    const val = await store.get(key);
    if (val == null) return { statusCode: 404, body: '' };
    return { statusCode: 200, headers: { 'Content-Type': 'text/plain' }, body: val };
  }

  if (event.httpMethod === 'POST') {
    let payload;
    try { payload = JSON.parse(event.body || '{}'); } catch (e) { return { statusCode: 400, body: 'bad json' }; }
    if (!payload.key) return { statusCode: 400, body: 'missing key' };
    await store.set(payload.key, payload.value);
    return { statusCode: 200, body: 'ok' };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
