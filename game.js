
async function loadGame() {
    const params=new URLSearchParams(window.location.search);
    const game=params.get("name");
    const content=document.getElementById("game-content");
    if (!game || !/^[a-z0-9-]+$/i.test(game)) {
        content.innerHTML="<h1>Game not found</h1>";
        return;
    }
    try {
        const response=await fetch("games.json");
        if(!response.ok) {
            throw new Error("Could not load games.json");
        }
        const games=await response.json();
        const selectedGame=games[game];
        if(!selectedGame) {
            content.innerHTML="<h1>Game not found</h1>";
            return;
        }
        const folder=`media/${game}/`;

        //PAGE TITLE
        document.title=`BISHAFAKA // ${selectedGame.title}`;

        //GAME INFORMATION
        document.getElementById("game-hook").innerHTML=selectedGame.hook;
        document.getElementById("game-description").innerHTML=selectedGame.description;

        // GAME THEME
        const theme=selectedGame.theme || {};
        Object.entries(theme).forEach(([name, color]) => {
            document.documentElement.style.setProperty(`--${name}`, color);
        });
        //BGs
        document.getElementById("game-header").style.setProperty("--header-bg", `url("${folder}banner.png")`);
        document.getElementById("game-inline").style.setProperty("--inline-bg", `url("${folder}inline.png")`);
        
        // IMGs
        function loadImage(element, path) {
            element.onerror=() => {
                if(element.src.endsWith(".gif")) {
                    element.src=path.replace(/\.gif$/, ".png");
                } else {
                    element.style.display="none";
                }
            };
            element.style.display="";
            element.src=path;
        }
        const logo=document.getElementById("game-logo");
        loadImage(logo, folder+"logo.gif");
        const preview=document.getElementById("game-preview");
        loadImage(preview, folder+"preview.gif");
        const inlines=document.getElementsByClassName("inline");
        Array.from(inlines).forEach((inline) => {
            inline.src=folder+"inline.png";
        });
        const carrousel=document.getElementById("game-carrousel");
        loadImage(carrousel, folder+"carrousel.gif");
        const itchio=document.getElementById("game-itchio");
        itchio.src=folder+"itchio.png";

        //MUSIC
        const music=document.getElementById("game-music");
        music.src=folder+"background-music.wav";
        music.load();

        //TRAILER
        const trailer=document.getElementById("game-trailer");
        const trailerError=document.getElementById("game-error-trailer");
        trailer.src=folder+"trailer.mp4";
        trailer.onerror=() => {
            trailer.onerror=null;
            trailer.style.display="none";
            trailerError.src=folder+"trailer.png";
            trailerError.style.display="block";
        };
        trailer.load();

        //LINKs
        const youtubeLink=document.getElementById("game-youtube");
        if(selectedGame.youtube) {
            youtubeLink.href=selectedGame.youtube;
        } else {
            youtubeLink.style.pointerEvents="none";
        }
        const itchioLink=document.getElementById("game-itchio-link");
        if(selectedGame.itchio) {
            itchioLink.href=selectedGame.itchio;
        } else {
            itchioLink.hidden=true;
        }
    } catch (error) {
        console.error("Error loading game:", error);
        content.innerHTML=`<h1>Could not load game information</h1> <p>${error.message}</p>`;
    }
}
loadGame();

//CARROUSEL HORIZONTAL SCROLL
document.querySelectorAll('.carrousel').forEach(carousel => {
    carousel.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY * 5;
        }
    }, { passive: false });
});
