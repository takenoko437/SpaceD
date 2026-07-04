"use strict";

/*=================================================
    D
=================================================*/

/*=========================================
        取得
=========================================*/

const cells = [...document.querySelectorAll(".cell")];

const enterButton =
    document.getElementById("enterButton");

const answers = [

    document.getElementById("answer1"),
    document.getElementById("answer2"),
    document.getElementById("answer3"),
    document.getElementById("answer4")

];

const clearScreen =
    document.getElementById("clearScreen");

/*=========================================
        状態
=========================================*/

// 各マス
// 0 = 空白
// 1～6 = 数字

const board = [

    [0,4,0],
    [0,6,0],
    [0,4,0]

];

let answerIndex = 0;

let cleared = false;

/*=========================================
      パターン一覧
=========================================*/

const patterns = [

{

    result:"イ",

    board:[

        [1,1,1],
        [1,0,1],
        [1,1,1]

    ]

},

{

    result:"ニ",

    board:[

        [0,1,0],
        [1,2,1],
        [0,1,0]

    ]

},

{

    result:"サ",

    board:[

        [1,2,0],
        [2,0,2],
        [0,2,1]

    ]

},

{

    result:"サ",

    board:[

        [0,2,1],
        [2,0,2],
        [1,2,0]

    ]

},

{

    result:"ヨ",

    board:[

        [0,2,0],
        [2,4,2],
        [0,2,0]

    ]

},

{

    result:"ゴ",

    board:[

        [0,3,0],
        [3,0,3],
        [0,3,0]

    ]

},

{

    result:"ロ",

    board:[

        [0,0,0],
        [4,6,4],
        [0,0,0]

    ]

},
    
{

    result:"ロ",

    board:[

        [0,4,0],
        [0,6,0],
        [0,4,0]

    ]

}

];

/*=========================================
        マス更新
=========================================*/

function refreshBoard(){

    cells.forEach((cell,index)=>{

        const row = Math.floor(index / 3);

        const col = index % 3;

        const value = board[row][col];

        cell.textContent =

            value === 0

            ? ""

            : value;

    });

}

/*=========================================
      クリック
=========================================*/

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        if(cleared){

            return;

        }

        const row = Math.floor(index / 3);

        const col = index % 3;

        board[row][col]++;

        if(board[row][col] > 6){

            board[row][col] = 0;

        }

        refreshBoard();

    });

});


/*=========================================
        配列比較
=========================================*/

function boardEquals(a,b){

    for(let r=0;r<3;r++){

        for(let c=0;c<3;c++){

            if(a[r][c]!==b[r][c]){

                return false;

            }

        }

    }

    return true;

}

/*=========================================
        判定
=========================================*/

function checkPattern(){

    for(const pattern of patterns){

        if(boardEquals(board,pattern.board)){

            addCharacter(pattern.result);

            return;

        }

    }

}

/*=========================================
        文字追加
=========================================*/

function addCharacter(character){

    if(answerIndex>=4){

        return;

    }

    // 3文字目だけ
    // ゴ → コ

    if(

        answerIndex===2 &&

        character==="ゴ"

    ){

        character="コ";

    }

    answers[answerIndex].textContent=character;

    answerIndex++;

    checkClear();

}

/*=========================================
        クリア判定
=========================================*/

function checkClear(){

    const word=

        answers

        .map(box=>box.textContent)

        .join("");

    if(word!=="サイコロ"){

        return;

    }

    cleared=true;

    cells.forEach(cell=>{

        cell.disabled=true;

        cell.style.cursor="default";

    });

    enterButton.disabled=true;

    enterButton.style.cursor="default";

    clearScreen.classList.add("show");

}

/*=========================================
        決定
=========================================*/

enterButton.addEventListener(

    "click",

    ()=>{

        if(cleared){

            return;

        }

        checkPattern();

    }

);

/*=========================================
        初期化
=========================================*/

function initialize(){

    refreshBoard();

    answers.forEach(box=>{

        box.textContent="";

    });

}

initialize();
