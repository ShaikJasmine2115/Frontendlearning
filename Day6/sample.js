
        document.addEventListener("DOMContentLoaded",()=>{
            const y = document.getElementById('message');
            const x = document.getElementById("t1");
            x.addEventListener("change",()=>{
                    console.log(parseInt(x.value)+1);
            });
            const wh  = document.getElementById("clickthis");
            wh.addEventListener("click",()=>{
                const x  = document.getElementById("t1");
                const y= document.getElementById("message");
                y.textContent=x.value;          
            }
            );
        });




