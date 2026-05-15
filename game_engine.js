const activity_database_json = [
    { activityText: "Adição de lúpulo de amargor no início da fervura.", correctColor: "green" },
    { activityText: "Envase da cerveja pronta.", correctColor: "green" },
    { activityText: "Repouso da mostura a 65 graus Celsius por 60 minutos para converter amido em açúcar.", correctColor: "green" },
    { activityText: "Fervura do mosto por 60 minutos para esterilização.", correctColor: "green" },
    { activityText: "Adição do fermento Ale ao mosto.", correctColor: "green" },
    { activityText: "Fermentação do mosto a 18 graus Celsius por 10 dias.", correctColor: "green" },
    { activityText: "Adição de lúpulo faltando 10 minutos para o fim da fervura para aroma.", correctColor: "green" },
    { activityText: "Maturação a frio próximo de 0 graus Celsius por pelo menos 7 dias.", correctColor: "green" },
    { activityText: "Adição de solução de açúcar para carbonatação.", correctColor: "green" },
    { activityText: "Descanso de diacetil a 20 graus Celsius por 4 dias para reabsorção de off-flavors.", correctColor: "green" },
    { activityText: "Transporte interno entre setores.", correctColor: "orange" },
    { activityText: "Aquecimento inicial de 3 litros de água a 70 graus Celsius antes de adicionar os grãos.", correctColor: "orange" },
    { activityText: "Elevação da temperatura para 76 graus Celsius para facilitar a filtragem.", correctColor: "orange" },
    { activityText: "Clarificação e recirculação do mosto até ficar límpido.", correctColor: "orange" },
    { activityText: "Lavagem dos grãos com 4 litros de água a 76 graus Celsius.", correctColor: "orange" },
    { activityText: "Resfriamento rápido do mosto abaixo de 35 graus Celsius após a fervura.", correctColor: "orange" },
    { activityText: "Limpeza e sanitização minuciosa das garrafas de vidro antes do envase.", correctColor: "orange" },
    { activityText: "Pesagem de malte pilsen e malte munich na balança.", correctColor: "orange" },
    { activityText: "Higienização e setup dos fermentadores antes de receberem o mosto.", correctColor: "orange" },
    { activityText: "Medição da densidade inicial e final com um densímetro.", correctColor: "orange" },
    { activityText: "Procurar por ferramentas ou lúpulo desorganizados pelo chão da fábrica.", correctColor: "red" },
    { activityText: "Aguardar a chegada de malte atrasado do fornecedor com a fábrica parada.", correctColor: "red" },
    { activityText: "Refazer o envase de garrafas que vazaram devido a tampinhas mal colocadas.", correctColor: "red" },
    { activityText: "Produzir 50 litros de cerveja quando a demanda do cliente era para apenas 20 litros.", correctColor: "red" },
    { activityText: "Armazenar lúpulo em excesso que acaba estragando no almoxarifado.", correctColor: "red" },
    { activityText: "Deslocamento desnecessário de barris de chope entre três galpões diferentes.", correctColor: "red" },
    { activityText: "Filtrar a cerveja repetidas vezes além do padrão visual exigido pelo cliente.", correctColor: "red" },
    { activityText: "Pausa não programada na brassagem devido a uma quebra na bomba de água.", correctColor: "red" },
    { activityText: "Descarte no ralo de um lote inteiro de cerveja contaminada por falta de higiene.", correctColor: "red" },
    { activityText: "Caminhadas longas e desnecessárias do operador entre a panela e o painel de controle.", correctColor: "red" }
];

const start_view_section = document.getElementById('start_screen_view');
const game_view_section = document.getElementById('game_screen_view');
const board_view_section = document.getElementById('leaderboard_screen_view');
const initials_text_input = document.getElementById('player_initials_input');
const start_action_button = document.getElementById('start_game_button');
const restart_action_button = document.getElementById('restart_game_button');
const time_display_element = document.getElementById('turn_timer_display');
const activity_text_element = document.getElementById('current_activity_text');
const final_score_display = document.getElementById('player_final_score');
const ranking_list_element = document.getElementById('top_players_list');
const game_main_container = document.getElementById('game_main_container');
const question_counter_element = document.getElementById('question_counter_display');

const answer_button_green = document.getElementById('btn_value_add');
const answer_button_orange = document.getElementById('btn_necessary_action');
const answer_button_red = document.getElementById('btn_waste_action');

const game_audio_start = new Audio('assets/audio/start.wav');
const game_audio_ok = new Audio('assets/audio/ok.wav');
const game_audio_error = new Audio('assets/audio/not_ok.wav');
const game_audio_end = new Audio('assets/audio/end.wav');
const game_audio_music = new Audio('assets/audio/game_music.mp3');
game_audio_music.loop = true;
game_audio_music.volume = 0.85;

let current_deck_array = [];
let current_card_index = 0;
let player_current_score = 0;
let turn_timer_seconds = 15;
let active_timer_interval = null;
let current_player_initials = "";

start_action_button.addEventListener('click', handle_start_click);
restart_action_button.addEventListener('click', handle_restart_click);
answer_button_green.addEventListener('click', handle_green_click);
answer_button_orange.addEventListener('click', handle_orange_click);
answer_button_red.addEventListener('click', handle_red_click);

function handle_start_click() {
    current_player_initials = initials_text_input.value.toUpperCase();
    if (current_player_initials.length !== 3) {
        alert("A sigla deve conter 3 letras.");
        return;
    }
    
    play_start_sound();
    start_background_music();
    
    switch_to_game_screen();
    initialize_game_sequence(activity_database_json);
}

