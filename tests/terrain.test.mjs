import test from 'node:test';
import assert from 'node:assert/strict';
import {eqcMeters,hornSlopeDegrees,verifyImage,pixelIndex,sampleTerrain} from '../public/assets/terrain-core.js';
const D=Math.PI/180;
const origin=[3396190*77*D,3396190*18.8*D,0];
function mock(values=null){return {getWidth:()=>1596,getHeight:()=>1512,getOrigin:()=>origin,getResolution:()=>[20,-20],getGDALNoData:()=>-32767,readRasters:async ({window})=>{const [x0,y0,x1,y1]=window;return Float32Array.from({length:(x1-x0)*(y1-y0)},(_,i)=>values?.[i]??-2400)}};}
test('equirectangular longitude and latitude use documented Mars radius',()=>{const p=eqcMeters(0,90);assert.ok(Math.abs(p.x-3396190*Math.PI/2)<1e-5);assert.equal(p.y,0);assert.throws(()=>eqcMeters(99,0));});
test('Horn slope of a plane uses metre spacing, independent of constant height',()=>{const a=0.05,b=0.12,z=Array.from({length:9},(_,i)=>-2400+(i%3-1)*20*a+(Math.floor(i/3)-1)*20*b);assert.ok(Math.abs(hornSlopeDegrees(z,20,20)-Math.atan(Math.hypot(a,b))/D)<1e-10);});
test('GeoTIFF check rejects inconsistent product sizes or transforms',()=>{assert.equal(verifyImage(mock()).width,1596);assert.throws(()=>verifyImage({...mock(),getWidth:()=>50}));assert.throws(()=>verifyImage({...mock(),getResolution:()=>[15,-15]}));});
test('real point extraction uses 3x3 neighbors and respects NoData',async()=>{let z=Array.from({length:9},()=>-2400);let ans=await sampleTerrain(mock(z),18.4447,77.4509);assert.equal(ans.status,'measured-grid');assert.equal(ans.elevation,-2400);assert.equal(ans.slopeDegrees,0);assert.equal((await sampleTerrain(mock(),5,60)).status,'outside');let bad=Array.from({length:9},()=>-2400);bad[2]=-32767;let result=await sampleTerrain(mock(bad),18.4447,77.4509);assert.equal(result.slopeStatus,'unavailable-neighbor-data');});
