
document.addEventListener("DOMContentLoaded", function() {
   
    const grid1 = document.getElementById('grid1');
    const grid2 = document.getElementById('grid2');

 
    // Add click event listeners to each grid item
    grid1.addEventListener('click', function() {
        window.location.href = 'productmg.html'; // Redirect to page1.html
    });
 
    grid2.addEventListener('click', function() {
        window.location.href = 'orderp.html'; // Redirect to page2.html
    });
 
    
});
 