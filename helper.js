let arr = "grid";
let arrSuffix = "[DATA]";

for(let i = 0; i < 3; i++){
    // console.log(`(${arr}[0][${i}]${arrSuffix} == ${arr}[1][${i}]${arrSuffix} == ${arr}[2][${i}]${arrSuffix})`);
    //columns
    for (let ii = 0; ii < 3; ii++){
        let string = arr + "[" + ii + "][" + i + "]" + arrSuffix;
        console.log(string);
    }
}



/*
(grid[0][0][DATA] === grid[0][1][DATA] === grid[0][2][DATA]),
(grid[1][0][DATA] === grid[1][1][DATA] === grid[1][2][DATA]),
(grid[2][0][DATA] === grid[2][1][DATA] === grid[2][2][DATA]),
(grid[0][0][DATA] === grid[1][0][DATA] === grid[2][0][DATA]),
(grid[0][1][DATA] === grid[1][1][DATA] === grid[2][1][DATA]),
(grid[0][2][DATA] === grid[1][2][DATA] === grid[2][2][DATA]),
(grid[0][0][DATA] === grid[1][1][DATA] === grid[2][2][DATA]),
(grid[0][2][DATA] === grid[1][1][DATA] === grid[2][0][DATA])


(grid[0][0][DATA] == grid[0][1][DATA] == grid[0][2][DATA])//top
(grid[1][0][DATA] == grid[1][1][DATA] == grid[1][2][DATA])//mid horz
(grid[2][0][DATA] == grid[2][1][DATA] == grid[2][2][DATA])//bottomo
(grid[0][0][DATA] == grid[1][0][DATA] == grid[2][0][DATA])//left
(grid[0][1][DATA] == grid[1][1][DATA] == grid[2][1][DATA])//mid vert
(grid[0][2][DATA] == grid[1][2][DATA] == grid[2][2][DATA])//right
(grid[0][0][DATA] == grid[1][1][DATA] == grid[2][2][DATA])//cross slope neg
(grid[0][2][DATA] == grid[1][1][DATA] == grid[2][0][DATA])//cross slope poz

[[5,10,55,10],[5,30,55,30],[5,50,55,5],[10,5,10,55],[30,5,30,55],[50,5,50,55],[5,5,55,55],[5,55,55,5]]
[top, mid horz, bottomo, left, mid vert, right, cross slope neg, cross slope poz]
[x1,y1,x2,y2]

check winner
[0,1,2,0,1,2,1,1]
    use:
        let arr = [0,1,2,0,1,2,1,1]
        let checkIndex = arr[all indecies where winner array is true];
        console.log("winner is:");
        console.log(grid[checkIndex][checkIndex][DATA]);

*/