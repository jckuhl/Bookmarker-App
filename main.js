function validateForm(siteName, siteURL) {
    if(!siteName || !siteURL) {
        alert('Please enter a site name and a url');
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if(!siteURL.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}

function saveBookmark(e) {
    e.preventDefault();

    const siteName = $('#sitename').val();
    const siteURL = $('#siteurl').val();

    if(!validateForm(siteName, siteURL)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteURL
    }

    if(localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    document.getElementById('myForm').reset();
}

function deleteBookmark(url) {
    event.preventDefault()
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks = bookmarks.filter( (bm)=> bm.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksDiv = $('#bookmarks');
    let bookmarksHTML = '';

    bookmarks.forEach( (bm)=> {
        bookmarksHTML += `<div class="well">
                        <h3>${bm.name}</h3>
                        <a class="btn btn-default" target="_blank" href="http://${bm.url}">Visit</a>
                        <a class="btn btn-danger" href="#" onclick="deleteBookmark('${bm.url}')">Delete</a>
                        </div>`;
    });

    bookmarksDiv.html(bookmarksHTML);
}

$('#myForm').on('submit', saveBookmark);
$('body').ready(fetchBookmarks);