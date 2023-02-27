const phoneContainer = document.getElementById('phone-container');
const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const searchCount = document.getElementById('search-count');
const loader = document.getElementById('loader');
const showBtn = document.getElementById('show-btn');

let temp = ''


const showPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`

    const res = await fetch(url)
    const data = await res.json()

    phoneContainer.innerHTML = ``

    

    if(search!=null && dataLimit){
        searchCount.innerHTML = `<h3 class="text-center">${data.data.length} Search Results for ${searchInp.value}</h3>`
    }

    if(dataLimit == true && data.data.length>10){
        data.data = data.data.slice(0,10)
        showBtn.classList.remove('d-none')

        temp = searchInp.value;

        showBtn.addEventListener('click', event => {
            showPhones(temp, false);
        })

    }else{
        showBtn.classList.add('d-none');
        temp = '';
    }

    searchInp.value = ''

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
    const dataLimit = true;
    showPhones(searchInp.value, dataLimit);
})

showPhones()