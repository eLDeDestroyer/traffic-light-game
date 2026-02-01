let board = document.getElementById("board")
let boardWidth = 1000
let boardHeight = 1000
board.style.width = boardWidth + "px"
board.style.height = boardHeight + "px"

let carWidth = 50
let carHeight = 100

let trafficWidth = 40
let trafficHeight = 70

let traffics = [
    {
        x: (boardWidth / 2) - 120,
        y: (boardHeight / 2) - 60,
        deg: 0,
        position: 4
    },
    {
        x: (boardWidth / 2) + 25,
        y: (boardHeight / 2) - 120,
        deg: 90,
        position: 1
    },
    {
        x: (boardWidth / 2) + 80,
        y: (boardHeight / 2) + 5,
        deg: 0,
        position: 2
    },
    {
        x: (boardWidth / 2) - 60,
        y: (boardHeight / 2) + 65,
        deg: 90,
        position: 3
    }
]


let leftX = 0
let leftY = (boardHeight / 2) - (carHeight / 2) - (carWidth / 2)

let topX = (boardWidth / 2) + (carWidth / 2) - 5
let topY = 0

let rightX = boardWidth - carWidth
let rightY = (boardHeight / 2) - (carWidth / 2) + 15

let bottomX = (boardWidth / 2) - (carWidth / 2) - 45
let bottomY = boardHeight - carHeight

let carsImage = [
    "./assets/car_1.png",
    "./assets/car_2.png",
    "./assets/car_3.png"
]

let deg = [0, 90, 180, 270]

let carArray = []
let trafficArray = []

class Car {
    constructor(width, height){
        this.id = Math.floor(Math.random() * 100000)
        this.width = width
        this.height = height
        this.x = (boardWidth / 2) - (this.width / 2)
        this.y = (boardHeight / 2) - (this.height / 2)
        this.deg = 0
        this.speed = 2
        this.direct = 1
        this.isActive = true

        this.div = document.createElement("div")
        this.div.style.width = this.width + "px"
        this.div.style.height = this.height + "px"
        this.div.style.backgroundImage = `url(${carsImage[0]})`
        this.div.style.backgroundSize = "contain"
        this.div.style.backgroundRepeat = "no-repeat"
        this.div.style.backgroundPosition = "center"
        this.div.style.position = "absolute"
        this.div.style.zIndex = "5"
        board.appendChild(this.div)

        this.randomImage()
        this.randomDirect()
        this.draw()
    }

    randomImage(){
        const r = Math.random()
        if(r > 0.7) this.div.style.backgroundImage = `url(${carsImage[0]})`
        else if(r > 0.4) this.div.style.backgroundImage = `url(${carsImage[1]})`
        else this.div.style.backgroundImage = `url(${carsImage[2]})`
    }

    randomDirect(){
        const r = Math.random()
        if(r > 0.7){ this.direct = 1; this.deg = deg[2]; this.x = topX; this.y = topY }
        else if(r > 0.5){ this.direct = 2; this.deg = deg[3]; this.x = rightX; this.y = rightY }
        else if(r > 0.3){ this.direct = 3; this.deg = deg[0]; this.x = bottomX; this.y = bottomY }
        else{ this.direct = 4; this.deg = deg[1]; this.x = leftX; this.y = leftY }
    }

    updatePosition(trafficArray){
        if(!this.isActive) return
        let result = this.checkFrontCar(carArray)

        if(result.frontCar){
            let safeDistance = 10
            if(result.distance < safeDistance){
                this.speed = 0
                this.draw()
                return
            }
        }

        switch(this.direct){
            case 1:
                if(this.y + this.height > boardHeight) this.remove(); 
                if(trafficArray[1].position == this.direct){
                    if(
                        trafficArray[1].light == 2 &&
                        ((trafficArray[1].y - 100) < this.y && (trafficArray[1].y - 61) > this.y)
                    ){
                        this.speed = 1
                    } 
                    else if(
                        trafficArray[1].light == 3 &&
                        ((trafficArray[1].y - 60) < this.y && (trafficArray[1].y - 40) > this.y)
                    ){
                        this.speed = 0
                    } 
                    else {
                        this.speed = 2
                    }
                }
                this.y += this.speed
                break   

            case 2: 
                if(this.x < 0) this.remove(); 
                if(trafficArray[2].position == this.direct){
                    if(
                        trafficArray[2].light == 2 &&
                        ((trafficArray[2].x + 100) > this.x && (trafficArray[2].x + 61) < this.x)
                    ){
                        this.speed = 1
                    } 
                    else if(
                        trafficArray[2].light == 3 &&
                        ((trafficArray[2].x + 60) > this.x && (trafficArray[2].x + 40) < this.x)
                    ){
                        this.speed = 0
                    } 
                    else {
                        this.speed = 2
                    }
                }
                this.x -= this.speed
                break

            case 3: 
                if(this.y < 0) this.remove();
                if(trafficArray[3].position == this.direct){
                    if(
                        trafficArray[3].light == 2 &&
                        ((trafficArray[3].y + 100) > this.y && (trafficArray[3].y + 61) < this.y)
                    ){
                        this.speed = 1
                    } 
                    else if(
                        trafficArray[3].light == 3 &&
                        ((trafficArray[3].y + 60) > this.y && (trafficArray[3].y + 40) < this.y)
                    ){
                        this.speed = 0
                    } 
                    else {
                        this.speed = 2
                    }
                }
                this.y -= this.speed
                break

            case 4: 
                if(this.x > boardWidth) this.remove();
                if(trafficArray[0].position == this.direct){
                    if(
                        trafficArray[0].light == 2 &&
                        ((trafficArray[0].x - 100) < this.x && (trafficArray[0].x - 61) > this.x)
                    ){
                        this.speed = 1
                    } 
                    else if(
                        trafficArray[0].light == 3 &&
                        ((trafficArray[0].x - 60) < this.x && (trafficArray[0].x - 40) > this.x)
                    ){
                        this.speed = 0
                    } 
                    else {
                        this.speed = 2
                    }
                }
                this.x += this.speed
                break
        }

        this.draw()
    }

