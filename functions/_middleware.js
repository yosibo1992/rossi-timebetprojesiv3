export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Sadece ana sayfa ve index.html için çalışsın
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return context.next();
  }

  // Tüm Google botları kontrolü
  const isGooglebot = /googlebot|googlebot-image|googlebot-news|googlebot-video|googlebot-mobile|mediapartners-google|adsbot-google|adsbot-google-mobile|apis-google|google-inspectiontool|googleweblight|storebot-google|google-extended|google-safety|googleother|googleother-image|google-cloudvertexbot|google-site-verification|feedfetcher-google|google favicon|googlesites/i.test(userAgent);

  if (isGooglebot) {
    console.log('Googlebot detected – serving index.html');
    return context.next(); // index.html döner
  }

  // Ülke tespiti (Cloudflare otomatik header)
  const country = (request.headers.get('cf-ipcountry') || '').toUpperCase();

  if (country === 'TR') {
    console.log('TR user – redirecting to /tr.html');
    return Response.redirect(`${url.origin}/tr.html`, 302);
  } else {
    console.log('Non-TR user – redirecting to /index2.html');
    return Response.redirect(`${url.origin}/index2.html`, 302);
  }
}
