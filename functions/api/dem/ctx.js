/** Cloudflare Pages: allowlisted, read-only USGS numerical Jezero CTX DEM proxy. */
const SOURCES = [
  'https://planetarymaps.usgs.gov/mosaic/mars2020_trn/CTX/JEZ_ctx_B_soc_008_DTM_MOLAtopography_DeltaGeoid_20m_Eqc_latTs0_lon0.tif',
  'https://asc-pds-services.s3.us-west-2.amazonaws.com/mosaic/mars2020_trn/CTX/JEZ_ctx_B_soc_008_DTM_MOLAtopography_DeltaGeoid_20m_Eqc_latTs0_lon0.tif'
];
const reject=(message,status)=>new Response(message,{status,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function onRequestGet(){
  for(const url of SOURCES){
    try{
      const r=await fetch(url,{headers:{Accept:'image/tiff,application/octet-stream'},cf:{cacheEverything:true,cacheTtl:60*60*24*7},redirect:'follow'});
      if(!r.ok)continue;
      const length=Number(r.headers.get('content-length')||0);
      if(length>18_000_000)continue;
      const b=await r.arrayBuffer();
      if(b.byteLength<1024||b.byteLength>18_000_000)continue;
      const magic=new Uint8Array(b,0,4);
      if(!((magic[0]===0x49&&magic[1]===0x49&&magic[2]===42&&magic[3]===0)||(magic[0]===0x4d&&magic[1]===0x4d&&magic[2]===0&&magic[3]===42)))continue;
      return new Response(b,{status:200,headers:{'Content-Type':'image/tiff','Cache-Control':'public, max-age=86400, s-maxage=604800','X-Content-Type-Options':'nosniff','X-Data-Source':'USGS-Mars2020-CTX-DTM','X-Source-Product':'JEZ_ctx_B_soc_008_DTM_MOLAtopography_DeltaGeoid_20m_Eqc_latTs0_lon0'}});
    }catch{/* try alternate official source */}
  }
  return reject('Official USGS Jezero DTM unavailable from its published mirrors; use a downloaded source file.',502);
}
