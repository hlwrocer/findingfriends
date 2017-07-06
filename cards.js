//generate a number from 0 to hi [0,hi);
function genWholeRand(hi){
	return Math.floor(Math.random() * (hi));
}

//card constructor
//for jokers, value - 15 big 14 small name = SJ/BJ, suit = Joker
function Card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//deck constructor
function Deck(){

	this.cards = (function(){
		var names = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
		var suits = ['H','C','D','S'];
		var cards = [];
		//gen 52 suited cards
		for (var suit = 0; suit < suits.length; suit++){
			for (var name = 0; name < names.length; name++){
				cards.push( new Card(name+1,names[name], suits[suit]));
			}
		}
		
		//two jokers
		cards.push(new Card (14, 'SJ', 'Joker'));
		cards.push(new Card (15, 'BJ', 'Joker'));
		
		return cards
	})();

	this.join = function(deck){//combine another deck into this one
		this.cards = (this.cards).concat(deck.cards);
	}
	
	this.shuffle = function(numtimes){//randomly shuffle the deck numtimes
		while(numtimes > 0){
			var shuffledCards = [];
			var numCards = this.cards.length;
			for (card = 0; card < numCards; card++){
				var pos = genWholeRand(this.cards.length);
				shuffledCards.push(this.cards[pos]);
				this.cards.splice(pos,1);
			}
			this.cards = shuffledCards;
			numtimes -= 1;
		}
	}
}

function Game(numPlayers, numDecks, gameOwner){
//other things tbd
	this.owner = gameOwner;
	this.numPlayers = numPlayers;	
	this.curPlayers = 1;
	this.players = [new player(gameOwner)];
	this.cards = new Deck();

	for (var deck = 1; deck < numDecks; deck++){
		(this.cards).join(new Deck());	
	}
	
	this.addPlayer = function(playerName){
		this.curPlayers++;
		(this.players).push(new player(playerName));
	}

	this.dealCards = function(){
		var curPlayer = genWholeRand(7);
		var cardsToDeal = Math.floor(deck.length/this.numPlayers) * this.numPlayers;
		for (var card = 0; card < cardsToDeal; card++){
			this.players[curPlayer].addCard[(this.cards).shift()];
			curPlayer = (curPlayer + 1) % this.numPlayers;
		}
	}
	
	this.start = function(){
		if (this.curPlayers !== this.numPlayers){
			//TODO/REMINDER: gray out start button or something when doing UI	
		}else{
			(this.cards).shuffle(7);
			this.dealCards();
			//more game logic here tbd;
		}
	}


}

function Player(name){
	this.score = 2;
	this.playerName = name;
	this.cards = [];

	this.addCard = function(card){
		(this.cards).push(card);
	}

	this.sortHand = function(trumpSuit, trumpNum){
		hearts = [];
		spades = [];
		diamonds = [];
		clubs = [];
		trump = [];
		
		//sort into suits
		for (var card = 0; card < (this.cards).length; card++){
			if (card.suit === "c" && card.value !== trumpNum){
				clubs.push(card);
			}
			else if (card.suit === "d" && card.value !== trumpNum){
				diamonds.push(card);
			}
			else if (cards.suit === "s" && card.value !== trumpNum){
				spades.push(card);
			}
			else if (cards.suit === "h" && card.value !== trumpNum){
				hearts.push(card);
			}
			else{
				trump.push(card);	
			}
		}
	}

	function sortSuit(cardArray, isTrump=false, trumpSuit=null){
		//probably merge sort
		//possibly unneeded? If cards dealt one at a time sort/insert that card object one at a time, sequentially
		//^ might need for trump e.g trump suit = clubs flip to hearts. Or allow for manual moving of cards
		// and add a sort button.
		return cardArray
	}
}
