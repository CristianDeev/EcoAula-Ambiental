const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
const showToast=(message)=>{const container=$('.toast-container');if(!container)return;const toast=document.createElement('div');toast.className='toast';toast.textContent=message;container.appendChild(toast);setTimeout(()=>toast.remove(),2800)};
const currentUser=EcoStore.get('currentUser',null);
const updateUserUI=()=>{$$('[data-user-name]').forEach(element=>element.textContent=currentUser?.name?.split(' ')[0]||'Cristian')};
const applyTheme=()=>{const theme=EcoStore.get('theme','light');document.body.classList.toggle('dark',theme==='dark');$$('.theme-toggle').forEach(button=>button.textContent=theme==='dark'?'☀':'☾')};
document.addEventListener('DOMContentLoaded',()=>{
  updateUserUI();applyTheme();
  $$('.theme-toggle').forEach(button=>button.addEventListener('click',()=>{const next=document.body.classList.contains('dark')?'light':'dark';EcoStore.set('theme',next);applyTheme()}));
  $$('.logout-button').forEach(button=>button.addEventListener('click',()=>{localStorage.removeItem('ecoaula_currentUser');location.href='login.html'}));
  const menu=$('.menu-button'),sidebar=$('.sidebar');if(menu&&sidebar)menu.addEventListener('click',()=>sidebar.classList.toggle('open'));
  $$('.modal-close').forEach(button=>button.addEventListener('click',()=>button.closest('.modal')?.classList.remove('open')));
  $$('.modal').forEach(modal=>modal.addEventListener('click',event=>{if(event.target===modal)modal.classList.remove('open')}));
  $$('[data-toast]').forEach(button=>button.addEventListener('click',()=>showToast(button.dataset.toast)));
});

