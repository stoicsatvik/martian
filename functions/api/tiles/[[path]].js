/**
 * Cloudflare Pages Function: read-only allowlisted NASA Mars Trek WMTS image proxy.
 * GET /api/tiles/{layer}/{z}/{row}/{col}
 * This proxy caches public NASA orbital *image tiles*, not numerical terrain data.
 * API IDs documented by NASA: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars
 */
const LAYERS = Object.freeze({
  mola: { id: 'Mars_MGS_MOLA_ClrShade_merge_global_463m', extensions: ['jpg', 'png'] },
  viking: { id: 'Mars_Viking_MDIM21_ClrMosaic_global_232m', extensions: ['jpg', 'png'] },
  ctx: { id: 'JEZ_ctx_B_soc_008_orthoMosaic_6m_Eqc_latTs0_lon0', extensions: ['png', 'jpg'] },
  hirise: { id: 'JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd', extensions: ['png', 'jpg'] },
});

function response(message, status = 400) {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

export async function onRequestGet({ params, request }) {
  const parts = Array.isArray(params.path) ? params.path : String(params.path || '').split('/');
  if (parts.length !== 4) return response('Expected /api/tiles/{layer}/{z}/{row}/{col}');
  const [layer, zRaw, rowRaw, colRaw] = parts;
  const source = LAYERS[layer];
  if (!source) return response('Unknown NASA tile layer', 404);
  if (![zRaw, rowRaw, colRaw].every(v => /^\d{1,7}$/.test(v))) return response('Invalid WMTS tile coordinates');
  const [z, row, col] = [zRaw, rowRaw, colRaw].map(Number);
  if (z > 18 || row >= 2 ** z || col >= 2 ** (z + 1)) return response('Tile outside Mars WMTS grid');

  // A fixed allowlist prevents SSRF, open redirects, and arbitrary upstream requests.
  const base = `https://trek.nasa.gov/tiles/Mars/EQ/${source.id}/1.0.0/default/default028mm/${z}/${row}/${col}`;
  try {
    for (const ext of source.extensions) {
      const upstreamUrl = `${base}.${ext}`;
      const upstream = await fetch(upstreamUrl, {
        headers: { Accept: 'image/png,image/jpeg,image/*' },
        redirect: 'follow',
        cf: { cacheEverything: true, cacheTtl: 60 * 60 * 24 },
      });
      if (!upstream.ok) continue;
      const ct = upstream.headers.get('content-type') || '';
      if (!ct.toLowerCase().startsWith('image/')) continue;
      const content = await upstream.arrayBuffer();
      if (content.byteLength > 2_500_000) return response('Tile unusually large', 502);
      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': ct,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          'X-Content-Type-Options': 'nosniff',
          'X-Data-Source': 'NASA-Mars-Trek-WMTS',
          'X-Proxy-Upstream': 'trek.nasa.gov',
        },
      });
    }
    return response('NASA has no image tile at this coordinate, or the upstream service is unavailable', 404);
  } catch (error) {
    return response('NASA WMTS upstream request failed. Try NASA Trek directly.', 502);
  }
}
