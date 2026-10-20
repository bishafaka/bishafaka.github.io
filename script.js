document.addEventListener("DOMContentLoaded", () => {
    //INIT HEADER
    fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML=data;
    });

    //INIT FOOTER
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML=data;
    });

    //AUDIO VOLUME
    document.querySelectorAll("audio").forEach(audio => {
        audio.volume=.25;
    });

    //GAME BOXES ANIMATION BEHAVIOUR
    const sides=document.querySelectorAll(".side");
    sides.forEach((side) => {
        side.addEventListener("click", () => {
            const cover=side.nextElementSibling;
            const link=cover.nextElementSibling;
            side.classList.add("shrink");
            if (cover && cover.classList.contains("cover")) {
                cover.classList.add("show");
            }
            setTimeout(() => {
                if (link && link.classList.contains("link")) {
                    link.classList.add("show");
                }
                side.style.display="none";
            }, 400);
        });
    });
});
