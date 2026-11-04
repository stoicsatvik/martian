import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestGet } from '../functions/api/tiles/[[path]].js';

test('rejects unauthorized layers and malformed tile paths', async () => {
  const fake = (path) => onRequestGet({ params: {path}, request: new Request('https://localhost/api/tiles/') });
  assert.equal((await fake(['evil','0','0','0'])).status,404);
  assert.equal((await fake(['mola','7','0','9999999'])).status,400);
  assert.equal((await fake(['mola','7','0','-2'])).status,400);
  assert.equal((await fake(['mola','7','abc','2'])).status,400);
  assert.equal((await fake(['mola','7','0'])).status,400);
  assert.equal((await fake(['mola','20','0','0'])).status,400);
});

test('NASA tile URL uses the documented fixed WMTS path', async () => {
  const actualFetch = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async url => {seen.push(url);return new Response(new Uint8Array([0x89,0x50,0x4e,0x47]),{status:200,headers:{'content-type':'image/png'}})};
  try {
    const result=await onRequestGet({params:{path:['mola','0','0','0']},request:new Request('https://martian.pages.dev/api/tiles/mola/0/0/0')});
    assert.equal(result.status,200);
    assert.equal(result.headers.get('X-Data-Source'),'NASA-Mars-Trek-WMTS');
    assert.equal(seen.length,1);
    assert.equal(seen[0],'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/0/0/0.jpg');
  } finally {globalThis.fetch=actualFetch}
});
