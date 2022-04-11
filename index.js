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

tilesPath = 'assets/background.png';
mapPath = 'assets/codepen-level.json';
tiles = "pacman-tiles";

var test = 11;

var ghost;


class pacman extends Phaser.Scene{
    constructor(){
        super("pacman");
    }
    init(data){
    }
    preload(){
        this.load.image('background','assets/background.png');
        this.load.image('ghost','assets/ghost.png');
        
        //this.load.spritesheet('pacman','assets/pacman_spriteSheet.png',{ frameWidth: 576, frameHeight: 32 });
        this.load.image('player','assets/pacman.png');
        this.load.tilemapTiledJSON("map", mapPath);
        this.load.image(tiles, tilesPath);
    }

    create(){
        this.add.image(0,0,'background').setOrigin(0);
        
        player = this.physics.add.sprite(100,110,'player').setScale(0.85);
        player.setCollideWorldBounds(true);

        ghost = this.physics.add.sprite(500,110,'ghost').setScale(0.85);

        /*this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('pacman', { start: 0, end: 13 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('pacman', { start: 9, end: 12 }),
            frameRate: 5,
            repeat: 0
        });*/

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
        //this.physics.add.collider(ghostsGroup, layer1);
    }

    update(){

        moveGhost();
        //this.physics.moveToObject(ghost, player, 50);

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
        var currentState = new Red(this)

        this.change = function(state) {
            // limits number of changes
            if (count++ >= 10) return
            currentState = state
            currentState.go()
        }

        this.start = function() {
            currentState.go()
        }
    }

    var Red = function(light) {
        this.light = light

        this.go = function() {
            if(test <= 10){
                log.add('Red --> for 1 minute')
                //light.change(new Green(light))
            }
            
        }
    }

    

    //player.body.blocked.right

    /*var Yellow = function(light) {
        this.light = light

        this.go = function() {
            log.add('Yellow --> for 10 seconds')
            light.change(new Red(light))
        }
    }

    var Green = function(light) {
        this.light = light

        this.go = function() {
            log.add('Green --> for 1 minute')
            light.change(new Yellow(light))
        }
    }*/

    // log helper

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
    light.start()

    log.show()
    }

    run()
            
        }
}

function moveGhost(){
    ghost.setVelocityX(50)
    if(ghost.body.blocked.right){
        ghost.setVelocityX(-50);
    }
}




