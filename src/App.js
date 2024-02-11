import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [maximum, setMaximum] = useState(100);
  const [myNumbers, setMyNumbers] = useState([]);
  const [myStarNumbers, setMyStarNumbers] = useState([]);
  const [dimention, setDimention] = useState(0);
  const [btnNumbers, setBtnNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(0);

  function populate() {
    let compArray = [];
    let d = Math.ceil(Math.sqrt(maximum));
    setDimention(d);
    for (let i = 0; i < d; i++) {
      let newArray = [];
      for (let j = 0; j < d; j++) {
        let x = i * d + j + 1;
        newArray.push(x <= maximum ? x : '-');
      }
      compArray.push(newArray);
    }
    setNumbers(compArray);
    let btn = [];
    for (let k = 0; k < d; k++) {
      btn.push(k + 1);
    }
    setBtnNumbers(btn);
  }

  function rotateRow(row) {
    console.log('Rotating row: ' + row);
    const gridList = [...numbers];
    const x = gridList[row - 1].shift();
    gridList[row - 1].push(x);
    setNumbers(gridList);
  }

  function rotateColumn(col) {
    console.log('Rotating column: ' + col);
    const gridList = [...numbers];
    const numRows = gridList.length;

    for (let i = 0; i < numRows; i++) {
      let temp = gridList[i][col - 1];
      let nextRowIndex = (i + 1) % numRows;
      gridList[i][col - 1] = gridList[nextRowIndex][col - 1];
      gridList[nextRowIndex][col - 1] = temp;
    }
    setNumbers(gridList);
  }

  function selectNumber() {
    const x = Math.floor(Math.random() * maximum) + 1;
    const i = Math.floor(x / dimention);
    const j = x % dimention;
    while (numbers[i][j] === '-') {
      const newX = Math.floor(Math.random() * maximum) + 1;
      const newI = Math.floor(newX / dimention);
      const newJ = newX % dimention;
	  // eslint-disable-next-line
      i = newI;
	  // eslint-disable-next-line
      j = newJ;
    }
    setSelectedNumber(numbers[i][j]);
  }

  const styles = { display: 'grid', gridTemplateColumns: `repeat(${dimention + 1}, 1fr)` };
  const difStyle = { backgroundColor: 'blue', fontWeight: 'bold', color: 'white' };

  return (
    <div className="App">
		<div className="sp">
			<label>Maximum (Included):</label>
			<input type="number" value={maximum} onChange={e=>setMaximum(e.target.value)}/>
			<button onClick={populate}>generate</button>
		</div>
		<hr/>
		<div>
			<div style={styles}>
				<h4>G</h4>
				{btnNumbers.map((item,id)=><button onClick={()=>rotateColumn(item)}>C{item}</button>)}
			</div>
				{numbers.map((item,id)=><div style={styles}><div><button onClick={()=>rotateRow(id+1)}>R{id+1}</button></div>{item.map((item,id)=>{return item===selectedNumber?<p style={difStyle}>{item}</p>:<p>{item}</p>})}</div>)}
			</div>
		<hr/>
		<div className="spsh">
		{myNumbers.map((item,id)=><span>{item}</span>)}{myStarNumbers.map((item,id)=><span className='sps'>{item}</span>)}
		</div>
		<div className="sp">
			<button onClick={selectNumber}>find</button>
			<button onClick={()=>{setMyNumbers([]);setMyStarNumbers([]);}}>reset</button>
			<button onClick={()=>setMyNumbers(prev=>{
				const p = [...prev];
				if(selectedNumber && !p.includes(selectedNumber)){
					p.push(selectedNumber);
				}
				p.sort((a, b) => a - b);
				return p;
			})}>add normal</button>
			
			<button onClick={()=>setMyStarNumbers(prev=>{
				const p = [...prev];
				if(selectedNumber && !p.includes(selectedNumber)){
					p.push(selectedNumber);
				}
				p.sort((a, b) => a - b);
				return p;
			})}>add star</button>
		</div>
		
	</div>
  );
}

export default App;
