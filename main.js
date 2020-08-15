const baseUrl = 'http://jservice.io/';

// get html elements and put them in constant variables

const answerDiv = document.querySelector('#answerDiv');
const answerP = document.querySelector('#answer');
const answerul = document.querySelector('#answerul');
const btnChooseCategory = document.getElementById('btnChooseCategory');
const btnDisplayAnswer = document.getElementById('btnDisplayAnswer');
const cluesUl = document.querySelector('#clues');
const flashcardUrl = document.querySelector('#flashcards');
const guessButton = document.getElementById('guess-button');
const userAnswerInput = document.getElementById('user-answer');
const checkAnswer = document.querySelector('#check-answer');

function onChooseCategory(event) {
    fetch(baseUrl + 'api/categories?count=100')
        .then(res => res.json())
        .then(flashcards => {
            console.log(flashcards);

            // shuffle array
            const shuffled = flashcards.sort(() => 0.5 - Math.random());

            // Get sub-array of first 10 elements after shuffled
            let selectedCats = shuffled.slice(0, 5);
            console.log(selectedCats);

            flashcardUrl.innerHTML = "";

            selectedCats.map(flashcard => {
                const liCategory = document.createElement('div');
                liCategory.className = 'myclass';

                liCategory.innerHTML = flashcard.title;
                liCategory.setAttribute('flashcardid', flashcard.id);

                liCategory.addEventListener('click', (event) => {
                    const currentFlashcardid = event.target.getAttribute('flashcardid');
                    console.log(event.target.getAttribute('flashcardid'));

                    // clear the clues ul and answerP
                    cluesUl.innerHTML = "";
                    answerP.innerHTML = "";
                    question.innerHTML = "";

                    answerDiv.setAttribute('style', 'display: none;');

                    getDataService(currentFlashcardid);
                })

                flashcardUrl.appendChild(liCategory)
            })
        })
}

btnChooseCategory.addEventListener('click', onChooseCategory);

const getDataService = (currentFlashcardid) => {
    fetch(baseUrl + 'api/category?id=' + currentFlashcardid)
        .then(res => res.json())
        .then(data => {
            const clues = data.clues;
            console.log(clues)

            clues.map(clue => {
                console.log(clue)

                const li = document.createElement('li');

                //proper use of variables with scope
                li.innerHTML = ` Difficulty: ${clue.value}`;

                // add event listener to the clues
                li.addEventListener('click', (event) => {
                    // show the question Div
                    questionDiv.setAttribute('style', 'display: block;');
                    question.innerHTML = clue.question;
                    
                    guessButton.addEventListener('click', () => {
                        const userAnswer = userAnswerInput.value;
                        
                        // I do this to make sure the user actually entered
                        // something
                        if (userAnswer) {
                            const userAnswerLowercase = userAnswer.toLowerCase();
                            const clueLowercase = clue.answer.toLowerCase();
                            
                            if (userAnswerLowercase === clueLowercase) {

                                checkAnswer.innerHTML = "True";

                            } else {
                                checkAnswer.innerHTML = "False";
                            }
                        } else {
                            checkAnswer.innerHTML = "Please enter a valid input";
                        }
                    });
                    
                    // I am commenting this part out because it is no longer needed
                    btnDisplayAnswer.addEventListener('click', (event) => {
                        answerDiv.setAttribute('style', 'display: block;');
                        answerP.innerHTML = clue.answer;
                    })
                })

                cluesUl.appendChild(li);
            })
        })
}