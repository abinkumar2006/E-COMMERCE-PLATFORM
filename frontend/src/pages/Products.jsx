import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Products(){
  const [sp,setSp]=useSearchParams();
  const [products,setProducts]=useState([]),[categories,setCategories]=useState([]),[brands,setBrands]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const search=sp.get("search")||"",category=sp.get("category")||"",brand=sp.get("brand")||"";
  useEffect(()=>{Promise.all([api.get("/products/categories"),api.get("/products/brands")]).then(([c,b])=>{setCategories(c.data.categories);setBrands(b.data.brands)}).catch(()=>{})},[]);
  useEffect(()=>{setLoading(true);setError("");api.get("/products",{params:{search,category,brand}}).then(r=>setProducts(r.data.products)).catch(e=>setError(e.response?.data?.message||"Unable to load products.")).finally(()=>setLoading(false))},[search,category,brand]);
  const update=(key,value)=>{const next={search,category,brand};if(value)next[key]=value;else delete next[key];setSp(next)};
  return <section className="container-shell section-space"><p className="eyebrow">Products</p><h1 className="font-display text-5xl">Browse products</h1><p className="text-muted mt-3">Find products by category, brand, or search for something specific.</p>
    <div className="grid md:grid-cols-2 gap-3 my-8"><select className="input" value={category} onChange={e=>update("category",e.target.value)}><option value="">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select><select className="input" value={brand} onChange={e=>update("brand",e.target.value)}><option value="">All brands</option>{brands.map(b=><option key={b} value={b}>{b}</option>)}</select></div>
    <div className="flex flex-wrap gap-2 mb-8"><button className={`pill border ${!category&&!brand?"bg-ink text-white":"bg-white"}`} onClick={()=>setSp(search?{search}:{})}>All</button>{categories.map(c=><button key={c} className={`pill border ${category===c?"bg-ink text-white":"bg-white"}`} onClick={()=>update("category",c)}>{c}</button>)}</div>
    {error?<div className="card p-8 text-red-600">{error}</div>:loading?<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{[1,2,3,4].map(i=><div className="aspect-[4/5] bg-black/5 rounded-3xl animate-pulse" key={i}/>)}</div>:products.length?<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{products.map(x=><ProductCard key={x._id} product={x}/>)}</div>:<div className="card p-16 text-center"><h2 className="font-display text-2xl">Nothing found</h2><p className="text-muted mt-2">Try another search, category, or brand.</p></div>}
  </section>
}
