//generate a number from 0 to hi [0,hi);
function genWholeRand(hi){
	return Math.floor(Math.random() * (hi));
}

//card object
//for jokers, value - 16 big 15 small name = SJ/BJ, suit = Joker, Ace = 14
function Card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//deck object
function Deck(){

	this.cards = (function(){
		var names = ['2','3','4','5','6','7','8','9','10','J','Q','K', 'A'];
		var suits = ['H','C','D','S'];
		var cards = [];
		//gen 52 suited cards
		for (var suit = 0; suit < suits.length; suit++){
			for (var name = 0; name < names.length; name++){
				cards.push( new Card(name+2,names[name], suits[suit]));
			}
		}
		
		//two jokers
		cards.push(new Card (15, 'SJ', 'Joker'));
		cards.push(new Card (16, 'BJ', 'Joker'));
		
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
		var merge = function(arr1, arr2){
			var mergeArr = [];
			while (arr1.length && arr2.length){
				if arr1[0]. <= arr2[0]{
					mergeArr.push(arr1[0].shift());	
				}
				else{
					mergeArr.push(arr2[0].shift());
				}
			}
			while(arr1.length){
				mergeArr.push(arr1[0].shift());	
			}
			
			while(arr2.length){
			      mergeArr.push(arr2[0].shift());
			}
			
			return mergeArr;
		};
		var sortSuit = function(cards, isTrump=false, trumpSuit=null){
			//probably merge sort for not trump.
			//possibly unneeded? If cards dealt one at a time sort/insert that card object one at a time, sequentially
			//^ might need for trump e.g trump suit = clubs flip to hearts. Or allow for manual moving of cards
			// and add a sort button. probably the latter
			if (isTrump){
				//TODO
				return cards;
			}
			else{
				if (cards.length < 2){
					return cards
				}
				else{
					var left = cards.splice(0,Math.floor(cards.length/2));
					return merge(sortSuit(left), sortSuit(cards));
				}
			}
		}
		//sort into suits
		for (var card = 0; card < (this.cards).length; card++){
			if (card.suit === "c" && card.value !== trumpNum){
				clubs.push(card);
			}
			else if (card.suit === "d" && card.value !== trumpNum){
				diamonds.push(card);
			}
			else if (card.suit === "s" && card.value !== trumpNum){
				spades.push(card);
			}
			else if (card.suit === "h" && card.value !== trumpNum){
				hearts.push(card);
			}
			else{
				trump.push(card);	
			}
		}
		clubs = sortSuit(clubs);
		hearts = sortSuit(hearts);
		diamonds = sortSuit(diamonds);
		spades = sortSuit(spades);
		trump = sortSuit(trump);
		
		if (trumpSuit === 'h'){
			this.cards = [].concat(clubs,diamonds,spades,hearts,trump);
		}
		else if (trumpSuit === 'c'){
			this.cards = [].concat(hearts,spades,diamonds,clubs,trump);
		}
		else if (trumpSuit === 'd'){
			this.cards = [].concat(spades,hearts,clubs,diamonds,trump);
		}
		else{
			this.cards = [].concat(diamonds,clubs,hearts,spades,trump);
		}
		
	}
}

function evalCards(cards){
	//input: array of card objects
	//evaluates what was played, e.g is it a pair idk how to describe this
	//to be placed somewhere, not exactly sure yet, need to do ui and figure this out.
	//played cards must be playable, have player's playCard function handle this. E.g you cannot throw ace and 4 of hearts if you have another heart somewhere, however you can try and throw all of them (shuai)
	//idk figure this out later not entirely sure how to structure yet without server client code
}