    checkFrontCar(carArray){
        let minDistance = 1000000000000000
        let frontCar = null

        carArray.forEach(car => {
            if(car.id === this.id) return
            if(car.direct !== this.direct) return

            if(this.direct === 1 && car.y > this.y){
                let d = car.y - (this.y + this.hitboxHeight)
                if(d >= 0 && d < minDistance){
                    minDistance = d
                    frontCar = car
                }
            }

            if(this.direct === 2 && car.x < this.x){
                let d = this.x - (car.x + car.hitboxWidth)
                if(d >= 0 && d < minDistance){
                    minDistance = d
                    frontCar = car
                }
            }

            if(this.direct === 3 && car.y < this.y){
                let d = this.y - (car.y + car.hitboxHeight)
                if(d >= 0 && d < minDistance){
                    minDistance = d
                    frontCar = car
                }
            }

            if(this.direct === 4 && car.x > this.x){
                let d = car.x - (this.x + this.hitboxWidth)
                if(d >= 0 && d < minDistance){
                    minDistance = d
                    frontCar = car
                }
            }
        })

        return { frontCar, distance: minDistance }
    }


    draw(){
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.deg}deg)`
    }

    remove(){
        this.isActive = false
        this.div.remove()
        carArray = carArray.filter(c => c.id !== this.id)
    }
    

    get hitboxWidth(){
        return (this.deg === 90 || this.deg === 270) ? this.height : this.width
    }

    get hitboxHeight(){
        return (this.deg === 90 || this.deg === 270) ? this.width : this.height
    }
}

class Trafic {
    constructor(x,y,width, height, deg, position, id){
        this.id = position
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.position = position
        this.light = 1
        this.deg = deg
        
        this.traffic = document.createElement("div")
        this.traffic.style.position = "absolute"
        this.traffic.style.width = this.width + "px"
        this.traffic.style.height = this.height + "px"
        this.traffic.style.backgroundImage = `url(./assets/green.png)`
        this.traffic.style.backgroundSize = "contain"
        this.traffic.style.backgroundRepeat = "no-repeat"
        this.traffic.style.backgroundPosition = "center"
        this.traffic.style.zIndex = "10"
        this.traffic.id = "light" + this.id
        board.appendChild(this.traffic)
        this.drawFunc()
    }

    drawFunc(){
        this.traffic.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.deg}deg)`
    }

    changeLightFunc(){
        this.traffic.style.backgroundImage = `url(./assets/yellow.png)`
            switch(this.light){
                case 1:
                    this.light = 2
                    setTimeout(() => {
                        this.light = 3
                        this.traffic.style.backgroundImage = `url(./assets/red.png)`
                    }, 500)
                    break
                case 3:
                    this.light = 2
                    setTimeout(() => {
                    this.light = 1
                    this.traffic.style.backgroundImage = `url(./assets/green.png)`
                    }, 500)

                    break
            }
    }

}

class Gameboard {
    initialize(){
        setInterval(() => this.spawnCar(), 1500)
        this.spawnTraffic()
        this.gameLoop()
        this.listener()
    }


    listener(){
        document.addEventListener("keydown",(e) => this.changeTrafficLight(e))
    }

    changeTrafficLight(e){
        if(e.code == "KeyA"){
            trafficArray[0].changeLightFunc()
        }
        if(e.code == "KeyW"){
            trafficArray[1].changeLightFunc()
        }

        if(e.code == "KeyD"){
            trafficArray[2].changeLightFunc()
        }
        if(e.code == "KeyS"){
            trafficArray[3].changeLightFunc()
        }
    }

    spawnCar(){
        const car = new Car(carWidth, carHeight)
        carArray.push(car)
    }

    spawnTraffic(){
        traffics.forEach(element => {
            let traffic = new Trafic(element.x,element.y,trafficWidth, trafficHeight, element.deg, element.position)
            trafficArray.push(traffic)
        });
    }

    gameLoop(){
        console.log(trafficArray[0])
        carArray.forEach(car => car.updatePosition(trafficArray))
        this.detectCollisions()
        requestAnimationFrame(() => this.gameLoop())
    }

    detectCollisions(){
        for(let i = 0; i < carArray.length; i++){
            const carA = carArray[i]

            for(let j = i+1; j < carArray.length; j++){
                const carB = carArray[j]

                if(this.isColliding(carA, carB)){
                    alert("Tabrakan terdeteksi!", carA.id, carB.id)
                    carA.remove()
                    carB.remove()
                }
            }
        }
    }

    isColliding(a,b){
        return a.x + a.hitboxWidth > b.x &&
               a.y + a.hitboxHeight > b.y &&
               b.x + b.hitboxWidth > a.x &&
               b.y + b.hitboxHeight > a.y
    }
}

const game = new Gameboard()
game.initialize()


document.getElementById("light1").addEventListener("click", () => {
    trafficArray[1].changeLightFunc()
})

document.getElementById("light2").addEventListener("click", () => {
    trafficArray[2].changeLightFunc()
})

document.getElementById("light3").addEventListener("click", () => {
    trafficArray[3].changeLightFunc()
})

document.getElementById("light4").addEventListener("click", () => {
    trafficArray[0].changeLightFunc()
})
