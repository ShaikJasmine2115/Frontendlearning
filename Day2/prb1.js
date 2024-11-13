const products=[
    {Item:'a', price:5},
    {Item:'b', price:4},
    {Item:'c', price:7}
];
function viewall()
{
    return products;
}
function displayall(op)
{
    const display=document.getElementById("display");
    display.innerHTML="";
    const dx=document.getElementById("dx");
    dx.textContent="Available products are:"
    op.forEach(products=>{
        const listitem=document.createElement('li');
        listitem.textContent=`${products.Item} - ${products.price}`;
        display.appendChild(listitem);
      })
}
function addproduct(name,cost)
{
    if(!products.find((j)=> j.Item==name))
    
    {
    let x={};
    x.item=name;
    x.price=cost;
    products.push(x);
    return 1;
    }
    else{
        //console.log("Already exists");
        return 0;
    }
}
function displayadded(returned)
    {
        const dis=document.getElementById("span");
        if (returned==0)
        {
             dis.innerHTML="Product already exists";
        }
        else 
        {
            dis.innerHTML="Product added";
        }  
    }
function updateprice(pdname,pdprice)
{
    console.log("price1");
    if(!products.find(x => x.name==pdname))
    {
        console.log("price2");
        x.price=pdprice;
        console.log("price3");
        console.log(x.price);
    }
    
    displayall(viewall());
}
function applydiscount(disc)
{

}


document.addEventListener("DOMContentLoaded", ()=> {
        const viewing=document.getElementById("view");
        viewing.addEventListener("click", ()=>{
        displayall(viewall());
        })    
            const adding= document.getElementById("addbtn");
            adding.addEventListener("click", ()=>{
                const pname=document.getElementById("pname");
                const pprice=document.getElementById("pprice");
                displayadded(addproduct(pname.value,pprice.value));    
         })
            const updating=document.getElementById("updatebtn");
            updating.addEventListener("click", ()=>{
                const updatepdname=document.getElementById("updatename");
                const updatepdprice=document.getElementById("updateprice");
                const updateditem=updateprice(updatepdname.value,updatepdprice.value);
        })
            const discounting=document.getElementById("discountbtn");
            discounting.addEventListener("click", ()=>{
                const discpercent=document.getElementById("getdiscount");
                const applied=applydiscount(discpercent.value);

            })
        
    })

    
