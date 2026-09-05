// =====================================================
// BOB'S SCHOOL LOCKER
// SECRET 6 × 7 -> 42 -> CLICK 63
// =====================================================


// =====================================================
// SETTINGS
// =====================================================

const FRIEND_CODE = "bob67123";


// =====================================================
// SECRET STATE
// =====================================================

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
// CREATE NUMBER SELECTORS
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
                63 IS THE SECRET DOOR.

                It looks exactly like every
                other multiplication-table number.

                The click only works after
                correctly solving exactly:

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


    /*
        Changing the multiplication problem
        locks the secret again.
    */

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


    // =================================================
    // WRONG ANSWER
    // =================================================

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


    // =================================================
    // CORRECT ANSWER
    // =================================================

    mathMessage.style.color =
        "#238636";

    mathMessage.textContent =
        "Correct! Great job.";


    /*
        THE SECRET ONLY UNLOCKS FOR:

        6 × 7 = 42

        7 × 6 DOES NOT COUNT.

        Any other correct multiplication
        problem also does not count.
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


    /*
        Do NOT show the Friend Access panel.

        Even after 6 × 7 is solved,
        the player still has to know
        to click a 63 in the table.
    */

    friendSection.style.display =
        "none";
}


// =====================================================
// CLICKING 63
// =====================================================

function openSecretDoor() {

    /*
        Clicking 63 normally does absolutely nothing.
    */

    if (
        !secret63Unlocked
    ) {

        return;
    }


    /*
        Once 6 × 7 = 42 has been
        correctly completed, clicking
        63 opens the Back Room.
    */

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
