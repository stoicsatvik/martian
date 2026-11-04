/** MARTIAN · evidence-first NASA/USGS orbital map and numeric terrain inspector. */
import { SOURCE as DEM_SOURCE, verifyImage, sampleTerrain } from './terrain-core.js';
const ICONS={
'globe-2':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a16 16 0 0 1 0 18M12 3a16 16 0 0 0 0 18"/>',
'globe':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a16 16 0 0 1 0 18M12 3a16 16 0 0 0 0 18"/>',
'ruler':'<path d="m21.3 8.7-6-6a1 1 0 0 0-1.4 0L2.7 13.9a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0L21.3 10.1a1 1 0 0 0 0-1.4Z"/><path d="m7.5 10.5 2 2m1-5 2 2m1-5 2 2m-9 9 2 2m1-5 2 2"/>',
'map-pin':'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
'database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/>',
'circle-help':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
'help-circle':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
'layers-3':'<path d="m12 3-9 5 9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
'mountain':'<path d="m3 20 7-13 4 7 3-4 4 10H3Z"/><path d="m8 11 2 2 2-2"/>',
'orbit':'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-45 12 12)"/>',
'scan-line':'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
'focus':'<circle cx="12" cy="12" r="3"/><path d="M3 8V5a2 2 0 0 1 2-2h3m8 0h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/>',
'compass':'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
'move-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
'rotate-ccw':'<path d="M3 11a9 9 0 1 1 3 7M3 4v7h7"/>',
'shield-check':'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
'satellite':'<path d="m8 16 3-3m-2 7-6-6 3-3 6 6-3 3ZM16 8l3-3 3 3-3 3-3-3Zm-7 7a5 5 0 0 1 6-6m-6 9a8 8 0 0 1 9-9"/>',
'plus':'<path d="M12 5v14M5 12h14"/>',
'minus':'<path d="M5 12h14"/>',
'crosshair':'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
'badge-info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
'activity':'<path d="M2 12h4l3-7 5 14 3-7h5"/>',
'copy':'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
'alert-triangle':'<path d="m10.3 3.6-8.1 14A2 2 0 0 0 3.9 21h16.2a2 2 0 0 0 1.7-3.4l-8.1-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
'chevron-up':'<path d="m6 15 6-6 6 6"/>',
'external-link':'<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
'x':'<path d="M6 6l12 12M18 6 6 18"/>',
};
function installIcons(root=document){root.querySelectorAll('i[data-icon]').forEach(e=>{const inner=ICONS[e.dataset.icon]||ICONS['badge-info'];e.innerHTML=`<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;});}
installIcons();
const el=id=>document.getElementById(id);
const RAD=Math.PI/180, R_MARS_KM=3389.5,JEZERO={lat:18.4447,lon:77.4509};
const LAYERS={
 mola:{name:'MOLA colour hillshade',id:'Mars_MGS_MOLA_ClrShade_merge_global_463m',ext:'jpg',native:7,attribution:'NASA/JPL Mars Trek · MGS MOLA',url:'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars'},
 viking:{name:'Viking global colour mosaic',id:'Mars_Viking_MDIM21_ClrMosaic_global_232m',ext:'jpg',native:8,attribution:'NASA/JPL Mars Trek · Viking',url:'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars'},
 ctx:{name:'CTX controlled Jezero mosaic',id:'JEZ_ctx_B_soc_008_orthoMosaic_6m_Eqc_latTs0_lon0',ext:'png',native:13,bounds:[77.1604655,18.2110274,77.6991776,18.7211945],attribution:'NASA/JPL Mars Trek · MRO CTX controlled',url:'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars'},
 hirise:{name:'HiRISE controlled Jezero mosaic',id:'JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd',ext:'png',native:17,bounds:[77.2229331,18.3067994,77.583964,18.669315],attribution:'NASA/JPL Mars Trek · MRO HiRISE',url:'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars'}
};
const PLACES=[
 {name:'Perseverance landing',sub:'Jezero Crater · Mars 2020',lat:18.4447,lon:77.4509,zoom:12,short:'Jezero'},
 {name:'Curiosity landing',sub:'Gale Crater · MSL',lat:-4.5895,lon:137.4417,zoom:10,short:'Gale'},
 {name:'Olympus Mons',sub:'Volcanic summit · approximate center',lat:18.65,lon:-133.80,zoom:7,short:'Olympus'},
 {name:'Viking 1 landing',sub:'Chryse Planitia · approximate',lat:22.480,lon:-48.000,zoom:9,short:'Viking 1'},
];
const state={center:{...JEZERO},zoom:9,base:'viking',ctx:false,hirise:false,ctxOpacity:76,selected:{...JEZERO},mode:'inspect',measure:[],tiles:new Map(),loaded:0,failed:0,proxyFailures:0,currentTab:'overview',currentPanel:'explore',logs:[],worldWidth:0,mouse:null,drag:null,pointers:new Map(),pinch:null};
const map=el('mapCanvas'),tileWorld=el('tileWorld'),canvas=el('overlayCanvas'),poiOverlay=el('poiOverlay');
const terrain={image:null,source:null,loading:false,nonce:0};
const localHost=/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(location.hostname);
const preferProxy=!localHost && location.protocol==='https:';
function log(message){let s=`${new Date().toLocaleTimeString('en-GB',{hour12:false})} ${message}`;state.logs.push(s);if(state.logs.length>16)state.logs.shift();el('connectionLogs').textContent=state.logs.join('\n');}
function notify(msg){const t=el('mapToast');t.textContent=msg;t.hidden=false;clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.hidden=true,3700);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function normalizeLon(lon){while(lon>180)lon-=360;while(lon< -180)lon+=360;return lon;}
function world(z){return {w:512*2**z,h:256*2**z}}
function project(lat,lon,z=state.zoom){let d=world(z);return {x:(lon+180)/360*d.w,y:(90-lat)/180*d.h}}
function unproject(x,y,z=state.zoom){let d=world(z);return {lon:normalizeLon(x/d.w*360-180),lat:clamp(90-y/d.h*180,-89.999,89.999)}}
function screen(lat,lon){let center=project(state.center.lat,state.center.lon);let p=project(lat,lon);return {x:p.x-center.x+map.clientWidth/2,y:p.y-center.y+map.clientHeight/2}}
function positionToGeo(px,py){let center=project(state.center.lat,state.center.lon);return unproject(center.x+px-map.clientWidth/2,center.y+py-map.clientHeight/2)}
function moveMap(dx,dy){let p=project(state.center.lat,state.center.lon);state.center=unproject(p.x-dx,p.y-dy);draw();}
function jump(lat,lon,z){state.center={lat,lon:normalizeLon(lon)};if(z!==undefined)state.zoom=clamp(z,2,17);draw();}
function zoomAt(direction,px=map.clientWidth/2,py=map.clientHeight/2){let next=clamp(state.zoom+direction,2,17);if(next===state.zoom)return;let at=positionToGeo(px,py);state.zoom=next;let pt=project(at.lat,at.lon,next);state.center=unproject(pt.x-(px-map.clientWidth/2),pt.y-(py-map.clientHeight/2),next);draw();}
function getTileUrl(layer,z,row,col,proxy){const def=LAYERS[layer];return proxy?`/api/tiles/${layer}/${z}/${row}/${col}`:`https://trek.nasa.gov/tiles/Mars/EQ/${def.id}/1.0.0/default/default028mm/${z}/${row}/${col}.${def.ext}`;}
function layerCoverage(def,col,row,z){if(!def.bounds)return true;let nx=2**(z+1),ny=2**z;let left=-180+360*col/nx,right=-180+360*(col+1)/nx,top=90-180*row/ny,bottom=90-180*(row+1)/ny;return left<def.bounds[2]&&right>def.bounds[0]&&bottom<def.bounds[3]&&top>def.bounds[1]}
function activeLayers(){let items=[state.base];if(state.ctx&&state.zoom>=8&&state.center.lat>15&&state.center.lat<22&&state.center.lon>73&&state.center.lon<82)items.push('ctx');if(state.hirise&&state.zoom>=8&&state.center.lat>15&&state.center.lat<22&&state.center.lon>73&&state.center.lon<82)items.push('hirise');return items}
function makeTile(key,layer,z,row,col,x,y,tileSize){let img=document.createElement('img');img.className='map-tile tile-'+(layer==='mola'||layer==='viking'?'base':layer==='ctx'?'detail':'hirise');img.alt='';img.decoding='async';img.draggable=false;img.style.cssText=`left:${x}px;top:${y}px;width:${tileSize+0.4}px;height:${tileSize+0.4}px;z-index:${layer==='mola'||layer==='viking'?1:layer==='ctx'?2:3};`;
 let fallbackTried=false;const firstSrc=getTileUrl(layer,z,row,col,preferProxy);
 img.addEventListener('load',()=>{state.loaded++;if(state.loaded===1){log('First NASA image tile loaded.');}setStatus();});
 img.addEventListener('error',()=>{if(preferProxy&&!fallbackTried){fallbackTried=true;state.proxyFailures++;img.src=getTileUrl(layer,z,row,col,false);return;}state.failed++;img.style.display='none';if(state.failed<5)log(`Tile unavailable: ${layer} / ${z}/${row}/${col}`);setStatus();});
 img.style.opacity=layer==='ctx'?String(state.ctxOpacity/100):'1';img.src=firstSrc;tileWorld.appendChild(img);state.tiles.set(key,{img,layer,z,row,col});}
function renderTiles(){let need=new Set(),mapW=map.clientWidth,mapH=map.clientHeight;
 if(!mapW||!mapH)return;
 const center=project(state.center.lat,state.center.lon,state.zoom);
 for(const layer of activeLayers()){
   const def=LAYERS[layer],z=Math.min(state.zoom,def.native),factor=2**(state.zoom-z),tileSize=256*factor,nx=2**(z+1),ny=2**z;
   const xMin=Math.floor((center.x-mapW/2)/tileSize)-1,xMax=Math.ceil((center.x+mapW/2)/tileSize)+1;
   const yMin=Math.floor((center.y-mapH/2)/tileSize)-1,yMax=Math.ceil((center.y+mapH/2)/tileSize)+1;
   for(let row=yMin;row<=yMax;row++){if(row<0||row>=ny)continue;for(let col=xMin;col<=xMax;col++){if(col<0||col>=nx)continue;if(!layerCoverage(def,col,row,z))continue;
       const key=`${layer}/${z}/${row}/${col}`;need.add(key);let x=col*tileSize-center.x+mapW/2,y=row*tileSize-center.y+mapH/2;
       const entry=state.tiles.get(key);if(entry){entry.img.style.left=`${x}px`;entry.img.style.top=`${y}px`;entry.img.style.width=`${tileSize+.4}px`;entry.img.style.height=`${tileSize+.4}px`;}else makeTile(key,layer,z,row,col,x,y,tileSize);
   }}
 }
 for(const [key,val] of state.tiles){if(!need.has(key)){val.img.remove();state.tiles.delete(key);}}
}
function formatLat(lat,digits=4){return `${Math.abs(lat).toFixed(digits)}° ${lat>=0?'N':'S'}`}
function formatLon(lon,digits=4){return `${Math.abs(lon).toFixed(digits)}° ${lon>=0?'E':'W'}`}
function cleanPoint(p){return `${p.lat.toFixed(5)}, ${p.lon.toFixed(5)}`}
function greatCircleKm(a,b){const dlat=(b.lat-a.lat)*RAD,dlon=(b.lon-a.lon)*RAD;
 const v=Math.sin(dlat/2)**2+Math.cos(a.lat*RAD)*Math.cos(b.lat*RAD)*Math.sin(dlon/2)**2;
 return 2*R_MARS_KM*Math.asin(Math.min(1,Math.sqrt(v)));}
function interpolateGreatCircle(a,b,t){const la1=a.lat*RAD,lo1=a.lon*RAD,la2=b.lat*RAD,lo2=b.lon*RAD;
 const A=[Math.cos(la1)*Math.cos(lo1),Math.cos(la1)*Math.sin(lo1),Math.sin(la1)],B=[Math.cos(la2)*Math.cos(lo2),Math.cos(la2)*Math.sin(lo2),Math.sin(la2)];
 const dot=clamp(A.reduce((s,v,i)=>s+v*B[i],0),-1,1),omega=Math.acos(dot);if(omega<1e-7)return a;
 const m=Math.sin((1-t)*omega)/Math.sin(omega),n=Math.sin(t*omega)/Math.sin(omega),v=A.map((x,i)=>m*x+n*B[i]);return {lat:Math.atan2(v[2],Math.hypot(v[0],v[1]))/RAD,lon:Math.atan2(v[1],v[0])/RAD};}
function renderOverlay(){const w=map.clientWidth,h=map.clientHeight,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
 // Equirectangular cartographic graticule. These are actual lat/lon coordinates, not terrain heights.
 const gridSpacing=state.zoom<=5?30:state.zoom<=7?10:state.zoom<=9?1:state.zoom<=11?.25:state.zoom<=13?.05:.01;
 ctx.strokeStyle='#f4f1de17';ctx.lineWidth=.65;ctx.setLineDash([4,7]);
 const northwest=positionToGeo(0,0),southeast=positionToGeo(w,h);
 for(let lat=Math.floor(southeast.lat/gridSpacing)*gridSpacing;lat<=northwest.lat;lat+=gridSpacing){const p=screen(lat,state.center.lon);if(p.y<0||p.y>h)continue;ctx.beginPath();ctx.moveTo(0,p.y);ctx.lineTo(w,p.y);ctx.stroke()}
 const lonWest=state.center.lon-w/world(state.zoom).w*180,lonEast=state.center.lon+w/world(state.zoom).w*180;
 for(let lon=Math.floor(lonWest/gridSpacing)*gridSpacing;lon<=lonEast;lon+=gridSpacing){const p=screen(state.center.lat,lon);if(p.x<0||p.x>w)continue;ctx.beginPath();ctx.moveTo(p.x,0);ctx.lineTo(p.x,h);ctx.stroke()}
 ctx.setLineDash([]);
 // Declared bounding rectangles are source coverage indicators, NOT pixel-validity masks.
 for(const key of ['ctx','hirise']) {if((key==='ctx'&&!state.ctx)||(key==='hirise'&&!state.hirise))continue;
   const b=LAYERS[key].bounds,topLeft=screen(b[3],b[0]),bottomRight=screen(b[1],b[2]);
   const x=topLeft.x,y=topLeft.y,width=bottomRight.x-x,height=bottomRight.y-y;
   if(width>0&&height>0&&x<w&&x+width>0&&y<h&&y+height>0){
     ctx.save();ctx.strokeStyle=key==='ctx'?'#ffe3bcbb':'#b3e1c9cc';ctx.lineWidth=1.4;ctx.setLineDash([8,5]);ctx.strokeRect(x,y,width,height);
     if(width>100&&y>4&&y<h-20){ctx.fillStyle='#151d19dd';ctx.fillRect(x+6,y+6,Math.min(width-12,165),21);ctx.fillStyle='#ffdebd';ctx.font='600 10px DM Sans';ctx.fillText(key.toUpperCase()+' · DATA COVERAGE',x+13,y+20)}ctx.restore();
   }
 }
 if(state.measure.length===2){ctx.strokeStyle='#d1edb8';ctx.lineWidth=3;ctx.setLineDash([8,8]);ctx.beginPath();for(let i=0;i<=80;i++){let pos=screen(...pointToScreenArgs(interpolateGreatCircle(state.measure[0],state.measure[1],i/80)));if(i===0)ctx.moveTo(pos.x,pos.y);else ctx.lineTo(pos.x,pos.y)}ctx.stroke();ctx.setLineDash([])}
 state.measure.forEach((p,i)=>{let s=screen(p.lat,p.lon);ctx.beginPath();ctx.arc(s.x,s.y,8,0,Math.PI*2);ctx.fillStyle=i===0?'#f59a77':'#b7e2ac';ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#1d261f';ctx.stroke();ctx.fillStyle='#f9f1e5';ctx.font='bold 11px DM Sans';ctx.fillText(i===0?'A':'B',s.x+12,s.y+4)});
 if(state.selected){let s=screen(state.selected.lat,state.selected.lon);ctx.strokeStyle='#e9d7bb';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(s.x,s.y,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(s.x-21,s.y);ctx.lineTo(s.x-14,s.y);ctx.moveTo(s.x+14,s.y);ctx.lineTo(s.x+21,s.y);ctx.moveTo(s.x,s.y-21);ctx.lineTo(s.x,s.y-14);ctx.moveTo(s.x,s.y+14);ctx.lineTo(s.x,s.y+21);ctx.stroke()}
}
function pointToScreenArgs(point){return [point.lat,point.lon]}
function renderPOI(){poiOverlay.replaceChildren();for(const p of PLACES){let s=screen(p.lat,p.lon);if(s.x<26||s.y<24||s.x>map.clientWidth-26||s.y>map.clientHeight-24)continue;let btn=document.createElement('button');btn.className='poi-chip'+(Math.abs(state.selected.lat-p.lat)<.0001&&Math.abs(state.selected.lon-p.lon)<.0001?' selected':'');btn.style.left=`${s.x}px`;btn.style.top=`${s.y}px`;btn.innerHTML=`<span class="poi-name">${p.short.toUpperCase()}</span><span class="poi-point"></span>`;btn.title=p.name;btn.addEventListener('pointerdown',e=>e.stopPropagation());btn.addEventListener('click',e=>{e.stopPropagation();selectAt(p);});poiOverlay.appendChild(btn)}}
function updateScale(){let kmPx=(360/world(state.zoom).w)*RAD*R_MARS_KM*Math.max(.01,Math.cos(state.center.lat*RAD));let target=95*kmPx;if(target<=0)return;let power=10**Math.floor(Math.log10(target));let m=[1,2,5,10].map(a=>a*power).filter(x=>x<=target).pop()||power;el('scaleCaption').textContent=m<1?`${Math.round(m*1000)} m`:`${m>=10?Math.round(m):m.toFixed(1)} km`;el('scaleCaption').title='Scale approximated at map center latitude; map does not show vertical distances';document.querySelector('.scale-track').style.width=Math.max(15,m/kmPx)+'px';}
function updateView(){el('zoomText').textContent=String(state.zoom).padStart(2,'0');el('sectorCoords').textContent=`${formatLat(state.center.lat,2)} / ${formatLon(state.center.lon,2)}`;el('sectorName').textContent=state.zoom>=8&&Math.abs(state.center.lat-JEZERO.lat)<2&&Math.abs(state.center.lon-JEZERO.lon)<2?'JEZERO CRATER':'MARS SURFACE';updateScale();}
let raf=0;function draw(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;renderTiles();renderOverlay();renderPOI();updateView();});}
function selectAt(p){state.selected={lat:p.lat,lon:p.lon};el('selectedCoordinates').innerHTML=`${formatLat(p.lat)} <span>${formatLon(p.lon)}</span>`;draw();if(terrain.image)updateTerrainAt(p);if(state.mode==='measure')addMeasurePoint(p);}
function addMeasurePoint(p){if(state.measure.length>=2)state.measure=[];state.measure.push({lat:p.lat,lon:p.lon});let a=state.measure[0],b=state.measure[1];el('pointA').textContent=a?cleanPoint(a):'Select start point';el('pointB').textContent=b?cleanPoint(b):'Select destination';let km=b?greatCircleKm(a,b):null;el('distanceResult').textContent=km===null?'—':km<1?`${Math.round(km*1000).toLocaleString('en-US')} m`:`${km.toFixed(2)} km`;el('measureToggle').querySelector('span').textContent=b?'MEASURE AGAIN':a?'SELECT DESTINATION':'START MEASUREMENT';el('measureRight').querySelector('span').textContent=b?'MEASURE AGAIN':a?'SELECT DESTINATION':'SELECT TWO POINTS';if(b){notify('Geodesic distance calculated. This is not a safe or walkable route.');state.mode='inspect';map.classList.remove('is-measuring')}draw();}
function startMeasure(){state.measure=[];state.mode='measure';map.classList.add('is-measuring');changeTab('measure');el('pointA').textContent='Select start point';el('pointB').textContent='Select destination';el('distanceResult').textContent='—';el('measureToggle').querySelector('span').textContent='SELECT START POINT';el('measureRight').querySelector('span').textContent='SELECT START POINT';notify('Click a start point, then a destination.');draw();}
function clearMeasure(){state.measure=[];state.mode='inspect';map.classList.remove('is-measuring');el('pointA').textContent='Select start point';el('pointB').textContent='Select destination';el('distanceResult').textContent='—';el('measureToggle').querySelector('span').textContent='START MEASUREMENT';el('measureRight').querySelector('span').textContent='SELECT TWO POINTS';draw();}
function setStatus(){let loaded=state.loaded,failed=state.failed;if(loaded){el('connectionDot').className='status-indicator connected';el('connectionLabel').textContent='Orbital tiles received';el('connectionDetail').textContent=`${loaded} loaded · ${failed} unavailable · historical imagery`;el('emptyState').hidden=true;}else if(failed>=3){el('connectionDot').className='status-indicator error';el('connectionLabel').textContent='NASA imagery unavailable';el('connectionDetail').textContent='Inspect connection logs or open Mars Trek';el('emptyState').hidden=false;}else{el('connectionDot').className='status-indicator';el('connectionLabel').textContent='Contacting NASA Mars Trek';el('connectionDetail').textContent='Requesting archived orbital tiles';}}
function changeBase(name){if(name===state.base)return;state.base=name;state.loaded=0;state.failed=0;el('baseSourceShort').textContent=name==='mola'?'MGS / MOLA':'VIKING / VIS';document.querySelectorAll('.dataset-card').forEach(e=>e.classList.toggle('selected',e.dataset.base===name));el('mapSourceBadge').innerHTML='<span class="tiny-led"></span> NASA / '+name.toUpperCase();log('Global basemap changed to '+name);setStatus();draw();}
function changeTab(name){state.currentTab=name;document.querySelectorAll('.tab').forEach(e=>{let active=e.dataset.tab===name;e.classList.toggle('active',active);e.setAttribute('aria-selected',String(active))});for(const x of ['overview','measure','sources'])el('tab'+x[0].toUpperCase()+x.slice(1)).classList.toggle('hidden',x!==name);if(window.innerWidth<=1080)document.querySelector('.right-panel').classList.add('open');}
function changePanel(name){state.currentPanel=name;document.querySelectorAll('.rail-item[data-panel]').forEach(e=>e.classList.toggle('selected',e.dataset.panel===name));if(name==='measure'){startMeasure();document.querySelector('.left-panel').classList.remove('open');return;}if(name==='places'){el('panelPlaces').scrollIntoView({block:'start',behavior:'smooth'});}if(name==='sources'){changeTab('sources');document.querySelector('.left-panel').classList.remove('open');return;}if(name==='explore'){el('panelExplore').scrollIntoView({block:'start',behavior:'smooth'});}if(window.innerWidth<=760)document.querySelector('.left-panel').classList.add('open');}
function populatePlaces(filter=''){let box=el('placeList');box.replaceChildren();let matches=PLACES.filter(p=>(p.name+' '+p.sub).toLowerCase().includes(filter.toLowerCase()));for(const p of matches){let b=document.createElement('button');b.className='place-item';b.innerHTML='<i data-icon="map-pin"></i><span class="place-info"><strong></strong><small></small></span><i class="go-arrow" data-icon="arrow-up-right"></i>';b.querySelector('strong').textContent=p.name;b.querySelector('small').textContent=p.sub;b.onclick=()=>{jump(p.lat,p.lon,p.zoom);selectAt(p);if(window.innerWidth<=760)el('leftPanel').classList.remove('open');};box.appendChild(b)}if(!matches.length){let n=document.createElement('p');n.className='source-fine';n.textContent='No matching sites in the small verified-location catalog.';box.appendChild(n)}installIcons(box);}
function populateSources(){let sources=[['Viking mosaic','Global historic surface imagery · Viking',LAYERS.viking.id],['MOLA colour relief','Global terrain visualization · MGS',LAYERS.mola.id],['CTX controlled Jezero','Mapped local imagery · MRO',LAYERS.ctx.id],['HiRISE controlled Jezero','High-detail local imagery · MRO',LAYERS.hirise.id],['USGS CTX numerical DTM','20 m numerical elevation; downloaded on demand',DEM_SOURCE.id]];
 for(const [name,desc,id] of sources){let div=document.createElement('div');div.className='ledger-item';div.innerHTML=`<div class="ledger-title"><span></span><i data-icon="shield-check"></i></div><p></p><code></code><a href="https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars" target="_blank" rel="noopener">NASA WMTS SERVICE <i data-icon="arrow-up-right"></i></a>`;div.querySelector('.ledger-title span').textContent=name;div.querySelector('p').textContent=desc;div.querySelector('code').textContent=id;if(id===DEM_SOURCE.id){const link=div.querySelector('a');link.href=DEM_SOURCE.reference;link.firstChild.textContent='USGS SOURCE DATA ';}el('sourceLedger').appendChild(div)}installIcons(el('sourceLedger'));}
function setDemStatus(message,error=false){let n=el('demStatus');n.textContent=message;n.classList.toggle('error',error)}
let decoderPromise=null;
function ensureGeoTIFF(){
 if(window.GeoTIFF?.fromArrayBuffer)return Promise.resolve(window.GeoTIFF);
 if(decoderPromise)return decoderPromise;
 decoderPromise=new Promise((resolve,reject)=>{
   const tag=document.createElement('script');tag.src='https://cdn.jsdelivr.net/npm/geotiff@2.1.0/dist-browser/geotiff.js';tag.async=true;
   const timeout=setTimeout(()=>{tag.remove();reject(new Error('GeoTIFF decoder CDN timed out'))},18000);
   tag.onload=()=>{clearTimeout(timeout);window.GeoTIFF?.fromArrayBuffer?resolve(window.GeoTIFF):reject(new Error('GeoTIFF decoder unavailable'))};
   tag.onerror=()=>{clearTimeout(timeout);reject(new Error('GeoTIFF decoder failed to load'))};document.head.appendChild(tag);
 }).catch(e=>{decoderPromise=null;throw e});
 return decoderPromise;
}
async function updateTerrainAt(point){
 const id=++terrain.nonce;if(!terrain.image)return;
 el('elevationValue').textContent='…';el('slopeValue').textContent='…';el('elevationNote').textContent='Reading CTX raster';el('slopeNote').textContent='3×3 terrain gradient';
 try{
  const sample=await sampleTerrain(terrain.image,point.lat,point.lon);
  if(id!==terrain.nonce)return;
  if(sample.status==='outside'){el('elevationValue').textContent='—';el('elevationNote').textContent='Outside Jezero CTX raster';el('slopeValue').textContent='—';el('slopeNote').textContent='No local DEM coverage';return}
  if(sample.status==='nodata'){el('elevationValue').textContent='—';el('elevationNote').textContent='Missing source elevation';el('slopeValue').textContent='—';el('slopeNote').textContent='No valid source data';return}
  el('elevationValue').textContent=`${Math.round(sample.elevation).toLocaleString('en-US')} m`;
  el('elevationNote').textContent='USGS CTX DTM · reference datum';
  el('slopeValue').textContent=sample.slopeDegrees===undefined?'—':`${sample.slopeDegrees.toFixed(1)}°`;
  el('slopeNote').textContent=sample.slopeDegrees===undefined?'Neighbors missing':'Derived · 3×3 Horn slope';
 }catch(e){if(id!==terrain.nonce)return;el('elevationValue').textContent='—';el('slopeValue').textContent='—';el('elevationNote').textContent='Unable to read raster';el('slopeNote').textContent=String(e.message).slice(0,65);log('DEM sample failed: '+String(e.message))}
}
async function installDEM(buffer,source){
 const GeoTIFF=await ensureGeoTIFF();
 const tiff=await GeoTIFF.fromArrayBuffer(buffer);
 const image=await tiff.getImage();
 const meta=verifyImage(image); // fail closed: never show synthetic or wrongly referenced data
 terrain.image=image;terrain.source=source;
 setDemStatus(`Loaded ${meta.width}×${meta.height} numerical cells · ${meta.pixelMeters.toFixed(1)} m grid · ${source}`);
 log('USGS Jezero CTX DTM geometry verified: '+meta.width+'x'+meta.height);
 el('loadDemBtn').querySelector('span').textContent='RELOAD USGS CTX DEM';
 await updateTerrainAt(state.selected);
 notify('Numerical Jezero terrain available. Click map to inspect actual DEM cells.');
}
async function loadDEM(file){
 if(terrain.loading)return;
 terrain.loading=true;el('loadDemBtn').disabled=true;setDemStatus('Downloading numerical terrain and checking source geometry…');
 try{
   let buffer,source;
   if(file){if(file.size>18_000_000)throw new Error('File too large for expected USGS 20 m CTX product');buffer=await file.arrayBuffer();source='Local file; provenance not independently authenticated';}
   else{
     const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
     try{const res=await fetch('/api/dem/ctx',{signal:controller.signal,cache:'force-cache'});if(!res.ok)throw new Error(`USGS data proxy returned HTTP ${res.status}`);buffer=await res.arrayBuffer();source='USGS archive via Cloudflare';}
     finally{clearTimeout(timer)}
   }
   await installDEM(buffer,source);
 }catch(e){setDemStatus(`DEM unavailable: ${e.message}. Download the official TIFF and use local upload.`,true);log('DEM import error: '+e.message);notify('DEM failed to load. Check source status or upload the official TIFF.');}
 finally{terrain.loading=false;el('loadDemBtn').disabled=false;}
}
function startInput(){populatePlaces();populateSources();
 document.querySelectorAll('.dataset-card').forEach(b=>b.addEventListener('click',()=>changeBase(b.dataset.base)));
 el('ctxToggle').onchange=e=>{state.ctx=e.target.checked;draw();notify(state.ctx?'CTX observation footprint shown; background imagery remains visible':'CTX high-resolution overlay hidden')};el('hiriseToggle').onchange=e=>{state.hirise=e.target.checked;if(state.hirise&&Math.abs(state.center.lat-JEZERO.lat)>2)jump(JEZERO.lat,JEZERO.lon,11);else if(state.hirise&&state.zoom<11)jump(state.center.lat,state.center.lon,11);draw();notify(state.hirise?'HiRISE Jezero requests enabled':'HiRISE overlay hidden')};
 el('ctxOpacityRange').oninput=e=>{state.ctxOpacity=Number(e.target.value);el('ctxOpacityText').textContent=state.ctxOpacity+'%';for(const tile of state.tiles.values())if(tile.layer==='ctx')tile.img.style.opacity=String(state.ctxOpacity/100);};
 el('focusJezeroDetail').onclick=()=>{jump(JEZERO.lat,JEZERO.lon,12);state.ctx=true;el('ctxToggle').checked=true;draw();notify('Jezero CTX imagery selected. Outline indicates published footprint.');};
 el('loadDemBtn').onclick=()=>loadDEM();el('demFile').onchange=e=>{const file=e.target.files?.[0];if(file)loadDEM(file);e.target.value='';};
 el('placeSearch').oninput=e=>populatePlaces(e.target.value);
 document.querySelectorAll('.rail-item[data-panel]').forEach(b=>b.onclick=()=>changePanel(b.dataset.panel));
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>changeTab(b.dataset.tab));
 el('measureToggle').onclick=startMeasure;el('measureRight').onclick=startMeasure;el('clearMeasure').onclick=clearMeasure;
 el('copyCoords').onclick=async()=>{try{await navigator.clipboard.writeText(cleanPoint(state.selected));notify('Coordinates copied')}catch{notify(cleanPoint(state.selected))}};
 el('resetSelection').onclick=()=>{selectAt(JEZERO);jump(JEZERO.lat,JEZERO.lon,9);clearMeasure()};
 el('zoomIn').onclick=()=>zoomAt(1);el('zoomOut').onclick=()=>zoomAt(-1);el('recenter').onclick=()=>jump(JEZERO.lat,JEZERO.lon,11);
 el('showLogs').onclick=()=>{el('connectionLogs').hidden=!el('connectionLogs').hidden;el('showLogs').querySelector('svg').style.transform=el('connectionLogs').hidden?'':'rotate(180deg)'};
 el('mobileMenu').onclick=()=>{el('leftPanel').classList.toggle('open');document.querySelector('.right-panel').classList.remove('open')};
 const help=()=>{el('helpModal').hidden=false};el('openHelp').onclick=help;el('railHelp').onclick=help;el('closeHelp').onclick=()=>el('helpModal').hidden=true;el('helpModal').onclick=e=>{if(e.target===el('helpModal'))el('helpModal').hidden=true};
 window.addEventListener('keydown',e=>{if(e.key==='Escape'){el('helpModal').hidden=true;el('leftPanel').classList.remove('open');document.querySelector('.right-panel').classList.remove('open');state.mode='inspect';map.classList.remove('is-measuring')}if(e.target.matches('input,textarea'))return;if(e.key==='/'){e.preventDefault();el('leftPanel').classList.add('open');el('placeSearch').focus()}if(e.key.toLowerCase()==='m')startMeasure();if(e.key.toLowerCase()==='g')jump(JEZERO.lat,JEZERO.lon,11);if(e.key==='+')zoomAt(1);if(e.key==='-')zoomAt(-1)});
}
function setupPointer(){let last={x:0,y:0};map.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType!=='touch')return;map.setPointerCapture(e.pointerId);state.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});state.drag={startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false};map.classList.add('grabbing');});
 map.addEventListener('pointermove',e=>{const bounds=map.getBoundingClientRect();const px=e.clientX-bounds.left,py=e.clientY-bounds.top;if(px>=0&&px<=map.clientWidth&&py>=0&&py<=map.clientHeight){const p=positionToGeo(px,py);el('cursorCoord').textContent=`LAT ${formatLat(p.lat)}   /   LON ${formatLon(p.lon)}`;}
 if(!state.pointers.has(e.pointerId))return;
 let prev=state.pointers.get(e.pointerId);state.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(state.pointers.size>=2){let points=[...state.pointers.values()];let d=Math.hypot(points[1].x-points[0].x,points[1].y-points[0].y);if(state.pinch!==null){let ratio=d/state.pinch;if(ratio>1.4){zoomAt(1);state.pinch=d}else if(ratio<.72){zoomAt(-1);state.pinch=d}}else state.pinch=d;state.drag.moved=true;return;}
 if(state.drag){const dx=e.clientX-state.drag.lastX,dy=e.clientY-state.drag.lastY;state.drag.lastX=e.clientX;state.drag.lastY=e.clientY;if(Math.hypot(e.clientX-state.drag.startX,e.clientY-state.drag.startY)>4)state.drag.moved=true;if(state.drag.moved)moveMap(dx,dy)}
 });
 map.addEventListener('pointerup',e=>{if(!state.pointers.has(e.pointerId))return;state.pointers.delete(e.pointerId);if(!state.pointers.size){state.pinch=null;map.classList.remove('grabbing');if(state.drag&&!state.drag.moved){let bounds=map.getBoundingClientRect();selectAt(positionToGeo(e.clientX-bounds.left,e.clientY-bounds.top));if(window.innerWidth>1080&&state.mode==='inspect'){}else if(window.innerWidth<=1080&&state.mode==='inspect')changeTab('overview')}state.drag=null;}});
 map.addEventListener('pointercancel',e=>{state.pointers.delete(e.pointerId);state.drag=null;state.pinch=null;map.classList.remove('grabbing')});
 map.addEventListener('wheel',e=>{e.preventDefault();const bounds=map.getBoundingClientRect();if(Math.abs(e.deltaY)<5)return;zoomAt(e.deltaY<0?1:-1,e.clientX-bounds.left,e.clientY-bounds.top)},{passive:false});
 map.addEventListener('dblclick',e=>{e.preventDefault();const b=map.getBoundingClientRect();zoomAt(1,e.clientX-b.left,e.clientY-b.top)});
 const resize=new ResizeObserver(()=>draw());resize.observe(map);
}
startInput();setupPointer();log('NASA Mars Trek source: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars');log('Connection mode: '+(preferProxy?'Cloudflare proxy with direct NASA fallback':'direct NASA image requests'));
setStatus();draw();setTimeout(()=>{if(state.loaded===0){el('emptyState').hidden=false;log('No NASA tiles received yet. Check source connectivity.');setStatus();}},8500);
