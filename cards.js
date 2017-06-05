//generate a number from 0 to hi [0,hi);
function genWholeRand(hi){
	return Math.floor(Math.random() * (hi));
}

//card constructor
//for jokers, value - 15 big 14 small name = SJ/BJ, suit = Joker
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//deck constructor
function deck(){

	this.create = function(){
		var names = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
		var suits = ['H','C','D','S'];
		var cards = [];
		//gen 52 suited cards
		for (var suit = 0; suit < suits.length; suit++){
			for (var name = 0; name < names.length; name++){
				cards.push( new card(name+1,names[name], suits[suit]));
			}
		}
		
		//two jokers
		cards.push(new card (14, 'SJ', 'Joker'));
		cards.push(new card (15, 'BJ', 'Joker'));
		
		return cards
	}
	
	this.cards = this.create(); //initialize deck to be 54 cards
	
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

function game(numPlayers, numDecks){
//other things tbd
	this.numPlayers = numPlayers;	
	this.curPlayers = 0;
	this.players = [];
	this.deck = new deck();

	for (var deck = 1; deck < numDecks; deck++){
		(this.deck).join(new deck());	
	}

	function addPlayer(playerName){
		this.curPlayers++;
		(this.players).push(new player(playerName));
	}


}

function player(name){
	this.score = 2;
	this.playerName = name;
	this.cards = [];

	function sortHand(){

	}
}
