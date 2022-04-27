var keyZ;
var keyQ;
var keyS;
var keyD;

var player;

var layer1;
var layer2;

let map;

let gridSize = 32;
let offset=parseInt(gridSize/2);
var x;

tilesPath = 'assets/background.png';
mapPath = 'assets/codepen-level.json';
tiles = "pacman-tiles";


var ghost;
var startMovGhost = true;

var ghostOrange;



class pacman extends Phaser.Scene{
    constructor(){
        super("pacman");
    }
    init(data){
    }
    preload(){
        this.load.image('ghost','assets/ghost.png');
        this.load.image('ghostOrange','assets/ghost2.png');
        this.load.image('player','assets/pacman.png');
        this.load.tilemapTiledJSON("map", mapPath);
        this.load.image(tiles, tilesPath);
    }

    create(){
        player = this.physics.add.sprite(100,110,'player').setScale(0.80);
        player.setCollideWorldBounds(true);
        ghost = this.physics.add.sprite(500,110,'ghost').setScale(0.85);
        ghostOrange = this.physics.add.sprite(300,430,'ghostOrange').setScale(0.85);
        
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        map = this.make.tilemap({ key: "map", tileWidth: gridSize, tileHeight: gridSize });
        const tileset = map.addTilesetImage(tiles);
        
        layer1 = map.createLayer("Layer 1", tileset, 0, 0);
        layer1.setCollisionByProperty({ collides: true});

        layer2 = map.createLayer("Layer 2", tileset, 0, 0);
        layer2.setCollisionByProperty({ collides: true});

        this.physics.add.collider(player, layer1);
        this.physics.add.collider(player, layer2);

        this.physics.add.collider(ghost, layer1);
        this.physics.add.collider(ghost, layer2);

        this.physics.add.collider(ghost, layer1);
        this.physics.add.collider(ghost, layer2);

        this.physics.add.collider(ghostOrange, layer1);
        this.physics.add.collider(ghostOrange, layer2);
    }

    update(){
       
        if (keyD.isUp || keyQ.isUp || keyZ.isUp || keyS.isUp){
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.setRotation(0);
        }
        if(keyQ.isDown){
                player.setVelocityX(-100);
                player.direction = 'left';
            }
        else if(keyD.isDown){
            player.setVelocityX(100);
                player.direction = 'right';
        }
        else if(keyZ.isDown){
            player.setVelocityY(-100);
            player.direction = 'up';
        }
        else if(keyS.isDown){
            player.setVelocityY(100);
            player.direction = 'down';
        }

    var Ghost = function() {
        var count = 0
        var currentState = new Etat1(this)

        this.change = function(state) {
            if (count++ >= 10) return
            currentState = state
            currentState.go()
        }

        this.start = function() {
            currentState.go()
        }
    }

    var Etat1 = function(light) {
        this.light = light

        this.go = function() {
            if(ghost.body.position.x >= player.body.position.x){
                log.add('etat 1')
                moveGhost(x);
            }
            if(ghost.body.position.x <= player.body.position.x){
                light.change(new Etat2(light))
            }
            
        }
    }

    var Etat2 = function(light) {
        this.light = light

        this.go = function() {
            if(ghost.body.position.x <= player.body.position.x){
                log.add('etat 2')
                moveGhostSpeed(x);
            }
        }
    }

    var GhostOrange = function() {
        var count = 0
        var currentState = new GhostOrangeEtat1(this)

        this.change = function(state) {
            if (count++ >= 10) return
            currentState = state
            currentState.go()
        }

        this.start = function() {
            currentState.go()
        }
    }

    var GhostOrangeEtat1 = function(light2) {
        this.light2 = light2

        this.go = function() {
            //if(ghostOrange.body.position.x >= player.body.position.x){
                log.add('etat 1')
                moveGhostOrange(x);
           // }
            /*if(ghost.body.position.x <= player.body.position.x){
                light.change(new GhostOrangeEtat2(light))
            }*/
            
        }
    }

    /*var GhostOrangeEtat2 = function(light) {
        this.light = light

        this.go = function() {
            if(ghost.body.position.x <= player.body.position.x){
                log.add('etat 2')
                moveGhostSpeed(x);
            }
        }
    }*/


    var log = (function() {
    var log = ''

    return {
        add: function(msg) {
        log += msg + '\n'
        },
        show: function() {
        console.log(log)
        log = ''
        },
    }
    })()

    function run() {
    var light = new Ghost()
    var light2 = new GhostOrange()
    light.start()
    light2.start()

    log.show()
    }

    run()
            
        }
}

function moveGhost(x){
    if (startMovGhost == true){
        ghost.setVelocityY(-50);
    }
     if (ghost.body.blocked.right || ghost.body.blocked.left || ghost.body.blocked.down || ghost.body.blocked.up){
            x = getRandomInt(4)
            console.log(x);
            if(x == 1){
                ghost.setVelocityY(50);
                startMovGhost = false;
            }
            else if (x == 0){
                ghost.setVelocityY(-50);
                startMovGhost = false;
            }
            else if (x == 2){
                ghost.setVelocityX(-50);
                startMovGhost = false;
            }
            else if (x == 3){
                ghost.setVelocityX(50);
                startMovGhost = false;
            }
        }
}

function moveGhostOrange(x){
    if (startMovGhost == true){
        ghostOrange.setVelocityY(100);
    }
     if (ghostOrange.body.blocked.right || ghostOrange.body.blocked.left || ghostOrange.body.blocked.down || ghostOrange.body.blocked.up){
            x = getRandomInt(4)
            console.log(x);
            if(x == 1){
                ghostOrange.setVelocityY(100)
                startMovGhost = false;
            }
            else if (x == 0){
                ghostOrange.setVelocityY(-100);
                startMovGhost = false;
            }
            else if (x == 2){
                ghostOrange.setVelocityX(-100)
                startMovGhost = false;
            }
            else if (x == 3){
                ghostOrange.setVelocityX(100);
                startMovGhost = false;
            }
        }

}


function moveGhostSpeed(x){
    if (startMovGhost == true){
        ghost.setVelocityY(-150);
    }
    if (ghost.body.blocked.right || ghost.body.blocked.left || ghost.body.blocked.down || ghost.body.blocked.up){
        x = getRandomInt(4)
        console.log(x);
        if(x == 1){
            ghost.setVelocityY(150);
            startMovGhost = false;
        }
        else if (x == 0){
            ghost.setVelocityY(-150);
            startMovGhost = false;
        }
        else if (x == 2){
            ghost.setVelocityX(-150)
            startMovGhost = false;
        }
        else if (x == 3){
            ghost.setVelocityX(150)
            startMovGhost = false;
        }
    }
}        

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  




