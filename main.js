const baseUrl = 'http://jservice.io/';


const answerDiv = document.querySelector('#answerDiv');
const answerP = document.querySelector('#answer');
const answerul = document.querySelector('#answerul');
const btnChooseCategory = document.getElementById('btnChooseCategory');
const btnDisplayAnswer = document.getElementById('btnDisplayAnswer');
const gettingClue = document.querySelector('#clues');
const flashcardUrl = document.querySelector('#flashcards');
const guessButton = document.getElementById('guess-button');
const userAnswerInput = document.getElementById('user-answer');
const checkAnswer = document.querySelector('#check-answer');

function onChooseCategory(event) {
    fetch('http://jservice.io/api/categories?count=100')
        .then(res => res.json())
        .then(flashcards => {
            console.log(flashcards);

            const shuffled = flashcards.sort(() => 0.5 - Math.random());

            let selectedCards = shuffled.slice(0, 6);
            console.log(selectedCards);

            flashcardUrl.innerHTML = "";

            selectedCards.map(flashcard => {
                const liCategory = document.createElement('div');
                liCategory.className = 'myclass';

                liCategory.innerHTML = flashcard.title;
                liCategory.setAttribute('flashcardid', flashcard.id);

                liCategory.addEventListener('click', (event) => {
                    const currentFlashcardid = event.target.getAttribute('flashcardid');
                    console.log(event.target.getAttribute('flashcardid'));

                    gettingClue.innerHTML = "";
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
    fetch('http://jservice.io/api/category?id=' + currentFlashcardid)
        .then(res => res.json())
        .then(data => {
            const clues = data.clues;
            console.log(clues)

            clues.map(clue => {
                console.log(clue)

                const li = document.createElement('div');

              
                li.className = 'levelClass';
                li.innerHTML = `${clue.value}`;

                li.addEventListener('click', (event) => {

                    questionDiv.setAttribute('style', 'display: block;');
                    question.innerHTML = clue.question;
                    
                    guessButton.addEventListener('click', () => {
                        const userAnswer = userAnswerInput.value;
                        
                        
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
                    
                    btnDisplayAnswer.addEventListener('click', (event) => {
                        answerDiv.setAttribute('style', 'display: block;');
                        answerP.innerHTML = clue.answer;
                    })
                })

                gettingClue.appendChild(li);
            })
        })
}