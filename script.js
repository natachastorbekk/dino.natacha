const dino = document.getElementById("dino")
const kaktus = document.getElementById("kaktus")
const tekstElement = document.getElementById("tekstElement")
const gameContainer = document.querySelector(".game")

let gameRunning = true

document.addEventListener("DOMContentLoaded", function(){
    let tel = 0
    let speed = 5
    const tellerElement = document.getElementById("teller")
    const rekordElement = document.getElementById("rekord")
    let rekord = localStorage.getItem("highscore")||0
    rekordElement.textContent = "Rekord:" + rekord

    let kaktusLeft = 580

    function tellerNed (){
        if (tel <= 1000 && gameRunning){
            tellerElement.textContent = tel
            tel++;

            if (tel% 10 === 0){
                speed += 0.2
            }

            setTimeout(tellerNed, 80)
        } else{
            if (tel - 1 > rekord){
                rekord = tel - 1
                localStorage.setItem("highscore", rekord)
                rekordElement.textContent = "Rekord:" + rekord
            }
        }

        }
    
    tellerNed()

    function flyttKaktusen (){
        if (gameRunning){
            kaktusLeft -= speed

            if (kaktusLeft <= -20){
                kaktusLeft = 580
            }
            kaktus.style.left = kaktusLeft + "px"
            requestAnimationFrame(flyttKaktusen)
        }
    }
    flyttKaktusen()

})

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
    let kaktusLeft = parseInt(window.getComputedStyle(kaktus).getPropertyValue("left"))

    if (kaktusLeft < 50 && kaktusLeft > 0 && dinoTop >= 140) {
        gameRunning = false
        lyd()
        // alert("Game Over!")
        // TODO: Skriv en tekst på skjermen vha tekstElm.innerHTML = "Du tapte"

        // Stop intervallet vårt i å kjøre main-loop:
        clearInterval(mainInterval)
        kaktus.style.animation = "none"
        kaktus.style.display = "none"

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
