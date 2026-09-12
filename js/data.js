const EcoData={
  courses:[
    {id:'clima',title:'Clima en transformación',category:'Clima',description:'Comprende las causas, impactos y soluciones frente al cambio climático desde una perspectiva científica, territorial y ciudadana.',modules:6,lessons:12,progress:68,rating:4.8,students:3240,icon:'🌍',theme:'cover-climate',status:'Publicado',duration:'12 horas',level:'Intermedio',instructor:'Laura Mendoza',owner:'docente@ecoaula.co',updated:'10 sep. 2026',objectives:['Interpretar evidencias del cambio climático','Diferenciar mitigación y adaptación','Diseñar una acción climática local'],syllabus:['Fundamentos del sistema climático','Atmósfera y efecto invernadero','Impactos en Colombia','Justicia climática','Soluciones basadas en la naturaleza','Proyecto final']},
    {id:'agua',title:'Guardianes del agua',category:'Agua',description:'Aprende a proteger y gestionar responsablemente el agua mediante análisis de cuencas, consumo consciente y soluciones comunitarias.',modules:5,lessons:10,progress:42,rating:4.9,students:2817,icon:'💧',theme:'cover-water',status:'Publicado',duration:'10 horas',level:'Inicial',instructor:'Laura Mendoza',owner:'docente@ecoaula.co',updated:'8 sep. 2026',objectives:['Comprender el ciclo integral del agua','Calcular la huella hídrica personal','Proponer acciones de conservación'],syllabus:['El agua como sistema','Cuencas y territorio','Huella hídrica','Calidad y contaminación','Proyecto Guardianes del agua']},
    {id:'circular',title:'Residuo cero',category:'Circularidad',description:'Rediseña hábitos y procesos aplicando prevención, reutilización, reparación y aprovechamiento de materiales.',modules:7,lessons:14,progress:25,rating:4.7,students:1976,icon:'♻',theme:'cover-circular',status:'Publicado',duration:'14 horas',level:'Intermedio',instructor:'Laura Mendoza',owner:'docente@ecoaula.co',updated:'11 sep. 2026',objectives:['Aplicar la jerarquía de residuos','Realizar una auditoría doméstica','Diseñar un plan de circularidad'],syllabus:['Del residuo al recurso','Consumo responsable','Separación en la fuente','Compostaje','Ecodiseño','Modelos circulares','Reto residuo cero']},
    {id:'biodiversidad',title:'Biodiversidad urbana',category:'Biodiversidad',description:'Reconoce, protege y recupera la vida silvestre que comparte nuestros barrios, parques y corredores urbanos.',modules:4,lessons:9,progress:0,rating:4.9,students:1534,icon:'🦋',theme:'cover-climate',status:'Publicado',duration:'8 horas',level:'Inicial',instructor:'Mateo Ríos',owner:'mateo@ecoaula.co',updated:'4 sep. 2026',objectives:['Identificar especies urbanas','Reconocer amenazas ecológicas','Crear un corredor para polinizadores'],syllabus:['Ciudad y naturaleza','Flora urbana','Fauna cercana','Proyecto de biodiversidad']},
    {id:'energia',title:'Energía para el futuro',category:'Clima',description:'Explora fuentes renovables, eficiencia energética y decisiones responsables para una transición justa.',modules:6,lessons:11,progress:0,rating:4.8,students:2103,icon:'☀️',theme:'cover-circular',status:'Publicado',duration:'11 horas',level:'Avanzado',instructor:'Sara Vélez',owner:'sara@ecoaula.co',updated:'2 sep. 2026',objectives:['Comparar fuentes de energía','Medir el consumo energético','Formular una propuesta de eficiencia'],syllabus:['Energía y sociedad','Fuentes renovables','Eficiencia','Transición justa','Caso colombiano','Proyecto energético']},
    {id:'oceanos',title:'Océanos vivos',category:'Agua',description:'Conoce los ecosistemas marinos, sus principales amenazas y las estrategias que permiten conservarlos.',modules:5,lessons:10,progress:0,rating:4.7,students:1289,icon:'🐋',theme:'cover-water',status:'Borrador',duration:'10 horas',level:'Inicial',instructor:'Laura Mendoza',owner:'docente@ecoaula.co',updated:'12 sep. 2026',objectives:['Reconocer ecosistemas marinos','Analizar impactos del plástico','Diseñar una campaña de conservación'],syllabus:['Planeta océano','Arrecifes y manglares','Contaminación marina','Pesca responsable','Campaña final']}
  ],
  modules:[
    {title:'1. Comprender el clima',lessons:['Tiempo y clima','El sistema climático','Evidencias del cambio'],complete:true},
    {title:'2. La atmósfera cambia',lessons:['Balance energético','Gases de efecto invernadero','El efecto invernadero','Actividad de reflexión'],open:true,active:2},
    {title:'3. Impactos y territorio',lessons:['Riesgos en Colombia','Justicia climática','Caso de estudio'],complete:false},
    {title:'4. Soluciones',lessons:['Mitigación y adaptación','Plan de acción','Evaluación final'],complete:false}
  ],
  quiz:[
    {question:'¿Cuál es la función natural del efecto invernadero?',answers:['Impedir que llegue la luz solar','Mantener una temperatura adecuada para la vida','Producir oxígeno en la atmósfera','Eliminar el dióxido de carbono'],correct:1},
    {question:'¿Qué actividad humana libera grandes cantidades de CO₂?',answers:['La fotosíntesis de los bosques','El ciclo natural del agua','La quema de combustibles fósiles','La formación de nubes'],correct:2},
    {question:'¿Cuál de estos gases tiene relación importante con la ganadería?',answers:['Metano','Oxígeno','Hidrógeno','Helio'],correct:0},
    {question:'¿Qué diferencia existe entre mitigación y adaptación?',answers:['Son exactamente lo mismo','La mitigación reduce causas y la adaptación enfrenta impactos','La adaptación solo ocurre en ciudades','La mitigación aumenta las emisiones'],correct:1},
    {question:'¿Cuál es una acción efectiva frente al cambio climático?',answers:['Aumentar el consumo desechable','Desperdiciar energía','Proteger ecosistemas y usar energías limpias','Quemar residuos al aire libre'],correct:2}
  ],
  students:[
    {name:'Valentina Ruiz',course:'Clima en transformación',progress:84,grade:4.6,lastAccess:'Hoy, 8:42 a. m.'},
    {name:'Carlos Melo',course:'Guardianes del agua',progress:100,grade:4.9,lastAccess:'Ayer, 6:20 p. m.'},
    {name:'Daniela López',course:'Residuo cero',progress:62,grade:4.2,lastAccess:'Hoy, 10:15 a. m.'},
    {name:'Juan Esteban',course:'Clima en transformación',progress:38,grade:3.8,lastAccess:'Hace 3 días'}
  ]
};
const EcoStore={
  get(key,fallback){try{const value=localStorage.getItem(`ecoaula_${key}`);return value?JSON.parse(value):fallback}catch{return fallback}},
  set(key,value){localStorage.setItem(`ecoaula_${key}`,JSON.stringify(value))},
  initialize(){
    const savedCourses=this.get('courses',[]);
    const merged=EcoData.courses.map(course=>({...course,...savedCourses.find(item=>item.id===course.id)}));
    savedCourses.filter(course=>!merged.some(item=>item.id===course.id)).forEach(course=>merged.push(course));
    this.set('courses',merged);
    const users=this.get('users',[]);
    const defaults=[
      {name:'Cristian Arboleda',email:'estudiante@ecoaula.co',password:'123456',role:'student'},
      {name:'Laura Mendoza',email:'docente@ecoaula.co',password:'docente123',role:'teacher'},
      {name:'Administrador EcoAula',email:'admin@ecoaula.co',password:'admin123',role:'admin'}
    ];
    defaults.forEach(user=>{if(!users.some(item=>item.email===user.email))users.push(user)});
    this.set('users',users);
  }
};
EcoStore.initialize();
