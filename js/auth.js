document.addEventListener('DOMContentLoaded',()=>{
  $$('.password-toggle').forEach(button=>button.addEventListener('click',()=>{const input=button.parentElement.querySelector('input');input.type=input.type==='password'?'text':'password';button.textContent=input.type==='password'?'Ver':'Ocultar'}));
  const login=$('#loginForm');
  if(login){
    $$('[data-demo]').forEach(button=>button.addEventListener('click',()=>{const admin=button.dataset.demo==='admin';$('#loginEmail').value=admin?'admin@ecoaula.co':'estudiante@ecoaula.co';$('#loginPassword').value=admin?'admin123':'123456';showToast('Datos de demostración cargados')}));
    login.addEventListener('submit',event=>{event.preventDefault();const email=$('#loginEmail').value.trim().toLowerCase(),password=$('#loginPassword').value;const user=EcoStore.get('users',[]).find(item=>item.email===email&&item.password===password);if(!user){showToast('Correo o contraseña incorrectos');return}EcoStore.set('currentUser',user);showToast('Inicio de sesión exitoso');setTimeout(()=>location.href=user.role==='admin'?'admin.html':'dashboard.html',500)});
    $('#forgotLink').addEventListener('click',event=>{event.preventDefault();showToast('Te enviaremos instrucciones si el correo está registrado')});
  }
  const register=$('#registerForm');
  if(register)register.addEventListener('submit',event=>{event.preventDefault();const email=$('#registerEmail').value.trim().toLowerCase();const users=EcoStore.get('users',[]);if(users.some(user=>user.email===email)){showToast('Este correo ya está registrado');return}const user={name:`${$('#firstName').value.trim()} ${$('#lastName').value.trim()}`,email,password:$('#registerPassword').value,role:$('#registerRole').value};users.push(user);EcoStore.set('users',users);EcoStore.set('currentUser',user);showToast('¡Cuenta creada! Preparando tu aula...');setTimeout(()=>location.href=user.role==='admin'?'admin.html':'dashboard.html',650)});
});

