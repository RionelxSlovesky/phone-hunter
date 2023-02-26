const phoneContainer = document.getElementById('phone-container');



const showPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`

    const res = await fetch(url)
    const data = await res.json()

    phoneContainer.innerHTML = ``

    data.data.forEach(phone => {
        console.log(phone)

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

}

showPhones()