import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { specials } from '../data/menu';
export default function SpecialCards() { return <div className="card-grid">{specials.map(item => <article className="dish-card" key={item.id}><img src={item.image} alt={item.alt} loading="lazy"/><div className="dish-body"><div className="dish-title"><h3>{item.name}</h3><strong>{item.price}</strong></div><p>{item.description}</p><Link to="/reservations" className="text-link">Reserve to enjoy <ArrowUpRight size={18} aria-hidden="true"/></Link></div></article>)}</div>; }
