import 'isomorphic-fetch';
import * as qs from 'querystring';

let isoFetch = global.fetch;

global.fetch = function (url, token, opts = {}){
console.log('XXXXXXXX', arguments);
    var params = opts.params || {};
    delete opts.params;

    if(token){ params.token = token; }
    const query = qs.stringify(params);
    if(query){ url+='?'+query; }

    return isoFetch(url, opts);
}

