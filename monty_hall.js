var win=0,prizeDoor,selection,doors=3,iterations=1000,strategy="a"; //'a' for always switch, 'n' for never switch
var gameChoices=[1,2,3];
var debugToConsole=false;
/*
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Press \'a\' for always switch or \'n\' for never switch. ", function(answer) {
	// TODO: Log the answer in a database
	if(answer=='a'){
		console.log("You've selected to \'"+answer+"\', to always switch.");
	} else if(answer=='n') {
		console.log("You've selected to \'"+answer+"\', to never switch.");
	} else {
		answer = 'a';
		console.log("Incorrect selection, \'"+answer+"\' selected by default; to always switch.");
	}
	rl.close();
});
*/

function playGame(strategy,prizeDoor,selection,gameChoices){
	var min=1,max=doors+1;
	var showDoor=gameChoices.slice();
	var choices=gameChoices.slice();
	
	/* Contestant makes Initial Selection */
	selection=Math.floor(Math.random() * (max - min)) + min;
	if (debugToConsole){console.log("selection="+selection);}
	
	/* Monty hall shows the door that does not match the selection or the prize */
	//Monty Hall must show a door that is not the contestants selection
	var index = showDoor.indexOf(selection);
	if (index > -1){
		showDoor.splice(index,1);
	}
	//Monty Hall must show a door that is not the prize door
	index = showDoor.indexOf(prizeDoor);
	if (index > -1){
		showDoor.splice(index,1);
	}
	if (debugToConsole){console.log('showDoor=');	console.log(showDoor);	}
	
	if(showDoor.length>1){
		//monty hall must show one of two doors because the contestant chose the winning door
		min=1;
		max=doors;
		//new random selection of which door to show eliminating it from the choices
		index = choices.indexOf(showDoor[Math.floor((Math.random() * (max - min)) + min)]);
		if (index > -1){
			choices.splice(index,1);
		}
		if (debugToConsole){ console.log('choices=');		console.log(choices);	}
	} else {
		//monty hall must show the only remaining door because the contestant chose a door which is not the prize
		index = choices.indexOf(showDoor[0]);
		if (index > -1){
			choices.splice(index,1);
		}
		if (debugToConsole){ console.log('choices=');		console.log(choices);	}
	}
	//console.log("show goat behind door "+choices);
	
	/* Contestant employs strategy to switch or not to switch to the only available selection */

	if (strategy=='a'){
		/* switch strategy */
		//contestant must switch by selecting the only door that is not the goat door or the previous selection
		index = choices.indexOf(selection);
		if (index > -1){
			choices.splice(index,1);
		} //new selection
		selection = choices[0];
		
		//test winning
		if(prizeDoor==selection){
			if (debugToConsole){ console.log('strategy: win switch');	}
			return 1; //increment win by 1
		} else{
			return 0; //do not increment win
		}
		
	} else {
		/* no switch strategy */
		//contestant keeps the original door selection
		//test winning
		if(prizeDoor==selection){
			if (debugToConsole){ console.log('strategy: no switch');	}
			return 1; //increment win by 1
		} else{
			return 0; //do not increment win
		}
	}
}

for(var i=0;i<iterations;i++){
//for(var i=0;i<1;i++){
	var min=1,max=doors+1;
	prizeDoor=Math.floor(Math.random() * (max - min)) + min;
	if(prizeDoor<1||prizeDoor>3){
		//console.log("prizeDoor="+prizeDoor);
	} else {
		//console.log(strategy);
		//console.log("prizeDoor="+prizeDoor);
		win+=playGame(strategy,prizeDoor,selection,gameChoices);
	}
}

if (strategy=='a'){
	str = "switch strategies";
} else {
	str = "no-switch strategies";
}
console.log("\n");
console.log("The Monty Hall contestants\nwon "+win+" games ("+Math.round((win/iterations)*1000)/10+"%) and\nlost "+(iterations-win)+" games ("+Math.round(((iterations-win)/iterations)*1000)/10+"%) of the\n"+iterations+" "+str+" played.");
console.log("\n");