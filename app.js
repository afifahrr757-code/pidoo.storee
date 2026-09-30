// ====== DATA PRODUK (ubah di sini untuk mengganti katalog) ======
const PRODUCTS = [
  {id:1,name:"Cardigan Pastel Rajut",from:"Jepang",flag:"🇯🇵",emoji:"🧶",size:"M",cond:"9/10",price:89000,bg:"#E9E2FF"},
  {id:2,name:"Rok Mini Pita",from:"Korea",flag:"🇰🇷",emoji:"🎀",size:"S",cond:"9/10",price:75000,bg:"#FFE0EE"},
  {id:3,name:"Jaket Varsity Retro",from:"Amerika",flag:"🇺🇸",emoji:"🧥",size:"L",cond:"8/10",price:185000,bg:"#FFF1B8"},
  {id:4,name:"Scarf Rajut Tebal",from:"Inggris",flag:"🇬🇧",emoji:"🧣",size:"All size",cond:"9/10",price:55000,bg:"#D5F7E7"},
  {id:5,name:"Kemeja Kotak Oversize",from:"Amerika",flag:"🇺🇸",emoji:"👔",size:"XL",cond:"8/10",price:95000,bg:"#FFE0EE"},
  {id:6,name:"Dress Floral Vintage",from:"Jepang",flag:"🇯🇵",emoji:"👗",size:"M",cond:"9/10",price:135000,bg:"#FFF1B8"},
  {id:7,name:"Celana Jeans Wide Leg",from:"Korea",flag:"🇰🇷",emoji:"👖",size:"M",cond:"9/10",price:120000,bg:"#E9E2FF"},
  {id:8,name:"Hoodie Beruang Lucu",from:"Jepang",flag:"🇯🇵",emoji:"🧸",size:"L",cond:"9/10",price:110000,bg:"#D5F7E7"},
  {id:9,name:"Trench Coat Klasik",from:"Inggris",flag:"🇬🇧",emoji:"🧥",size:"M",cond:"8/10",price:210000,bg:"#FFE0EE"},
  {id:10,name:"Kaos Band Vintage",from:"Amerika",flag:"🇺🇸",emoji:"👕",size:"L",cond:"8/10",price:85000,bg:"#FFF1B8"},
  {id:11,name:"Topi Bucket Strawberry",from:"Korea",flag:"🇰🇷",emoji:"🍓",size:"All size",cond:"10/10",price:45000,bg:"#D5F7E7"},
  {id:12,name:"Sweater Argyle Preppy",from:"Inggris",flag:"🇬🇧",emoji:"🌈",size:"M",cond:"9/10",price:99000,bg:"#E9E2FF"}
];

// ====== HELPER ======
const $ = s => document.querySelector(s);
const rp = n => "Rp" + n.toLocaleString("id-ID");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

let cart = load("tt_cart", []);        // array id produk (stok 1 per model)
let wish = load("tt_wish", []);
let user = load("tt_session", null);
let sold = load("tt_sold", []);
let filter = "Semua", query = "";

// ====== TOAST & MODAL ======
let tt;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("show"),2200); }
function openEl(el){ $("#overlay").hidden=false; el.hidden=false; }
function closeAll(){ document.querySelectorAll(".modal,.drawer,.overlay").forEach(e=>e.hidden=true); }
document.addEventListener("click",e=>{ if(e.target.closest("[data-close]")||e.target.id==="overlay") closeAll(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeAll(); });

// ====== KATALOG ======
function renderChips(){
  const list=["Semua",...new Set(PRODUCTS.map(p=>p.from))];
  $("#chips").innerHTML=list.map(c=>`<button class="chip ${c===filter?"on":""}" data-f="${c}">${c==="Semua"?"🌍 ":""}${c}</button>`).join("");
}
$("#chips").addEventListener("click",e=>{const b=e.target.closest("[data-f]"); if(!b)return; filter=b.dataset.f; renderChips(); renderGrid();});
$("#search").addEventListener("input",e=>{query=e.target.value.toLowerCase(); renderGrid();});

function renderGrid(){
  const items=PRODUCTS.filter(p=>(filter==="Semua"||p.from===filter)&&p.name.toLowerCase().includes(query));
  $("#empty").hidden=items.length>0;
  $("#grid").innerHTML=items.map(p=>{
    const isSold=sold.includes(p.id), inCart=cart.includes(p.id);
    return `<article class="card">
      <div class="pic" style="background:${p.bg}"><span class="from">${p.flag} ${p.from}</span>
        <button class="heart ${wish.includes(p.id)?"on":""}" data-w="${p.id}" aria-label="Simpan ke favorit">♥</button>${p.emoji}</div>
      <div class="info"><h3>${esc(p.name)}</h3><span class="meta">Ukuran ${p.size} · Kondisi ${p.cond}</span>
        <div class="buy"><span class="price">${rp(p.price)}</span>
        <button class="add" data-a="${p.id}" ${isSold||inCart?"disabled":""}>${isSold?"Terjual":inCart?"Di keranjang":"Tambah"}</button></div></div>
    </article>`;}).join("");
}
$("#grid").addEventListener("click",e=>{
  const a=e.target.closest("[data-a]"), w=e.target.closest("[data-w]");
  if(a){ cart.push(+a.dataset.a); save("tt_cart",cart); update(); toast("Masuk keranjang 🛍️"); }
  if(w){ const id=+w.dataset.w; wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id]; save("tt_wish",wish); renderGrid(); }
});

