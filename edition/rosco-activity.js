/**
 * Rosco Activity iDevice (edition code)
 *
 * Released under Attribution-ShareAlike 4.0 International License.
 * Author: Manuel Narvaez Martinez
 *
 * License: http://creativecommons.org/licenses/by-sa/4.0/
 */
var $exeDevice = {

	// i18n
	i18n: {
		name: _('Rosco Activity'),
		es: {
			"Instructions": "Instrucciones",
			"Complete the following fields:": "Completa los campos siguientes:",
			"Game options": "Opciones juego",
			"Time: ": "Tiempo: ",
			"No. Returns: ": "Nº Vueltas: ",
			"% Successes: ": "% Aciertos: ",
			"Show Solutions": "Mostrar soluciones",
			"Show clue": "Mostrar pista",
			"Message access: ":"Mensaje acceso: ",
			"Write a clue":"Escribe una pista",
			"Write an access code":"Escribe un código de acceso",
			"% hits: ":"% Aciertos: ",
			"Type/Word/Definition": "Tipo/Palabra/Definición",
			" does not start with the letter ": " no comienza con la letra ",
			" does not contain the letter ": " no contiene la letra ",
			"You must write a clue.": "Debes escribir una pista.",
			"You must indicate the definition of the word.": "Debes indicar la definición de la palabra.",
			"You must indicate the key to play this game.": "Debes indicar la clave para jugar a este juego.",
			"You must indicate how to obtain the key to play this game.": "Debes indicar como obtener la clave para jugar a este juego.",
			"Write the correct word and click on answer. If you doubt, go to the next word": "Escribe la palabra correcta",
			"Ready?":"¿Preparado?",
			"Click here to start":"Haz clic aquí para comenzar",
			"Happen":"Pasar",
			"Reply: ":"Responder",
			"Submit: ":"Enviar",
			"Enter the access code":"Introduce la clave de acceso",
			"The access code is not correct":"La clave no es correcta",
			"Click here for new game":"Pulsa aquí para nueva partida",
			"The game is over!":"¡El juego ha finalizado!",
			"New word":"Nueva palabra",
			"Start with ":"Comienza con ",
			"It contains the ":"Contiene la ",
			"You pass word":"Pasas palabra",
			"Indicate a word":"Indica una palabra",
			"Cool! The clue is:":"¡Genial! La pista es: ",
			"Right!|Great!|Great!|Very good!|Good!":"¡Correcto!|¡Estupendo!|¡Genial!|¡Muy bien!|¡Pefecto!",
			"It was not that!|You have failed!|Wrong!|Sorry!|Error!":"¡No era esa!|¡Has fallado!|¡Incorrecto!|¡Lo siento!|¡Error!",
			"You have guessed ":"Has acertado ",
			" words and failed ":" palabras y fallado ",
			"Indicate how to obtain the access key":"Indica como obtener la clave acceso",
			
		}

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
	init: function () {

		this.createForm();
		this.addEvents();

	},
	createForm: function () {
		var html = '\
			<div id="roscoIdeviceForm">\
				<p>' + _("Complete the following fields:") + '</p>\
				<p>\
					<label for="roscoInstructions">' + _("Instructions") + ': </label><textarea id="roscoInstructions" class="exe-html-editor"\></textarea>\
				</p>\
				<fieldset>\
					<legend>' + _("Game options") + '</legend>\
					<p id="opcionesRosco">\
						<label for="roscoDuration">' + _("Time: ") + ': </label><input type="text" name="roscoDuration" id="roscoDuration"  value="240" required/> \
						<label for="roscoNumberTurns">' + _("No. Returns: ") + ': </label><input type="text" value="1" id="roscoNumberTurns" required>\
						<label class="container">' + _("Show Solutions") + '\
						  <input type="checkbox" checked="checked" id="roscoShowSolutions">\
						  <span class="checkmark"></span>\
						</label>\
						<label class="container">' + _("Show clue") + '\
						  <input type="checkbox" id="roscoShowClue">\
						  <span class="checkmark"></span>\
						</label>\
						<input type="text" name="roscoClue" id="roscoClue" placeholder="' + _("Write a clue") + '" maxlength="50">' + this.getSelectClue() + '\
						<label class="container">' + _("Clave acceso") + '\
						  <input type="checkbox" id="roscoShowCodeAccess">\
						  <span class="checkmark"></span>\
						</label>\
						<input type="text" name="roscoCodeAccess:" id="roscoCodeAccess" placeholder="' + _("Write access code") + '" maxlength="50">\
					</p>\
					<p>\
						<label for="roscoMessageCodeAccess" id="labelMessageAccess">' + _("Message access: ") + '</label><input type="text" name="roscoMessageCodeAccess" id="roscoMessageCodeAccess" placeholder="' + _("Indicate how to obtain the access key") + '" maxlength="400"/> \
					</p>\
				</fieldset>\
				<fieldset >\
				<legend>' + _("Type/Word/Definition") + '</legend>\
				<div id="roscoDataWord">' + this.getWords().join('') + '</div>\
				</fieldset>\
			</div>\
			';

		//$('#roscoDataWord').append(mFilas.join(''));
		var field = $("textarea.jsContentEditor").eq(0);
		field.before(html);
		$('#roscoClue').hide();
		$('#roscoPercentajeClue').hide();
		$('#labelPercentajeClue').hide();
		$('#roscoCodeAccess').hide();
		$('#roscoMessageCodeAccess').hide();
		$('#labelMessageAccess').hide();
		this.loadPreviousValues(field);

	},
	loadPreviousValues: function (field) {
		var originalHTML = field.val();

		if (originalHTML != '') {
			var wrapper = $("<div></div>");
			wrapper.html(originalHTML);
			var durationGame = $('durationGame', wrapper).text();
			var numberTurns = $('numberTurns', wrapper).text();
			var showSolution = ($('showSolution', wrapper).text() == 'true');
			var showClue = ($('showClue', wrapper).text() == 'true');
			var clueGame = $.trim($('clueGame', wrapper).text());
			var percentageClue = $('percentageClue', wrapper).text();
			var showAccesCode = ($('showAccesCode', wrapper).text() == 'true');
			var accessCode = $.trim($('accessCode', wrapper).text());
			var messageAccessCode = $('messageAccessCode', wrapper).text();
			var wordsGame = [];
			for (var i = 0; i < this.letters.length; i++) {
				var mLetter = 'letter' + this.letters.charAt(i)
				var mWord = $(mLetter, wrapper).text();
				var aWord = mWord.split('#&');

				var p = new Object();
				p.letter = this.letters.charAt(i);
				p.word = $.trim(aWord[0]).toUpperCase();
				p.definition = $.trim(aWord[1]);
				p.type = $.trim(aWord[2]);
				wordsGame.push(p);

			}
			$('#roscoDuration').val(durationGame)
			$('#roscoNumberTurns').val(numberTurns);
			$('#roscoShowSolutions').prop('checked', showSolution);
			$('#roscoShowClue').prop('checked', showClue);
			$('#roscoClue').val(clueGame)
			$('#roscoPercentajeClue').val(percentageClue);
			$('#roscoShowCodeAccess').prop('checked', showAccesCode);
			$('#roscoCodeAccess').val(accessCode)
			$('#roscoMessageCodeAccess').val(messageAccessCode);

			$('.roscoWordEdition').each(function (index) {
				$(this).val(wordsGame[index].word);
			});
			$('.rosco-DefinitionEdition').each(function (index) {
				$(this).val(wordsGame[index].definition);
			});
			$('.roscoStartEdition').each(function (index) {
				if (wordsGame[index].type == 1) {
					$(this).addClass('contiene');
				}
			});
			var main = this;
			$('div.roscoLetterEdition').each(function (index) {
				var longitud = (wordsGame[index].word).length;
				var color = longitud > 0 ? main.colors.blue : main.colors.black;
				$(this).css('background-color', color);

			});
			if (showClue) {
				$('#roscoClue').fadeIn();
				$('#roscoPercentajeClue').fadeIn();
				$('#labelPercentajeClue').fadeIn();
			} else {
				$('#roscoClue').fadeOut();
				$('#roscoPercentajeClue').fadeOut();
				$('#labelPercentajeClue').fadeOut();
			}
			if (showAccesCode) {
				$('#roscoCodeAccess').fadeIn();
				$('#roscoMessageCodeAccess').fadeIn();
				$('#labelMessageAccess').fadeIn();
			} else {
				$('#roscoCodeAccess').fadeOut();
				$('#roscoMessageCodeAccess').fadeOut();
				$('#labelMessageAccess').fadeOut();
			}
			var instructions = $(".rosco-instructions", wrapper);
			if (instructions.length == 1) $("#roscoInstructions").val(instructions.html());

		}
	},

	save: function () {

		
		var limpia = $exeDevice.removeTags;
		
		var msgWrote=limpia(_("Write the correct word and click on answer. If you doubt, go to the next word"));
		var msgReady=limpia(_("Ready?"));
		var msgStartGame=limpia(_("Click here to start"));
		var msgHappen=limpia(_("Happen"));
		var msgReply=limpia(_("Reply: "));
		var msgSubmit=limpia(_("Submit: "));
		var msgEnterCode=limpia(_("Enter the access code"));
		var msgErrorCode=limpia(_("The access code is not correct"));
		var msgGameOver=limpia(_("The game is over!"));
		var msgNewWord=limpia(_("New word"));
		var msgStartWith=limpia(_("Start with "));
		var msgContaint=limpia(_("It contains the "));
		var msgPass=limpia(_("You pass word"));
		var msgIndicateWord=limpia(_("Indicate a word"));
		var msgClue=limpia(_("Cool! The clue is:"));
		var msgNewGame=limpia(_("Click here for new game"))
		var msgSuccesses=_("Right!|Great!|Great!|Very good!|Good!");
		var msgFailures=_("It was not that!|You have failed!|Wrong!|Sorry!|Error!");
		var msgYouSuccesses=limpia(_("You have guessed "));
		var msgYouFailures=limpia(_(" words and failed "));
		
		var html = '<div class="rosco-IDevice">';
		var divContent = "";
		var instrucciones = tinymce.editors[0].getContent();

		if (instrucciones != "") divContent = '<div class="rosco-instructions">' + instrucciones + '</div>';
		html += divContent;
		
		var durationGame = limpia($('#roscoDuration').val());
		var numberTurns = limpia($('#roscoNumberTurns').val());
		var showSolution = $('#roscoShowSolutions').is(':checked');
		var showClue = $('#roscoShowClue').is(':checked');
		var clueGame = limpia($.trim($('#roscoClue').val()));
		var percentageClue = $('#roscoPercentajeClue').children("option:selected").val();
		var showAccesCode = $('#roscoShowCodeAccess').is(':checked');
		var accessCode = limpia($.trim($('#roscoCodeAccess').val()));
		var messageAccessCode = limpia($.trim($('#roscoMessageCodeAccess').val()));
		
		
		if (showClue && clueGame.length == 0) {
			eXe.app.alert(_("You must write a clue."));
			return false;
		}
		if (showAccesCode && accessCode.length == 0) {
			eXe.app.alert(_("You must indicate the key to play this game."));
			return false;
		}
		if (showAccesCode && messageAccessCode.length == 0) {
			eXe.app.alert(_("You must indicate how to obtain the key to play this game."));
			return false;
		}
		var dataWords = this.validateData();
		if (!dataWords) {
			return false;
		}
		html += '<dl>';
		html += '<durationGame>' + durationGame + '</durationGame>';
		html += '<numberTurns>' + numberTurns + '</numberTurns>';
		html += '<showSolution>' + showSolution + '</showSolution>';
		html += '<showClue>' + showClue + '</showClue>';
		html += '<clueGame>' + clueGame + '</clueGame>';
		html += '<percentageClue>' + percentageClue + '</percentageClue>';
		html += '<showAccesCode>' + showAccesCode + '</showAccesCode>';
		html += '<accessCode>' + accessCode + '</accessCode>';
		html += '<msgWrote>' + msgWrote + '</msgWrote>';
		html += '<msgReady>' + msgReady + '</msgReady>';
		html += '<msgStartGame>' + msgStartGame + '</msgStartGame>';
		html += '<msgHappen>' + msgHappen + '</msgHappen>';
		html += '<msgReply>' + msgReply + '</msgReply>';
		html += '<msgSubmit>' + msgSubmit + '</msgSubmit>';
		html += '<msgEnterCode>' + msgEnterCode + '</msgEnterCode>';
		html += '<msgErrorCode>' + msgErrorCode + '</msgErrorCode>';
		html += '<msgStartWith>' + msgStartWith + '</msgStartWith>';
		html += '<msgContaint>' + msgContaint + '</msgContaint>';
		html += '<msgPass>' + msgPass + '</msgPass>';
		html += '<msgIndicateWord>' + msgIndicateWord + '</msgIndicateWord>';
		html += '<msgClue>' + msgClue + '</msgClue>';
		html += '<msgNewGame>' + msgNewGame + '</msgNewGame>';
		html += '<msgSuccesses>' + msgSuccesses + '</msgSuccesses>';
		html += '<msgFailures>' + msgFailures + '</msgFailures>';
		html += '<msgYouSuccesses>' + msgYouSuccesses + '</msgYouSuccesses>';
		html += '<msgYouFailures>' + msgYouFailures + '</msgYouFailures>';
		html += '<msgGameOver>' + msgGameOver + '</msgGameOver>';
		html += '<msgNewWord>' + msgNewWord + '</msgNewWord>';
		for (var i = 0; i < this.letters.length; i++) {
			var mWord = dataWords[i];
			html += '<letter' + mWord.letter + '>' + mWord.word + '#&' + mWord.definition + '#&' + mWord.type + '</letter' + mWord.letter + '>'
		}
		html += '</dl>';
		html += '</div>';
		return html;
	},
	removeTags: function (str) {
		var wrapper = $("<div></div>");
		wrapper.html(str);
		return wrapper.text();
	},
	startContains: function (letter, word, type) {
		var start = false;
		var vocalLetter = "AEIOU";
		mWord = $.trim(word.toUpperCase());
		mWord = (type == 0) ? mWord.slice(0, 1) : mWord.substr(1);
		if (vocalLetter.indexOf(letter) != -1) {
			if (letter == "A" && /[AÁÀÂÄ]/.test(mWord)) {
				start = true;
			} else if (letter == "E" && /[EÉÈÊË]/.test(mWord)) {
				start = true;
			} else if (letter == "I" && /[IÍÌÎÏ]/.test(mWord)) {
				start = true;
			} else if (letter == "O" && /[OÓÒÔÖ]/.test(mWord)) {
				start = true;
			} else if (letter == "U" && /[UÚÙÛÜ]/.test(mWord)) {
				start = true;
			}
		} else {
			start = mWord.indexOf(letter) != -1;
		}
		return start;
	},

	startContainsAll: function (letter, word, type) {
		var words = word.split('|');
		var start = true;
		for (var i = 0; i < words.length; i++) {
			var sWord = $.trim(words[i]).toUpperCase();
			if (this.startContains(letter, sWord, type) == false) {
				start = false;
				break;
			}
		}
		return start;
	},

	getWords: function () {
		var rows = [];
		for (var i = 0; i < this.letters.length; i++) {
			letter = this.letters.charAt(i);
			var btnLetra = '<div class="roscoLetterEdition">' + letter + '</div>';
			var divContiene = '<div class="roscoStartEdition"></div>';
			var inputPalabra = '<input type="text" class="roscoWordEdition">';
			var inputDefinicion = '<input type="text" class="rosco-DefinitionEdition">';
			var fila = '<div class="roscoFilaPalabraEdicion">' + btnLetra + divContiene + inputPalabra + inputDefinicion + '</div>';
			rows.push(fila);

		}
		return rows;
	},
	validateData: function () {
		var words = [];
		$('.roscoWordEdition').each(function () {
			words.push($(this).val().toUpperCase().trim());
		})
		var definitions = [];
		$('.rosco-DefinitionEdition').each(function () {
			definitions.push($(this).val());
		});
		var types = [];
		$('div .roscoStartEdition').each(function () {
			var type = $(this).hasClass('contiene') ? 1 : 0;
			types.push(type);
		});
		letras = [];
		for (var i = 0; i < this.letters.length; i++) {
			var letter = this.letters.charAt(i);
			letras.push(letter);
			var word = $.trim(words[i]).toUpperCase();
			var definition = $.trim(definitions[i]);
			var mType = types[i];
			if (word.length > 0) {
				if (mType == 0 && !(this.startContainsAll(letter, word, mType))) {
					eXe.app.alert(word + _(' does not start with the letter') + letter);
					return false;
				} else if (mType == 1 && !(this.startContainsAll(letter, word, mType))) {
					eXe.app.alert(word + _(' does not contain the letter') + letter);
					return false;
				} else if ($.trim(definition).length == 0) {
					eXe.app.alert(_('You must indicate the definition of the word.') + word);
					return false;
				}
			}
		}
		var wordsGame = [];
		for (var i = 0; i < this.letters.length; i++) {
			var p = new Object();
			p.letter = this.letters.charAt(i);
			p.word = $.trim(words[i]).toUpperCase();
			p.definition = definitions[i];
			p.type = types[i];
			wordsGame.push(p);
		}
		return wordsGame;
	},
	getSelectClue: function () {
		var html = '<label for="roscoPercentajeClue" id="labelPercentajeClue">'+("% hits: ")+ '</label>\
		<select id="roscoPercentajeClue">\
			<option value="10">10%</option>\
			<option value="20">20%</option>\
			<option value="30">30%</option>\
			<option value="40" selected>40%</option>\
			<option value="50">50%</option>\
			<option value="60">60%</option>\
			<option value="70">70%</option>\
			<option value="80">80%</option>\
			<option value="90">90%</option>\
			<option value="100">100%</option>\
		  </select>';
		return html;
	},
	addEvents: function () {
		$('#roscoDataWord div.roscoStartEdition').on('click', function () {
			$(this).toggleClass('contiene');
		});
		var main = this;
		$('#roscoDataWord .roscoWordEdition').on('focusout', function () {
			var word = $(this).val().trim().toUpperCase();
			var letter = $(this).siblings().filter(".roscoLetterEdition").text();
			if (word.length > 0) {
				var mType = $(this).siblings().filter('.roscoStartEdition').hasClass('contiene') ? 1 : 0;
				if (mType == 0 && !(main.startContainsAll(letter, word, mType))) {
					eXe.app.alert(word + _(' does not start with the letter ') + letter);
					return;
				} else if (mType == 1 && !(main.startContainsAll(letter, word, mType))) {
					eXe.app.alert(word + _(' does not contain the letter ' + letter));
					return;
				}
			}
			var color = $(this).val().trim() == "" ? main.colors.black : main.colors.blue;
			$(this).siblings().filter('.roscoLetterEdition').css("background-color", color);
		});

		$('#roscoShowClue').on('change', function () {
			if ($(this).is(':checked')) {
				$('#roscoClue').fadeIn();
				$('#roscoPercentajeClue').fadeIn();
				$('#labelPercentajeClue').fadeIn();

			} else {
				$('#roscoClue').fadeOut();
				$('#roscoPercentajeClue').fadeOut();
				$('#labelPercentajeClue').fadeOut();
			}
		});

		$('#roscoShowCodeAccess').on('change', function () {
			if ($(this).is(':checked')) {
				$('#roscoCodeAccess').fadeIn();
				$('#roscoMessageCodeAccess').fadeIn();
				$('#labelMessageAccess').fadeIn();
			} else {
				$('#roscoCodeAccess').fadeOut();
				$('#roscoMessageCodeAccess').fadeOut();
				$('#labelMessageAccess').fadeOut();			}
		});

		$('#roscoDuration').on('keyup', function () {
			var v = this.value;
			v = v.replace(/\D/g, '');
			v = v.substring(0, 4);
			this.value = v;
		});

		$('#roscoNumberTurns').on('keyup', function () {
			var v = this.value;
			v = v.replace(/\D/g, '');
			v = v.substring(0, 1);
			this.value = v;
		});

		$('#roscoNumberTurns').on('focusout', function () {
			this.value = this.value.trim() == '' ? 1 : this.value;
			this.value = this.value > 2 ? 2 : this.value;
			this.value = this.value < 1 ? 1 : this.value;
		});
		$('#roscoDuration').on('focusout', function () {
			this.value = this.value.trim() == '' ? 240 : this.value;
		});
	}

}