$(function() {

//RANDOM NUMBER FOR ID ASSIGNATION
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		var i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

//CREATING COLUMN
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
		//COLUMN'S ELEMENTS
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnControler = $('<div>').addClass('column-controler');
			var $columnAddCart = $('<button>').addClass('btn-add-card').text('+');
			var $columnAddname = $('<input>').addClass('add-input');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			
		//EVENT LISTENERS
			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCart.click(function() {

				if ($columnAddname[0].value) {
					(self.addCard(new Card($columnAddname[0].value)));
				} else {
					$columnAddname[0].setAttribute('placeholder', 'Wpisz nazwę kartki');
				}
			});
	
		//COLUMN SET UP
			$columnControler
				.append($columnAddname)
				.append($columnAddCart)
				.append($columnDelete);

			$column
				.append($columnTitle)
				.append($columnControler)
				.append($columnCardList);
			return $column;
		}
	}
	
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

//CREATING CARDS
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
		//CARD'S ELEMENTS
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		//EVENT LISTENERS
			$cardDelete.click(function() {
				self.removeCard();
			});

		//CARD SET UP
			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

//BOARD ELEMENTS
	var board = {
		name: 'Tablica Kanaban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	//UI QUERRY - DRAG&DROP
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	//EVENT LISTENER
	$('.btn-create-column').click(function() {
		$('.column-confirm').css('display','inline-block');
	});

	$('.btn-add-card').click(function() {
		var name = $('#input-column-name')[0];
		if (name.value) {
		var column = new Column(name.value);
		board.addColumn(column);
		$('.column-confirm').hide();
		name.value = '';
		} else {
			name.setAttribute('placeholder', 'Wpisz nazwę kolumny');
		}
	});
	
//DEFAULT STATE
//CREATING COLUMN
	var todoColumn = new Column('Do zrobienia');
	var	doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

//ADD COLUMN TO TABLE
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

//NEW CARD
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyć tablicę kanban');

//ADD CARD TO COLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});
