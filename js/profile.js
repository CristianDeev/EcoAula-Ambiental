const defaultStudentProfile={city:'Cali, Colombia',occupation:'Estudiante universitario',bio:'Aprendiendo para construir comunidades más sostenibles.',interests:['Clima','Agua'],notifications:{study:true,content:true,community:false}};
let studentProfile={...defaultStudentProfile,...EcoStore.get('studentProfile',{})};
const initials=name=>name.split(' ').filter(Boolean).map(word=>word[0]).slice(0,2).join('').toUpperCase();
const loadProfile=()=>{
  const user=EcoStore.get('currentUser',{name:'Cristian Arboleda',email:'estudiante@ecoaula.co'});
  $('#profileName').value=user.name;$('#profileEmail').value=user.email;$('#profileCity').value=studentProfile.city||'';$('#profileOccupation').value=studentProfile.occupation||'';$('#profileBio').value=studentProfile.bio||'';
  $('#profileDisplayName').textContent=user.name;$('#profileDisplayBio').textContent=studentProfile.bio||defaultStudentProfile.bio;$('#profileAvatar').textContent=initials(user.name);$('.profile-mini-avatar').textContent=initials(user.name);$('#bioCount').textContent=$('#profileBio').value.length;
  $$('.interest-grid input').forEach(input=>input.checked=(studentProfile.interests||[]).includes(input.value));$$('[data-preference]').forEach(input=>input.checked=studentProfile.notifications?.[input.dataset.preference]??false);
};
const saveProfile=event=>{
  event.preventDefault();const current=EcoStore.get('currentUser',{});const previousEmail=current.email;current.name=$('#profileName').value.trim();current.email=$('#profileEmail').value.trim().toLowerCase();EcoStore.set('currentUser',current);
  const users=EcoStore.get('users',[]);const user=users.find(item=>item.email===previousEmail);if(user)Object.assign(user,{name:current.name,email:current.email});EcoStore.set('users',users);
  studentProfile={...studentProfile,city:$('#profileCity').value.trim(),occupation:$('#profileOccupation').value.trim(),bio:$('#profileBio').value.trim()};EcoStore.set('studentProfile',studentProfile);loadProfile();updateUserUI();$('#profileSavedBadge').textContent='Guardado ahora';showToast('Perfil actualizado correctamente');
};
document.addEventListener('DOMContentLoaded',()=>{
  loadProfile();$('#profileForm').addEventListener('submit',saveProfile);$('#profileBio').addEventListener('input',event=>$('#bioCount').textContent=event.target.value.length);
  $('#editProfileButton').addEventListener('click',()=>{$('#profileName').focus();$('#profileName').scrollIntoView({behavior:'smooth',block:'center'})});$('#cancelProfile').addEventListener('click',loadProfile);
  $('#saveInterests').addEventListener('click',()=>{studentProfile.interests=$$('.interest-grid input:checked').map(input=>input.value);EcoStore.set('studentProfile',studentProfile);showToast('Intereses actualizados')});
  $$('[data-preference]').forEach(input=>input.addEventListener('change',()=>{studentProfile.notifications={...studentProfile.notifications,[input.dataset.preference]:input.checked};EcoStore.set('studentProfile',studentProfile);showToast('Preferencia guardada')}));
});
