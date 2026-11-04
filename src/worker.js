/** Cloudflare Workers static-assets entrypoint. Pages Functions work independently. */
import { onRequestGet as tileHandler } from '../functions/api/tiles/[[path]].js';
import { onRequestGet as demHandler } from '../functions/api/dem/ctx.js';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if(url.pathname.startsWith('/api/')){
      if(request.method!=='GET')return new Response('Method not allowed',{status:405,headers:{Allow:'GET'}});
      if(url.pathname==='/api/dem/ctx')return demHandler();
      const match=url.pathname.match(/^\/api\/tiles\/([^/]+)\/(\d+)\/(\d+)\/(\d+)$/);
      if(match)return tileHandler({request,params:{path:match.slice(1)}});
      return new Response('Unknown API route',{status:404});
    }
    return env.ASSETS.fetch(request);
  }
};
