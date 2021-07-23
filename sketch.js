//Create variables here
var dog, database, happyDog, foodS, foodStock, lastFed, gameState, changingGameState, readingGameState, currentTime
function preload() {
  //load images here
  Image1 = loadImage("images/dogImg.png")
  Image2 = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  sadDog = loadImage("images/deadDog.png")
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250, 250)
  dog.addImage(Image1)
  dog.scale = 0.5

  feed = createButton("Feed the dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)

  database = firebase.database()

  foodObj = new food()
  fedtime = database.ref("FeedTime")
  fedtime.on("value", function (data) {
    lastFed = data.val()
  })

  read()

  readState = database.ref("gameState")
  readState.on("value", gameS)
}
function gameS (data) {
  gameState = data.val()
}
function feedDog() {
  dog.addImage(Image2)

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  }
  
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function draw() {

  background(rgb(49, 139, 87))
  drawSprites();
  //add styles here
  fill("black")
  text(foodS, 50, 50)
  if (keyDown(UP_ARROW)) {
    console.log(foodS)
    write(foodS)

    dog.addImage(Image2)
  }

  foodObj.display()
  
  fill(255, 255, 254)
  textSize(15)
currentTime = hour()
  if(currentTime == fedtime+1) {
    update("Playing")
    foodObj.garden()
  }
  else if(currentTime == lastFed+2) {
    update("sleeping")
    foodOgj.bedroom()
  }
  else if(currentTime>lastFed+2 && curr) 
  if(gameState != "hungry") {
    feed.hide()
    dog.remove()
  }
  else {
    feed.show()
    dog.addImage(sadDog)
  }
}

function read() {

  //foodstock stores the location of "food" in database. Ref means refrence or location or adress
  foodStock = database.ref('Food')
  //.on() turns on the listener when there is any change in the value at foodStock. The newly updated value is stored inside data
  foodStock.on("value", function (data) {
    //data.val only shows the value of data. Writing only data will show a lot of infomation that is not needed
    foodS = data.val()
    //console.log(foodS)
    foodObj.updateFoodStock(foodS)

  })

}

function write(x) {

  if (x <= 0) {
    x = 0
  }
  else {
    x = x - 1
  }
  console.log(x)
  database.ref('/').update({

    Food: x

  }

  )

}