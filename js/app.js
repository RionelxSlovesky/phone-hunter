const phoneContainer = document.getElementById('phone-container');
const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const searchCount = document.getElementById('search-count');
const loader = document.getElementById('loader');



const showPhones = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`

    const res = await fetch(url)
    const data = await res.json()

    phoneContainer.innerHTML = ``

    if(search!=null){
        searchCount.innerHTML = `<h1 class="text-center">${data.data.length} Search Results</h1>`
    }

    data.data.forEach(phone => {

        phoneContainer.innerHTML += `
        <div class="col">
            <div class="card">
                <img style="width: 14em;" src="${phone.image}" class="card-img-top mx-auto" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                    <p style="width: 14em;" class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
        `
    })

    //stopping spinner
    loader.classList.add('d-none')

}

searchBtn.addEventListener('click', event => {

    //starting spinner and removing search count
    loader.classList.remove('d-none')
    searchCount.innerHTML = ``
    showPhones(searchInp.value);
})

showPhones()