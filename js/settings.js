var user = {
		"name": isset(localStorage.getItem('username'), "Your Username"),
		"color": isset(localStorage.getItem('color'), "#ff0000"),
		"rank": 0,
		"infsens": 0,
		"armor": {
			"helmet": "air_assault",
			"chest": "hoplite",
			"shoulders": "air_assault",
			"arms": "juggernaut",
			"legs": "juggernaut",
			"accessory": "base",
			"pelvis": "base"
		}
	},

	catergories = {
		"menu": 0,
		"eldewrito": 0,
		"controls": 0,
		"gameplay": 0,
		"audio": 0,
		"video": 0,
		"host": 0
	},

	settings = {
		/*"preset": {
			"typeof": "select",
			"category": "menu",
			"name": "PRESET",
			"current": parseInt(isset(localStorage.getItem('preset'), 0),
			"min": 0,
			"max": 6,
			"labels": [
          "Default",
          "Halo Reach",
          "Halo CE",
          "Halo 2",
          "Halo 3",
          "Halo 3 ODST",
          "Halo 4"
      ],
			"increment": 1,
			"update": function() {
				var c = settings.preset.current;
				if (settings.preset.labels[c] == "Default") {
					$("[data-option='preset']").children('.value').text(settings.preset.labels[c]);
					return;
				}
				for (var i = 0; i < settings.background.labels.length; i++) {
					if (settings.background.labels[i] === settings.preset.labels[c]) {
						settings.background.current = i;
					}
				}
				for (var i = 0; i < settings.musictrack.labels.length; i++) {
					if (settings.preset.labels[c] === "Halo 4") {
						settings.musictrack.current = 11;
					} else if (settings.musictrack.labels[i] === settings.preset.labels[c]) {
						settings.musictrack.current = i;
					}
				}
				$("[data-option='preset']").children('.value').text(settings.preset.labels[c]);
				settings.background.update();
				settings.musictrack.update();
			}
		},*/
		"musicvolume": {
			"typeof": "select",
			"category": "menu",
			"name": "MUSIC VOLUME",
			"current": parseInt(isset(localStorage.getItem('musicvolume'), 25)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.musicvolume.current;
				settings.musicvolume.increment = c <= 9 ? 1 : 5;
				$('#music')[0].volume = c*0.01;
				$("[data-option='musicvolume']").children('.value').text(c);
			}
		},
		"sfxvolume": {
			"typeof": "select",
			"category": "menu",
			"name": "EFFECTS VOLUME",
			"current": parseInt(isset(localStorage.getItem('sfxvolume'), 25)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.sfxvolume.current;
				settings.sfxvolume.increment = c <= 9 ? 1 : 5;
				$('#click')[0].volume = c*0.01;
				$('#slide')[0].volume = c*0.01;
				$('#notification')[0].volume = c*0.01;
				$('#connectgamepad')[0].volume = c*0.01;
				$('#beep')[0].volume = c*0.01
				$('#beeep')[0].volume = c*0.01
				$("[data-option='sfxvolume']").children('.value').text(c);
			}
		},
		/*"shufflemusic": {
			"typeof": "select",
			"category": "menu",
			"name": "SHUFFLE MUSIC",
			"current": parseInt(isset(localStorage.getItem('shufflemusic'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.shufflemusic.current;
				$("[data-option='shufflemusic']").children('.value').text(settings.shufflemusic.labels[c]);
			}
		},*/
		"fullscreen": {
			"typeof": "select",
			"category": "menu",
			"name": "FULLSCREEN",
			"current": parseInt(isset(localStorage.getItem('fullscreen'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "TRUE",
            "FALSE"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.fullscreen.current;
				$("[data-option='fullscreen']").children('.value').text(settings.fullscreen.labels[c]);
			}
		},
		"resolution": {
			"typeof": "select",
			"category": "menu",
			"name": "RESOLUTION",
			"current": 0,
			"min": 0,
			"max": 0,
			"labels": [
            "Auto",
            "640x360",
            "960x540",
            "1280x720",
            "1366x768",
            "1600x900",
            "1920x1080",
            "2560x1440",
            "3200x1800",
            "3840x2160"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.resolution.current,
					l = settings.resolution.labels[c],
					s = window.innerHeight / 720;
				if (c === 0) {
					if (1280 * s > window.innerWidth) {
						s = window.innerWidth / 1280;
					}
					$('#menu').css({
						'-webkit-transform': 'scale(' + s + ')',
						'-moz-transform': 'scale(' + s + ')'
					});
					$("[data-option='resolution']").children('.value').text("Auto (" + Math.floor(1280 * s) + "x" + Math.floor(720 * s) + ")");
				} else {
					s = l.split("x")[0] / 1280;
					$('#menu').css({
						'-webkit-transform': 'scale(' + s + ')',
						'-moz-transform': 'scale(' + s + ')'
					});
					$("[data-option='resolution']").children('.value').text(l);
				}
			}
		},
		"background": {
			"typeof": "select",
			"category": "menu",
			"name": "BACKGROUND",
			"current": parseInt(isset(localStorage.getItem('background'), "video")),
			"min": 0,
			"max": 4,
			"labels": [
            "video",
            "video2",
            "video3",
			"galaxy",
			"Random"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.background.current,
					l = c == 3 ? "" : "Random";
				$('#videos').empty();
				if (l == "Random") {
					$('#bg-cover').css('background', 'rgba(0,0,0,0.20)');
					var r = Math.floor(Math.random() * settings.background.labels.length - 2);
					if (r < 0)
						r = 0;
					$('#videos').append("<video id='bg1' src='mods/Default/video/" + settings.background.labels[r] + ".webm' autoplay type='video/webm'></video>");
					$('#bg1').show();
					$('#bg1')[0].addEventListener('ended', function() {
						settings.background.current = 12;
						settings.background.update();
					});
					$("[data-option='background']").children('.value').text("Random");
					$('#bg1')[0].play();
				} else {
					$('#bg-cover').css('background', 'rgba(0,0,0,0.20)');
					$('#videos').append("<video id='bg1' src='mods/Default/video/" + settings.background.labels[c] + ".webm' autoplay type='video/webm'></video>");
					$('#bg1').show();
					$('#bg1')[0].addEventListener('ended', function() {
						settings.background.current = c;
						settings.background.update();
					});
					$("[data-option='background']").children('.value').text("Random");
					$('#bg1')[0].play();
				}
			}
		},
		/*"localbackground": {
			"typeof": "select",
			"category": "menu",
			"name": "LOAD BACKGROUNDS LOCALLY",
			"current": parseInt(isset(localStorage.getItem('localbackground'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.localbackground.current;
				localBackground = c;
				settings.background.update();
				$("[data-option='localbackground']").children('.value').text(settings.localbackground.labels[c]);
			}
		},
		"localmusic": {
			"typeof": "select",
			"category": "menu",
			"name": "LOAD MUSIC LOCALLY",
			"current": parseInt(isset(localStorage.getItem('localmusic'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.localmusic.current;
				localmusic = c;
				if ($('#choosemusic').children('.music-select2').length > 0)
					changeSong2(isset(localStorage.getItem('song'), "Mythic Menu Theme"));
				$("[data-option='localmusic']").children('.value').text(settings.localmusic.labels[c]);
			}
		},*/
		/*"logo": {
			"typeof": "select",
			"category": "menu",
			"name": "LOGO",
			"current": parseInt(isset(localStorage.getItem('logo'), 1)),
			"min": 0,
			"max": 4,
			"labels": [
      	"Halo 3 CE",
				"ElDewrito",
        "Halo",
        "Halo Online",
        "Halo ODST"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.logo.current;
				$('#dewrito').css({
					'background': "url('img/" + settings.logo.labels[c] + ".png') no-repeat 0 0/cover"
				});
				$("[data-option='logo']").children('.value').text(settings.logo.labels[c]);
			}
		},*/
		"browserstyle": {
			"typeof": "select",
			"category": "menu",
			"name": "SERVER BROWSER STYLE",
			"current": parseInt(isset(localStorage.getItem('browserstyle'), 0)),
			"min": 0,
			"max": 2,
			"labels": [
				"REGULAR",
				"CONDENSED",
				"LIST"
        	],
			"increment": 1,
			"update": function() {
				var c = settings.browserstyle.current;
				$('#browser').removeClass();
				$('#browser').addClass(settings.browserstyle.labels[c].toLowerCase());
				$("[data-option='browserstyle']").children('.value').text(settings.browserstyle.labels[c]);
			}
		},
		"emoticons": {
			"typeof": "select",
			"category": "menu",
			"name": "CHAT EMOTICONS",
			"current": parseInt(isset(localStorage.getItem('emoticons'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "TRUE",
            "FALSE"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.emoticons.current;
				$("[data-option='emoticons']").children('.value').text(settings.emoticons.labels[c]);
			}
		},
		/*"gameversion": {
			"typeof": "input",
			"category": "eldewrito",
			"name": "GAME VERSION",
			"current": "0.0.0.0",
			"update": function() {
				$("[data-option='gameversion']").children('.input').children('input').val(settings.gameversion.current);
			},
			"set": function(vers) {
				settings.gameversion.current = vers;
				$("[data-option='gameversion']").children('.input').children('input').val(settings.gameversion.current);
			}
		},*/
		"gamemenu": {
			"typeof": "input",
			"category": "",
			"name": "GAME MENU",
			"current": "0.0.0.0",
			"update": function() {
				$("[data-option='gamemenu']").children('.input').children('input').val(settings.gamemenu.current);
			},
			"set": function(vers) {
				settings.gamemenu.current = vers;
				$("[data-option='gamemenu']").children('.input').children('input').val(settings.gamemenu.current);
			}
		},
		"username": {
			"typeof": "input",
			"category": "eldewrito",
			"name": "USERNAME",
			"current": parseInt(isset(localStorage.getItem('username'), "Your Username")),
			"update": function() {
				var c = settings.username.current;
				user.name = c;
				$("[data-option='username']").children('.input').children('input').val(c);
			}
		},
		"keypad": {
			"typeof": "select",
			"category": "controls",
			"name": "CONTROLS METHOD",
			"current": parseInt(isset(localStorage.getItem('keypad'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "GAMEPAD",
            "KEYBOARD"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.keypad.current;
				$("[data-option='keypad']").children('.value').text(settings.keypad.labels[c]);
			}
		},
		"infsens": {
			"typeof": "select",
			"category": "controls",
			"name": "INFANTRY SENSITIVITY",
			"current": parseInt(isset(localStorage.getItem('infsens'), 50)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.infsens.current;
				$("[data-option='infsens']").children('.value').text(c);
			}
		},
		"vehsens": {
			"typeof": "select",
			"category": "controls",
			"name": "VEHICLE SENSITIVITY",
			"current": parseInt(isset(localStorage.getItem('vehsens'), 50)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.vehsens.current;
				$("[data-option='vehsens']").children('.value').text(c);
			}
		},
		"mouseacceleration": {
			"typeof": "select",
			"category": "controls",
			"name": "MOUSE ACCELERATION",
			"current": parseInt(isset(localStorage.getItem('mouseacceleration'), 50)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.mouseacceleration.current;
				$("[data-option='mouseacceleration']").children('.value').text(c);
			}
		},
		//Needs to be true/false but return 0 or 1 integer.
		/*"rawinput": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "RAW INPUT",
			"current": parseInt(isset(localStorage.getItem('rawinput'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.rawinput.current;
				if (true && loadedSettings) {
						dewRcon.send('input.rawinput ' + c);
						dewRcon.send('writeconfig');
				}
				$("[data-option='rawinput']").children('.value').text(settings.rawinput.labels[c]);
			}
		},*/
		"invertmouse": {
			"typeof": "select",
			"category": "controls",
			"name": "INVERT MOUSE",
			"current": parseInt(isset(localStorage.getItem('invertmouse'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.invertmouse.current;
				$("[data-option='invertmouse']").children('.value').text(settings.invertmouse.labels[c]);
			}
		},
		//Needs to be true/false, not sure how to do that -Orion
		"togglecrouch": {
			"typeof": "select",
			"category": "controls",
			"name": "TOGGLE CROUCH",
			"current": parseInt(isset(localStorage.getItem('togglecrouch'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.togglecrouch.current;
				$("[data-option='togglecrouch']").children('.value').text(settings.togglecrouch.labels[c]);
			}
		},
		//Needs to be true/false but return 0 or 1 integer.
		/*"centeredcrosshair": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "CENTERED CROSSHAIR",
			"current": parseInt(isset(localStorage.getItem('centeredcrosshair'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.centeredcrosshair.current;
				if (true && loadedSettings) {
						dewRcon.send('camera.crosshair ' + c);
						dewRcon.send('writeconfig');
				}
				//dewRcon.send('camera.crosshair ' + settings.centeredcrosshair.labels[c] === "ON" ? '1' : '0');
				//dewRcon.send('writeconfig');
				$("[data-option='centeredcrosshair']").children('.value').text(settings.centeredcrosshair.labels[c]);
			}
		},*/
		"hudshake": {
			"typeof": "select",
			"category": "gameplay",
			"name": "HUD SHAKE",
			"current": parseInt(isset(localStorage.getItem('hudshake'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.hudshake.current;
				$("[data-option='hudshake']").children('.value').text(settings.hudshake.labels[c]);
			}
		},
		"markercolors": {
			"typeof": "select",
			"category": "gameplay",
			"name": "PLAYER MARKER COLORS",
			"current": parseInt(isset(localStorage.getItem('markercolors'), 0)),
			"min": 0,
			"max": 2,
			"labels": [
            "DEFAULT",
            "ALLY BLUE",
            "ARMOR COLORS"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.markercolors.current;
				$("[data-option='markercolors']").children('.value').text(settings.markercolors.labels[c]);
			}
		},
		"fov": {
			"typeof": "select",
			"category": "gameplay",
			"name": "FOV",
			"current": parseInt(isset(localStorage.getItem('fov'), 90)),
			"min": 40,
			"max": 150,
			"increment": 5,
			"update": function() {
				var c = parseFloat(settings.fov.current);
				if (true && loadedSettings) {
						dewRcon.send('camera.fov ' + c);
						dewRcon.send('writeconfig');
				}
				$("[data-option='fov']").children('.value').text(c.toFixed(2));
			}
		},
		"starttimer": {
			"typeof": "select",
			"category": "host",
			"name": "START TIMER",
			"current": parseInt(isset(localStorage.getItem('starttimer'), 5)),
			"min": 0,
			"max": 20,
			"increment": 1,
			"update": function() {
				var c = settings.starttimer.current;
				$("[data-option='starttimer']").children('.value').text(c);
			}
		},
		"maxplayers": {
			"typeof": "select",
			"category": "host",
			"name": "MAX PLAYERS",
			"current": parseInt(isset(localStorage.getItem('maxplayers'), 2)),
			"min": 1,
			"max": 2,
			"increment": 1,
			"update": function() {
				var c = settings.maxplayers.current;
				$("[data-option='maxplayers']").children('.value').text(c);
			}
		},
		"servername": {
			"typeof": "input",
			"category": "host",
			"name": "SERVER NAME",
			"current": parseInt(isset(localStorage.getItem('servername'), "Galactic Conquest Server")),
			"update": function() {
				var c = settings.servername.current;
				$("[data-option='servername']").children('.input').children('input').val(c);
			}
		},
		"serverpass": {
			"typeof": "input",
			"category": "host",
			"name": "SERVER PASSWORD",
			"current": parseInt(isset(localStorage.getItem('serverpass'), "")),
			"update": function() {
				var c = settings.serverpass.current;
				$("[data-option='serverpass']").children('.input').children('input').val(c);
			}
		},
		"serverport": {
			"typeof": "input",
			"category": "host",
			"name": "SERVER PORT",
			"current": parseInt(isset(localStorage.getItem('serverport'), "")),
			"update": function() {
				var c = settings.serverport.current;
				$("[data-option='serverport']").children('.input').children('input').val(c);
			}
		},
		/*"vsync": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "VSYNC",
			"current": parseInt(isset(localStorage.getItem('vsync'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.vsync.current;
				$("[data-option='vsync']").children('.value').text(settings.vsync.labels[c]);
			}
		},
		"directx9ext": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "DIRECTX 9.0 EXTENSIONS",
			"current": parseInt(isset(localStorage.getItem('directx9ext'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.directx9ext.current;
				$("[data-option='directx9ext']").children('.value').text(settings.directx9ext.labels[c]);
			}
		},
		"showfps": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "SHOW FPS COUNTER",
			"current": parseInt(isset(localStorage.getItem('showfps'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.showfps.current;
				$("[data-option='showfps']").children('.value').text(settings.showfps.labels[c]);
			}
		},
		"introvideos": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "DISABLE INTRO VIDEOS",
			"current": parseInt(isset(localStorage.getItem('introvideos'), 0)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.introvideos.current;
				$("[data-option='introvideos']").children('.value').text(settings.introvideos.labels[c]);
			}
		},
		"saturation": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "SATURATION",
			"current": parseInt(isset(localStorage.getItem('saturation'), parseFloat(1))),
			"min": -10,
			"max": 10,
			"increment": 0.1,
			"update": function() {
				var c = parseFloat(settings.saturation.current);
				if (true && loadedSettings) {
						dewRcon.send('graphics.saturation ' + c);
						dewRcon.send('writeconfig');
				}
				$("[data-option='saturation']").children('.value').text(c.toFixed(2));
			}
		},
		"red": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "RED",
			"current": parseInt(isset(localStorage.getItem('red'), 1)),
			"min": 0,
			"max": 1,
			"increment": 0.05,
			"update": function() {
				var c = settings.red.current;
				if (true && loadedSettings) {
						dewRcon.send('graphics.redhue ' + c);
				}
				$("[data-option='red']").children('.value').text(c.toFixed(2));
			}
		},
		"blue": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "BLUE",
			"current": parseInt(isset(localStorage.getItem('blue'), 1)),
			"min": 0,
			"max": 1,
			"increment": 0.05,
			"update": function() {
				var c = settings.blue.current;
				if (true && loadedSettings) {
						dewRcon.send('graphics.bluehue ' + c);
				}
				$("[data-option='blue']").children('.value').text(c.toFixed(2));
			}
		},
		"green": {
			"typeof": "select",
			"category": "eldewrito",
			"name": "GREEN",
			"current": parseInt(isset(localStorage.getItem('green'), 1)),
			"min": 0,
			"max": 1,
			"increment": 0.05,
			"update": function() {
				var c = settings.green.current;
				if (true && loadedSettings) {
						dewRcon.send('graphics.greenhue ' + c);
				}
				$("[data-option='green']").children('.value').text(c.toFixed(2));
			}
		},*/
		"quality": {
			"typeof": "select",
			"category": "video",
			"name": "QUALITY PRESET",
			"current": parseInt(isset(localStorage.getItem('quality'), 1)),
			"min": 0,
			"max": 2,
			"labels": [
            "LOW",
            "MEDIUM",
            "HIGH"
        ],
			"increment": 1,
			"update": function() {
				var c = settings.quality.current;
				$("[data-option='quality']").children('.value').text(settings.quality.labels[c]);
			}
		},
		"brightness": {
			"typeof": "select",
			"category": "video",
			"name": "BRIGHTNESS",
			"current": parseInt(isset(localStorage.getItem('brightness'), 50)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.brightness.current;
				$("[data-option='brightness']").children('.value').text(c);
			}
		},
		"antialiasing": {
			"typeof": "select",
			"category": "video",
			"name": "ANTI-ALIASING",
			"current": parseInt(isset(localStorage.getItem('antialiasing'), 1)),
			"min": 0,
			"max": 1,
			"labels": [
            "OFF",
            "ON",
        ],
			"increment": 1,
			"update": function() {
				var c = settings.antialiasing.current;
				$("[data-option='antialiasing']").children('.value').text(settings.antialiasing.labels[c]);
			}
		},
		"mastervolume": {
			"typeof": "select",
			"category": "audio",
			"name": "MASTER VOLUME",
			"current": parseInt(isset(localStorage.getItem('mastervolume'), 100)),
			"min": 0,
			"max": 100,
			"increment": 5,
			"update": function() {
				var c = settings.mastervolume.current;
				$("[data-option='mastervolume']").children('.value').text(c);
			}
		}
	},

	gametypes = {
		"Slayer": {
			"Slayer": "Free for all. 25 kills to win.",
			"Team Slayer": "Form teams for greater glory. 50 kills to win.",
			"Rockets": "Free for all, with nothing but rocket launchers. 25 kills to win.",
			"Elimination": "Highly tactical Team Slayer. 5 rounds, each to 5 kills. Be careful out there.",
			"Duel": "No camping! Free for all, but the leader cannot hide. 10 kills to win."
		},
		"Oddball": {
			"Oddball": "Free for all. Hold the skull to earn points. 50 points to win.",
			"Team Oddball": "Form teams, protect your carrier. 100 points to win.",
			"Lowball": "Teamwork counts! Every member of your team must earn 25 points to win.",
			"Ninjaball": "The ball carrier is fast and agile, but vulnerable. 100 points to win.",
			"Rocketball": "You have no allies but your Rocket Launcher. 50 points to win."
		},
		"King of the Hill": { //Dang it, Bobby
			"Crazy King": "Free for all. Gain points by contorlling the hill. 100 points to win.",
			"Team King": "Hold the Hill as a team. The hill must be uncontested. 150 points to win.",
			"Moshpit": "There is a single, unmoving hill. Everyone inside is tougher. 100 points to win."
		},
		"Capture the Flag": {
			"Multi Flag": "Every team has a flag, and may capture when it is away. 3 captures to win.",
			"One Flag": "Only one team has a flag. 4 rounds, and teams take turns defending the flag.",
			"Tank Flag": "A variation of Multi Flag where the carrier is ver tough, but very slow.",
			"Attrition CTF": "Highly tactical CTF. Very low respawns, but teams respawn on captures."
		},
		"Assault": {
			"Assault": "Every team has a bomb, and a base to defend. 3 detonations to win.",
			"Neutral Bomb": "All teams have a base to defend, but share a single bomb. 3 detonations to win.",
			"One Bomb": "Only one team has a base to defend. 4 rounds, and teams take turns defending.",
			"Attrition Bomb": "Highly tactical Assault. Neutral bomb, long respawns, but teams respawn on detonations."
		},
		"Territories": {
			"Territories": "One team must defend their territories. Other teams must take them. 4 rounds.",
			"Land Grab": "Every territory is up for grab. Once a territory is taken, it is locked. 3 rounds.",
			"Flag Rally": "Territories do not lock after capture. Hold what you can until the round ends."
		},
		"Juggernaut": {
			"Juggernaut": "Kill the Juggernaut to become the Juggernaut and earn points. 10 points to win.",
			"Mad Dash": "Juggernaut scores point sby reaching the destination zones. 5 points to win.",
			"Ninjanaut": "The juggernaut is fast, stealthy, and deadly. 10 points to win."
		},
		"Infection": {
			"Infection": "Some players start off as zombies and seek to devour humans. 3 rounds, most points wins.",
			"Save One Bullet": "The humans start off well armed, but ammunition is limited.",
			"Alpha Zombie": "Players who start the round as zombies are more powerful than those they infect.",
			"Hide and Seek": "Your only defense is stealth. Don't let the zombies find you!"
		},
		"VIP": {
			"VIP": "Every team has a VIP. When your VIP dies, the next player to die becomes the new one. 10 points to win.",
			"One Sided VIP": "Only one team has a VIP. 4 rounds, and teams take turns defending their VIP.",
			"Escort": "Only one team has a VIP, who scores points by reaching a destination. If he dies, the round ends.",
			"Influential VIP": "Staying near your VIP makes you stronger, so move as a group. 10 points to win."
		}
	},

	maps = {
		"HaloOnline": {
			"name": "HALO ONLINE",
			"DIAMONDBACK": "Hot winds blow over what should be a dead moon. A reminder of the power the Forerunners once wielded.",
			"EDGE": "The remote frontier world of Parition has provided this ancient databank with the safety of seclusion.",
			"GUARDIAN": "Millennia of tending has produced trees as ancient as the Forerunner structures they have grown around.",
			"ICEBOX": "Though they dominate on the open terrain, many Scarabs have fallen victim to the narrow streets of Earth's cities.",
			"REACTOR": "Being constructed just prior to the Invasion, its builders had to evacuate before it was completed.",
			"VALHALLA": "The crew of V-398 barely survived their unplanned landing in this gorge... this curious gorge."
		},
		/*"HaloReach" : {
		    "name": "HALO REACH",
		    "ANCHOR 9" : "Orbital dockyards provide rapid refueling and repairs for a variety of UNSC vessels.",
		    "BATTLE CANYON" : "The telemetry spires in these canyons help manage the Halo ring’s vast translocation grid.",
		    "BOARDWALK" : "New Alexandria's civilian concourses provide access to rapid transit and views of Reach's serene vistas.",
		    "BONEYARD" : "The once formidable Commonwealth awaits its final destination at one of the UNSC's ship breaking facilities.",
		    "BREAKNECK" : "The initial Covenant strike is over, but the fight for Mombasa has just begun.",
		    "BREAKPOINT" : "ONI officials believe the data buried within this artifact is key to our survival.",
		    "CONDEMNED" : "The final moments aboard Orbital Gamma Station, a human communications space station.",
		    "COUNTDOWN" : "It was only a matter of time before even the most clandestine UNSC operations were thrust into the public eye.",
		    "HIGH NOON" : "Despite millennia of abandonment, transportation facilities like this one continue to function flawlessly.",
		    "HIGHLANDS" : "A training facility located in the Highland Mountains, where Spartans are born.",
		    "PENANCE" : "The Covenant have harnessed the waters of this moon to refuel their massive supercarriers.",
		    "POWERHOUSE" : "Hydroelectric plants like this one provide clean, sustainable energy for the inhabitants of Reach.",
		    "REFLECTION" : "Reach's elite mix business with pleasure, building lavish penthouses atop soaring corporate ivory towers.",
		    "RIDGELINE" : "Overlooking one of Halo's impressive relay complexes, this idyllic cliffside once served as a UNSC staging area.",
		    "SOLITARY" : "The security spire's damaged interior only hints at the terrifying power of its previous inhabitant.",
		    "SPIRE" : "Shielding infantry from aerial assault, these massive spires force the Covenant’s foes to fight on deadly ground.",
		    "SWORD BASE" : "Before Winter Contingency was declared, ONI spooks kept themselves occupied in this remote installation.",
		    "TEMPEST" : "Though we may never fully understand these devices, it is not our nature to leave ancient stones unturned.",
		    "ZEALOT" : "Covenant vessels like the Ardent Prayer are a prelude to the devastation the full fleet can visit upon a planet."
		},
		"Halo1" : {
		    "name": "HALO COMBAT EVOLVED",
		    "BATTLE CREEK" : "Splash Splash, Bang Bang.",
		    "BLOOD GULCH" : "The Quick and the Dead.",
		    "BOARDING ACTION" : "Ship-to-Ship Combat.",
		    "CHILL OUT" : "Dude, you really need to...",
		    "CHIRON TL-34" : "Spartan Clone Training Complex.",
		    "DAMNATION" : "Covenant Hydro-Processing Center.",
		    "DANGER CANYON" : "Don't Look Down... Unless You Fall.",
		    "DEATH ISLAND" : "Sand, Surf, and Spent Shells.",
		    "DERELICT" : "Deep Space Anomaly #0198.",
		    "GEPHYROPHOBIA" : "Scary, huh?",
		    "HANG EM HIGH" : "Tombstones for Everybody.",
		    "ICE FIELDS" : "Slipping and Sliding.",
		    "INFINITY" : "I imagined it would be bigger.",
		    "LONGEST" : "A long walk down a short hall...",
		    "PRISONER" : "Get on Top.",
		    "RAT RACE" : "Up the Ramps, Down the Tubes.",
		    "SIDEWINDER" : "Red Blood, White Snow",
		    "TIMBERLAND" : "An enemy behind every tree!",
		    "WIZARD" : "Round and Round and Round."
		},
		"Halo2" : {
		    "name": "HALO 2",
		    "ASCENSION" : "This relay station is part of a network that has kept Delta Halo functioning smoothly for untold centuries.",
		    "BACKWASH" : "There are strong indications that beneath the shroud of mist drowning this swamp on Delta Halo lies a powerful intelligence.",
		    "BEAVER CREEK" : "These forgotten structures were once the site of many bitter battles but have since been reclaimed by nature.",
		    "BURIAL MOUNDS" : "This makeshift Heretic camp on Basis is littered with wreckage from the destruction of Installation 04.",
		    "COAGULATION" : "Recent excavations have failed to shed light on the true purpose of the outposts in this bloody gulch.",
		    "COLOSSUS" : "Numerous scientific expeditions have failed to reveal what the Forerunners intended with all this damn gas.",
		    "CONTAINMENT" : "Fighting for a patch of dirt abutting a wall containing a galaxy-devouring parasite may seem pointless to some, but ... um ....",
		    "DESOLATION" : "Once a scientific outpost, this derelict Forerunner facility waits patiently to be reactivated.",
		    "DISTRICT" : "The alleys of Old Mombasa were never kind to the unwary. On Covenant-controlled Earth, ramshackle homes prove ideal for ambush.",
		    "ELONGATION" : "A well-placed bribe can speed a cargo ship through what are surely some of the longest inspections in the galaxy.",
		    "FOUNDATION" : "Deep in Chicago Industrial Zone 08 lies the decommissioned Tactical Autonomous Robotic Defense System testing facility.",
		    "GEMINI" : "This sanctuary now rings with the sound of combat - the end of the ancient duality of the Covenant is truly at hand.",
		    "HEADLONG" : "Although during the day Section 14 monitors almost all harbour traffic, at night it's one of the city's most notorious hangouts.",
		    "IVORY TOWER" : "Once home to the famous socialite Lance O'Donnell, the top floor of this building is now a public park.",
		    "LOCKOUT" : "Some believe this remote facility was once used to study the Flood. But few clues remain amidst the snow and ice.",
		    "MIDSHIP" : "Don't let its luxury fool you - the Pious Inquisitor is one of the fastest ships in the Covenant fleet.",
		    "RELIC" : "Covenant scripture dictates that structures of this type are memorials to Forerunners who fell in battle against the Flood.",
		    "SANCTUARY" : "Though its original purpose has been lost to the march of eons, this structure is now a cemetery to countless brave warriors.",
		    "TERMINAL" : "The CTMS made New Mombasa's rail system one of the safest on Earth; unfortunately it was one of the Covenant's first targets.",
		    "TOMBSTONE" : "The UNSC decommissioned this munitions testing complex after safety concerns came to light.",
		    "TURF" : "Though they dominate on open terrain, many Scarabs have fallen victim to the narrow streets of Earth's cities.",
		    "UPLIFT" : "Unknowable energies see the from this long-abandoned Forerunner spire, making it a vital prize for Covenant and Human forces.",
		    "WARLOCK" : "Despite overwhelming evidence to the contrary, some stubbornly maintain that this structure was once a Forerunner arena.",
		    "WATERWORKS" : "While the Forerunners excelled at mimicking natural beauty, the machinery in this cavern exemplifies their true genius.",
		    "ZANZIBAR" : "Wind Power Station 7 sits as a mute reminder of the EAP's late 25th-century attempt at re-nationalization."
		},
		"Halo3": {
			"name": "HALO 3",
			"ASSEMBLY" : "The Covenant war machine continues its march to conquest; even with its head severed it is still dangerous",
			"AVALANCHE" : "“Freezing winds scour blasted terrain, and ancient battle scars are a grim reminder that this is a precious prize.",
			"BLACKOUT" : "Bathed in frozen moonlight, this abandoned drilling platform is now a monument to human frailty.",
			"CITADEL" : "In the heart of this Forerunner structure, far above the troubled surface of the Ark, another battle rages.",
			"COLD STORAGE" : "Deep in the bowels of Installation 05 things have gotten a little out of hand. I hope you packed extra underwear.",
			"CONSTRUCT" : "Vast quantities of water and other raw materials are consumed in creating even the smallest orbital installations.",
			"EPITAPH" : "Some believe the Forerunner preferred desolate places. Others suggest that few other sites survived the Flood.",
			"FOUNDRY" : "After the orbital elevator fell, supply warehouses sending munitions to space were soon abandoned.",
			"GHOST TOWN" : "These fractured remains near Voi remind us that brave souls died here to buy our salvation.",
			"GUARDIAN": "Millennia of tending has produced trees as ancient as the Forerunner structures they have grown around.",
			"HERETIC" : "Because of its speed and luxury the Pious Inquisitor has become an irresistible prize during these dark times.",
			"HIGH GROUND" : "A relic of older conflicts, this base was reactivated after the New Mombasa Slipspace Event.",
			"ISOLATION" : "Containment protocols are almost impervious to pre-Gravemind infestations. What could possibly go wrong?",
			"LAST RESORT" : "Remote industrial sites like this one are routinely requisitioned and used as part of Spartan training exercises.",
			"LONGSHORE" : "Abandoned during the invasion of Earth, the Mombasa Quays are now bereft of commerce, but rife with danger.",
			"NARROWS": "Without cooling systems such as these, excess heat from the Ark's forges would render the construct uninhabitable.",
			"ORBITAL" : "With a lot of situational awareness, and a little luck, hopefully the only thing you will lose is your luggage.",
			"RAT NEST" : "Snowmelt from Kilimanjaro feeds reservoirs every bit as vital as the fuel and ammunition stores.",
			"SANDBOX" : "This endless wasteland still holds many secrets. Some of them are held more deeply than others.",
			"SANDTRAP" : "Although the Brute occupiers have been driven from this ancient structure, they left plenty to remember them by.",
			"SNOWBOUND" : "Hostile conditions did not prevent the Covenant from seeking salvage on this buried Forerunner construct.",
			"STANDOFF": "Once, nearby telescopes listened for a message from the stars. Now, these silos contain our prepared response.",
			"THE PIT": "Software simulations are held in contempt by the veteran instructors who run these training facilities.",
			"VALHALLA" : "The crew of V-398 barely survived their unplanned landing in this gorge... this curious gorge."
		}*/
	};
