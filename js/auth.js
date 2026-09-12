const roleDestination=role=>({admin:'admin.html',teacher:'teacher.html',student:'dashboard.html'})[role]||'dashboard.html';
document.addEventListener('DOMContentLoaded',()=>{
  $$('.password-toggle').forEach(button=>button.addEventListener('click',()=>{const input=button.parentElement.querySelector('input');input.type=input.type==='password'?'text':'password';button.textContent=input.type==='password'?'Ver':'Ocultar'}));
  const login=$('#loginForm');
  if(login){
    $$('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
      const profiles={student:['estudiante@ecoaula.co','123456'],teacher:['docente@ecoaula.co','docente123'],admin:['admin@ecoaula.co','admin123']};
      const profile=profiles[button.dataset.demo];
      $('#loginEmail').value=profile[0];$('#loginPassword').value=profile[1];showToast('Datos de demostración cargados');
    }));
    login.addEventListener('submit',event=>{event.preventDefault();const email=$('#loginEmail').value.trim().toLowerCase(),password=$('#loginPassword').value;const user=EcoStore.get('users',[]).find(item=>item.email===email&&item.password===password);if(!user){showToast('Correo o contraseña incorrectos');return}EcoStore.set('currentUser',user);showToast('Inicio de sesión exitoso');setTimeout(()=>location.href=roleDestination(user.role),500)});
    $('#forgotLink').addEventListener('click',event=>{event.preventDefault();showToast('Te enviaremos instrucciones si el correo está registrado')});
  }
  const register=$('#registerForm');
  if(register)register.addEventListener('submit',event=>{event.preventDefault();const email=$('#registerEmail').value.trim().toLowerCase();const users=EcoStore.get('users',[]);if(users.some(user=>user.email===email)){showToast('Este correo ya está registrado');return}const user={name:`${$('#firstName').value.trim()} ${$('#lastName').value.trim()}`,email,password:$('#registerPassword').value,role:$('#registerRole').value};users.push(user);EcoStore.set('users',users);EcoStore.set('currentUser',user);showToast('¡Cuenta creada! Preparando tu espacio...');setTimeout(()=>location.href=roleDestination(user.role),650)});
});
