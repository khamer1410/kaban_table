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
//czemu nie prototyp
		function createColumn() {
		//COLUMN'S ELEMENTS
			var $column = $('<div>').addClass('column'); //dolar w nazwie tylko dla opisu?
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCart = $('<button>').addClass('add-card').text('Dodaj kartę');

		//EVENT LISTENERS
			$columnDelete.click(function() {
				self.removeColumn();
			}); //czemu tutaj średnik?
			$columnAddCart.click(function() {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});//j/w
		
		//COLUMN SET UP
			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCart)
					.append($columnCardList);

		//COLUMN RETURN
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
		this.$element = createCard();// $ = "Właściwość element (analogicznie do przykładu z kolumną) przechowuje element DOM, który tworzy nam ta funkcja."

		function createCard() {
		//CARD'S ELEMENTS
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		//EVENT LISTENERS
			$cardDelete.click(function() {
				self.removeCard();
			})

		//CARD SET UP
			$card.append($cardDelete)
					.append($cardDescription);

		//CARD RETURN
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
		$element: $('#board .column-container') //dlaczego nie na początku obiektu? definiuje element użyty w funkcji
	};
	//UI QUERRY - DRAG&DROP
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	//EVENT LISTENER
	$('.create-column').click(function() {
		var name = prompt('Nazwa kolumny');
		var column = new Column(name);
		board.addColumn(column);
	})

//CREATING COLUMN
	var todoColumn = new Column('Do zrobienia');
	var	doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone')

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
})
