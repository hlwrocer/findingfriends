//generate a number from 0 to hi [0,hi);
function genWholeRand(hi){
	return Math.floor(Math.random() * (hi));
}

//card object
//for jokers, value - 15 big 14 small name = SJ/BJ, suit = Joker
function Card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//deck object
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
}
Deck.prototype = {
	join: function(deck){//combine another deck into this one
		this.cards = (this.cards).concat(deck.cards);
	},
	shuffle: function(numtimes){//randomly shuffle the deck numtimes
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
	},
	dealCard: function(){
		return this.cards.shift();	
	},
	shuffleCard: function(card){
		this.cards.push(card);	
	}
}
	


function Game(numPlayers, numDecks, gameOwner){
//other things tbd
	this.owner = gameOwner;
	this.numPlayers = numPlayers;	
	this.curPlayers = 1;
	this.players = [new Player(gameOwner)];
	this.deck = new Deck();

	for (var deck = 1; deck < numDecks; deck++){
		(this.deck).join(new Deck());	
	}
}

Game.Prototype = {
	addPlayer: function(playerName){
		this.curPlayers++;
		(this.players).push(new Player(playerName));
	},
	dealCards: function(){
		var curPlayer = genWholeRand(7);
		var cardsToDeal = Math.floor(this.deck.cards.length/this.numPlayers) * this.numPlayers;
		console.log(cardsToDeal);
		for (var card = 0; card < cardsToDeal; card++){
			this.players[curPlayer].addCard((this.deck).dealCard());
			curPlayer = (curPlayer + 1) % this.numPlayers;
		}
	},
	start: function(){
		if (this.curPlayers !== this.numPlayers){
			//TODO/REMINDER: gray out start button or something when doing UI	
		}else{
			(this.cards).shuffle(7);
			this.dealCards();
			//more game logic here tbd;
		}
	}
}


}

function Player(name){
	this.score = 2;
	this.playerName = name;
	this.cards = [];
}

Player.prototype = {
	addCard: function(card){
		(this.cards).push(card);
	},
	sortHand: function(trumpSuit, trumpNum){
		//eh.. idk if needed we'll see
		var hearts = [];
		var spades = [];
		var diamonds = [];
		var clubs = [];
		var trump = [];
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
	},
	sortSuit: function sortSuit(cardArray, isTrump=false, trumpSuit=null){
		//probably merge sort
		//possibly unneeded? If cards dealt one at a time sort/insert that card object one at a time, sequentially
		//^ might need for trump e.g trump suit = clubs flip to hearts. Or allow for manual moving of cards
		// and add a sort button.
		//possibly just define within sortHand to scope as a helper method?
		return cardArray
	}
}

	
