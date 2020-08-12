const baseUrl = 'http://jservice.io/'
const catsUl = document.querySelector('#cats')

fetch(baseUrl + 'api/categories?count=100')
.then(resp => resp.json())
.then(cats => {
    console.log(cats)
    // shuffle array
    const shuffled = cats.sort(() => 0.5 - Math.random());

    let selected = shuffled.slice(0,10);

    console.log(selected)
})