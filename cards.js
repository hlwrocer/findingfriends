//deck constructor
function deck(){
	this.names = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
	this.suits = ['H','C','D','S'];
	var cards = [];
	
	//gen 52 suited cards
	for (var suit = 0; suit < this.suits.length; suit++){
		for (var name = 0; name < this.names.length; name++){
			cards.push( new card(name+1,names[name], suit);
		}
	}
	
	//two jokers
	cards.push(new card (14, 'SJ', 'Joker'));
	cards.push(new card (15, 'BJ', 'Joker'));
	
	return cards
}

//card constructor
//for jokers, value - 15 big 14 small name = SJ/BJ, suit = Joker
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//combines two of any length
function joinDecks(deck1, deck2){
	var newdeck = [];
	for (card = 0; card < deck1.length; card++){
		newdeck.push(deck1[card]);
	}
	
	for (card = 0; card < deck2.length; card++){
		newdeck.push(deck2[card]);
	}
	
	return newdeck;
}

//generate a number from 0 to hi [0,hi);
function genWholeRand(hi){
	return Math.floor(Math.random() * (hi));
}

function concatArrays(arr1, arr2){
	for (item = 0; item < arr2.length; item++){
		arr1.push(arr2[item]);
	}

	return arr1;
}

//delete item at position from array;
function deleteItem(pos, arr){
	if (pos < 0){
		return -1;
	}
	else if(pos >= arr.length){
		return -1;
	}
	else{
		var tmp1 = arr.splice(0,pos);
		var tmp2 = arr.splice(pos+1,arr.length);
		return concatArrays(tmp1,tmp2);
	}
}

//simulate shuffling a deck numtimes times
function shuffleDeck(deck, numtimes){
	if (numtimes == 0){
		return deck;
	}
	else if (numtimes-1 >= 1){
		var shuffledDeck = [];
		var deckLength = deck.length; //make sure original deckLength is static
		for (card = 0; card < deckLength; card++){
			var pos = genWholeRand(deck.length);
			shuffledDeck.push(deck[pos]);
			deck = deleteItem(pos, deck);
		}
		return shuffleDeck(shuffledDeck, numtimes-1);
	}
}