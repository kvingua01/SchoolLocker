// =====================================================
// BOB'S SCHOOL LOCKER
//
// MODES:
// 12 × 12
// 100 × 100
//
// SECRET:
// 6 × 7
// ANSWER 42
// THEN CLICK 63
// =====================================================


// =====================================================
// SETTINGS
// =====================================================

const FRIEND_CODE = "bob67123";

const SMALL_MAX = 12;

const LARGE_MAX = 100;


// =====================================================
// STATE
// =====================================================

let currentMax = SMALL_MAX;

let secret63Unlocked = false;


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

const randomQuestionButton =
    document.getElementById(
        "randomQuestionButton"
    );

const modeToggleButton =
    document.getElementById(
        "modeToggleButton"
    );

const modeLabel =
    document.getElementById(
        "modeLabel"
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

const tableScroller =
    document.getElementById(
        "tableScroller"
    );

const footerText =
    document.getElementById(
        "footerText"
    );


// =====================================================
// CREATE NUMBER SELECTORS
// =====================================================

function createNumberSelectors() {

    numberOne.innerHTML =
        "";

    numberTwo.innerHTML =
        "";


    for (
        let number = 1;
        number <= currentMax;
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


    multiplicationTable.style.gridTemplateColumns =
        "repeat(" +
        currentMax +
        ", 42px)";


    for (
        let row = 1;
        row <= currentMax;
        row++
    ) {

        for (
            let column = 1;
            column <= currentMax;
            column++
        ) {

            const value =
                row * column;

            const cell =
                document.createElement(
                    "div"
                );

            cell.className =
                "tableCell";

            cell.textContent =
                value;


            /*
                63 IS THE SECRET CLICK.

                It only works after
                correctly answering:

                6 × 7 = 42
            */

            if (
                value === 63
            ) {

                cell.addEventListener(
                    "click",
                    openSecretDoor
                );
            }


            multiplicationTable.appendChild(
                cell
            );
        }
    }


    tableScroller.scrollTop =
        0;

    tableScroller.scrollLeft =
        0;
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


    secret63Unlocked =
        false;


    friendSection.style.display =
        "none";

    friendCodeInput.value =
        "";

    friendMessage.textContent =
        "";


    answerInput.focus();
}


// =====================================================
// RANDOM QUESTION
// =====================================================

function randomQuestion() {

    const randomFirst =
        Math.floor(
            Math.random() *
            currentMax
        ) + 1;

    const randomSecond =
        Math.floor(
            Math.random() *
            currentMax
        ) + 1;


    numberOne.value =
        String(
            randomFirst
        );

    numberTwo.value =
        String(
            randomSecond
        );


    updateProblem();
}


// =====================================================
// SWITCH MODE
// =====================================================

function toggleMode() {

    if (
        currentMax ===
        SMALL_MAX
    ) {

        currentMax =
            LARGE_MAX;

    } else {

        currentMax =
            SMALL_MAX;
    }


    updateModeText();


    createNumberSelectors();


    numberOne.value =
        "1";

    numberTwo.value =
        "1";


    createMultiplicationTable();


    updateProblem();
}


// =====================================================
// UPDATE MODE LABELS
// =====================================================

function updateModeText() {

    if (
        currentMax ===
        SMALL_MAX
    ) {

        modeLabel.textContent =
            "Current Max: 12 × 12";

        modeToggleButton.textContent =
            "Switch to 100 × 100";

        footerText.textContent =
            "Practice multiplication facts from 1 × 1 through 12 × 12.";

    } else {

        modeLabel.textContent =
            "Current Max: 100 × 100";

        modeToggleButton.textContent =
            "Switch to 12 × 12";

        footerText.textContent =
            "Practice multiplication facts from 1 × 1 through 100 × 100.";
    }
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
        submittedAnswer !==
        correctAnswer
    ) {

        secret63Unlocked =
            false;

        mathMessage.style.color =
            "#d93025";

        mathMessage.textContent =
            "Not quite. Try again.";

        friendSection.style.display =
            "none";

        return;
    }


    mathMessage.style.color =
        "#238636";

    mathMessage.textContent =
        "Correct! Great job.";


    /*
        SECRET ONLY WORKS FOR:

        6 × 7 = 42
    */

    if (
        firstNumber === 6 &&
        secondNumber === 7 &&
        submittedAnswer === 42
    ) {

        secret63Unlocked =
            true;

    } else {

        secret63Unlocked =
            false;
    }


    friendSection.style.display =
        "none";
}


// =====================================================
// CLICKING 63
// =====================================================

function openSecretDoor() {

    if (
        !secret63Unlocked
    ) {

        return;
    }


    if (
        friendSection.style.display ===
        "block"
    ) {

        friendSection.style.display =
            "none";

        return;
    }


    friendSection.style.display =
        "block";

    friendMessage.textContent =
        "";


    setTimeout(
        () => {

            friendCodeInput.focus();

        },
        100
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
            "#5ee06c";

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
            "#ff6b6b";

        friendMessage.textContent =
            "Incorrect friend code.";

        friendCodeInput.select();
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


randomQuestionButton.addEventListener(
    "click",
    randomQuestion
);


modeToggleButton.addEventListener(
    "click",
    toggleMode
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

updateModeText();


numberOne.value =
    "1";

numberTwo.value =
    "1";


updateProblem();
