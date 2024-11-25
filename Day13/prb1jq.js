<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
const products = [
    { id: 1, Item: 'Dairy milk', price: 180 },
    { id: 2, Item: '5Star', price: 30 },
    { id: 3, Item: 'Snickers', price: 120 }
];

function viewall() {
    return products;
}

function displayall(op) {
    const display = $("#display");
    display.empty();
    const dx = $("#dx");
    dx.text("Available products are:");
    op.forEach(product => {
        const listitem = $("<li>").text(`${product.id} - ${product.Item} - ${product.price}`);
        display.append(listitem);
    });
}

function addproduct(prd) {
    if (!products.find((j) => (j.id == prd.pid && j.Item == prd.pname))) {
        let x = {};
        x.id = prd.pid;
        x.Item = prd.pname;
        x.price = prd.pprice;
        products.push(x);
        return 1;
    } else {
        return 0;
    }
}

function displayadded(returned) {
    const dis = $("#span");
    if (returned == 0) {
        dis.html("Product already exists");
    } else {
        dis.html("Product added");
    }
}

function updateprice(prdupdate) {
    const pdtoupdate = products.find(x => x.id == prdupdate.pid);
    if (pdtoupdate) {
        pdtoupdate.Item = prdupdate.pname;
        pdtoupdate.price = prdupdate.pprice;
        displayall(viewall());
        return true;
    }
    return false;
}

function displayupdated(returns) {
    const dis = $("#span2");
    if (returns == 0) {
        dis.html("New element- Go to 'add products'");
    } else {
        dis.html("Product updated");
    }
}

function applydiscount(disc) {
    products.map(x => (x.price = x.price - (x.price / 100 * disc)));
    return products;
}

function displaydiscounted(products) {
    const display = $("#ul2");
    display.empty();
    const dx = $("#span3");
    dx.text("Products after discount are:");
    products.forEach(product => {
        const listitem = $("<li>").text(`${product.id} - ${product.Item} - ${product.price}`);
        display.append(listitem);
    });
}

$(document).ready(function () {
    $("#view").click(function () {
        displayall(viewall());
    });

    $("#addbtn").click(function () {
        const pid = $("#pid").val();
        const pname = $("#pname").val();
        const pprice = $("#pprice").val();
        displayadded(addproduct({ pid: pid, pname: pname, pprice: pprice }));
    });

    $("#updatebtn").click(function () {
        const updatepid = $("#updateid").val();
        const updatepdname = $("#updatename").val();
        const updatepdprice = $("#updateprice").val();
        displayupdated(updateprice({ pid: updatepid, pname: updatepdname, pprice: updatepdprice }));
    });

    $("#discountbtn").click(function () {
        const discpercent = $("#getdiscount").val();
        displaydiscounted(applydiscount(discpercent));
    });
});

// const products=[
//     {id:1,Item:'Dairy milk', price:180},
//     {id:2,Item:'5Star', price:30},
//     {id:3,Item:'Snickers', price:120}
// ];
// function viewall()
// {
//     return products;
// }
// function displayall(op)
// {
//     const display=document.getElementById("display");
//     display.innerHTML="";
//     const dx=document.getElementById("dx");
//     dx.textContent="Available products are:"
//     op.forEach(product=>{
//         const listitem=document.createElement('li');
//         listitem.textContent=`${product.id} - ${product.Item} - ${product.price}`;
//         display.appendChild(listitem);
//       })
// }
// function addproduct(prd)
// {
//     if(!products.find((j)=> (j.id==prd.pid && j.Item==prd.pname)))
//     {
//         let x={};
//         x.id=prd.pid;
//         x.Item=prd.pname;
//         x.price=prd.pprice;
//         products.push(x);
//         return 1;
//         console.log("added");
//     }
//     else{
//         //console.log("Already exists");
//         return 0;
//     }
// }
// function displayadded(returned)
//     {
//         const dis=document.getElementById("span");
//         if (returned==0)
//         {
//              dis.innerHTML="Product already exists";
//         }
//         else 
//         {
//             dis.innerHTML="Product added";
//         }  
//     }
// function updateprice(prdupdate)
// {
//     const pdtoupdate=products.find(x => x.id==prdupdate.pid);
//     if (pdtoupdate)
//     {
//         pdtoupdate.Item=prdupdate.pname;
//         pdtoupdate.price=prdupdate.pprice;
//         return true;
//     }
//     return false;
    
//     displayall(viewall());
// }
// function displayupdated(returns)
// {
//     const dis=document.getElementById("span2");
//         if (returns==0)
//         {
//              dis.innerHTML="New element- Go to 'add products'";
//         }
//         else 
//         {
//             dis.innerHTML="Product updated";
//         }  
// }
// function applydiscount(disc)
// {
//     products.map(x=>(x.price= x.price-(x.price/100 * disc)))
//     return products;
// }
// function displaydiscounted(products)
// {
//     const display=document.getElementById("ul2");
//     display.innerHTML="";
//     const dx=document.getElementById("span3");
//     dx.textContent="Products after discount are:"
//     products.forEach(product=>{
//         const listitem=document.createElement('li');
//         listitem.textContent=`${product.id} - ${product.Item} - ${product.price}`;
//         display.appendChild(listitem);
//       })
// }


// document.addEventListener("DOMContentLoaded", ()=> {
//         const viewing=document.getElementById("view");
//         viewing.addEventListener("click", ()=>{
//         displayall(viewall());
//         })    
//             const adding= document.getElementById("addbtn");
//             adding.addEventListener("click", ()=>{
//                 const pid=document.getElementById("pid").value;
//                 const pname=document.getElementById("pname").value;
//                 const pprice=document.getElementById("pprice").value;
//                 displayadded(addproduct({pid:pid,pname:pname,pprice:pprice}));    
//          })
//             const updating=document.getElementById("updatebtn");
//             updating.addEventListener("click", ()=>{
//                 const updatepid=document.getElementById("updateid").value;
//                 const updatepdname=document.getElementById("updatename").value;
//                 const updatepdprice=document.getElementById("updateprice").value;
//                 displayupdated(updateprice({pid:updatepid,pname:updatepdname,pprice:updatepdprice}));
//         })
//             const discounting=document.getElementById("discountbtn");
//             discounting.addEventListener("click", ()=>{
//                 const discpercent=document.getElementById("getdiscount");
//                 displaydiscounted(applydiscount(discpercent.value));

//             })
        
//     })

    