// ====== KERANJANG ======
function update(){ $("#cartCount").textContent=cart.length; renderGrid(); renderCart(); }
const subtotal=()=>cart.reduce((s,id)=>s+PRODUCTS.find(p=>p.id===id).price,0);
function renderCart(){
  $("#cartItems").innerHTML=cart.length?cart.map(id=>{const p=PRODUCTS.find(x=>x.id===id);
    return `<div class="item"><div class="em" style="background:${p.bg}">${p.emoji}</div>
      <div class="t">${esc(p.name)}<small>${p.flag} ${p.size} · ${rp(p.price)}</small></div>
      <button class="rm" data-r="${id}" aria-label="Hapus ${esc(p.name)}">🗑️</button></div>`}).join("")
    :`<p class="empty">Keranjangmu masih kosong. Yuk pilih baju dulu.</p>`;
  $("#subtotal").textContent=rp(subtotal());
}
$("#cartItems").addEventListener("click",e=>{const r=e.target.closest("[data-r]"); if(!r)return; cart=cart.filter(x=>x!==+r.dataset.r); save("tt_cart",cart); update();});
$("#btnCart").onclick=()=>{renderCart(); openEl($("#drawer"));};

// ====== LOGIN / DAFTAR (demo: data disimpan di browser) ======
let mode="login";
async function hash(s){ const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join(""); }
function setMode(m){ mode=m; $("#nameWrap").hidden=m==="login";
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab===m));
  $("#authTitle").textContent=m==="login"?"Masuk ke akunmu":"Buat akun baru";
  $("#authSubmit").textContent=m==="login"?"Masuk":"Daftar sekarang"; $("#authErr").textContent=""; }
document.querySelector(".tabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]"); if(b) setMode(b.dataset.tab);});
function renderAuth(){ $("#btnAuth").textContent=user?`Hai, ${user.name.split(" ")[0]} 👋`:"Masuk"; }
$("#btnAuth").onclick=()=>{
  if(user){ if(confirm("Keluar dari akun?")){ user=null; localStorage.removeItem("tt_session"); renderAuth(); toast("Sampai jumpa lagi 👋"); } return; }
  setMode("login"); openEl($("#authModal"));
};
$("#authForm").addEventListener("submit",async e=>{
  e.preventDefault(); const f=new FormData(e.target), email=f.get("email").trim().toLowerCase(), pw=await hash(f.get("password"));
  const users=load("tt_users",[]); const found=users.find(u=>u.email===email);
  if(mode==="register"){
    if(found) return $("#authErr").textContent="Email ini sudah terdaftar. Silakan masuk.";
    const u={name:(f.get("name")||"Kawan Thrift").trim(),email,pw}; users.push(u); save("tt_users",users); user={name:u.name,email};
  } else {
    if(!found||found.pw!==pw) return $("#authErr").textContent="Email atau kata sandi belum cocok. Coba lagi.";
    user={name:found.name,email};
  }
  save("tt_session",user); renderAuth(); closeAll(); e.target.reset(); toast(`Selamat datang, ${user.name}! 💖`);
});

// ====== CHECKOUT ======
$("#btnCheckout").onclick=()=>{
  if(!cart.length) return toast("Keranjang masih kosong");
  closeAll(); const f=$("#coForm");
  if(user){ f.name.value=user.name; f.email.value=user.email; }
  calc(); openEl($("#checkoutModal"));
};
function calc(){
  const ship=+$("#coForm").ship.value, sub=subtotal();
  $("#coSum").innerHTML=`<div class="row"><span>Subtotal (${cart.length} barang)</span><span>${rp(sub)}</span></div>
  <div class="row"><span>Ongkir</span><span>${rp(ship)}</span></div>
  <div class="row total"><span>Total</span><span>${rp(sub+ship)}</span></div>`;
}
$("#coForm").ship.addEventListener("change",calc);
$("#coForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=e.target;
  const order={id:"TT-"+Date.now().toString(36).toUpperCase(),items:[...cart],total:subtotal()+ +f.ship.value,
    name:f.name.value,phone:f.phone.value,email:f.email.value,address:f.address.value,city:f.city.value,zip:f.zip.value,pay:f.pay.value,date:new Date().toISOString()};
  save("tt_orders",[...load("tt_orders",[]),order]);
  sold=[...sold,...cart]; save("tt_sold",sold); cart=[]; save("tt_cart",cart);
  closeAll(); update(); f.reset();
  $("#doneMsg").innerHTML=`Nomor pesanan <b>${order.id}</b><br>Total ${rp(order.total)} via ${esc(order.pay)}.<br>Detail dikirim ke ${esc(order.email)}.`;
  openEl($("#doneModal"));
});

renderChips(); renderAuth(); update();
