const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const tekstElement = document.getElementById("tekstElement")
const gameContainer = document.querySelector(".game")

let gameRunning = true

function jump() {
    if (gameRunning && dino.className != "jump") {
        dino.className = "jump"
        setTimeout(function () {
            dino.className = ""
        }, 500);
    }
}

// Når du trykker en tast, så kalles funksjonen "jump"
document.addEventListener("keydown", function (event) {
    jump()
})

function lyd(){
    document.getElementById("buzzer").play()
}

const buzzer = document.getElementById("buzzer")

// Vår "main loop": Kjøres hvert 20 millisekund (vha setInterval)
function mainLoop() {
    let dinoTop = parseInt(getComputedStyle(dino).getPropertyValue("top"))
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        gameRunning = false
        lyd()
        // alert("Game Over!")
        // TODO: Skriv en tekst på skjermen vha tekstElm.innerHTML = "Du tapte"

        // Stop intervallet vårt i å kjøre main-loop:
        clearInterval(mainInterval)
        cactus.style.animation = "none"
        cactus.style.display = "none"

        //Endre bakgrunnsfarge til rød når du taper
        gameContainer.style.backgroundColor = "red"

        //Vise "Game Over"
        tekstElement.innerHTML = "Game over! Prøv igjen da vel!"
        tekstElement.style.color = "black"
        tekstElement.style.textAlign = "center"

        const restartImg = document.createElement("img")
        restartImg.src = "restart.png"
        restartImg.alt = "restart"
        restartImg.style.display = "block"
        restartImg.style.margin = "20px auto"
        restartImg.style.height = "100px"
        restartImg.style.width = "100px"
        restartImg.style.cursor = "pointer"
        restartImg.addEventListener("click", () => location.reload())

        tekstElement.appendChild(restartImg)

    }

}


// Kjør mainLoop hvert 20 millisekund:
let mainInterval = setInterval(mainLoop, 20)
