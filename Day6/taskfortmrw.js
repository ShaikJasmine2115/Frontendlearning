// Sample Array of Product objects
const products = [
    { id: 1, name: 'Screwdriver', category: 'Tools', price: 10.5, quantity: 150, dateAdded: new Date('2023-01-01') },
    { id: 2, name: 'Hammer', category: 'Tools', price: 12.75, quantity: 120, dateAdded: new Date('2023-02-15') },
    { id: 3, name: 'Wrench', category: 'Tools', price: 15.0, quantity: 200, dateAdded: new Date('2023-03-10') },
    { id: 4, name: 'Drill', category: 'Power Tools', price: 55.0, quantity: 80, dateAdded: new Date('2023-05-25') },
    { id: 5, name: 'Nail Gun', category: 'Power Tools', price: 90.0, quantity: 50, dateAdded: new Date('2023-06-30') },
    { id: 6, name: 'Saw', category: 'Tools', price: 20.0, quantity: 100, dateAdded: new Date('2023-04-20') },
    { id: 7, name: 'Laser Cutter', category: 'Machines', price: 500.0, quantity: 15, dateAdded: new Date('2023-07-15') },
    { id: 8, name: 'Band Saw', category: 'Machines', price: 250.0, quantity: 25, dateAdded: new Date('2023-08-05') }
  ];
  
  // 1. Sorting by Price (ascending) spread operator to create a new array 
  function sortByPrice()
  {
  const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
  //console.log('Sorted by Price (Ascending):', sortedByPrice);
  return sortedByPrice;
  }
  
  // 2. Sorting by Quantity (ascending)
  function sortByQuantity()
  {
  const sortedByQuantity = [...products].sort((a, b) => a.quantity - b.quantity);
  //console.log('Sorted by Quantity (Ascending):', sortedByQuantity);
  return sortedByQuantity;
  }
  
  // 3. Sorting by Date Added (ascending)
  function sortByDateAdded()
  {
  const sortedByDateAdded = [...products].sort((a, b) => a.dateAdded - b.dateAdded);
  //console.log('Sorted by Date Added (Ascending):', sortedByDateAdded);
  return sortedByDateAdded;
  }
  
  // 4. Search: Find all products in a specific category (e.g., 'Tools')
  function Category(cat)
  {
    const toolsCategory = products.filter(product => product.category.toUpperCase() === cat.toUpperCase());
   // console.log('Products in Tools Category:', toolsCategory);
   return toolsCategory;
  } 
  
  // 5. Search: Find products with price less than a certain value (e.g., 30)
  function Affordable(price)
  {
    const affordableProducts = products.filter(product => product.price < price);
    //console.log('Affordable Products (Price < 30):', affordableProducts);
    return affordableProducts;
  }

  // 6. Search: Find product by name (e.g., 'Hammer')
  function ProductByName(name)
  {
    const existingProduct = products.filter(product => product.name.toUpperCase() === name.toUpperCase());
    //console.log('Product with name "Hammer":', hammerProduct);
    return existingProduct;
  }
  
  // 7. Search: Find products with quantity greater than a certain value (e.g., 100)
  function QuantityAbove(qty)
  {
    const highQuantityProducts = products.filter(product => product.quantity > qty);
  //console.log('Products with Quantity > 100:', highQuantityProducts);
  return highQuantityProducts;
  }
  
  // 8. Complex Search: Find products by category and price range
  const powerToolsUnder100 = products.filter(product => product.category === 'Power Tools' && product.price < 100);
  console.log('Power Tools under 100:', powerToolsUnder100);

  function searchChecker()
  {
    const searchdisplay=document.getElementById("display");
    const inputcategory=document.getElementById("category");
    const inputprice=document.getElementById("price");
    const inputname=document.getElementById("name");
    const inputquantity=document.getElementById("quantity");

    if (inputcategory.checked== true)
      {
        return Category(searchdisplay.value);
      }
    if (inputprice.checked== true)
      {
        return Affordable(searchdisplay.value);
      }
    if (inputname.checked== true)
      {
        return ProductByName(searchdisplay.value);
      }
    if (inputquantity.checked== true)
      {
        return QuantityAbove(searchdisplay.value);
      }

  }

  function sortchecker(ddvalue)
  {
    if (ddvalue=="Price")
      {
      return sortByPrice();
      }
    else if (ddvalue=="Quantity")
      {
        return sortByQuantity();
      }
    else if (ddvalue=="Date Added")
      {
          return sortByDateAdded();
      }
     else
     {
      return null;
     }
      
  }

document.addEventListener("DOMContentLoaded", ()=> {
      const search= document.getElementById("search");
      search.addEventListener("click", ()=>{
        displayop( searchChecker());
      // let z= document.getElementById("span");
      // z.innerHTML=JSON.stringify(searched);     
    })

         const sortbtn=document.getElementById("sortbtn");
         sortbtn.addEventListener("click", ()=>{
         const dropdown=document.getElementById("dropdown");
         displayop( sortchecker(dropdown.value));
        //  let z= document.getElementById("span");
        //  z.innerHTML=JSON.stringify(sorted);
       })
    })

    function displayop(result)
    {
      const list=document.getElementById("output");
      list.innerHTML="";
      if (result.length==0)
      {
        const listitem=document.createElement('span');
        listitem.textContent="No product found";
        list.appendChild(listitem);  
      }
      else{
      result.forEach(product=>{
        const listitem=document.createElement('li');
        listitem.textContent=`${product.id} - ${product.name} - ${product.category} - ${product.quantity} - ${product.price} - ${product.dateAdded}`;
        list.appendChild(listitem);
      })
    }}


  