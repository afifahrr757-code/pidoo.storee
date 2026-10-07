const products = [
 {id:1,name:"Tokyo Varsity Jacket",category:"outerwear",price:489000,meta:"Japan · Grade A",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",tag:"Rare Find"},
 {id:2,name:"Washed Denim Overshirt",category:"outerwear",price:359000,meta:"USA · Grade A",image:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=80",tag:"Vintage"},
 {id:3,name:"Cream Knit Polo",category:"tops",price:279000,meta:"Korea · Grade A",image:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=80",tag:"New Drop"},
 {id:4,name:"90s Stripe Rugby",category:"tops",price:315000,meta:"UK · Grade B+",image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",tag:"Vintage"},
 {id:5,name:"Wide Pleat Trousers",category:"bottoms",price:389000,meta:"Japan · Grade A",image:"https://images.unsplash.com/photo-1506629905607-d9c297d6c7f0?auto=format&fit=crop&w=700&q=80",tag:"Curated"},
 {id:6,name:"Faded Carpenter Pants",category:"bottoms",price:425000,meta:"USA · Grade A-",image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",tag:"One of One"},
 {id:7,name:"Retro Leather Bag",category:"accessories",price:299000,meta:"Italy · Grade A-",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",tag:"Archive"},
 {id:8,name:"Silk Printed Scarf",category:"accessories",price:189000,meta:"France · Grade A",image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80",tag:"Rare Find"}
];

let cart = JSON.parse(localStorage.getItem("thrifterraCart") || "[]");
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

function renderProducts(category="all"){
  const grid=document.getElementById("productGrid");
  const list=category==="all"?products:products.filter(p=>p.category===category);
  grid.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="tag">${p.tag}</span>
        <button class="add" onclick="addToCart(${p.id})" aria-label="Tambah ${p.name}">+</button>
      </div>
      <div class="product-info">
        <div><div class="product-name">${p.name}</div><div class="product-meta">${p.meta}</div></div>
        <div class="product-price">${rupiah(p.price)}</div>
      </div>
    </article>`).join("");
}
function saveCart(){localStorage.setItem("thrifterraCart",JSON.stringify(cart));}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++;
  else cart.push({id,qty:1});
  saveCart();renderCart();openCart();toast("Item added to your bag.");
}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  saveCart();renderCart();
}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  const box=document.getElementById("cartItems"), empty=document.getElementById("cartEmpty"), footer=document.getElementById("cartFooter");
  if(!cart.length){box.innerHTML="";empty.style.display="grid";footer.style.display="none";return}
  empty.style.display="none";footer.style.display="block";
  box.innerHTML=cart.map(x=>{
    const p=products.find(p=>p.id===x.id);
    return `<div class="cart-row">
      <img src="${p.image}" alt="${p.name}">
      <div><h4>${p.name}</h4><p>${rupiah(p.price)}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>
      <button class="remove" onclick="changeQty(${p.id},-${x.qty})">Remove</button>
    </div>`}).join("");
  const total=cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id).price*x.qty),0);
  document.getElementById("cartSubtotal").textContent=rupiah(total);
  document.getElementById("checkoutTotal").textContent=rupiah(total);
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeAll(){document.querySelectorAll(".drawer,.modal").forEach(x=>x.classList.remove("open","show"));document.getElementById("overlay").classList.remove("show")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function openAuth(){document.getElementById("authModal").classList.add("show");document.getElementById("overlay").classList.add("show")}
document.addEventListener("DOMContentLoaded",()=>{
 renderProducts();renderCart();
 document.getElementById("filters").addEventListener("click",e=>{
   const btn=e.target.closest(".filter");if(!btn)return;
   document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts(btn.dataset.category);
 });
 document.getElementById("cartBtn").onclick=openCart;
 document.getElementById("loginBtn").onclick=openAuth;
 document.getElementById("footerLogin").onclick=e=>{e.preventDefault();openAuth()};
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeAll);
 document.getElementById("overlay").onclick=closeAll;
 document.getElementById("searchBtn").onclick=()=>{document.getElementById("shop").scrollIntoView();toast("Use the collection filters to browse.")};
 document.querySelectorAll(".category-card").forEach(c=>c.onclick=e=>{e.preventDefault();const cat=c.dataset.jump;document.querySelector(`[data-category="${cat}"]`).click();document.getElementById("shop").scrollIntoView({behavior:"smooth"})});
 document.getElementById("authForm").onsubmit=e=>{
   e.preventDefault();const email=document.getElementById("authEmail").value,pass=document.getElementById("authPassword").value;
   if(pass.length<4)return toast("Password must be at least 4 characters.");
   localStorage.setItem("thrifterraUser",email);closeAll();toast(`Welcome back, ${email.split("@")[0]}!`);
 };
 document.getElementById("checkoutBtn").onclick=()=>{
   if(!cart.length)return toast("Your bag is empty.");
   closeAll();document.getElementById("checkoutModal").classList.add("show");document.getElementById("overlay").classList.add("show");
 };
 document.getElementById("checkoutForm").onsubmit=e=>{
   e.preventDefault();const order="THR-"+Date.now().toString().slice(-6);
   cart=[];saveCart();renderCart();closeAll();toast(`Order ${order} placed successfully!`);
   setTimeout(()=>alert(`Thank you! Your demo order ${order} has been placed. In a real deployment, connect this form to a payment/order backend.`),300);
 };
 document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("You're on the list ✦")};
});
