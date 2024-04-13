let game_board_element = document.getElementById("board");
let player_one_board_element = document.getElementById("player_one_board");
let player_two_board_element = document.getElementById("player_two_board");
let modal_window = document.getElementById("modal");
let turn_element = document.getElementById("turn");

let count_of_cells = 100;
let interval_between_turn = 2;

let player_ship_count_to_paint = {
    player_one: 3,
    player_two: 3,
}
let players_ships_coordinate_obj = {
    player_one: [],
    player_two: []
}

let can_start_game = false;
let players_turn_flag = true;

function generateHTMLBoardGridForBothPlayers(){
    while (count_of_cells>0) {
        player_one_board_element.insertAdjacentHTML("afterbegin",`<div id=id${count_of_cells}></div>`);
        player_two_board_element.insertAdjacentHTML("afterbegin",`<div id=id${count_of_cells}></div>`);
        count_of_cells--;
    }
}

generateHTMLBoardGridForBothPlayers();

player_one_board_element.addEventListener("click",function(e){
    if(can_start_game && !players_turn_flag){
        if(players_ships_coordinate_obj.player_one.includes(e.target.id)){//id22
            setClassesForHitedCell(e.target, "hit");
            console.log('popal');
        }else{
            setClassesForHitedCell(e.target, "miss");
            switchPlayerTurn();
            console.log('no ne popal');
            toggleVisibilityOfPlayersShipsAfterTimeOut();
            toggleModalVisibility()
            updatePlayerNameHosTurn();
        }
    }else{
        setShipsConditionaly(e,"player_one");
        if(player_ship_count_to_paint.player_one===0){
            hidePlayerShips("player_one");
        }
        startGameConditionaly();
    }
});

player_two_board_element.addEventListener("click", function(e){
    if(can_start_game && players_turn_flag){
        if(players_ships_coordinate_obj.player_two.includes(e.target.id)){//id22
            setClassesForHitedCell(e.target, "hit");
            console.log('popal');
        }else{
            setClassesForHitedCell(e.target, "miss");
            switchPlayerTurn();
            console.log('no ne popal');
            toggleVisibilityOfPlayersShipsAfterTimeOut()
            toggleModalVisibility();
            updatePlayerNameHosTurn();
        }
    }else{
        setShipsConditionaly(e,"player_two");
        if(player_ship_count_to_paint.player_two===0){
            hidePlayerShips("player_two");
        }
        startGameConditionaly();
    }
});

function toggleModalVisibility(){
    modal_window.style.display = "block";
    setTimeout(()=>{
        modal_window.style.display = "none";
    },2000)
}

function toggleVisibilityOfPlayersShipsAfterTimeOut(){
    setTimeout(()=>{
        hidePlayerShips(players_turn_flag ?"player_two":"player_one" )
        showPlayerShips(players_turn_flag ?"player_one":"player_two" );
    },interval_between_turn * 1000)

}

function setClassesForHitedCell(cell_ref, css_class){
    cell_ref.classList.add(css_class)
}

function setPlayerShipsCell(e,player){
    e.target.classList.add(`${player}_ship`);
    player_ship_count_to_paint[player]--;
    players_ships_coordinate_obj[player].push(e.target.id);

}

function hidePlayerShips (player){
    let player_ships_elements = document.querySelectorAll(`.${player}_ship`);
    player_ships_elements.forEach((element)=>{
        element.classList.remove(`${player}_ship`);
    })
};

function showPlayerShips(player){
    const parentElement = document.getElementById(`${player}_board`);
    console.log(parentElement.querySelector(`#id33`));
    players_ships_coordinate_obj[player].forEach((id)=>{
        parentElement.querySelector(`#${id}`).classList.add(`${player}_ship`);
    })
}

function setShipsConditionaly(e ,player){
    if(player_ship_count_to_paint[player]>0 && !e.target.classList.contains(`${player}_ship`)){
        setPlayerShipsCell(e,player);
    }
}

function startGameConditionaly(){
    if(player_ship_count_to_paint.player_one ===0 && player_ship_count_to_paint.player_two === 0){
        can_start_game = true;
    }
}

function switchPlayerTurn(){
    players_turn_flag = !players_turn_flag;
}

function updatePlayerNameHosTurn(){
    turn_element.textContent = players_turn_flag ? "Player 1 turn" : "Player 2 turn";
}

//e.target.classList.add("miss");