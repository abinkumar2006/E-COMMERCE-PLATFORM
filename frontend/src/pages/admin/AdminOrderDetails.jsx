import { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
import api from "../../api";
import Status from "../../components/Status";

const stages=["Pending","Processing","Shipped","Delivered"];
export default function AdminOrderDetails(){
 const {id}=useParams(),[order,setOrder]=useState(null),[error,setError]=useState("");
 const load=async()=>{try{const r=await api.get(`/admin/orders/${id}`);setOrder(r.data.order)}catch(e){setError(e.response?.data?.message||"Unable to load order.")}};
 useEffect(()=>{load()},[id]);
 if(error)return <section className="container-shell section-space"><Link to="/admin/orders" className="text-sm text-muted">← Back to orders</Link><div className="card p-8 mt-8 text-red-600">{error}</div></section>;
 if(!order)return <div className="container-shell py-24">Loading…</div>;
 const current=stages.indexOf(order.status);
 return <section className="container-shell section-space"><Link to="/admin/orders" className="text-sm text-muted">← Back to orders</Link><div className="flex justify-between items-end gap-4 mt-8"><div><p className="text-xs text-muted">ORDER #{order._id.slice(-8).toUpperCase()}</p><h1 className="font-display text-5xl">Order details</h1></div><Status status={order.status}/></div><div className="card p-7 mt-10"><h2 className="font-display text-2xl">Order progress</h2><div className="grid grid-cols-4 gap-2 mt-8">{stages.map((x,i)=><div key={x}><div className={`h-1 rounded ${i<=current?"bg-gold":"bg-black/10"}`}/><p className={`text-xs mt-2 ${i<=current?"font-semibold":"text-muted"}`}>{x}</p></div>)}</div></div><div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-8"><div className="card p-7"><h2 className="font-display text-xl">Items</h2>{order.items.map(i=><div className="flex gap-4 py-4 border-b last:border-0" key={`${i.product}-${i.name}`}><img src={i.image} alt="" className="h-20 w-16 rounded-xl object-cover"/><div className="flex-1"><b>{i.name}</b><p className="text-sm text-muted">${Number(i.price).toFixed(2)} × {i.quantity}</p></div><span>${(i.price*i.quantity).toFixed(2)}</span></div>)}</div><aside className="card p-7 h-fit"><h2 className="font-display text-xl">Customer</h2><p className="mt-4 font-medium">{order.user?.name}</p><p className="text-sm text-muted">{order.user?.email}</p><div className="border-t mt-6 pt-5"><h3 className="font-medium">Shipping to</h3><p className="text-sm text-muted mt-2 leading-6">{order.shippingAddress.line1}<br/>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br/>{order.shippingAddress.country}</p></div><div className="border-t mt-6 pt-5 flex justify-between"><b>Total</b><b>${Number(order.total||0).toFixed(2)}</b></div></aside></div></section>
}
