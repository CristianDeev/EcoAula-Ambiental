const adminTitles={overview:'Resumen general',courses:'Gestión de cursos',students:'Estudiantes',content:'Contenidos',reports:'Reportes',settings:'Configuración'};
const adminThemeMap={Clima:['🌤️','cover-climate'],Agua:['💧','cover-water'],Circularidad:['♻','cover-circular'],Biodiversidad:['🦋','cover-climate']};
const defaultPlatformSettings={platformName:'EcoAula',supportEmail:'soporte@ecoaula.co',period:'2026-B',timezone:'America/Bogota',theme:'forest',openRegistration:true,teacherApproval:true,publicCatalog:true,autoCertificates:true,passingScore:70,certificateSigner:'Mariana Torres',weeklyReports:true,courseNotifications:true,inactiveAlerts:false};
const renderAdminCourses=(query='',status='all')=>{
  const courses=EcoStore.get('courses',EcoData.courses).filter(course=>course.title.toLowerCase().includes(query.toLowerCase())&&(status==='all'||course.status===status));
  $('#adminCourseTable').innerHTML=`<div class="data-row header"><span>CURSO</span><span>DOCENTE</span><span>ESTADO</span><span>ESTUDIANTES</span><span></span></div>${courses.map(course=>`<div class="data-row"><div class="course-cell"><span class="course-mini-icon">${course.icon}</span><div><strong>${course.title}</strong><small>${course.category} · ${course.duration||'Sin duración'}</small></div></div><span>${course.instructor||'Sin asignar'}</span><button class="status ${course.status==='Publicado'?'published':'draft'}" data-toggle-status="${course.id}">${course.status}</button><span>${course.students.toLocaleString('es-CO')}</span><span class="row-actions"><button data-admin-edit="${course.id}" title="Editar">✎</button></span></div>`).join('')}`;
  $$('[data-admin-edit]').forEach(button=>button.addEventListener('click',()=>openAdminCourseModal(button.dataset.adminEdit)));
  $$('[data-toggle-status]').forEach(button=>button.addEventListener('click',()=>{const all=EcoStore.get('courses',EcoData.courses);const course=all.find(item=>item.id===button.dataset.toggleStatus);course.status=course.status==='Publicado'?'Borrador':'Publicado';course.updated='hoy';EcoStore.set('courses',all);renderAdminCourses($('#adminCourseSearch').value,$('#statusFilter').value);showToast(`Curso marcado como ${course.status.toLowerCase()}`)}));
};
const openAdminCourseModal=id=>{
  $('#courseForm').reset();$('#adminCourseId').value=id||'';const course=EcoStore.get('courses',EcoData.courses).find(item=>item.id===id);
  $('#adminEditorTitle').textContent=course?'Editar curso':'Crear curso';$('#adminEditorKicker').textContent=course?'EDICIÓN INSTITUCIONAL':'GESTIÓN ACADÉMICA';
  if(course){$('#newCourseTitle').value=course.title;$('#newCourseCategory').value=course.category;$('#newCourseDescription').value=course.description;$('#newCourseInstructor').value=course.instructor||'';$('#newCourseDuration').value=course.duration||'';$('#newCourseModules').value=course.modules;$('#newCourseStatus').value=course.status}
  $('#courseModal').classList.add('open');
};
const populatePlatformSettings=settings=>{
  $('#settingPlatformName').value=settings.platformName;
  $('#settingSupportEmail').value=settings.supportEmail;
  $('#settingPeriod').value=settings.period;
  $('#settingTimezone').value=settings.timezone;
  $('#settingTheme').value=settings.theme;
  $('#settingOpenRegistration').checked=settings.openRegistration;
  $('#settingTeacherApproval').checked=settings.teacherApproval;
  $('#settingPublicCatalog').checked=settings.publicCatalog;
  $('#settingAutoCertificates').checked=settings.autoCertificates;
  $('#settingPassingScore').value=settings.passingScore;
  $('#settingCertificateSigner').value=settings.certificateSigner;
  $('#settingWeeklyReports').checked=settings.weeklyReports;
  $('#settingCourseNotifications').checked=settings.courseNotifications;
  $('#settingInactiveAlerts').checked=settings.inactiveAlerts;
  $('#settingsPreviewName').textContent=settings.platformName;
  $('#settingsBrandPreview').className=`settings-brand-preview theme-${settings.theme}`;
};
const readPlatformSettings=()=>({platformName:$('#settingPlatformName').value.trim(),supportEmail:$('#settingSupportEmail').value.trim(),period:$('#settingPeriod').value.trim(),timezone:$('#settingTimezone').value,theme:$('#settingTheme').value,openRegistration:$('#settingOpenRegistration').checked,teacherApproval:$('#settingTeacherApproval').checked,publicCatalog:$('#settingPublicCatalog').checked,autoCertificates:$('#settingAutoCertificates').checked,passingScore:Number($('#settingPassingScore').value),certificateSigner:$('#settingCertificateSigner').value.trim(),weeklyReports:$('#settingWeeklyReports').checked,courseNotifications:$('#settingCourseNotifications').checked,inactiveAlerts:$('#settingInactiveAlerts').checked});
const markSettingsState=(pending=false)=>{$('#settingsState').textContent=pending?'Cambios sin guardar':'Cambios guardados';$('#settingsState').classList.toggle('pending',pending)};
document.addEventListener('DOMContentLoaded',()=>{
  renderAdminCourses();$('#courseCount').textContent=EcoStore.get('courses',EcoData.courses).length;
  $$('[data-admin-view]').forEach(button=>button.addEventListener('click',()=>{$$('[data-admin-view]').forEach(item=>item.classList.remove('active'));button.classList.add('active');$$('.admin-view').forEach(view=>view.classList.remove('active'));$(`#view-${button.dataset.adminView}`).classList.add('active');$('#adminViewTitle').textContent=adminTitles[button.dataset.adminView];$('.sidebar').classList.remove('open')}));
  $('#newCourseButton').addEventListener('click',()=>openAdminCourseModal());$$('.open-course-modal').forEach(button=>button.addEventListener('click',()=>openAdminCourseModal()));
  $('#courseForm').addEventListener('submit',event=>{event.preventDefault();const courses=EcoStore.get('courses',EcoData.courses);const id=$('#adminCourseId').value;const category=$('#newCourseCategory').value;let course=courses.find(item=>item.id===id);const instructor=$('#newCourseInstructor').value.trim();const values={title:$('#newCourseTitle').value.trim(),category,description:$('#newCourseDescription').value.trim(),instructor,duration:$('#newCourseDuration').value.trim(),modules:Number($('#newCourseModules').value),lessons:Number($('#newCourseModules').value)*2,status:$('#newCourseStatus').value,icon:adminThemeMap[category][0],theme:adminThemeMap[category][1],updated:'hoy'};if(course)Object.assign(course,values);else courses.push({id:`course-${Date.now()}`,progress:0,rating:0,students:0,level:'Inicial',objectives:[],syllabus:[],owner:'docente@ecoaula.co',...values});EcoStore.set('courses',courses);renderAdminCourses();$('#courseCount').textContent=courses.length;$('#courseModal').classList.remove('open');showToast(course?'Curso actualizado correctamente':'Curso creado correctamente')});
  $('#adminCourseSearch').addEventListener('input',event=>renderAdminCourses(event.target.value,$('#statusFilter').value));$('#statusFilter').addEventListener('change',event=>renderAdminCourses($('#adminCourseSearch').value,event.target.value));
  $('#exportReport').addEventListener('click',()=>{const content='EcoAula - Informe septiembre 2026\nEstudiantes activos: 12.482\nFinalización: 92.6%\nCursos: '+EcoStore.get('courses',[]).length+'\nSatisfacción: 4.9/5';const blob=new Blob([content],{type:'text/plain'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='informe-ecoaula-septiembre-2026.txt';link.click();URL.revokeObjectURL(link.href);showToast('Informe exportado')});
  const report=$('#reportDownload');if(report)report.addEventListener('click',()=>showToast('Informe generado correctamente'));
  const settingsForm=$('#platformSettingsForm');
  populatePlatformSettings({...defaultPlatformSettings,...EcoStore.get('platformSettings',{})});
  settingsForm.addEventListener('input',()=>{const values=readPlatformSettings();$('#settingsPreviewName').textContent=values.platformName||'EcoAula';$('#settingsBrandPreview').className=`settings-brand-preview theme-${values.theme}`;markSettingsState(true)});
  settingsForm.addEventListener('submit',event=>{event.preventDefault();EcoStore.set('platformSettings',readPlatformSettings());markSettingsState();showToast('Configuración guardada correctamente')});
  $('#resetSettings').addEventListener('click',()=>{populatePlatformSettings(defaultPlatformSettings);markSettingsState(true);showToast('Formulario restablecido. Guarda para confirmar')});
  $$('[data-settings-target]').forEach(button=>button.addEventListener('click',()=>{$$('[data-settings-target]').forEach(item=>item.classList.remove('active'));button.classList.add('active');$(`#${button.dataset.settingsTarget}`).scrollIntoView({behavior:'smooth',block:'start'})}));
});
