const main = [
 ['alt-slash','⌥ /','layout','Tiles / horizontal / vertical'],['alt-comma','⌥ ,','layout','Accordion / horizontal / vertical'],
 ['alt-h','⌥ H','focus','Focus left'],['alt-j','⌥ J','focus','Focus down'],['alt-k','⌥ K','focus','Focus up'],['alt-l','⌥ L','focus','Focus right'],
 ['alt-shift-h','⌥ ⇧ H','move','Move window left'],['alt-shift-j','⌥ ⇧ J','move','Move window down'],['alt-shift-k','⌥ ⇧ K','move','Move window up'],['alt-shift-l','⌥ ⇧ L','move','Move window right'],
 ['alt-minus','⌥ −','resize','Resize smart −50'],['alt-equal','⌥ =','resize','Resize smart +50'],
 ...['1','2','3','4','5'].map(k=>[`alt-${k}`,`⌥ ${k}`,'workspace',`Focus workspace ${k}`]),
 ...[['A','Assets'],['E','Entertainment'],['P','Plan'],['R','Research'],['W','Workbench']].map(([k,n])=>[`alt-${k.toLowerCase()}`,`⌥ ${k}`,'workspace',`Focus workspace ${k} · ${n}`]),
 ...['1','2','3','4','5','A','B','C','D','E','G','I','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map(k=>[`alt-shift-${k.toLowerCase()}`,`⌥ ⇧ ${k}`,'send',`Move window to workspace ${k}`]),
 ['alt-tab','⌥ Tab','workspace','Workspace back and forth'],['alt-shift-tab','⌥ ⇧ Tab','monitor','Move workspace to next monitor (wrap)'],
 ['alt-shift-semicolon','⌥ ⇧ ;','mode','Enter service mode'],['ctrl-alt-shift-cmd-a','⌃ ⌥ ⇧ ⌘ A','mode','Enter service mode'],['alt-shift-f','⌥ ⇧ F','fullscreen','Toggle fullscreen']
].map(([id,key,category,action])=>({id,key,category,action,mode:'main'}));
const service = [
 ['esc','Esc','system','Reload config, return to main mode'],['r','R','layout','Flatten workspace tree, return to main mode'],['f','F','layout','Toggle floating / tiling, return to main mode'],['backspace','⌫','system','Close all windows but current, return to main mode'],
 ['alt-shift-h','⌥ ⇧ H','join','Join with container on the left, return to main mode'],['alt-shift-j','⌥ ⇧ J','join','Join with container below, return to main mode'],['alt-shift-k','⌥ ⇧ K','join','Join with container above, return to main mode'],['alt-shift-l','⌥ ⇧ L','join','Join with container on the right, return to main mode']
].map(([id,key,category,action])=>({id,key,category,action,mode:'service'}));
const keyboardRows = [['esc','f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12','eject'],['`','1','2','3','4','5','6','7','8','9','0','minus','equal','backspace'],['tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],['caps','a','s','d','f','g','h','j','k','l','semicolon','quote','enter'],['shift','z','x','c','v','b','n','m','comma','period','slash','shift'],['fn','ctrl','alt','space','cmd','arrow-left','arrow-up','arrow-down','arrow-right']];
const labels={esc:'Esc',f1:'F1',f2:'F2',f3:'F3',f4:'F4',f5:'F5',f6:'F6',f7:'F7',f8:'F8',f9:'F9',f10:'F10',f11:'F11',f12:'F12',eject:'⏏',backspace:'⌫',tab:'Tab',caps:'Caps',enter:'↵',shift:'⇧',fn:'fn',ctrl:'⌃',alt:'⌥',cmd:'⌘',space:'Space',minus:'−',equal:'=',semicolon:';',quote:"'",comma:',',period:'.',slash:'/','\\':'\\','`':'~', 'arrow-left':'←','arrow-up':'↑','arrow-down':'↓','arrow-right':'→'};
const aliases={minus:'minus',equal:'equal',semicolon:'semicolon',comma:'comma',period:'period',slash:'slash',tab:'tab'};
function bindingsForKey(key, bindings){const suffix=aliases[key]||key;return bindings.filter(b=>b.id.endsWith(`-${suffix}`)||b.id===suffix)}
let current='main', query='';
const all=()=>current==='main'?main:service;
function renderKeyboard(){
 const bindings=all();
 document.querySelector('#keyboard').innerHTML=keyboardRows.map((row,rowIndex)=>`<div class="key-row row-${rowIndex}">${row.map(k=>{const matches=bindingsForKey(k,bindings);const hit=matches.some(b=>!query || `${b.key} ${b.action}`.toLowerCase().includes(query));const title=matches.map(b=>b.key+' · '+b.action).join(' | ')||'No binding in this mode';const actions=matches.map(b=>b.action).join(' / ');return `<button class="key ${['backspace','tab','caps','enter','shift','ctrl','alt','cmd','fn'].includes(k)?'wide ':''}${k==='space'?'space ':''}${['arrow-left','arrow-up','arrow-down','arrow-right'].includes(k)?'arrow ':''}${matches.length&&!hit?'dim ':''}${matches.length&&hit?'selected ':''}" data-key="${k}" title="${title}"><span class="label">${labels[k]||k.toUpperCase()}</span><small>${actions||'-'}</small></button>`}).join('')}</div>`).join('');
 document.querySelectorAll('.key').forEach(k=>k.addEventListener('click',()=>{if(k.dataset.key==='space')return;document.querySelector('#search').value=k.dataset.key;query=k.dataset.key;render();}));
}
function renderCards(){const list=all().filter(x=>!query||`${x.key} ${x.action} ${x.category}`.toLowerCase().includes(query));document.querySelector('#cards').innerHTML=list.map(x=>`<article class="card"><div class="card-top"><span class="combo">${x.key}</span><span class="category">${x.category}</span></div><div class="action">${x.action}</div><div class="detail">${x.mode} mode</div></article>`).join('');document.querySelector('#result-count').textContent=`${list.length} of ${all().length} bindings` ;document.querySelector('#empty').hidden=list.length>0}
function render(){document.querySelector('#map-title').textContent=current==='main'?'Main mode':'Service mode';document.querySelectorAll('.mode-tabs button').forEach(b=>b.querySelector('b').textContent=b.dataset.mode==='main'?main.length:service.length);renderKeyboard();renderCards()}
document.querySelectorAll('.mode-tabs button').forEach(button=>button.addEventListener('click',()=>{current=button.dataset.mode;document.querySelectorAll('.mode-tabs button').forEach(b=>b.classList.toggle('active',b===button));query='';document.querySelector('#search').value='';render()}));
document.querySelector('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render()});render();
