export async function onRequest(context) {
  const url = new URL(context.request.url);

  // SPAルーティング対応
  if (url.pathname.startsWith('/slee/')) {
    const response = await context.next();
    return response;
  }

  return context.next();
}