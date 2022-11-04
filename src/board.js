import './board.css';
import Tile from "./Tile";
import React, { useState, useEffect} from "react";

export default function Board(){ //callback(x,y)

    var grid = [[useState(null),useState(null),useState(null)],[useState(null),useState(null),useState(null)],[useState(null),useState(null),useState(null)]];

	const [turn, setTurn] = useState(1); // turn = 1,2
	const [settings, setSettings] = useState({players: ["X","O"]});

	const enumGAMESTATES = {PLAYING : true, GAMEOVER : false};

	const [lines, setLines] = useState();
	const [winnerChar, setWinnerChar] = useState("?");
	const [gamestate, setGamestate] = useState(enumGAMESTATES.PLAYING);

	const DATA = 0;
	const SETDATA = 1;

	function reset(){
		for(let i = 0; i < 3; i++){
			for(let ii = 0; ii < 3; ii++){
				grid[i][ii][SETDATA](null); //causes many renders :)
			}
		}
		setTurn(1);
		setLines(undefined);
		setWinnerChar("?");
		setGamestate(enumGAMESTATES.PLAYING);
	}

	function passTurn(){
		// setTimeout(checkWinner, 10);
		setTurn(curr => 3 - curr); //use math to toggle between 1 and 2
	}

	
	
	useEffect(checkWinner, [grid[0][0][DATA],grid[1][0][DATA],grid[2][0][DATA],grid[0][1][DATA],grid[1][1][DATA],grid[2][1][DATA],grid[0][2][DATA],grid[1][2][DATA],grid[2][2][DATA]]);
	function checkWinner(){
		console.groupCollapsed("checkWinner");
		let winners = [
			(grid[0][0][DATA] === grid[0][1][DATA] && grid[0][1][DATA] === grid[0][2][DATA] && grid[0][2][DATA] != null),
			(grid[1][0][DATA] === grid[1][1][DATA] && grid[1][1][DATA] === grid[1][2][DATA] && grid[1][2][DATA] != null),
			(grid[2][0][DATA] === grid[2][1][DATA] && grid[2][1][DATA] === grid[2][2][DATA] && grid[2][2][DATA] != null),
			(grid[0][0][DATA] === grid[1][0][DATA] && grid[1][0][DATA] === grid[2][0][DATA] && grid[2][0][DATA] != null),
			(grid[0][1][DATA] === grid[1][1][DATA] && grid[1][1][DATA] === grid[2][1][DATA] && grid[2][1][DATA] != null),
			(grid[0][2][DATA] === grid[1][2][DATA] && grid[1][2][DATA] === grid[2][2][DATA] && grid[2][2][DATA] != null),
			(grid[0][0][DATA] === grid[1][1][DATA] && grid[1][1][DATA] === grid[2][2][DATA] && grid[2][2][DATA] != null),
			(grid[0][2][DATA] === grid[1][1][DATA] && grid[1][1][DATA] === grid[2][0][DATA] && grid[2][0][DATA] != null)];
			console.log(winners);
		//produces a bool array of length 6, true if winner on line\
		//[top, mid horz, bottomo, left, mid vert, right, cross slope neg, cross slope poz]

		winners = winners.map((val,index) => (val ? index : -1)); //map to -1 if false else index
			console.log(winners);

		winners = winners.filter((item) => item > -1);
		//CHANGES LENGTH to only inclue the indicies of winners
			console.log(winners);
		
		if(winners.length == 0){
			//no winners keep it moving!!!
			console.log("no Winners");
			console.groupEnd("checkWinner");
			return;
		}

		//ok somebody one
		setGamestate(enumGAMESTATES.GAMEOVER);

		//who?
			console.groupCollapsed("winnerChar");
			console.log(winners[0]);
			console.log(settings.players);
		const indexToCheckWhoWon = [0,1,2,0,1,2,1,1][winners[0]];
			console.log(indexToCheckWhoWon);
			console.log(grid[indexToCheckWhoWon][indexToCheckWhoWon][DATA]);
		const winnerCharTemp = settings.players[grid[indexToCheckWhoWon][indexToCheckWhoWon][DATA] -1];
			console.log(winnerCharTemp);
			console.groupEnd("winnerChar");
		setWinnerChar(winnerCharTemp);
		console.log("winner: " + winnerCharTemp);


		//where?
		//ok now show that to players
		//svg lines
		console.group("cords");
		const linesJsx = winners.map((index) =>{
			//[[5,10,55,10],[5,30,55,30],[5,50,55,5],[10,5,10,55],[30,5,30,55],[50,5,50,55],[5,5,55,55],[5,55,55,5]]
			//[x1,y1,x2,y2]
			let cords = (
					[[5,10,55,10],[5,30,55,30],[5,50,55,50],[10,5,10,55],[30,5,30,55],[50,5,50,55],[5,5,55,55],[5,55,55,5]]
				)[index];
			console.log(cords);
			return (<line x1={cords[0]} y1={cords[1]} x2={cords[2]} y2={cords[3]} />);
		});
		console.groupEnd("cords");
		setLines(linesJsx);


		console.groupEnd("checkWinner");
	}




    //grid = [row, row, row]
    //row = [col, col, col]
    //col/data = null,1,2}

    let jsx = grid.map((row, index) => {
        let jsx_meta = row.map((col, iindex) =>{
            return (
                <td><Tile disabled={gamestate == enumGAMESTATES.GAMEOVER} passTurn={passTurn} turn={turn} settings={settings} data={col[DATA]} setData={col[SETDATA]} /></td>
            );
        });
		return (
			<tr>{jsx_meta}</tr>
		);
    });

	// console.table(grid);


	let title = (gamestate == enumGAMESTATES.GAMEOVER) ? "Win:" + winnerChar : "Turn:" + settings.players[turn - 1];


	return (
		<div className='ttt'>
			<table>
				<thead>
					<tr><th colSpan="3">
						<h2>{title}</h2>
					</th></tr>
				</thead>
				<tbody>
					{jsx}
					<svg  preserveAspectRatio="none" viewBox="0 0 60 60" strokeLinecap='round' xmlns="http://www.w3.org/2000/svg">
						{lines};
					</svg>
				</tbody>
				<tfoot>
					<tr><td colSpan="3">
						<button onClick={reset}>Reset</button>
					</td></tr>
				</tfoot>
			</table>
		</div>
	);


}