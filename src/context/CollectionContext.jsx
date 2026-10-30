import {createContext,useContext,useState} from 'react';
import {cars} from '../data/cars';
import {readIds,compareAdd} from '../utils/logic';
const State=createContext(null);
function initial(key){try{return readIds(localStorage.getItem(key),cars.map(c=>c.id));}catch{return [];}}
export function CollectionProvider({children}){
 const [favorites,setFavorites]=useState(()=>initial('apex-favorites'));
 const [comparison,setComparison]=useState(()=>initial('apex-comparison').slice(0,3));
 const [notice,setNotice]=useState('');
 function save(key,ids,set){set(ids);try{localStorage.setItem(key,JSON.stringify(ids));}catch{setNotice('Storage unavailable. Your selection is saved for this session.');}}
 function favorite(id){save('apex-favorites',favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id],setFavorites);}
 function compare(id){const result=compareAdd(comparison,id);save('apex-comparison',result.ids,setComparison);setNotice(result.message);}
 function remove(id){save('apex-comparison',comparison.filter(x=>x!==id),setComparison);}
 function clear(){save('apex-comparison',[],setComparison);}
 return <State.Provider value={{favorites,comparison,favorite,compare,remove,clear,setNotice}}>{children}{notice&&<div className="toast" role="status">{notice}<button aria-label="Dismiss notification" onClick={()=>setNotice('')}>×</button></div>}</State.Provider>;
}
export function useCollection(){return useContext(State);}

