export function filterCars(cars,params){
 const get=k=>params.get(k)||'';
 const result=cars.filter(c=>(`${c.brand} ${c.model}`.toLowerCase().includes(get('q').toLowerCase()))&&(!get('brand')||c.brand===get('brand'))&&(!get('category')||c.category===get('category'))&&(!get('fuel')||c.fuel===get('fuel'))&&(!get('transmission')||c.transmission===get('transmission'))&&(!get('price')||c.price<=Number(get('price'))));
 return result.sort((a,b)=>get('sort')==='price-up'?a.price-b.price:get('sort')==='price-down'?b.price-a.price:get('sort')==='year'?b.year-a.year:a.model.localeCompare(b.model));
}
export function readIds(raw,valid){try{const v=JSON.parse(raw);return Array.isArray(v)?[...new Set(v.filter(id=>valid.includes(id)))]:[];}catch{return [];}}
export function compareAdd(ids,id){return ids.includes(id)?{ids,message:'This vehicle is already in your comparison.'}:ids.length>=3?{ids,message:'Compare up to three vehicles. Remove one to add another.'}:{ids:[...ids,id],message:'Added to comparison.'};}
export function localToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function validate(values,booking=false){const e={};if(!values.name?.trim())e.name='Enter your name.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email||''))e.email='Enter a valid email address.';if(!/^[+\d][\d\s()-]{7,18}$/.test(values.phone||''))e.phone='Enter a valid phone number.';if(booking){if(!values.car)e.car='Select a vehicle.';if(!/^\d{4}-\d{2}-\d{2}$/.test(values.date||'')||values.date<localToday())e.date='Choose today or a future date.';if(!values.time)e.time='Select a time.';}else if(!values.message?.trim())e.message='Enter your message.';return e;}

