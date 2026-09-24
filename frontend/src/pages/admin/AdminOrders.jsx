import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Status from "../../components/Status";
const statuses=["Pending","Processing","Shipped","Delivered"];
export default function AdminOrders(){
 const [orders,setOrders]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const load=async()=>{try{setError("");setLoading(true);const r=await api.get("/admin/orders");setOrders(r.data.orders||[])}catch(e){setError(e.response?.data?.message||"Unable to load orders.")}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const update=async(id,status)=>{try{await api.put(`/admin/orders/${id}/status`,{status});await load()}catch(e){setError(e.response?.data?.message||"Unable to update order.")}};
 return <section className="container-shell section-space"><p className="eyebrow">Admin portal</p><h1 className="font-display text-5xl">Orders</h1><p className="text-muted mt-3">Monitor every customer order and update its delivery status.</p>{error&&<div className="card p-5 mt-8 bg-red-50 text-red-700">{error}</div>}<div className="card overflow-x-auto mt-10">{loading?<div className="p-8 text-center text-muted">Loading orders…</div>:<table className="w-full text-sm"><thead className="bg-black/5 text-left"><tr><th className="p-5">Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>{orders.map(x=><tr className="border-t" key={x._id}><td className="p-5"><Link className="hover:text-gold" to={`/admin/orders/${x._id}`}>#{x._id.slice(-8).toUpperCase()}</Link><div className="text-xs text-muted mt-1">{new Date(x.createdAt).toLocaleDateString()}</div></td><td>{x.user?.name||"Unknown"}<div className="text-xs text-muted">{x.user?.email||""}</div></td><td>${Number(x.total||0).toFixed(2)}</td><td><Status status={x.status}/></td><td><select className="input h-9 w-36" value={x.status} onChange={e=>update(x._id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table>}</div></section>
}
