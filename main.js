const baseUrl = 'http://jservice.io/';

// get html elements and put them in constant variables

const   catsUl = document.querySelector('#cats'),
        cluesUl = document.querySelector('#clues'),
        answerDiv = document.querySelector('#answerDiv'),
        answerP = document.querySelector('#answer');

fetch(baseUrl + 'api/categories?count=100')
    .then(resp => resp.json())
    .then(cats => {
        console.log(cats)
    // shuffle array
        const shuffled = cats.sort(() => 0.5 - Math.random());
    // Get sub-array of first 10 elements after shuffled
        let selectedCats = shuffled.slice(0,10);

        console.log(selectedCats)

    selectedCats.map(cat => {
        const li = document.createElement('li');

        li.innerHTML = cat.title;
        li.setAttribute('catid', cat.id);
        
        li.addEventListener('click', (event) => {
            const currentCatId = event.target.getAttribute('catid');
            console.log(event.target.getAttribute('catid'));

            // clear the clues ul and answerP

            cluesUl.innerHTML = "";
            answerP.innerHTML = "";
            answerDiv.setAttribute('style', 'display: none;');

            fetch(baseUrl + 'api/category?id=' + currentCatId)
                .then(resp => resp.json())
                .then(data => { 

                    const clues = data.clues;
                    

                    console.log(clues)
                    clues.map(clue => {
                        const li = document.createElement('li');
//proper use of variables with scope
                        li.innerHTML = `Value ${clue.value} Clue: ${clue.question}`;

                        // add event listener to the clues

                        li.addEventListener('click', (event) => {
                            // show the answer Div
                            answerDiv.setAttribute('style', 'display: block;');

                            answerP.innerHTML = clue.answer;

                        })

                        cluesUl.appendChild(li);
                        //li.setAttribute('catid', cat.id);

                    })
                   
                })
        })

        catsUl.appendChild(li)

    })
})
