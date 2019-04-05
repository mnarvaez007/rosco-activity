/**
 * Rosco Activity iDevice
 *
 * Released under Attribution-ShareAlike 4.0 International License.
 * Author: Manuel Narvaez Martinez
 *
 * License: http://creativecommons.org/licenses/by-sa/4.0/
 *
 * Loading icon generated with http://www.ajaxload.info/
 * 
 * Export
 */
var $eXeRosco = {
	mcanvas: {
		width: 360,
		height: 360
		
	},
	colors: {
		black: "#1c1b1b",
		blue:'#0099cc',
		verde:'#009245',
		red:'#ff0000',
		white:'#ffffff',
		yellow:'#f3d55a'
	},
	letters: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
	angleSize: "",
	radiusLetter:16,
	options: [],
	gameData: {
		validWords: 0,
		answeredWords: 0,
		errors: 0,
		hits: 0,
		score: 0,
		counter: 0,
		activeWord: -1,
		activeGameSpin: 1,
		counterClock: 0,
		gameActived: false,
		activeLetter: false,
		gameStarted: false
	},
	msgs:{
		msgWrote:"",
		msgReady:"",
		msgStartGame:"",
		msgHappen:"",
		msgReply:"",
		msgSubmit:"",
		msgEnterCode:"",
		msgErrorCode:"",
		msgGameOver:"",
		msgNewWord:"",
		msgStartWith:"",
		msgContaint:"",
		msgPass:"",
		msgIndicateWord:"",
		msgClue:"",
		msgNewGame:"",
		msgSuccesses:"",
		msgFailures:"",
		msgYouSuccesses:"",
		msgYouFailures:""
	},
	hasSCORMbutton: false,
	isInExe: false,
	init: function () {
		this.activities = $('.rosco-IDevice');
		if (this.activities.length == 0) return;
		if (typeof ($exeAuthoring) != 'undefined' && $("#exe-submitButton").length > 0) {
			this.activities.hide();
			if (typeof (_) != 'undefined') this.activities.before('<p>' + _('Rosco') + '</p>');
			return;
		}
		$eXeRosco.angleSize = 2 * Math.PI / 27;
		$eXeRosco.loadGame();

		if (typeof ($exeAuthoring) != 'undefined') this.isInExe = true;
	},
	loadGame: function () {
		$eXeRosco.options = [];
		$('.rosco-IDevice').each(function (instance) {
			var dl = $("dl", this);
			var option = $eXeRosco.loadDataGame(dl);
			$eXeRosco.options.push(option);
			var rosco = $eXeRosco.createInterfaceRosco(instance);
			dl.before(rosco).remove();
			$eXeRosco.addEvents(instance);
		});
	},
	loadDataGame: function (dl) {
		var mOptions = {},
			msgs=$eXeRosco.msgs;
		mOptions.wordsGame = [];
		mOptions.durationGame = $('durationGame', dl).text();
		mOptions.numberTurns = $('numberTurns', dl).text();
		mOptions.showSolution = ($('showSolution', dl).text() == 'true');
		mOptions.showClue = ($('showClue', dl).text() == 'true');
		mOptions.clueGame = $.trim($('clueGame', dl).text());
		mOptions.percentageClue = $('percentageClue', dl).text();
		mOptions.showAccesCode =($('showAccesCode', dl).text() == 'true');
		mOptions.accessCode = $('accessCode', dl).text();
		mOptions.messageAccessCode = $('messageAccessCode', dl).text();
		msgs.msgClue= $('msgClue', dl).text();
		msgs.msgContaint= $('msgContaint', dl).text();
		msgs.msgEnterCode= $('msgEnterCode', dl).text();
		msgs.msgErrorCode= $('msgErrorCode', dl).text();
		msgs.msgGameOver= $('msgGameOver', dl).text();
		msgs.msgHappen= $('msgHappen', dl).text();
		msgs.msgIndicateWord= $('msgIndicateWord', dl).text();
		msgs.msgNewWord= $('msgNewWord', dl).text();
		msgs.msgPass= $('msgPass', dl).text();
		msgs.msgReady= $('msgReady', dl).text();
		msgs.msgReply= $('msgReply', dl).text();
		msgs.msgStartGame= $('msgStartGame', dl).text();
		msgs.msgStartWith= $('msgStartWith', dl).text();
		msgs.msgSubmit= $('msgSubmit', dl).text();
		msgs.msgWrote= $('msgWrote', dl).text();
		msgs.msgNewGame= $('msgNewGame', dl).text();
		msgs.msgSuccesses= $('msgSuccesses', dl).text();
		msgs.msgFailures= $('msgFailures', dl).text();
		msgs.msgYouFailures= $('msgYouFailures', dl).text();
		msgs.msgYouFailures= $('msgYouFailures', dl).text();

	
		for (var i = 0; i < this.letters.length; i++) {
			var mLetter = 'letter' + this.letters.charAt(i),
				mWord = $(mLetter, dl).text(),
				aWord = mWord.split('#&'),
				p = new Object();
			p.letter = this.letters.charAt(i);
			p.word = $.trim(aWord[0]).toUpperCase();
			p.definition = $.trim(aWord[1]);
			p.type = $.trim(aWord[2]);
			p.state = p.word.length > 0 ? 1 : 0;
			mOptions.wordsGame.push(p);
		}
		return mOptions;
	},

	createInterfaceRosco: function (instance) {
		var aLetters = this.getLettersRosco(instance),
			sTime = this.getTimeToString(this.options[instance].durationGame),
			msgs=$eXeRosco.msgs,
			html = '';
		html += '<div class="rosco-GameContainer" id="roscoGameContainer' + instance + '">\
				<div class="rosco-GameScoreBoard" id="roscoGameScoreBoard-' + instance + '">\
		            <div class="rosco-GameScores"id="roscoGameScores-' + instance + '">\
		                <div class="rosco-ResultsGame" id="roscoHitsGame-' + instance + '">\
			   				<div class="rosco-HitIcons" id="roscoHits-' + instance + '"></div>\
		                    <p class="rosco-" id="pHits-' + instance + '">0</p>\
		                </div>\
		                <div class="rosco-ResultsGame" id="roscoErrorsGame-' + instance + '">\
		                    <div class="rosco-ErrorIcons" id="roscoErrors-' + instance + '"></div>\
		                    <p id="pErrors-' + instance + '">0</p>\
		                </div>\
		            </div>\
		                <div class="rosco-TimeTurn"id="roscoTimeTurn-' + instance + '">\
		            	<div  class="rosco-ResultsGame"  id="roscoDurationGame-' + instance + '">\
							<div  class="rosco-clockIcons"  id="roscoClock-' + instance + '"></div>\
			                <p  id="pTime-' + instance + '">' + sTime + '</p>\
			            </div>\
						<div class="rosco-TurnIcons" id="roscoTurn-' + instance + '"></div>\
						<div  class="rosco-TypeGame"  id="roscoTypeGame-' + instance + '"></div>\
		            </div>\
		        </div>\
		        <div id="roscoGame-' + instance + '"class="rosco-Game">\
    			<canvas class="rosco-Canvas" id="roscoCanvas-' + instance + '" width="360px" height="360px">\
        			Your browser does not support the HTML5 canvas tag\
				</canvas>\
			    </div>\
		        <div class="rosco-Letters" id="roscoLetters-' + instance + '">' + aLetters + '</div>\
		        <div class="rosco-Solution" id="roscoSolution-' + instance + '">\
		                <p id="pSolution-' + instance + '">'+msgs.msgReady+'</p>\
		        </div>\
		        <div  class="rosco-TypeDefinition"  id="roscoTypeDefinition-' + instance + '">\
		            <p  id="pStartWith-' + instance + '">'+msgs.msgStartGame+'</p>\
		        </div>\
		        <div  class="rosco-Definition" id="roscoDefinition-' + instance + '">\
		            <p id="pDefinition-' + instance + '">'+msgs.msgWrote+'.</p>\
		        </div>\
		        <div  class="rosco-AnswerButtons"  id="roscoAnswerButtons-' + instance + '">\
		            <input type="button" value="'+msgs.msgHappen+'" id="btnPass-' + instance + '">\
		            <input type="text" class="rosco-AnswerEdit" id="edAnswer-' + instance + '">\
		            <input type="button" value="'+msgs.msgReply+'"  id="btnAnswer-' + instance + '">\
				</div>\
				 <div  class="rosco-AccessCode"  id="roscoCodeAccess-' + instance + '">\
					<label for="edAccessCode-' + instance + '" id="labelMessageAccess">Clave acceso: </label>\
					<input type="text" class="rosco-AnswerEdit" id="edAccessCode-' + instance + '">\
		    		<input type="button" value="'+msgs.msgSubmit+'" id="btnSubmitAccessCode-' + instance + '">\
		        </div>\
			</div>';
		
		return html
	},
	getLettersRosco: function (instance) {
		var letras = this.letters,
			mLetters = []
		for (var i = 0; i < this.options[instance].wordsGame.length; i++) {
			var letter = '<div class="rosco-Letter rosco-LetterBlack" id="letterR' + letras[i] + '-' + instance + '">' + letras[i] + '</div>';
			var word = $.trim(this.options[instance].wordsGame[i].word);
			if (word.length > 0) {
				letter = '<div class="rosco-Letter" id="letterR' + letras[i] + '-' + instance + '">' + letras[i] + '</div>';
			}
			mLetters.push(letter);
		}
		html = mLetters.join('');
		return html;
	},
	addEvents: function (instance) {
		var msgs=$eXeRosco.msgs;
		$('#edAnswer-' + instance).val("");
		$('#btnAnswer-' + instance).prop('disabled', true);
		$('#btnPass-' + instance).prop('disabled', true);
		$('#edAnswer-' + instance).prop('disabled', true);
		if($eXeRosco.options[instance].showAccesCode){
			$('#roscoAnswerButtons-' + instance).hide();
			$('#roscoCodeAccess-' + instance).show();
			$('#pDefinition-' + instance ).text($eXeRosco.options[instance].messageAccessCode);
			$('#pStartWith-' + instance).text(msgs.msgEnterCode);
			$('#edAccessCode-'+instance).focus();
		}else{
			$('#roscoAnswerButtons-' + instance).show();
			$('#roscoCodeAccess-' + instance).hide();
			$('#pDefinition-' + instance ).text(msgs.msgWrote);
			$('#pStartWith-' + instance).text(msgs.msgStartGame);
			$('#roscoTypeDefinition-' + instance).css('cursor', 'pointer');
		    $('#roscoTypeDefinition-' + instance).attr('unselectable', 'on');
			$('#roscoTypeDefinition-' + instance).on('click', function () {
				$eXeRosco.startGame(instance);
			});
			
		}
		$('#btnSubmitAccessCode-' + instance).on('click', function(){
			var keyIntroduced=$.trim($('#edAccessCode-' + instance).val()).toUpperCase();
			var correctKey=$.trim($eXeRosco.options[instance].accessCode).toUpperCase();
		 	if (keyIntroduced==correctKey){
				$('#roscoAnswerButtons-' + instance).slideDown();
				$('#roscoCodeAccess-' + instance).hide();
				$('#roscoTypeDefinition-' + instance).css('cursor', 'pointer');
				$('#roscoTypeDefinition-' + instance).attr('unselectable', 'on');
				$('#roscoTypeDefinition-' + instance).on('click', function () {
					$eXeRosco.startGame(instance);
				});
				$eXeRosco.startGame(instance);
			} else{
				$('#pStartWith-' + instance).text(msgs.msgErrorCode);
				$('#edAccessCode-'+instance).val('');
			} 
		});

		$('#edAccessCode-' + instance).on("keydown", function (event) {
			if (event.which == 13 || event.keyCode == 13) {
				$('#btnSubmitAccessCode-' + instance).trigger('click');
				return false;
			}
			return true;
		});
		var mTime=$eXeRosco.options[instance].durationGame;
		var sTime = $eXeRosco.getTimeToString(mTime);
		$('#pTime-' + instance).text(sTime);
		$('#roscoTurn-' + instance).removeClass('rosco-IconTurnIconTwo');

		if ($eXeRosco.options[instance].numberTurns == 2) {
			$('#roscoTurn-' + instance).addClass('rosco-IconTurnIconTwo');
		}
		$('#btnPass-' + instance).on('click', function () {
			$eXeRosco.passWord(instance);
		});

		$('#btnAnswer-' + instance).on('click', function () {
			$eXeRosco.answerQuetion(instance);
		});
		$('#edAnswer-' + instance).on("keydown", function (event) {
			if (event.which == 13 || event.keyCode == 13) {
				$eXeRosco.answerQuetion(instance);
				return false;
			}
			return true;
		});
		var id = 'roscoCanvas-' + instance;
		var rosco = document.getElementById(id);
		$eXeRosco.options[instance].ctxt = rosco.getContext("2d");
		$eXeRosco.drawRosco(instance);
		$('#roscoLetters-' + instance).hide();;
		$('#roscoGame-' + instance).show();
		$('#roscoSolution-' + instance).hide();
		$('#roscoTipoJuego-' + instance).on('click', function () {
			if($(this).hasClass('rosco-TipoJuegaFilas')){
				$(this).removeClass('rosco-TipoJuegaFilas');
				$('#roscoLetters-' + instance).slideUp(300);
				$('#roscoSolution-' + instance).slideUp(300);
				$('#roscoGame-' + instance).slideDown(300);
			}else{
				$(this).addClass('rosco-TipoJuegaFilas');
				$('#roscoLetters-' + instance).slideDown(300);
				$('#roscoSolution-' + instance).slideDown(300);
				$('#roscoGame-' + instance).slideUp(300);
			}
		});
		$eXeRosco.drawText($eXeRosco.msgs.msgReady,$eXeRosco.colors.blue,instance)
		$('#pSolution-' + instance).css('color',$eXeRosco.colors.blue);
		$('#pStartWith-' + instance).css('color',$eXeRosco.colors.red); 
		$('#pStartWith-' + instance).css("text-shadow", "4px 4px 4px rgba(0,0,0,0.4)");
	},
	startGame: function (instance) {
		var mData = $eXeRosco.gameData,
			mOptions = $eXeRosco.options[instance];
		if (mData.gameStarted) {
			return;
		}
		mData.hits = 0;
		mData.solucion = '';
		mData.errors = 0;
		mData.score = 0;
		mData.counter = mOptions.durationGame;
		mData.gameActived = false;
		mData.activeGameSpin = 1;
		mData.validWords = 0;
		mData.answeredWords = 0;
		mData.activeWord = -1;
		for (var i = 0; i < mOptions.wordsGame.length; i++) {
			mOptions.wordsGame[i].state = mOptions.wordsGame[i].word.trim().length == 0 ? 0 : 1;
			var mFontColor = $eXeRosco.colors.white;
			var mBackColor = $eXeRosco.colors.black;
			if (mOptions.wordsGame[i].state == 1) {
				mData.validWords++;
				mFontColor = $eXeRosco.colors.white;;
				mBackColor = $eXeRosco.colors.blue;;
			}
			var letter = $eXeRosco.letters.charAt(i);
			letter = '#letterR' + letter + '-' + instance;
			$(letter).css('background-color', mBackColor);
			$(letter).css('color', mFontColor);
		}
		$eXeRosco.uptateTime(mOptions.durationGame, instance);
		$eXeRosco.drawRosco(instance);
		mData.counterClock = setInterval(function () {
			$eXeRosco.uptateTime(mData.counter, instance);
			mData.counter--;
			if (mData.counter <= 0) {
				clearInterval(mData.counterClock)
				$eXeRosco.gameOver(instance);
				return;
			}
		}, 1000);
		$('#roscoTypeDefinition-' + instance).css('cursor', 'default');
		$('#pHits-' + instance).text(mData.hits);
		$('#pErrors-' + instance).text(mData.errors);
		$('#btnAnswer-' + instance).prop('disabled', false);
		$('#btnAnswer-' + instance).prop('disabled', false);
		$('#btnPass-' + instance).prop('disabled', false);
		$('#edAnswer-' + instance).prop('disabled', false);
		$('#edAnswer-' + instance).focus();
		$('#pStartWith-' + instance).css('color',$eXeRosco.colors.black);
		$('#pStartWith-' + instance).css("text-shadow", "0px 0px 0px rgba(0,0,0,0)");
		mData.gameActived = true;
		$eXeRosco.newWord(instance);
		mData.gameStarted = true;
	},
	uptateTime: function (tiempo, instance) {
		var mTime = $eXeRosco.getTimeToString(tiempo);
		$('#pTime-' + instance).text(mTime);
		if ($eXeRosco.gameData.gameActived) {
			$eXeRosco.drawLetterActive($eXeRosco.gameData.activeWord, instance);
		}
	},
	getTimeToString: function (iTime) {
		if (iTime < 0) {
			iTime = 0;
		}
		var mMinutes = parseInt(iTime / 60),
			mSeconds = iTime % 60,
			mTime;
		if (mMinutes < 10) {
			if (mSeconds < 10) {
				mTime = '0' + mMinutes + ':0' + mSeconds;
			} else {
				mTime = '0' + mMinutes + ':' + mSeconds;
			}
		} else {
			if (segundos < 10) {
				mTime = mMinutes + ':0' + mSeconds;
			} else {
				mTime = mMinutes + ':' + mSeconds;
			}
		}
		return mTime;
	},
	getRetroFeedMessages: function (iHit) {
		var iNumber =0,
			message="",
			sHits = $eXeRosco.msgs.msgSuccesses.split('|'),
			sErrors = $eXeRosco.msgs.msgFailures.split('|');
		if (iHit){
			iNumber = Math.floor((Math.random() * sHits.length));
			message=sHits[iNumber];
		}else{
			iNumber = Math.floor((Math.random() * sErrors.length));
			message=sErrors[iNumber];
		}
		return message;
	},
	gameOver: function (instance) {
		var msgs=$eXeRosco.msgs;
		clearInterval($eXeRosco.gameData.counterClock);
		$eXeRosco.uptateTime($eXeRosco.gameData.counter, instance);

		$('#pStartWith-' + instance).text(msgs.msgNewGame);
		$('#pDefinition-' + instance).text(msgs.msgYouSuccesses+ $eXeRosco.gameData.hits + msgs.msgYouFailures + $eXeRosco.gameData.errors);
		$('#btnAnswer-' + instance).prop('disabled', true);
		$('#btnPass-' + instance).prop('disabled', true);
		$('#edAnswer-' + instance).prop('disabled', true);

		$eXeRosco.gameData.activeWord = 0;
		$eXeRosco.gameData.answeredWords = 0;
		$eXeRosco.drawRosco(instance);
		$eXeRosco.drawText(msgs.msgGameOver, $eXeRosco.colors.red, instance);
		$('#roscoTypeDefinition-' + instance).css('cursor', 'pointer');
		$('#roscoTypeDefinition-' + instance).attr('unselectable', 'on');

		$('#edAnswer-' + instance).val('');
		$('#pSolution-' + instance).text(msgs.msgGameOver);
		$('#pSolution-' + instance).css("color", $eXeRosco.colors.blue);
		$('#pStartWith-' + instance).css('color',$eXeRosco.colors.red); 
		$('#pStartWith-' + instance).css("text-shadow", "4px 4px 4px rgba(0,0,0,0.4)");

		$eXeRosco.gameData.gameStarted = false;
	},
	drawText: function (texto, color, instance) {
		var ctxt = $eXeRosco.options[instance].ctxt,
			whidthCtxt=$eXeRosco.mcanvas.width,
			heightCtxt=$eXeRosco.mcanvas.height,
			radiusLetter = $eXeRosco.radiusLetter,
			xCenter = whidthCtxt/2,
			yCenter = heightCtxt/2,
			wText = whidthCtxt - 7 * radiusLetter,
			xMessage = xCenter - wText / 2,
			yMessage = yCenter,
			 font = 'bold 18px sans-serif';
		ctxt.font = font;
		var whidthText = ctxt.measureText(texto).width,
			xText = xCenter - whidthText / 2,
			yText = yMessage;
		ctxt.fillStyle = $eXeRosco.colors.white;;
		ctxt.fillRect(xMessage, yMessage, wText, 30);
		ctxt.textAlig = "center";
		ctxt.textBaseline = 'top'; //'top | hanging | middle | alphabetic | ideographic | bottom';
		ctxt.fillStyle = color;
		ctxt.fillText(texto, xText, yText + 3);
		ctxt.closePath();
		$('#pSolution-' + instance).text(texto);
		$('#pSolution-' + instance).css("color", color);

	},
	showWord: function (activeLetter, instance) {
		var msgs=$eXeRosco.msgs
			definition = $eXeRosco.options[instance].wordsGame[activeLetter].definition,
			letter = $eXeRosco.letters.charAt(activeLetter),
		$('#pDefinition-' + instance).text(definition);
		var start = $eXeRosco.options[instance].wordsGame[activeLetter].type == 0 ? msgs.msgStartWith + letter : msgs.msgContaint  + letter;
		$('#pStartWith-' + instance).text(start);
		$('#edAnswer-' + instance).val("");
		$('#pSolution-' + instance).val(msgs.msgNewWord);
		$eXeRosco.drawRosco(instance);
		$eXeRosco.drawText(msgs.msgNewWord, $eXeRosco.colors.blue, instance);
		$eXeRosco.gameData.gameActived = true;
		$('#btnAnswer-' + instance).prop('disabled', false);
		$('#btnPass-' + instance).prop('disabled', false);
		$('#edAnswer-' + instance).prop('disabled', false);
	},
	newWord: function (instance) {
		var mActiveWord = $eXeRosco.updateNumberWord($eXeRosco.gameData.activeWord, instance);
		if (mActiveWord == -10) {
			$eXeRosco.gameOver(instance);
		} else {
			$eXeRosco.gameData.activeWord = mActiveWord;
			var letter = $eXeRosco.letters[mActiveWord];
			letter = '#letterR' + letter + '-' + instance;
			$eXeRosco.showWord(mActiveWord, instance)
		}
	},
	updateNumberWord: function (pregunta, instance) {
		var end = true,
			numActiveWord = pregunta;
		while (end) {
			numActiveWord++;
			if (numActiveWord > 26) {
				if ($eXeRosco.gameData.activeGameSpin < $eXeRosco.options[instance].numberTurns) {
					if ($eXeRosco.gameData.answeredWords >= $eXeRosco.gameData.validWords) {
						end = false
						return -10;
					}
					$eXeRosco.gameData.activeGameSpin++;
					$('#roscoTurn-' + instance).removeClass('rosco-IconTurnIconTwo');
					numActiveWord = 0;
				} else {
					end = false
					return -10;
				}
			}
			var state = $eXeRosco.options[instance].wordsGame[numActiveWord].state;
			if (state == 1) {
				end = false
				return numActiveWord;
			}
		}
	},
	passWord: function (instance) {
		var activeWord = $eXeRosco.gameData.activeWord;
		$eXeRosco.newWord(instance);
		if ($eXeRosco.gameData.gameStarted) {
			$eXeRosco.drawText($eXeRosco.msgs.msgPass, $eXeRosco.colors.blue, instance);
			$('#edAnswer-' + instance).focus();
		}
		var mFontColor = $eXeRosco.colors.white;
		var mBackColor = $eXeRosco.colors.blue;
		var letter = $eXeRosco.letters.charAt(activeWord);
		letter = '#letterR' + letter + '-' + instance;
		$(letter).css('background-color', mBackColor);
		$(letter).css('color', mFontColor);
		$eXeRosco.drawRosco(instance);
	},

	answerQuetion: function (instance) {
		var msgs=$eXeRosco.msgs,
			datos = $eXeRosco.gameData,
		 	mOptions = $eXeRosco.options[instance];
		if (datos.gameActived == false) {
			return;
		}
		datos.gameActived = false;
		var letter = $eXeRosco.letters[datos.activeWord];
		var answord = $('#edAnswer-' + instance).val();
		if ($.trim(answord) == "") {
			datos.gameActived = true;
			$eXeRosco.drawText(msgs.msgIndicateWord, $eXeRosco.colors.red, instance);
			return;
		}
		var message = "";
		var Hit = true;
		var word = $.trim(mOptions.wordsGame[datos.activeWord].word.toUpperCase());
		$('#btnAnswer-' + instance).prop('disabled', true);
		$('#btnPass-' + instance).prop('disabled', true);
		$('#edAnswer-' + instance).prop('disabled', true);
		var answord=$.trim($('#edAnswer-' + instance).val().toUpperCase()) ;

		if ($eXeRosco.checkWord(word,answord)) {
			datos.hits++
			mOptions.wordsGame[datos.activeWord].state = 2;
			Hit = true;
			mFontColor = $eXeRosco.colors.white;
			mBackColor = $eXeRosco.colors.verde
		} else {
			mOptions.wordsGame[datos.activeWord].state = 3;
			datos.errors++;
			Hit = false;
			mFontColor = $eXeRosco.colors.white;
			mBackColor = $eXeRosco.colors.red;
		}
		var percentageHits = (datos.hits / datos.validWords) * 100;

		datos.answeredWords++;
		$('#pHits-' + instance).text(datos.hits);
		$('#pErrors-' + instance).text(datos.errors);
		if (mOptions.showClue && percentageHits >= mOptions.percentageClue) {
			$eXeRosco.gameOver(instance);
			clearInterval(datos.relojContador);
			$eXeRosco.drawMessage(true, mOptions.clueGame, true, instance);
			return;
		}
		letter = '#letterR' + letter + '-' + instance;
		$(letter).css('background-color', mBackColor);
		$(letter).css('color', mFontColor);
		$eXeRosco.drawRosco(instance);
		message = mOptions.showSolution ? message : msgs.msgNewWord;
		setTimeout(function () {
			$eXeRosco.newWord(instance)
		}, 3000);
		$eXeRosco.drawMessage(Hit, word.toUpperCase(), false, instance);
		$('#edAnswer-' + instance).focus();
	},
	drawMessage: function (Hit, word, pista, instance) {

		var mAnimo = $eXeRosco.getRetroFeedMessages(Hit),
			ctxt = $eXeRosco.options[instance].ctxt,
			whidthCtxt=$eXeRosco.mcanvas.width,
		 	heightCtxt=$eXeRosco.mcanvas.height,
		 	wCuadro = whidthCtxt - 70,
			xMessage = whidthCtxt/2 - wCuadro / 2,
			yMessage = heightCtxt/2,
		 	xCenter=whidthCtxt/2,
		    font = 'bold 18px sans-serif';
		ctxt.font = font;
		var anchoTextoAnimo = ctxt.measureText(mAnimo).width;
		//var anchoTextoPalabra = ctxt.measureText(word).width;
		var posTextoAnimoX = xCenter - anchoTextoAnimo / 2;
		var posTextoAnimoY = $eXeRosco.options[instance].showSolution ? yMessage - 10 : yMessage;
		ctxt.fillStyle = $eXeRosco.colors.white;
		var lColor = Hit ? $eXeRosco.colors.verde : $eXeRosco.colors.red;
		ctxt.strokeStyle = "#555555";
		ctxt.lineWidth = 2;
		$eXeRosco.roundRect(xMessage+5, 130, 277, 120, 8, true, true, ctxt);
		ctxt.textAlig = "center";
		ctxt.textBaseline = 'top'; 
		ctxt.fillStyle = lColor;
		if (pista) {
			mAnimo = $eXeRosco.msgs.msgClue;
			posTextoAnimoY = yMessage - 15;
			porTextoPalabraY = posTextoAnimoY + 30;
			posTextoAnimoX = xCenter - ctxt.measureText(mAnimo).width / 2;
			$eXeRosco.wrapText(ctxt, mAnimo + ' ' + word, xMessage + 10, yMessage - 32, 257, 24);
			$('#pSolution-' + instance).text(mAnimo + word);
			$('#pSolution-' + instance).css("color", lColor);
			return;
		}
	    ctxt.fillText(mAnimo, posTextoAnimoX, posTextoAnimoY);
		$('#pSolution-' + instance).text(mAnimo);
		if ($eXeRosco.options[instance].showSolution) {
			word=word.replace(/[|]/g, ' o ');
			$('#pSolution-' + instance).text(mAnimo + ' ' + word);
			ctxt.fillText(mAnimo, posTextoAnimoX, posTextoAnimoY);
			$eXeRosco.wrapText(ctxt, word, xMessage + 10, posTextoAnimoY+10, 257, 24);
		}
		$('#pSolution-' + instance).css("color", lColor);
	},
	drawLetterActive: function (iNumber, instance) {
		if ($eXeRosco.gameData.gameActived) {
			var activeWord = $eXeRosco.gameData.activeWord,
			    word = $eXeRosco.options[instance].wordsGame[activeWord],
			 	mFontColor = $eXeRosco.colors.white,
				mBackColor = $eXeRosco.colors.blue;
			if (word.state == 2) {
				mFontColor = $eXeRosco.colors.white;
				mBackColor = $eXeRosco.colors.verde;

			} else if (word.state == 3) {
				mFontColor = $eXeRosco.colors.white;
				mBackColor = $eXeRosco.colors.red;

			} else if ($eXeRosco.gameData.activaLetra) {
				mFontColor = $eXeRosco.colors.black;
				mBackColor = $eXeRosco.colors.yellow;
			}
			if (iNumber == activeWord) {
				var letter = "",
					mLetter = $eXeRosco.letters.charAt(iNumber);
				letter = '#letterR' + mLetter + '-' + instance;
				$(letter).css('background-color', mBackColor);
				$(letter).css('color', mFontColor);

				var ctxt = $eXeRosco.options[instance].ctxt,
					angle = ($eXeRosco.angleSize * (iNumber + 20)) % 27,
				 	radiusLetter =$eXeRosco.radiusLetter,
				 	xCenter = $eXeRosco.mcanvas.width/2,
				 	yCenter =  $eXeRosco.mcanvas.height/2,
				 	radius = $eXeRosco.mcanvas.width/2 - radiusLetter * 2,
				 	yPoint = yCenter + radius * Math.sin(angle),
				 	xPoint = xCenter + radius * Math.cos(angle),
				 	font = ' bold 20px sans-serif ';
				ctxt.beginPath();
				ctxt.strokeStyle = $eXeRosco.colors.white;
				ctxt.arc(xPoint, yPoint, radiusLetter, 0, 2 * Math.PI);
				ctxt.fillStyle = mBackColor;
				ctxt.fill();
				ctxt.font = font;
				ctxt.lineWidth = 2;
				var whidthLetter = ctxt.measureText(mLetter).width;
				//var altoLetra = parseInt(font, 10)
				ctxt.textAlig = "center"
				ctxt.textBaseline = 'middle';
				ctxt.fillStyle = mFontColor;
				ctxt.fillText(mLetter, xPoint - whidthLetter / 2, yPoint + 2);
				ctxt.closePath();

			}
			$eXeRosco.gameData.activaLetra = $eXeRosco.gameData.activaLetra ? false : true;
		}
	},
	checkWord: function (word, answord) {
		if (word.indexOf('|') == -1) {
			return $.trim(word.toUpperCase()) == $.trim(answord.toUpperCase());
		}
		var words = word.split('|');
		for (var i = 0; i < words.length; i++) {
			if ($.trim(words[i]).toUpperCase() == $.trim(answord.toUpperCase())) {
				return true;
			}
		}
		return false;
	},
	wrapText: function (context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' '),
			line = '',
			my=words.length<12?y+20:y+10;
		for (var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				var lineWidth=context.measureText(line).width;
				x=x+(maxWidth-lineWidth)/2+5;
				context.fillText(line, x, my);
				line = words[n] + ' ';
				my += lineHeight;
			} else {
				line = testLine;
			}
		}
		x=x+(maxWidth-testWidth)/2+5
		context.fillText(line, x, my);
	},
	roundRect: function (x, y, width, height, radius, fill, stroke, ctxt) {

		if (typeof stroke == 'undefined') {
			stroke = true;
		}
		if (typeof radius === 'undefined') {
			radius = 5;
		}
		if (typeof radius === 'number') {
			radius = {
				tl: radius,
				tr: radius,
				br: radius,
				bl: radius
			};
		} else {
			var defaultRadius = {
				tl: 0,
				tr: 0,
				br: 0,
				bl: 0
			};
			for (var side in defaultRadius) {
				radius[side] = radius[side] || defaultRadius[side];
			}
		}
		ctxt.beginPath();
		ctxt.moveTo(x + radius.tl, y);
		ctxt.lineTo(x + width - radius.tr, y);
		ctxt.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctxt.lineTo(x + width, y + height - radius.br);
		ctxt.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctxt.lineTo(x + radius.bl, y + height);
		ctxt.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctxt.lineTo(x, y + radius.tl);
		ctxt.quadraticCurveTo(x, y, x + radius.tl, y);
		ctxt.closePath();
		$eXeRosco.setShadow(ctxt, "rgba(0, 0, 0, 0.5)", 7, 7, 10);
		if (fill) {
			ctxt.fill();
		}
		if (stroke) {
			ctxt.stroke();
		}
		$eXeRosco.setShadow(ctxt, "white", 0, 0, 0);
	},
	drawRosco: function (instance) {
		var ctxt = $eXeRosco.options[instance].ctxt;
		var whidthCtxt=$eXeRosco.mcanvas.width;
		var heightCtxt=$eXeRosco.mcanvas.height;
		ctxt.clearRect(0, 0, whidthCtxt, heightCtxt);
		var radiusLetter = $eXeRosco.radiusLetter;
		var xCenter = Math.round(whidthCtxt / 2)
		var yCenter = Math.round(heightCtxt / 2);
		var radius = whidthCtxt / 2 - radiusLetter * 2;
		var letter = "";
		for (var i = 0; i < $eXeRosco.letters.length; i++) {
			letter = $eXeRosco.letters.charAt(i);
			var angle = ($eXeRosco.angleSize * (i + 20)) % 27;
			var yPoint = yCenter + radius * Math.sin(angle);
			var xPoint = xCenter + radius * Math.cos(angle);
			var font = ' bold 20px sans-serif ';
			ctxt.beginPath();
			ctxt.lineWidth = 0;
			ctxt.strokeStyle = $eXeRosco.colors.black;
			ctxt.arc(xPoint, yPoint, radiusLetter, 0, 2 * Math.PI);
			var state = $eXeRosco.options[instance].wordsGame[i].state;
			color=$eXeRosco.getColorState(state);
			$eXeRosco.setShadow(ctxt, "rgba(0, 0, 0, 0.5)", 3, 3, 4);
			ctxt.fillStyle = color;
			ctxt.fill();
			$eXeRosco.setShadow(ctxt, "white", 0, 0, 0);
			ctxt.font = font;
			var whidthLetter = ctxt.measureText(letter).width;
			ctxt.textAlig = "center"
			ctxt.textBaseline = 'middle'; 
			ctxt.fillStyle = $eXeRosco.colors.white;
			ctxt.fillText(letter, xPoint - whidthLetter / 2, yPoint + 2);
			ctxt.closePath();
		}
	},
	setShadow: function (ctx, color, ox, oy, blur) {
        ctx.shadowColor = color;
        ctx.shadowOffsetX = ox;
        ctx.shadowOffsetY = oy;
        ctx.shadowBlur = blur;
	  },
	  getColorState: function(state){
		var color=$eXeRosco.colors.blue;
		switch (state) {
            case 0:
            	color=$eXeRosco.colors.black;
                break;
            case 1:
            	color=$eXeRosco.colors.blue;
                break;
            case 2:
            	color=$eXeRosco.colors.verde;
                break
            case 3:
            	color=$eXeRosco.colors.red;
                break
            default:
            	color=$eXeRosco.colors.blue;
                break;
		}
		return color;
	  }
}
$(function () {
	$eXeRosco.init();
});