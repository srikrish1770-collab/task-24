import photos from './photos.js';
const rows = [
['porsche-911','Porsche','911 GT3','Sports',2024,28500000,510,470,3.4,318,'Petrol','Automatic','4.0L flat-six',2,'Rear-wheel drive','photo-1503376780353-7e6692767b70'],
['mercedes-amg','Mercedes-Benz','AMG GT','Sports',2024,24500000,585,800,3.2,315,'Petrol','Automatic','4.0L twin-turbo V8',2,'All-wheel drive','photo-1618843479313-40f8afb4b4d8'],
['audi-r8','Audi','R8 V10','Supercar',2023,27200000,620,580,3.1,331,'Petrol','Automatic','5.2L V10',2,'All-wheel drive','photo-1606152421802-db97b9c7a11b'],
['bmw-m4','BMW','M4 Competition','Sports',2024,15300000,530,650,3.5,290,'Petrol','Automatic','3.0L twin-turbo inline-six',4,'All-wheel drive',null],
['ferrari-296','Ferrari','296 GTB','Supercar',2024,54000000,830,740,2.9,330,'Hybrid','Automatic','3.0L twin-turbo V6 hybrid',2,'Rear-wheel drive',null],
['lamborghini-huracan','Lamborghini','Huracán EVO','Supercar',2023,42200000,640,600,2.9,325,'Petrol','Automatic','5.2L V10',2,'All-wheel drive',null],
['porsche-taycan','Porsche','Taycan Turbo','Electric',2025,25300000,884,890,2.7,260,'Electric','Automatic','Dual electric motors',4,'All-wheel drive',null],
['bmw-i7','BMW','i7 xDrive60','Electric',2024,20300000,544,745,4.7,240,'Electric','Automatic','Dual electric motors',5,'All-wheel drive',null],
['audi-etron','Audi','e-tron GT','Electric',2024,17200000,530,630,4.1,245,'Electric','Automatic','Dual electric motors',5,'All-wheel drive',null],
['mercedes-s','Mercedes-Benz','S 450','Luxury',2024,18000000,367,500,5.1,250,'Petrol','Automatic','3.0L turbo inline-six',5,'All-wheel drive',null],
['bmw-7','BMW','740i','Luxury',2024,18100000,381,520,5.4,250,'Petrol','Automatic','3.0L turbo inline-six',5,'Rear-wheel drive',null],
['bentley-continental','Bentley','Continental GT','Luxury',2024,52600000,550,770,4.0,318,'Petrol','Automatic','4.0L twin-turbo V8',4,'All-wheel drive',null],
['range-rover','Land Rover','Range Rover Sport','SUV',2024,14000000,350,700,5.9,234,'Diesel','Automatic','3.0L turbo inline-six',5,'All-wheel drive',null],
['mercedes-g','Mercedes-Benz','G 63','SUV',2024,36000000,585,850,4.4,220,'Petrol','Automatic','4.0L twin-turbo V8',5,'All-wheel drive',null],
['porsche-cayenne','Porsche','Cayenne','SUV',2024,14300000,353,500,6.0,248,'Petrol','Automatic','3.0L turbo V6',5,'All-wheel drive',null],
['bmw-x5','BMW','X5 xDrive30d','SUV',2024,9800000,286,650,6.1,233,'Diesel','Automatic','3.0L turbo inline-six',5,'All-wheel drive',null],
['porsche-718','Porsche','718 Cayman GT4','Sports',2023,18200000,420,420,4.4,304,'Petrol','Manual','4.0L flat-six',2,'Rear-wheel drive',null],
['audi-a8','Audi','A8 L','Luxury',2024,13400000,340,500,5.7,250,'Petrol','Automatic','3.0L turbo V6',5,'All-wheel drive',null]
];
export const cars = rows.map(([id,brand,model,category,year,price,hp,torque,acceleration,speed,fuel,transmission,engine,seats,drivetrain,photo])=>({id,brand,model,category,year,price,hp,torque,acceleration,speed,fuel,transmission,engine,seats,drivetrain,photoSource:photos[id]?.source,photo:photos[id]?.url||(photo?`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1600&q=85`:null)}));
export const brands = [...new Set(cars.map(c=>c.brand))];
export const categories = ['Sports','Luxury','SUV','Supercar','Electric'];
export const money = n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);



