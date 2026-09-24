import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import api from "../../api";

function CatalogList({ title, items, setItems, type, onChanged }) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const save = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const url = `/catalog/${type}`;
      const res = editing ? await api.put(`${url}/${editing}`, { name }) : await api.post(url, { name });
      if (editing) setItems(items.map((x) => x._id === editing ? res.data[type === "categories" ? "category" : "brand"] : x));
      else setItems([...items, res.data[type === "categories" ? "category" : "brand"]].sort((a,b) => a.name.localeCompare(b.name)));
      setName(""); setEditing(null); onChanged();
    } catch (e) { setError(e.response?.data?.message || "Unable to save."); }
  };

  const remove = async (id) => {
    if (!confirm(`Delete this ${type === "categories" ? "category" : "brand"}?`)) return;
    try { setError(""); await api.delete(`/catalog/${type}/${id}`); setItems(items.filter((x) => x._id !== id)); onChanged(); }
    catch (e) { setError(e.response?.data?.message || "Unable to delete."); }
  };

  return <div className="card p-6">
    <div className="flex justify-between items-center gap-4"><h2 className="font-display text-2xl">{title}</h2><span className="pill bg-black/5">{items.length}</span></div>
    <form onSubmit={save} className="flex gap-2 mt-5"><input className="input" placeholder={`New ${type === "categories" ? "category" : "brand"}`} value={name} onChange={(e)=>setName(e.target.value)} required/><button className="btn btn-dark"><Plus size={16}/>{editing ? "Update" : "Add"}</button></form>
    {editing && <button className="text-sm text-muted mt-2" onClick={()=>{setEditing(null);setName("")}}>Cancel edit</button>}
    {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    <div className="mt-5 divide-y">{items.map((x)=><div className="py-3 flex justify-between items-center gap-3" key={x._id}><span>{x.name}</span><div className="flex gap-1"><button className="icon-btn" onClick={()=>{setEditing(x._id);setName(x.name)}}><Pencil size={15}/></button><button className="icon-btn" onClick={()=>remove(x._id)}><Trash2 size={15}/></button></div></div>)}{!items.length&&<p className="text-sm text-muted py-5">No {type} yet.</p>}</div>
  </div>;
}

export default function AdminCatalog(){
  const [categories,setCategories]=useState([]),[brands,setBrands]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const load=async()=>{try{setError("");const [c,b]=await Promise.all([api.get("/catalog/categories"),api.get("/catalog/brands")]);setCategories(c.data.categories);setBrands(b.data.brands)}catch(e){setError(e.response?.data?.message||"Unable to load catalog data.")}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  return <section className="container-shell section-space"><p className="eyebrow">Admin portal</p><div className="flex justify-between items-end"><div><h1 className="font-display text-5xl">Catalog</h1><p className="text-muted mt-3">Manage the categories and brands used throughout the store.</p></div></div>{error&&<div className="card p-5 mt-8 text-red-600">{error}</div>}{loading?<div className="py-16">Loading…</div>:<div className="grid lg:grid-cols-2 gap-6 mt-10"><CatalogList title="Categories" items={categories} setItems={setCategories} type="categories" onChanged={load}/><CatalogList title="Brands" items={brands} setItems={setBrands} type="brands" onChanged={load}/></div>}</section>
}
