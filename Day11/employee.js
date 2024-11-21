let arr=[{id:1, name: "jas", dep:7, loc:"CBE"}];

document.addEventListener("DOMContentLoaded", ()=> {
    
    const btn=document.getElementById("button");
    btn.addEventListener("click", ()=>{
    const val1=document.getElementById("emid").value;
    const val2=document.getElementById("emname").value;
    const val3=document.getElementById("emdep").value;
    const val4=document.getElementById("emloc").value;
    let y= arr.find((x)=> x.id==val1);
    if (y)
    {
        console.log(arr);
        update({val1,val2,val3,val4});
    }
    }
    )   
})

function update(newval)
{
    
    console.log(arr);
}