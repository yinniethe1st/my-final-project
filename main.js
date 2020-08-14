const baseUrl = 'http://jservice.io/';

// get html elements and put them in constant variables

const   flashcardUrl = document.querySelector('#flashcards'),
        cluesUl = document.querySelector('#clues'),
        answerDiv = document.querySelector('#answerDiv'),
        answerP = document.querySelector('#answer'),
        answerul = document.querySelector('#answerul'),
        btnDisplayAnswer = document.getElementById('btnDisplayAnswer');

const btnChooseCategory = document.getElementById('btnChooseCategory');

btnChooseCategory.addEventListener('click', (event) => { 

fetch(baseUrl + 'api/categories?count=100')
    .then(resp => resp.json())
    .then(flashcards => {
        console.log(flashcards)
    // shuffle array
        const shuffled = flashcards.sort(() => 0.5 - Math.random());
    // Get sub-array of first 10 elements after shuffled
        let selectedCats = shuffled.slice(0,5);
        flashcardUrl.innerHTML= "";

        console.log(selectedCats)

    selectedCats.map(flashcard => {
        const li = document.createElement('li');

        li.innerHTML = flashcard.title;
        
        li.setAttribute('flashcardid', flashcard.id);
        
        li.addEventListener('click', (event) => {
            const currentFlashcardid = event.target.getAttribute('flashcardid');
            console.log(event.target.getAttribute('flashcardid'));

            // clear the clues ul and answerP
            cluesUl.innerHTML = "";
            answerP.innerHTML = "";
            question.innerHTML = "";

            answerDiv.setAttribute('style', 'display: none;');

            getDataService(currentFlashcardid);
        })

        flashcardUrl.appendChild(li)

    })
})

})


const getDataService = (currentFlashcardid) => {

    fetch(baseUrl + 'api/category?id=' + currentFlashcardid)
                .then(resp => resp.json())
                .then(data => { 

                    const clues = data.clues;

                    console.log(clues)
                    
                    clues.map(clue => {

                        console.log(clue)

                        const li = document.createElement('li');



                        //proper use of variables with scope
                        li.innerHTML= ` Difficulty: ${clue.value}`;

                        // add event listener to the clues

                        li.addEventListener('click', (event) => {

                            // show the question Div
                            questionDiv.setAttribute('style', 'display: block;');

                            question.innerHTML = clue.question;

                            btnDisplayAnswer.addEventListener('click', (event) => {

                                answerDiv.setAttribute('style', 'display: block;');
    
                                answerP.innerHTML = clue.answer;
    
    
                                    })
                        })

        

                        cluesUl.appendChild(li);
                    })
                })

}


