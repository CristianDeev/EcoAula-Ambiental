const EcoData={
  courses:[
    {id:'clima',title:'Clima en transformación',category:'Clima',description:'Comprende las causas, impactos y soluciones frente al cambio climático.',modules:6,lessons:12,progress:68,rating:4.8,students:3240,icon:'🌍',theme:'cover-climate',status:'Publicado'},
    {id:'agua',title:'Guardianes del agua',category:'Agua',description:'Aprende a proteger y gestionar responsablemente el recurso más esencial.',modules:5,lessons:10,progress:42,rating:4.9,students:2817,icon:'💧',theme:'cover-water',status:'Publicado'},
    {id:'circular',title:'Residuo cero',category:'Circularidad',description:'Rediseña hábitos y procesos para que nada se convierta en basura.',modules:7,lessons:14,progress:25,rating:4.7,students:1976,icon:'♻',theme:'cover-circular',status:'Publicado'},
    {id:'biodiversidad',title:'Biodiversidad urbana',category:'Biodiversidad',description:'Reconoce, protege y recupera la vida silvestre que habita en las ciudades.',modules:4,lessons:9,progress:0,rating:4.9,students:1534,icon:'🦋',theme:'cover-climate',status:'Publicado'},
    {id:'energia',title:'Energía para el futuro',category:'Clima',description:'Explora fuentes renovables y decisiones de consumo energético consciente.',modules:6,lessons:11,progress:0,rating:4.8,students:2103,icon:'☀️',theme:'cover-circular',status:'Publicado'},
    {id:'oceanos',title:'Océanos vivos',category:'Agua',description:'Conoce los ecosistemas marinos y participa en su conservación.',modules:5,lessons:10,progress:0,rating:4.7,students:1289,icon:'🐋',theme:'cover-water',status:'Borrador'}
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
  ]
};
const EcoStore={
  get(key,fallback){try{const value=localStorage.getItem(`ecoaula_${key}`);return value?JSON.parse(value):fallback}catch{return fallback}},
  set(key,value){localStorage.setItem(`ecoaula_${key}`,JSON.stringify(value))},
  initialize(){if(!this.get('courses',null))this.set('courses',EcoData.courses);if(!this.get('users',null))this.set('users',[{name:'Cristian Arboleda',email:'estudiante@ecoaula.co',password:'123456',role:'student'},{name:'Administrador EcoAula',email:'admin@ecoaula.co',password:'admin123',role:'admin'}])}
};
EcoStore.initialize();