function handle_restart_click() {
    switch_to_start_screen();
}

function handle_green_click() { process_selected_answer('green'); }
function handle_orange_click() { process_selected_answer('orange'); }
function handle_red_click() { process_selected_answer('red'); }

function play_start_sound() {
    game_audio_start.currentTime = 0;
    game_audio_start.play();
}

function start_background_music() {
    game_audio_music.currentTime = 0;
    game_audio_music.play();
}

function stop_background_music() {
    game_audio_music.pause();
}

function play_success_sound() {
    game_audio_ok.currentTime = 0;
    game_audio_ok.play();
}

function play_error_sound() {
    game_audio_error.currentTime = 0;
    game_audio_error.play();
}

function play_end_sound() {
    game_audio_end.currentTime = 0;
    game_audio_end.play();
}

function switch_to_game_screen() {
    start_view_section.classList.remove('active_screen');
    start_view_section.classList.add('hidden_screen');
    game_view_section.classList.remove('hidden_screen');
    game_view_section.classList.add('active_screen');
}

function switch_to_start_screen() {
    board_view_section.classList.remove('active_screen');
    board_view_section.classList.add('hidden_screen');
    start_view_section.classList.remove('hidden_screen');
    start_view_section.classList.add('active_screen');
    initials_text_input.value = "";
}

function switch_to_board_screen() {
    game_view_section.classList.remove('active_screen');
    game_view_section.classList.add('hidden_screen');
    board_view_section.classList.remove('hidden_screen');
    board_view_section.classList.add('active_screen');
}

function initialize_game_sequence(fetched_deck_data) {
    player_current_score = 0;
    current_card_index = 0;
    current_deck_array = shuffle_deck_array([...fetched_deck_data]);
    render_next_card();
}

function shuffle_deck_array(deck_array) {
    for (let current_index = deck_array.length - 1; current_index > 0; current_index--) {
        let random_index = Math.floor(Math.random() * (current_index + 1));
        let temporary_swap_value = deck_array[current_index];
        deck_array[current_index] = deck_array[random_index];
        deck_array[random_index] = temporary_swap_value;
    }
    return deck_array;
}

function render_next_card() {
    if (current_card_index >= current_deck_array.length) {
        finish_current_game();
        return;
    }
    
    let display_index = current_card_index + 1;
    question_counter_element.innerText = display_index + "/" + current_deck_array.length;
    
    let current_card = current_deck_array[current_card_index];
    activity_text_element.innerText = current_card.activityText;
    
    turn_timer_seconds = 15;
    time_display_element.innerText = turn_timer_seconds;
    start_turn_timer();
}

function start_turn_timer() {
    clearInterval(active_timer_interval);
    active_timer_interval = setInterval(decrement_timer_value, 1000);
}

function decrement_timer_value() {
    turn_timer_seconds--;
    time_display_element.innerText = turn_timer_seconds;
    
    if (turn_timer_seconds <= 0) {
        process_selected_answer("timeout");
    }
}

function process_selected_answer(player_chosen_color) {
    clearInterval(active_timer_interval);
    
    let current_card = current_deck_array[current_card_index];
    let is_correct_answer = (player_chosen_color === current_card.correctColor);

    if (is_correct_answer) {
        player_current_score += 100 + (turn_timer_seconds * 5);
        trigger_success_feedback();
        play_success_sound();
    } else {
        player_current_score -= 50;
        if (player_current_score < 0) {
            player_current_score = 0;
        }
        trigger_error_feedback();
        play_error_sound();
    }

    current_card_index++;
    setTimeout(render_next_card, 400); 
}

function trigger_error_feedback() {
    game_main_container.classList.add('shake_animation');
    setTimeout(remove_shake_animation, 400);
}

function remove_shake_animation() {
    game_main_container.classList.remove('shake_animation');
}

function trigger_success_feedback() {
    game_main_container.classList.add('success_pulse_animation');
    setTimeout(remove_success_animation, 400);
}

function remove_success_animation() {
    game_main_container.classList.remove('success_pulse_animation');
}

function finish_current_game() {
    clearInterval(active_timer_interval);
    stop_background_music();
    play_end_sound();
    save_player_score();
    display_leaderboard_data();
    switch_to_board_screen();
}

function save_player_score() {
    let storage_data = localStorage.getItem('beer_game_scores');
    let score_list_array = [];
    
    if (storage_data) {
        score_list_array = JSON.parse(storage_data);
    }
    
    let player_data_object = {
        playerInitials: current_player_initials,
        finalScore: player_current_score
    };
    
    score_list_array.push(player_data_object);
    score_list_array.sort(sort_score_descending);
    
    score_list_array = score_list_array.slice(0, 10);
    
    localStorage.setItem('beer_game_scores', JSON.stringify(score_list_array));
    final_score_display.innerText = "Sua Pontuação: " + player_current_score;
}

function sort_score_descending(first_item, second_item) {
    return second_item.finalScore - first_item.finalScore;
}

function display_leaderboard_data() {
    ranking_list_element.innerHTML = "";
    let storage_data = localStorage.getItem('beer_game_scores');
    
    if (!storage_data) {
        return;
    }
    
    let score_list_array = JSON.parse(storage_data);
    score_list_array.forEach(create_score_list_item);
}

function create_score_list_item(score_object) {
    let list_item_element = document.createElement('li');
    list_item_element.innerText = score_object.playerInitials + " : " + score_object.finalScore;
    ranking_list_element.appendChild(list_item_element);
}
