export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  if (!key) return new Response('missing key', { status: 400 });
  const val = await env.GIFTBOXES.get(key);
  if (val == null) return new Response('', { status: 404 });
  return new Response(val, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return new Response('bad json', { status: 400 });
  }
  if (!payload || !payload.key) return new Response('missing key', { status: 400 });
  const value = typeof payload.value === 'string' ? payload.value : JSON.stringify(payload.value);
  await env.GIFTBOXES.put(payload.key, value);
  return new Response('ok', { status: 200 });
}
