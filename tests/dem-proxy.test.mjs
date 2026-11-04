import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequestGet as getDEM} from '../functions/api/dem/ctx.js';
import worker from '../src/worker.js';
const fakeTiff = () => {const d=new Uint8Array(4096);d.set([0x49,0x49,42,0],0);return d;};
test('USGS numerical proxy accepts only authentic-looking TIFF bytes from fixed published endpoints',async()=>{
 const previous=globalThis.fetch;const requests=[];
 globalThis.fetch=async url=>{requests.push(String(url));return new Response(fakeTiff(),{status:200,headers:{'content-type':'image/tiff','content-length':'4096'}})};
 try{const res=await getDEM();assert.equal(res.status,200);assert.equal(res.headers.get('X-Data-Source'),'USGS-Mars2020-CTX-DTM');assert.equal(requests.length,1);assert.ok(requests[0].startsWith('https://planetarymaps.usgs.gov/mosaic/mars2020_trn/CTX/JEZ_ctx_B_soc_008_'));}finally{globalThis.fetch=previous;}
});
test('USGS proxy rejects a web error page rather than decoding bogus science',async()=>{
 const previous=globalThis.fetch;globalThis.fetch=async()=>new Response('Bad gateway from remote host',{status:200});
 try{assert.equal((await getDEM()).status,502)}finally{globalThis.fetch=previous;}
});
test('Worker serves static assets and securely routes only known APIs',async()=>{
 const env={ASSETS:{fetch:async()=>new Response('<html>ok</html>',{status:200})}};
 assert.equal((await worker.fetch(new Request('https://martian.example/'),env)).status,200);
 assert.equal((await worker.fetch(new Request('https://martian.example/api/undefined'),env)).status,404);
 assert.equal((await worker.fetch(new Request('https://martian.example/api/dem/ctx',{method:'POST'}),env)).status,405);
 assert.equal((await worker.fetch(new Request('https://martian.example/api/tiles/mola/7/0/99999'),env)).status,400);
});
