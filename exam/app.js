var GameScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
  
    initialize:
  
    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });
  
        this.player = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
    },
  
    preload: function ()
    {
        
        this.load.image('darksky', 'assets/darksky.png');
       
        this.load.image('ground', 'assets/platform.png');
        this.load.image('obst1', 'assets/cactus1.png');
        this.load.image('obst2', 'assets/cactus2.png');
        //this.load.image('faceball', 'assets/faceball.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        //this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    },
  
    create: function ()
    {
        this.add.image(400, 300, 'darksky');
  
        var platforms = this.physics.add.staticGroup();
  
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(800, 568, 'ground').setScale(2).refreshBody();
        
  
        var player = this.physics.add.sprite(100, 450, 'dude');
  
        player.setBounce(0.0);
        player.setCollideWorldBounds(true);
       
       /* this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
  
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });*/
  
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
  
        this.cursors = this.input.keyboard.createCursorKeys();
  
        this.obst = this.physics.add.image(820, 510, "obst1");
        this.obst2 = this.physics.add.image(1250, 510, "obst2");

        this.scoreText = this.add.text(600, 550, 'Score: 0 ', { fontSize: '32px', fill: '#fff' });
  
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(this.obst2, platforms)
        this.physics.add.collider(this.obst, platforms);
        this.physics.add.overlap(player, this.obst, this.collectStar, null, this);
        this.physics.add.overlap(player, this.obst2, this.collectStar, null, this);
        this.player = player;
  
        var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
  
        button.on('pointerup', function () {
  
            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
  
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
  
                this.scale.startFullscreen();
            }
  
        }, this);
  
        this.scoreText.setText('Score: ');
  
        var FKey = this.input.keyboard.addKey('F');
  
        FKey.on('down', function () {
  
            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
  
        }, this);
    },
  
    update: function (time)
    {
        //var star = this.stars;
        var cursors = this.cursors;
        var player = this.player;
       

        score =+ Math.round(time /100);
        this.scoreText.setText('Score: ' + score);
        player.update(time);

        if (this.obst.x > -20){
            this.obst.x -= 3;
            
        }else{
            this.obst.x = 820;
        }
        if (this.obst2.x > 0){
            this.obst2.x -= 3;
            
        }else{
            this.obst2.x = 1250;
        }
    
        
        if (player.x == 100){
        player.anims.play('turn');
        }
  
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-250);
        }
    },
        
    collectStar: function (player, obst)
    {
        
        obst.disableBody(true, true);
        
        player.disableBody(true, true);
        /*this.score += 10;
        this.scoreText.setText('Score: ' + this.score);*/
        time.getElapsed();
        score = this.scoreText.setText('Score: ' + score);
        this.scoreText.setText('Score: ' + score);
    }
  
 });
  
 var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: GameScene
 };

 var game = new Phaser.Game(config);