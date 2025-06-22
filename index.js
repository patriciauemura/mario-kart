const player1 = {
    name: 'Mario',
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
};

const player2 = {
    name: 'Luigi',
    speed: 3,
    maneuverability: 4,
    power: 3,
    points: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRamdomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "LINE"
            break;
        case random < 0.66:
            result = "CURVE"
            break;
        default:
            result = "CONFRONT"
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName}🎲 rolls a dice of ${block} ${diceResult} + attribute ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Round ${round}`);

        let block = await getRamdomBlock();
        console.log(`Block: ${block}`);
        

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if(block === "LINE"){
            totalTestSkill1 = character1.speed + diceResult1;
            totalTestSkill2 = character2.speed + diceResult2;

            await logRollResult(character1.name, 'speed', diceResult1, character1.speed);
            await logRollResult(character2.name, 'speed', diceResult2, character2.speed);
        }   
        if(block === "CURVE"){
            totalTestSkill1 = character1.maneuverability + diceResult1;
            totalTestSkill2 = character2.maneuverability + diceResult2;
            await logRollResult(character1.name, 'maneuverability', diceResult1, character1.maneuverability);
            await logRollResult(character2.name, 'maneuverability', diceResult2, character2.maneuverability);
        }   
        if(block === "CONFRONT"){
            totalTestSkill1 = character1.power + diceResult1;
            totalTestSkill2 = character2.power + diceResult2;

            console.log(`⚔️  ${character1.name} and ${character2.name} are in a confrontation!`);

            await logRollResult(character1.name, 'power', diceResult1, character1.power);
            await logRollResult(character2.name, 'power', diceResult2, character2.power);

            
            if(totalTestSkill1 > totalTestSkill2 && character2.points > 0){
                character2.points -= 1;
                console.log(`${character1.name} wins the confrontation! 🏆 ${character2.name} loses 1 point! 🐢`);
            } 
            if(totalTestSkill1 < totalTestSkill2 && character1.points > 0){
                character1.points -= 1;
                console.log(`${character2.name} wins the confrontation! 🏆${character1.name} loses 1 point! 🐢`);
            }
            
            console.log(totalTestSkill1 === totalTestSkill2 ? `⚔️ It's a tie in the confrontation! 🤝` : "");
        
        } 
        
        // Determine the winner of the round
        if(totalTestSkill1 > totalTestSkill2){
            character1.points++;
            console.log(`${character1.name} wins this round! 🏆`);
        } else if(totalTestSkill2 > totalTestSkill1){
            character2.points++;
            console.log(`${character2.name} wins this round! 🏆`);
        } else {
            console.log(`It's a tie! 🤝`);
        }
        

        
        console.log('--------------------------');
    } 
}

async function declareWinner(character1, character2) {
    console.log(`🏁🏁 Final Results: 🏁🏁`);
    console.log(`${character1.name}: ${character1.points} points`);
    console.log(`${character2.name} : ${character2.points} points`);

    if(character1.points > character2.points){
        console.log(`🎉🏆 ${character1.name} is the winner! 🏆🎉`)
    } else if(character2.points > character1.points){
        console.log(`🎉🏆 ${character2.name} is the winner! 🏆🎉`)
    } else {
        console.log(`It's a tie! 🤝`);
    }
}


(async function main() {
    console.log(`🏁 Race between ${player1.name} and ${player2.name} starting... 🏁 \n`)

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();



