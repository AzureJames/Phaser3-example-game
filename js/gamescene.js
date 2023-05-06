// Phaser3 example game
// main game scene

var DIR_UP    = 1;
var DIR_DOWN  = 2;
var DIR_LEFT  = 4;
var DIR_RIGHT = 8;

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'gamescene' });
    },

    preload: function ()
    {
		this.load.image('bg', 'https://github.com/AzureJames/Phaser3-example-game/blob/master/img/bg.jpg');
		this.load.image('girl', 'https://github.com/AzureJames/Phaser3-example-game/blob/master/img/girl.png');
    },

    create: function ()
    {
		//turn manager
		this.turnmanager = "playermovement";

		//this.bg = this.add.image(25,25,'bg');
		var image = this.add.tileSprite(25,25,2000,2000,'bg');
		// add player sprite

		this.dude = this.physics.add.sprite(500, 200, 'girl');
		this.dude.setScale(.7);
		this.dude.hp = 30;
		//this.load.image('water', './assets/underwater.jpg');
		
		//player move
		this.input.on('pointerdown', (pointer) =>
		{
			if(this.turnmanager == "playermovement"){
				if (pointer.worldY >500) {
					return;
				}
				if (pointer.worldX > this.dude.x -80 && pointer.worldX < this.dude.x +80){
					if (pointer.worldY > this.dude.y -80 && pointer.worldY < this.dude.y +80){
						this.dude.setX(Math.round(pointer.worldX / 50) * 50);
						this.dude.setY(Math.round(pointer.worldY / 50) * 50);
						this.turnmanager = "playerattack";
					}
				}

				//   this.physics.moveTo(this.dude,,,99);

	    	}
		});
        this.dude.setCollideWorldBounds(true);
		//this.dude = this.add.sprite(400, 200, 'sprites', 'dude');
		//enemies
		this.enemy = this.physics.add.image(500, 300, 'sprites', 'dude');
		this.enemy.hp = 100;
		this.enemy2 = this.physics.add.image(500, 350, 'sprites', 'dude');
		this.enemy2.hp = 100;
		this.enemy3 = this.physics.add.image(300, 150, 'sprites', 'dude');
		this.enemy3.hp = 100;
		this.enemy4 = this.physics.add.image(700, 550, 'sprites', 'dude');
		this.enemy4.hp = 100;
		this.enemies = [this.enemy, this.enemy2, this.enemy3, this.enemy4];

		//fight buttons
		this.doMelee = () => {
			if (this.turnmanager == "playerattack"){
				this.enemies.forEach(enemy => {
					if(this.dude.body.position.x > enemy.body.position.x -91
						&& this.dude.body.position.x < enemy.body.position.x +91)
						{
							if(this.dude.body.position.y > enemy.body.position.y -91
							&& this.dude.body.position.y < enemy.body.position.y +91)
							{
								enemy.hp -= 50;
								enemy.setScale(.5);
								if(enemy.hp < 1){
									this.enemies.splice(this.enemies.indexOf(enemy), 1);
									enemy.destroy();
								}
							}
						}
				});
				this.turnmanager = "enemymove";
				this.time.delayedCall(1, moveEnemies());
		    }
		}
		this.btnMelee = this.addButton(550, 550, 'sprites', this.doMelee, this, 'btn_play_hl', 'btn_play', 'btn_play_hl', 'btn_play');

		
		//enemy movement
		moveEnemies = () => {
			setTimeout(() => {
			

			if (this.turnmanager == "enemymove"){
			// this.enemies.forEach(enemy => {
				
			// 	console.log(enemy.body.position.x, enemy.body.position.y);

				// if(Math.random() < .25){
				// 	enemy.setX(enemy.body.position.x += 50);
				// }
				// else if (Math.random() < .5){
				// 	enemy.setX(enemy.body.position.x -= 50);
				// }
				// else if (Math.random() < .75){
				// 	enemy.setY(enemy.body.position.y += 50);
				// }
				// else{
				// 	enemy.setY(enemy.body.position.y -= 50);
				// }

				for (let i = 0; i < this.enemies.length; i++) {
					let enemy = this.enemies[i];
					this.direction = 'up';
					if (Math.random() > .25){this.direction = 'down';}
					if (Math.random() > .50){this.direction = 'left';}
					if (Math.random() > .75){this.direction = 'right';}
					
					// Move the enemy in the specified direction by 50 pixels
					switch(this.direction) {
					  case 'up':
						enemy.y > 50 ? enemy.y -= 50: "";
						break;
					  case 'down':
						enemy.y < 600 ? enemy.y += 50: "";
						break;
					  case 'left':
						enemy.x > 50 ? enemy.x -= 50: "";
						break;
					  case 'right':
						enemy.x < 750 ? enemy.x += 50: "";
						break;
					}
				  }

				this.turnmanager = "enemyattack";
				enemiesMelee();
			}
		}, 2000);
	    }

		//enemy attack
		enemiesMelee = () => {
			setTimeout(() => {
			if (this.turnmanager == "enemyattack"){
				for (let i = 0; i < this.enemies.length; i++) {
					let enemy = this.enemies[i];
					
					if(this.dude.body.position.x > enemy.body.position.x -91
						&& this.dude.body.position.x < enemy.body.position.x +91)
						{
							if(this.dude.body.position.y > enemy.body.position.y -91
							&& this.dude.body.position.y < enemy.body.position.y +91)
							{
								this.dude.hp -= 50;
								console.log(this.dude.hp);
								this.dude.setScale(.5);
								if(this.dude.hp < 1){
									console.log("game over");
									this.dude.setScale(0);
								}
							}
						}
				  }
				this.turnmanager = "playermovement";
			}
		}, 2000);
	    }


		//player logic
		// this.dude.setInteractive(true);
		// this.dude.on('pointerdown', function (ptr)       { 
		// 	//ptr.preventDefault();
		// 	this.tweens.add({
		// 		targets: this.dude,
		// 		x: destinationX,
		// 		y: destinationY,
		// 		duration: 500, // Time in milliseconds for the animation to complete
		// 		ease: 'Linear'
		// 	  });} );

		

			
		// add random coins and bombs
		// this.gameitems = this.physics.add.group();

        // for (var i = 0; i < 20; i++) {
		// 	// parameters
        //     var x = Phaser.Math.RND.between(0, 800);
        //     var y = Phaser.Math.RND.between(0, 600);
		// 	var objtype = (i < 0 ? TYPE_BOMB : TYPE_COIN);

		// 	// create custom sprite object
		// 	var newobj = new CollectObj(this, x, y, 'sprites', objtype);

		// 	this.gameitems.add(newobj);
        // }

		// coin particles
		var sparks = this.add.particles('sprites');
		this.coinspark = sparks.createEmitter({
			frame: [ 'sparkle1', 'sparkle2' ],
			quantity: 15,
			scale: { start: 1.0, end: 0 },
			on: false,
			speed: 200,
			lifespan: 500
		});
		
		// bomb explosion particles (small)
		var expl1 = this.add.particles('sprites');
		this.bombexpl1 = expl1.createEmitter({
			frame: [ 'bombexpl1' ],
			frequency: 100,
			quantity: 10,
			scale: { start: 1.0, end: 0 },
			speed: { min: -1000, max: 1000 },
			lifespan: 800,
			on: false
		});
		
		// bomb explosion particles (big)
		var expl2 = this.add.particles('sprites');
		this.bombexpl2 = expl2.createEmitter({
			frame: [ 'bombexpl2' ],
			quantity: 3,
			scale: { start: 2.0, end: 0 },
			frequency: 500,
			on: false,
			speed: { min: -200, max: 200 },
			lifespan: 1000
		});

		// sound effects
		this.sfxcoin = this.sound.add('coin');
		this.sfxbomb = this.sound.add('bomb');

		// set up arcade physics, using `physics` requires "physics:{default: 'arcade'" when starting "new Phaser.Game(.."
		this.physics.add.overlap(this.dude, this.gameitems, this.doOverlapItem, null, this);
		
		// player input
		this.cursors = this.input.keyboard.createCursorKeys();
		
		// quit to menu button
		this.btnquit = this.addButton(760, 40, 'sprites', this.doBack, this, 'btn_close_hl', 'btn_close', 'btn_close_hl', 'btn_close');
    },

    update: function (time, delta)
    {
		// reset velocity
		//this.dude.setVelocityX(0);
		//this.dude.setVelocityY(0);

		// keyboard input
		this.dude.setVelocity(0);
		if (this.cursors.up.isDown)    this.movePlayer(DIR_UP);
		if (this.cursors.down.isDown)  this.movePlayer(DIR_DOWN);
		if (this.cursors.left.isDown)  this.movePlayer(DIR_LEFT);
		if (this.cursors.right.isDown) this.movePlayer(DIR_RIGHT);
    },
	
    doOverlapItem: function (dud, obj) {
		console.log('doOverlapItem -- hit!');
		
		if (obj.data.values.type == TYPE_COIN) {
		//if (obj.getData("type") == TYPE_COIN) { // does the exact same
			// coin
			// play coin sound
			this.sfxcoin.play();

			// set emitter to coin position and emit particles
			this.coinspark.setPosition(obj.x, obj.y);
			this.coinspark.explode();	
		} else {
			// bomb
			// play bomb sound
			this.sfxbomb.play();
			
			// set emitters for bomb explosion
			this.bombexpl1.setPosition(obj.x, obj.y);
			this.bombexpl1.explode();

			this.bombexpl2.setPosition(obj.x, obj.y);
			this.bombexpl2.explode();
			//this.bombexpl2.start();
			
			// player dies
			this.playerDies();
		};

		// Completely destroy and remove object from memory
		obj.destroy();

		// Hide the sprite and disable the body,
		//   don't destroy sprite and potentially re-use memory at later time
		//   when adding new sprites to this.gameitems
		//this.gameitems.killAndHide(obj);
		//obj.body.enable = false;
	},
	
    playerDies: function () {

		// make player invisible
		this.dude.visible = false;
		this.dude.body.enable = false;
		
		// add game over text
		var txt = this.add.bitmapText(400, 300, 'fontwhite', 'Game over!');
		txt.setOrigin(0.5).setCenterAlign();

		// set gameover text as transparant, upside down and larger
		txt.setAlpha(0.0);
		txt.setAngle(180);
		txt.setScale(4.0, 4.0);
		
		// add twirl/zoom animation to gameover text
		var tw = this.tweens.add(
			{
				targets: txt,
				scaleX: 1.0,
				scaleY: 1.0,
				alpha: 1.0,
				angle: 0,
				ease: 'Power3',
				duration: 1000, // duration of animation; higher=slower
				delay: 500      // wait 500 ms before starting
			}
		);
	},
	

    movePlayer: function (dir) {

		// move the dude
		//if (dir == DIR_UP)    this.dude.setVelocityY(-200);
		//if (dir == DIR_DOWN)  this.dude.setVelocityY(+200);
		//if (dir == DIR_LEFT)  this.dude.setVelocityX(-200);
		//if (dir == DIR_RIGHT) this.dude.setVelocityX(+200);
		if (dir == DIR_UP)    this.dude.y -= 2;
		if (dir == DIR_DOWN)  this.dude.y += 2;
		if (dir == DIR_LEFT)  this.dude.x -= 2;
		if (dir == DIR_RIGHT) this.dude.x += 2;
		
		//var test = this.scene.getBounds();
		// check limits
		if (this.dude.y < 0)   this.dude.y = 0;
		if (this.dude.y > 600) this.dude.y = 600;
		if (this.dude.x < 0)   this.dude.x = 0;
		if (this.dude.x > 800) this.dude.x = 800;
	},

    doBack: function ()
    {
        console.log('gamescene doBack was called!');
		this.scene.start('mainmenu');
    }

});
