const teacherUser=EcoStore.get('currentUser',{name:'Laura Mendoza',email:'docente@ecoaula.co',role:'teacher'});
const teacherEmail=teacherUser.role==='teacher'?teacherUser.email:'docente@ecoaula.co';
const teacherTitles={overview:'Resumen de enseñanza',courses:'Gestión de cursos',students:'Seguimiento de estudiantes',evaluations:'Evaluaciones y entregas',announcements:'Anuncios del aula'};
let teacherCourseToDelete=null;
const teacherCourses=()=>EcoStore.get('courses',EcoData.courses).filter(course=>course.owner===teacherEmail);
const themeMap={Clima:['🌍','cover-climate'],Agua:['💧','cover-water'],Circularidad:['♻','cover-circular'],Biodiversidad:['🦋','cover-climate']};
const renderTeacherOverview=()=>{
  const courses=teacherCourses();
  $('#teacherCourseCount').textContent=courses.length;$('#teacherCourseBadge').textContent=courses.length;
  $('#teacherStudentsCount').textContent=courses.reduce((total,course)=>total+course.students,0).toLocaleString('es-CO');
  $('#teacherProgressList').innerHTML=courses.slice(0,4).map((course,index)=>`<div><span class="course-mini-icon ${course.theme}">${course.icon}</span><div><strong>${course.title}</strong><small>${course.students.toLocaleString('es-CO')} estudiantes · ${course.status}</small><div class="progress-bar"><i style="width:${[78,69,61,82][index]||70}%"></i></div></div><b>${[78,69,61,82][index]||70}%</b></div>`).join('');
};
const renderTeacherCourses=(query='',status='all')=>{
  const courses=teacherCourses().filter(course=>course.title.toLowerCase().includes(query.toLowerCase())&&(status==='all'||course.status===status));
  $('#teacherCourseGrid').innerHTML=courses.map(course=>`<article class="teacher-course-card"><div class="teacher-course-cover ${course.theme}"><span class="status ${course.status==='Publicado'?'published':'draft'}">${course.status}</span><span>${course.icon}</span><button data-preview="${course.id}">Vista previa ↗</button></div><div class="teacher-course-info"><div class="course-meta"><span>${course.category} · ${course.level}</span><span>★ ${course.rating||'Nuevo'}</span></div><h3>${course.title}</h3><p>${course.description}</p><div class="teacher-course-numbers"><span><strong>${course.modules}</strong> módulos</span><span><strong>${course.lessons}</strong> lecciones</span><span><strong>${course.students.toLocaleString('es-CO')}</strong> estudiantes</span></div><small>Actualizado ${course.updated||'hoy'}</small><div class="teacher-card-actions"><button class="btn btn-primary" data-edit-course="${course.id}">Editar curso</button><button class="icon-button" data-duplicate-course="${course.id}" title="Duplicar">⧉</button><button class="icon-button danger-icon" data-remove-course="${course.id}" title="Eliminar">⌫</button></div></div></article>`).join('')||'<div class="empty-result"><span>⌕</span><h3>No encontramos cursos</h3><p>Cambia los filtros o crea una nueva ruta.</p></div>';
  bindTeacherCourseActions();
};
const bindTeacherCourseActions=()=>{
  $$('[data-edit-course]').forEach(button=>button.addEventListener('click',()=>openTeacherEditor(button.dataset.editCourse)));
  $$('[data-preview]').forEach(button=>button.addEventListener('click',()=>location.href=`course.html?id=${button.dataset.preview}`));
  $$('[data-duplicate-course]').forEach(button=>button.addEventListener('click',()=>duplicateTeacherCourse(button.dataset.duplicateCourse)));
  $$('[data-remove-course]').forEach(button=>button.addEventListener('click',()=>{teacherCourseToDelete=button.dataset.removeCourse;$('#teacherConfirmModal').classList.add('open')}));
};
const openTeacherEditor=id=>{
  const form=$('#teacherCourseForm');form.reset();$('#teacherCourseId').value=id||'';
  const course=teacherCourses().find(item=>item.id===id);
  $('#teacherEditorTitle').textContent=course?'Editar curso':'Crear nuevo curso';
  $('#editorKicker').textContent=course?'EDICIÓN Y CONTENIDO':'NUEVA RUTA';
  if(course){$('#teacherCourseTitle').value=course.title;$('#teacherCourseCategory').value=course.category;$('#teacherCourseDescription').value=course.description;$('#teacherCourseDuration').value=course.duration;$('#teacherCourseLevel').value=course.level;$('#teacherCourseStatus').value=course.status;$('#teacherCourseObjectives').value=(course.objectives||[]).join('\n');$('#teacherCourseSyllabus').value=(course.syllabus||[]).join('\n')}
  $('#teacherCourseModal').classList.add('open');
};
const saveTeacherCourse=event=>{
  event.preventDefault();const courses=EcoStore.get('courses',EcoData.courses);const id=$('#teacherCourseId').value;const category=$('#teacherCourseCategory').value;let course=courses.find(item=>item.id===id);
  const syllabus=$('#teacherCourseSyllabus').value.split('\n').map(item=>item.trim()).filter(Boolean);
  const values={title:$('#teacherCourseTitle').value.trim(),category,description:$('#teacherCourseDescription').value.trim(),duration:$('#teacherCourseDuration').value.trim(),level:$('#teacherCourseLevel').value,status:$('#teacherCourseStatus').value,objectives:$('#teacherCourseObjectives').value.split('\n').map(item=>item.trim()).filter(Boolean),syllabus,modules:syllabus.length,lessons:Math.max(syllabus.length*2,1),updated:'hoy',owner:teacherEmail,instructor:teacherUser.name,icon:themeMap[category][0],theme:themeMap[category][1]};
  if(course)Object.assign(course,values);else courses.push({id:`course-${Date.now()}`,progress:0,rating:0,students:0,...values});
  EcoStore.set('courses',courses);$('#teacherCourseModal').classList.remove('open');renderTeacherOverview();renderTeacherCourses();showToast(course?'Curso actualizado y guardado':'Curso creado como '+values.status);
};
const duplicateTeacherCourse=id=>{const courses=EcoStore.get('courses',EcoData.courses);const course=courses.find(item=>item.id===id);courses.push({...course,id:`course-${Date.now()}`,title:`${course.title} · Copia`,status:'Borrador',students:0,rating:0,updated:'hoy'});EcoStore.set('courses',courses);renderTeacherOverview();renderTeacherCourses();showToast('Copia creada como borrador')};
const removeTeacherCourse=()=>{const courses=EcoStore.get('courses',EcoData.courses).filter(course=>course.id!==teacherCourseToDelete);EcoStore.set('courses',courses);teacherCourseToDelete=null;$('#teacherConfirmModal').classList.remove('open');renderTeacherOverview();renderTeacherCourses();showToast('Curso eliminado')};
const renderStudents=(query='',course='all')=>{const students=EcoData.students.filter(student=>student.name.toLowerCase().includes(query.toLowerCase())&&(course==='all'||student.course===course));$('#teacherStudentTable').innerHTML=`<div class="student-row header"><span>ESTUDIANTE</span><span>CURSO</span><span>PROGRESO</span><span>NOTA</span><span>ÚLTIMO ACCESO</span><span></span></div>${students.map(student=>`<div class="student-row"><div class="student-person"><span class="avatar">${student.name.split(' ').map(word=>word[0]).slice(0,2).join('')}</span><strong>${student.name}</strong></div><span>${student.course}</span><div><div class="progress-bar"><i style="width:${student.progress}%"></i></div><small>${student.progress}%</small></div><strong class="${student.grade<4?'grade-alert':''}">${student.grade.toFixed(1)}</strong><span>${student.lastAccess}</span><button class="icon-button message-student">✉</button></div>`).join('')}`;$$('.message-student').forEach(button=>button.addEventListener('click',()=>showToast('Conversación abierta con el estudiante')))};
const renderAnnouncements=()=>{const announcements=EcoStore.get('announcements',[{course:'Todos mis cursos',text:'Recuerden preparar sus preguntas para el encuentro en vivo sobre justicia climática.',date:'Hoy, 9:10 a. m.'},{course:'Guardianes del agua',text:'La fecha de entrega del proyecto de auditoría hídrica se amplió hasta el 14 de septiembre.',date:'Ayer, 4:35 p. m.'}]);$('#announcementHistory').innerHTML=announcements.map(item=>`<article><span>📢</span><div><small>${item.course} · ${item.date}</small><p>${item.text}</p></div></article>`).join('')};
const publishAnnouncement=()=>{const text=$('#quickAnnouncementText').value.trim();if(!text){showToast('Escribe el contenido del anuncio');return}const items=EcoStore.get('announcements',[]);items.unshift({course:$('#quickAnnouncementCourse').value,text,date:'Ahora'});EcoStore.set('announcements',items);$('#quickAnnouncementText').value='';renderAnnouncements();showToast('Anuncio publicado para los estudiantes')};
const changeTeacherView=view=>{$$('[data-teacher-view]').forEach(item=>item.classList.toggle('active',item.dataset.teacherView===view));$$('.teacher-view').forEach(item=>item.classList.toggle('active',item.id===`teacher-${view}`));$('#teacherViewTitle').textContent=teacherTitles[view];$('.sidebar').classList.remove('open')};
document.addEventListener('DOMContentLoaded',()=>{
  renderTeacherOverview();renderTeacherCourses();renderStudents();renderAnnouncements();
  $$('[data-teacher-view]').forEach(button=>button.addEventListener('click',()=>changeTeacherView(button.dataset.teacherView)));
  $$('[data-go-view]').forEach(button=>button.addEventListener('click',()=>changeTeacherView(button.dataset.goView)));
  $$('.open-teacher-editor').forEach(button=>button.addEventListener('click',()=>openTeacherEditor()));
  $('#teacherCourseForm').addEventListener('submit',saveTeacherCourse);$('#confirmDeleteCourse').addEventListener('click',removeTeacherCourse);
  $('#teacherCourseSearch').addEventListener('input',event=>renderTeacherCourses(event.target.value,$('[data-teacher-filter].active').dataset.teacherFilter));
  $$('[data-teacher-filter]').forEach(button=>button.addEventListener('click',()=>{$$('[data-teacher-filter]').forEach(item=>item.classList.remove('active'));button.classList.add('active');renderTeacherCourses($('#teacherCourseSearch').value,button.dataset.teacherFilter)}));
  $('#studentSearch').addEventListener('input',event=>renderStudents(event.target.value,$('#studentCourseFilter').value));$('#studentCourseFilter').addEventListener('change',event=>renderStudents($('#studentSearch').value,event.target.value));
  $('#sendQuickAnnouncement').addEventListener('click',publishAnnouncement);$('#openAnnouncement').addEventListener('click',()=>$('#quickAnnouncementText').focus());
  $$('.evaluation-action').forEach(button=>button.addEventListener('click',()=>showToast('Panel de evaluación actualizado')));
  $('#newEvaluation').addEventListener('click',()=>showToast('Nueva evaluación creada como borrador'));$('#teacherNotifications').addEventListener('click',()=>showToast('Tienes 5 novedades académicas'));
  $('#exportStudents').addEventListener('click',()=>{const csv='Estudiante,Curso,Progreso,Nota\n'+EcoData.students.map(student=>`${student.name},${student.course},${student.progress}%,${student.grade}`).join('\n');const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download='estudiantes-ecoaula.csv';link.click();URL.revokeObjectURL(link.href);showToast('Listado exportado')});
});
