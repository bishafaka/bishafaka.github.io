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
        audio.volume=.05;
    });

    //GAME BOXES ANIMATION BEHAVIOUR
    const sides=document.querySelectorAll(".side");
    sides.forEach((side) => {
        side.addEventListener("click", () => {
            //RESET
            sides.forEach((otherSide) => {
                const otherCover=otherSide.nextElementSibling;
                const otherLink=otherCover?.nextElementSibling;
                otherSide.classList.remove("shrink");
                otherSide.classList.add("unshrink");
                otherSide.style.display = "";
                if(otherCover?.classList.contains("cover")) {
                    otherCover.classList.remove("show");
                    otherCover.classList.add("hide");
                }
                if(otherLink?.classList.contains("link")) {
                    otherLink.classList.remove("show");
                }
            });
            //OPEN
            const cover=side.nextElementSibling;
            const link=cover?.nextElementSibling;
            setTimeout(() => {
                side.classList.remove("unshrink");
                side.classList.add("shrink");
                if(cover?.classList.contains("cover")) {
                    cover.classList.remove("hide");
                    cover.classList.add("show");
                }
            }, 400);
            setTimeout(() => {
                if(link?.classList.contains("link")) {
                    link.classList.add("show");
                }
            }, 800);

        });
    });

});
