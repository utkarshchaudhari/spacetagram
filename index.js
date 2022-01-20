async function main(){
    //Load spinner while data is fetched from API
    const nasaListEl = document.querySelector(".nasa__list");
    nasaListEl.innerHTML = `<i class="fas fa-spinner data__loading--spinner"></i>`;
    nasaListEl.classList += ' spinner--add';

    // data fetch from API
    const nasa = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=7WXSWncXnFRUw2NgTDcWfhA05Gz8OG6NfaaX3dur`);
    const nasaData = await nasa.json();
   

    if(!!nasaData === true){
        nasaListEl.innerHTML = nasaData.photos.map((data) => nasaHTML(data)).join('');
        nasaListEl.classList.remove('spinner--add');
    }
    else{
        console.log('error')
        nasaListEl.innerHTML = `<p>Sorry! please try again later.</p>`;
        nasaListEl.classList.remove('spinner--add');
    }

    
}

main();

function nasaHTML(data){
    return `
    <div class="nasa__card">
        <div class="nasa__card-container">
            <img src="${data.img_src}" class="card__img" alt="">
            <h3 class="card__header">${data.camera.full_name}</h3>
            <p class="card__para">${data.earth_date}</p>
            <button id="${data.id}" class="like__button" onclick="liked(${data.id})">Like</button>
        </div>
    </div>`
}

function liked(id){
    let cardButtonEl = document.getElementById(id);
    if(cardButtonEl.innerHTML === "Like"){
        cardButtonEl.innerHTML = `Liked`
    } else {
        cardButtonEl.innerHTML = `Like`
    }
}
