const phoneContainer = document.getElementById('phone-container');
const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const searchCount = document.getElementById('search-count');
const loader = document.getElementById('loader');
const showBtn = document.getElementById('show-btn');

let temp = ''

const getPhoneDetails = async (id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`

    const res = await fetch(url)
    const data = await res.json()

    const detailsDiv = document.createElement('div')
    detailsDiv.innerHTML = `

        <h6 class="card-title">Main Features:</h6>

        <ul style="width: 14em;" class="card-text">
            <li>Chip Set: ${data.data.mainFeatures.chipSet}</li>
            <li>Display Size: ${data.data.mainFeatures.displaySize}</li>
            <li>Display Size: ${data.data.mainFeatures.displaySize}</li>
            <li>Sensors: ${data.data.mainFeatures.sensors.join(", ")}</li>
            <li>Storage: ${data.data.mainFeatures.storage}</li>
        </ul>
    `

    console.log(detailsDiv)
    return detailsDiv;

}


const showPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`

    const res = await fetch(url)
    const data = await res.json()

    phoneContainer.innerHTML = ``

    

    if(search!=null && dataLimit){
        searchCount.innerHTML = `<h3 class="text-center">${data.data.length} Search Results for "${searchInp.value}"</h3>`
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


        async function getPD(){
            const mainFeatures = await getPhoneDetails(phone.slug)

            phoneContainer.innerHTML += `
        <div class="col">
            <div class="card">
                <img style="width: 14em;" src="${phone.image}" class="card-img-top mx-auto" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                    ${mainFeatures.innerHTML}
                </div>
            </div>
        </div>
        `

          };

        const mainFeatures = getPD();

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

searchInp.addEventListener('keydown', event => {

    if(event.key == 'Enter'){
        //starting spinner and removing search count
    loader.classList.remove('d-none')
    searchCount.innerHTML = ``
    const dataLimit = true;
    showPhones(searchInp.value, dataLimit);
    }
})

showPhones()

