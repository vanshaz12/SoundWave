function renderPlaylist(){
    document.querySelector('#page').innerHTML = `
    <section class="playlist">
        ${renderSong()}
    </section>
    `
}

// function renderSong() {
//     return state.
// }