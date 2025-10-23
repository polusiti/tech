export async function onRequest(context) {
  const url = new URL(context.request.url);

  // SPAルーティング対応 - /slee/ 以下のパスを処理
  if (url.pathname.startsWith('/slee/')) {
    // /slee/ へのアクセスを /slee/index.html にリダイレクト
    if (url.pathname === '/slee/') {
      const newUrl = new URL('/slee/index.html', url.origin);
      return Response.redirect(newUrl, 302);
    }

    // その他のパスはそのまま処理
    const response = await context.next();
    return response;
  }

  return context.next();
}