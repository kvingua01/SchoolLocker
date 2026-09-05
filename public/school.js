// =====================================================
// BOB'S SCHOOL LOCKER
// SPEAKEASY-STYLE GAME REVEAL
// =====================================================


// =====================================================
// SETTINGS
// =====================================================

const FRIEND_CODE = "bob67123";


// =====================================================
// PAGE ELEMENTS
// =====================================================

const schoolOverlay =
    document.getElementById(
        "schoolOverlay"
    );

const gameFrame =
    document.getElementById(
        "gameFrame"
    );

const numberOne =
    document.getElementById(
        "numberOne"
    );

const numberTwo =
    document.getElementById(
        "numberTwo"
    );

const problem =
    document.getElementById(
        "problem"
    );

const answerInput =
    document.getElementById(
        "answerInput"
    );

const checkAnswerButton =
    document.getElementById(
        "checkAnswerButton"
    );

const mathMessage =
    document.getElementById(
        "mathMessage"
    );

const friendSection =
    document.getElementById(
        "friendSection"
    );

const friendCodeInput =
    document.getElementById(
        "friendCodeInput"
    );

const friendCodeButton =
    document.getElementById(
        "friendCodeButton"
    );

const friendMessage =
    document.getElementById(
        "friendMessage"
    );

const multiplicationTable =
    document.getElementById(
        "multiplicationTable"
    );


// =====================================================
// CREATE NUMBER MENUS
// =====================================================

function createNumberSelectors() {

    for (
        let number = 1;
        number <= 12;
        number++
    ) {

        const optionOne =
            document.createElement(
                "option"
            );

        optionOne.value =
            number;

        optionOne.textContent =
            number;

        numberOne.appendChild(
            optionOne
        );


        const optionTwo =
            document.createElement(
                "option"
            );

        optionTwo.value =
            number;

        optionTwo.textContent =
            number;

        numberTwo.appendChild(
            optionTwo
        );
    }
}


// =====================================================
// CREATE MULTIPLICATION TABLE
// =====================================================

function createMultiplicationTable() {

    multiplicationTable.innerHTML =
        "";

    for (
        let row = 1;
        row <= 12;
        row++
    ) {

        for (
            let column = 1;
            column <= 12;
            column++
        ) {

            const cell =
                document.createElement(
                    "div"
                );

            cell.className =
                "tableCell";

            cell.textContent =
                row * column;

            multiplicationTable.appendChild(
                cell
            );
        }
    }
}


// =====================================================
// UPDATE CURRENT PROBLEM
// =====================================================

function updateProblem() {

    const firstNumber =
        Number(
            numberOne.value
        );

    const secondNumber =
        Number(
            numberTwo.value
        );

    problem.textContent =
        firstNumber +
        " × " +
        secondNumber +
        " = ?";

    answerInput.value =
        "";

    mathMessage.textContent =
        "";

    friendSection.style.display =
        "none";

    friendCodeInput.value =
        "";

    friendMessage.textContent =
        "";

    answerInput.focus();
}


// =====================================================
// CHECK MULTIPLICATION ANSWER
// =====================================================

function checkAnswer() {

    if (
        answerInput.value.trim() === ""
    ) {

        mathMessage.style.color =
            "#c87b00";

        mathMessage.textContent =
            "Enter an answer first.";

        return;
    }


    const firstNumber =
        Number(
            numberOne.value
        );

    const secondNumber =
        Number(
            numberTwo.value
        );

    const correctAnswer =
        firstNumber *
        secondNumber;

    const submittedAnswer =
        Number(
            answerInput.value
        );


    if (
        submittedAnswer ===
        correctAnswer
    ) {

        mathMessage.style.color =
            "#238636";

        mathMessage.textContent =
            "Correct! Great job.";

        friendSection.style.display =
            "block";

        setTimeout(
            () => {

                friendCodeInput.focus();

            },
            100
        );

    } else {

        mathMessage.style.color =
            "#d93025";

        mathMessage.textContent =
            "Not quite. Try again.";

        friendSection.style.display =
            "none";

        friendCodeInput.value =
            "";

        friendMessage.textContent =
            "";
    }
}


// =====================================================
// REVEAL BLOCKBATTLE
// =====================================================

function revealGame() {

    schoolOverlay.classList.add(
        "unlocking"
    );

    setTimeout(
        () => {

            schoolOverlay.classList.add(
                "hidden"
            );

            gameFrame.focus();

        },
        1000
    );
}


// =====================================================
// CHECK FRIEND CODE
// =====================================================

function checkFriendCode() {

    const submittedCode =
        friendCodeInput.value.trim();


    if (
        submittedCode ===
        FRIEND_CODE
    ) {

        friendMessage.style.color =
            "#238636";

        friendMessage.textContent =
            "Access granted.";

        setTimeout(
            () => {

                revealGame();

            },
            300
        );

    } else {

        friendMessage.style.color =
            "#d93025";

        friendMessage.textContent =
            "Incorrect friend code.";

        friendCodeInput.select();
    }
}


// =====================================================
// EVENTS
// =====================================================

numberOne.addEventListener(
    "change",
    updateProblem
);

numberTwo.addEventListener(
    "change",
    updateProblem
);


checkAnswerButton.addEventListener(
    "click",
    checkAnswer
);


answerInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            checkAnswer();
        }
    }
);


friendCodeButton.addEventListener(
    "click",
    checkFriendCode
);


friendCodeInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            checkFriendCode();
        }
    }
);


// =====================================================
// START
// =====================================================

createNumberSelectors();

createMultiplicationTable();

numberOne.value =
    "1";

numberTwo.value =
    "1";

updateProblem();