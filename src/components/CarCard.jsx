import {Link} from 'react-router-dom';
import {Heart,ArrowUpRight,Plus,Gauge,Fuel} from 'lucide-react';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {money} from '../data/cars';
import {useCollection} from '../context/CollectionContext';
export function CarImage({car,...props}){const [failed,setFailed]=useState(false);return car.photo&&!failed?<img src={car.photo} alt={`${car.brand} ${car.model} — illustrative model-family photography; year and trim may differ`} width="1200" height="750" loading="lazy" onError={()=>setFailed(true)} {...props}/>:<div className="image-placeholder" role="img" aria-label={`${car.brand} ${car.model}: model photograph unavailable`}><span>{car.brand}</span><strong>{car.model}</strong><small>MODEL PHOTOGRAPH UNAVAILABLE</small></div>;}
export function CarCard({car}){const {favorites,favorite,compare,comparison}=useCollection();return <motion.article className="car-card" initial={false} whileTap={{scale:0.995}}><div className="car-image"><Link to={`/cars/${car.id}`}><CarImage car={car}/></Link><span className="tag">{car.category}</span><button className={`heart ${favorites.includes(car.id)?'selected':''}`} aria-label={`${favorites.includes(car.id)?'Remove':'Save'} ${car.model} ${favorites.includes(car.id)?'from':'to'} wishlist`} onClick={()=>favorite(car.id)}><Heart size={17} fill={favorites.includes(car.id)?'currentColor':'none'}/></button></div><div className="car-info"><p className="eyebrow">{car.brand} <span>{car.year}</span></p><Link className="car-title" to={`/cars/${car.id}`}>{car.model}<ArrowUpRight size={21}/></Link><div className="spec-line"><span><Gauge size={13}/>{car.hp} hp</span><span><Fuel size={13}/>{car.fuel}</span><span>{car.transmission}</span></div><div className="car-bottom"><strong>{money(car.price)}</strong><button onClick={()=>compare(car.id)} aria-label={`Compare ${car.model}`}><Plus size={14}/>{comparison.includes(car.id)?'Added':'Compare'}</button></div></div></motion.article>;}
export function Empty({title='Nothing here yet',text='Explore the collection to find your next obsession.'}){return <div className="empty"><h2>{title}</h2><p>{text}</p><Link className="button" to="/collection">Explore collection <ArrowUpRight size={17}/></Link></div>;}



