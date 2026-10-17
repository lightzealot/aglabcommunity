/** Autonomous, dependency-free welcome component. No AI calls or tracking. */
class CommunityMascot extends HTMLElement {
  static get observedAttributes() { return ['state']; }
  connectedCallback() {
    if (this.shadowRoot) return;
    this._config = {assetBase: new URL('./assets/', import.meta.url).href, storageKey:'andy-mascot-welcome-v1', title:'¡Bienvenido a la comunidad!', message:'Aquí aprendemos a usar la IA y a convertir ideas en proyectos. ¿Por dónde quieres empezar?', startUrl:null, resourcesUrl:null, ...this._config};
    const root=this.attachShadow({mode:'open'});
    root.innerHTML=`<style>
      :host{--mascot-accent:#155de9;--mascot-ink:#17243e;position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:1000;font:15px/1.5 system-ui,sans-serif;color:var(--mascot-ink);max-width:calc(100vw - 36px)}
      *{box-sizing:border-box}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #f5a623;outline-offset:4px} [hidden]{display:none!important}
      .panel{position:relative;width:340px;max-width:100%;padding:172px 22px 22px;background:#fff;border:1px solid #dce4f1;border-radius:24px;box-shadow:0 16px 55px #17243e28;animation:panel-in .4s ease both}
      .stage{position:absolute;top:-45px;left:50%;width:210px;height:205px;transform:translateX(-50%);pointer-events:none}
      .pose{display:block;width:100%;height:100%;object-fit:contain;transform-origin:50% 88%;animation:idle 4s ease-in-out infinite}
      .stage[data-state=welcome] .pose{animation:greet 2.8s ease-in-out 1}
      .stage[data-state=point] .pose{animation:present 1.8s ease-in-out 1}
      .stage[data-state=done] .pose{animation:celebrate .8s ease 1}
      h2{font-size:21px;line-height:1.2;margin:0 25px 10px 0;letter-spacing:-.5px}p{margin:0 0 18px;color:#526077}
      .close{position:absolute;top:12px;right:12px;border:0;background:#f0f3f9;border-radius:50%;width:36px;height:36px;color:#42516b;font-size:24px;line-height:1}
      nav{display:flex;flex-direction:column;gap:9px}a{display:block;text-decoration:none;text-align:center;border-radius:12px;padding:12px 15px;font-weight:650;color:#fff;background:var(--mascot-accent)}a.secondary{color:#24406c;background:#edf2fc}
      .launcher{display:flex;align-items:center;gap:8px;border:1px solid #dce4f1;border-radius:99px;padding:5px 16px 5px 5px;background:#fff;color:#17243e;box-shadow:0 8px 24px #17243e20;font-weight:650}.launcher img{height:52px;width:52px;object-fit:contain}
      @keyframes panel-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes idle{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.012)}}
      @keyframes greet{0%{opacity:0;transform:translateY(12px) scale(.96)}18%{opacity:1;transform:translateY(0) rotate(-3deg)}36%{transform:rotate(3deg)}54%{transform:rotate(-2deg)}72%{transform:rotate(1.5deg)}100%{opacity:1;transform:rotate(0)}}
      @keyframes present{0%,100%{transform:translateX(0)}45%{transform:translateX(-7px) rotate(-2deg)}}
      @keyframes celebrate{0%,100%{transform:translateY(0)}40%{transform:translateY(-12px)}70%{transform:translateY(2px)}}
      @media(max-width:480px){:host{left:12px;right:12px;bottom:max(12px,env(safe-area-inset-bottom));max-width:none;display:flex;justify-content:flex-end}.panel{width:100%;max-width:360px;padding-top:146px}.stage{width:180px;height:180px;top:-48px}.launcher{margin-left:auto}}
      @media(max-height:500px){.stage{display:none}.panel{padding-top:22px;max-height:calc(100dvh - 28px);overflow:auto}}
      @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
    </style><section class="panel" aria-label="Bienvenida a la comunidad"><div class="stage" data-state="welcome"><img class="pose" alt="" width="210" height="205" decoding="async"></div><button class="close" type="button" aria-label="Cerrar bienvenida">×</button><h2></h2><p></p><nav aria-label="Primeros pasos"><a class="start">Empieza aquí</a><a class="secondary resources">Explora los recursos</a></nav></section><button class="launcher" hidden type="button" aria-label="Abrir ayuda de bienvenida" aria-expanded="false"><img alt="" width="52" height="52"><span>¿Por dónde empiezo?</span></button>`;
    this._panel=root.querySelector('.panel');this._launcher=root.querySelector('.launcher');
    root.querySelector('h2').textContent=this._config.title;root.querySelector('p').textContent=this._config.message;
    for(const [sel,key] of [['.start','startUrl'],['.resources','resourcesUrl']]) {const a=root.querySelector(sel),url=this._safeUrl(this._config[key]);if(url)a.href=url;else a.hidden=true;}
    root.querySelector('nav').hidden=!this._config.startUrl&&!this._config.resourcesUrl;
    this._launcher.querySelector('img').src=this._asset('idle');
    root.querySelector('.close').addEventListener('click',()=>this.close());
    this._launcher.addEventListener('click',()=>this.open());
    root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!this._panel.hidden)this.close();});
    root.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{this._remember();this.dispatchEvent(new CustomEvent('mascot:navigate',{detail:{href:a.href},bubbles:true,composed:true}));}));
    root.querySelector('.pose').addEventListener('error',()=>{root.querySelector('.stage').hidden=true;});
    this.setState(this.getAttribute('state')||'welcome');
    let seen=false;try{seen=localStorage.getItem(this._config.storageKey)==='seen';}catch{}
    if(seen){this._panel.hidden=true;this._launcher.hidden=false;}else{this._remember();this._timer=setTimeout(()=>this.setState('idle'),2900);}
  }
  disconnectedCallback(){clearTimeout(this._timer);}
  attributeChangedCallback(_name,oldValue,newValue){if(oldValue!==newValue&&this.shadowRoot)this.setState(newValue||'idle');}
  set config(value){this._config={...this._config,...value};} // Set BEFORE appendChild / connectedCallback.
  _asset(pose){return `${this._config.assetBase.replace(/\/?$/,'/')}${pose}.webp`;}
  _safeUrl(raw){if(!raw)return null;try{const u=new URL(raw,location.href);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}
  _remember(){try{localStorage.setItem(this._config.storageKey,'seen');}catch{}}
  setState(state){if(!this.shadowRoot)return;clearTimeout(this._timer);const allowed=['idle','welcome','point','done'];if(!allowed.includes(state))state='idle';const pose=state==='done'?'welcome':state;const stage=this.shadowRoot.querySelector('.stage');stage.dataset.state=state;const img=stage.querySelector('img');img.src=this._asset(pose);this.dataset.state=state;}
  open(){this._panel.hidden=false;this._launcher.hidden=true;this._launcher.setAttribute('aria-expanded','true');this.setState('welcome');this._timer=setTimeout(()=>this.setState('idle'),2900);this.shadowRoot.querySelector('.close').focus();}
  close(){this._panel.hidden=true;this._launcher.hidden=false;this._launcher.setAttribute('aria-expanded','false');this._remember();this.setState('idle');this._launcher.focus();}
}
if(!customElements.get('community-mascot'))customElements.define('community-mascot',CommunityMascot);
export {CommunityMascot};
