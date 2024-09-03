document.addEventListener("DOMContentLoaded", function() {
    checkUrlForItemId(); // Trigger check for item ID on page load
    updateItemCounter();
});

function checkUrlForItemId() {
    const itemId = window.location.hash.substring(1); // Extract ID from URL hash
    if (itemId) {
        showItemView(itemId); // Call showItemView if an ID is found
    }
}

function updateItemCounter() {
    var table = document.getElementById('infoTable');
    var tr = table.getElementsByTagName('tr');
    var count = 0;
    for (var i = 1; i < tr.length; i++) {
        if (tr[i].style.display !== 'none') {
            count++;
        }
    }
    document.getElementById('itemCounter').innerText = count + ' items';
}

function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById('searchInput');
    filter = input.value.toLowerCase();
    table = document.getElementById('infoTable');
    tr = table.getElementsByTagName('tr');

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        td = tr[i].getElementsByTagName('td');
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                    count++;
                    break;
                }
            }
        }
    }
    document.getElementById('itemCounter').innerText = count + ' items';
}

function searchByCreator(creatorName) {
    document.getElementById('searchInput').value = creatorName;
    searchTable();
    showTableView();
}

var previousScrollPosition = 0;

function showItemView(itemId) {
    var table = document.getElementById('infoTable');
    var items = document.getElementsByClassName('item-view');
    
    // Store the current scroll position
    previousScrollPosition = window.scrollY;
    
    // Hide all other items first
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
    }
    
    // Display the selected item
    var itemView = document.getElementById(itemId);
    if(itemView) { // Check if the element exists to prevent errors
        itemView.style.display = 'block';
        table.style.display = 'none';
        document.getElementById('searchContainer').style.display = 'none';
        loadImage(itemId); // Load images only when the item is being viewed
    }
}

function loadImage(itemId) {
    var item = document.getElementById(itemId);
    var images = item.querySelectorAll('.lazy-load');

    images.forEach(function(img) {
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy-load');
    });
}

function showTableView() {
    var table = document.getElementById('infoTable');
    var items = document.getElementsByClassName('item-view');

    for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
    }
    
    table.style.display = 'table';
    document.getElementById('searchContainer').style.display = 'flex';

    // Restore the scroll position to what it was before viewing the item
    window.scrollTo(0, previousScrollPosition);

    // Clear the hash in the URL
    history.replaceState(null, null, ' ');
}
