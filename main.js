const baseUrl = 'http://jservice.io/'

fetch(baseUrl + 'api/clues')
.then(resp => resp.json())
.then(clues => {
    console.log(clues)
})