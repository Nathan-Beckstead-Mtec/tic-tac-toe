export default function Tile({disabled,passTurn, turn, settings = {players: ["X","O"]}, data, setData}){
    //grid = [row, row, row]
    //row = [col, col, col]
    //col/data = null,1,2}


    if (data === null){
        if(disabled){
            // return;
            return (<p className="nullcell">&bull;</p>);
        }
        
        
        
        //button
        function click(){
            setData(turn);
            passTurn();
        }
        let turnString = settings.players[turn - 1];

        //this line is actually not what i wanted because im using a css transition to hide the text
        //but the code is cool and might be usefull as refrence later
        //onMouseEnter={(e) => {e.target.textContent=turnString;}} onMouseLeave={(e) => {e.target.textContent=" ";}
        return (
            <button onClick={click} >{turnString}</button>
        );
    }
    //else display player who clicked me
    return (
        <p>{settings.players[data - 1]}</p>
    );
}