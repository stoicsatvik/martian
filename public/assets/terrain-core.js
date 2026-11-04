/**
 * MARTIAN v0.2: constrained Jezero CTX terrain math.
 * This is raster arithmetic only, not a certification of human traversability.
 * The source is USGS's 2020 Mars 2020 TRN CTX DTM, 20 metres per cell,
 * nominal equirectangular Eqc_latTs0_lon0, Mars radius 3396190 m.
 */
export const SOURCE = Object.freeze({
  id: 'JEZ_ctx_B_soc_008_DTM_MOLAtopography_DeltaGeoid_20m_Eqc_latTs0_lon0',
  name: 'USGS Mars 2020 Jezero CTX terrain-relative-navigation DTM',
  reference: 'https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_ctx_dtm_mosaic',
  radius: 3396190, width: 1596, height: 1512, nominalPixelSizeM: 20,
  bounds: { south: 18.2110274, north: 18.7211945, west: 77.1604655, east: 77.6991776 }
});
const DEG = Math.PI/180;
export function eqcMeters(lat, lon, radius=SOURCE.radius) {
  if (![lat,lon,radius].every(Number.isFinite) || lat < -90 || lat > 90 || lon < -180 || lon > 180 || radius<=0) throw new Error('Invalid Mars map coordinate');
  // Source file is explicitly Eqc_latTs0_lon0, so standard parallel is zero.
  return {x:radius*lon*DEG,y:radius*lat*DEG};
}
export function pixelIndex(image,lat,lon){
  let {x,y}=eqcMeters(lat,lon), [ox,oy]=image.getOrigin(), [rx,ry]=image.getResolution();
  if(![ox,oy,rx,ry].every(Number.isFinite)||rx<=0||ry>=0)throw new Error('Unsupported GeoTIFF grid orientation');
  return {col:Math.floor((x-ox)/rx),row:Math.floor((y-oy)/ry)};
}
export function verifyImage(image){
  const w=image.getWidth(),h=image.getHeight(),resolution=image.getResolution(),origin=image.getOrigin();
  if(w!==SOURCE.width||h!==SOURCE.height)throw new Error(`Wrong raster: expected ${SOURCE.width}×${SOURCE.height} pixels, got ${w}×${h}`);
  if(Math.abs(resolution[0]-20)>2||Math.abs(resolution[1]+20)>2)throw new Error('Unexpected pixel spacing: expected about 20 metres');
  if(!origin.every(Number.isFinite))throw new Error('Missing GeoTIFF projected origin');
  // The declared file must correspond to Jezero, not a random terrestrial DEM.
  const p=pixelIndex(image,18.4447,77.4509);
  if(p.col<0||p.row<0||p.col>=w||p.row>=h)throw new Error('GeoTIFF transform does not cover Jezero landing coordinates');
  return {width:w,height:h,pixelMeters:Math.abs(resolution[0]),origin,resolution,coverage:SOURCE.bounds};
}
export function validElevation(v,noData){
  return Number.isFinite(v)&&v!==noData&&v>-15000&&v<25000;
}
export function hornSlopeDegrees(values, dx, dy){
  if(values.length!==9||!Array.from(values).every(Number.isFinite)||!(dx>0&&dy>0))throw new Error('A valid 3×3 elevation patch and positive spacing are required');
  const z=Array.from(values);
  const gx=((z[2]+2*z[5]+z[8])-(z[0]+2*z[3]+z[6]))/(8*dx);
  const gy=((z[6]+2*z[7]+z[8])-(z[0]+2*z[1]+z[2]))/(8*dy);
  return Math.atan(Math.hypot(gx,gy))/DEG;
}
export async function sampleTerrain(image,lat,lon){
  const {col,row}=pixelIndex(image,lat,lon),w=image.getWidth(),h=image.getHeight();
  if(col<0||row<0||col>=w||row>=h)return {status:'outside'};
  const nodata=typeof image.getGDALNoData==='function'?image.getGDALNoData():undefined;
  let window=[Math.max(0,col-1),Math.max(0,row-1),Math.min(w,col+2),Math.min(h,row+2)];
  const result=await image.readRasters({window,samples:[0],interleave:true});
  const ww=window[2]-window[0],centerIndex=(row-window[1])*ww+(col-window[0]);
  const value=result[centerIndex];
  if(!validElevation(value,nodata))return {status:'nodata',col,row};
  const out={status:'measured-grid',elevation:value,col,row,source:SOURCE.id};
  if(ww===3&&window[3]-window[1]===3&&Array.from(result).every(v=>validElevation(v,nodata))){
    const [rx,ry]=image.getResolution();
    out.slopeDegrees=hornSlopeDegrees(result,Math.abs(rx),Math.abs(ry));
    out.slopeStatus='derived-3x3';
  }else out.slopeStatus='unavailable-neighbor-data';
  return out;
}
