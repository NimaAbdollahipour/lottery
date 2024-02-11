import './App.css';
import {useState} from 'react'

function App() {
	const [numbers, setNumbers] = useState([])
	const [maximum, setMaximum] = useState([])
	const [myNumbers, setMyNumbers] = useState([])
	const [myStarNumbers, setMyStarNumbers] = useState([])
	const [dimention, setDimention] = useState()
	const [btnNumbers, setBtnNumbers] = useState([])
	const [selectedNumber, setSelectedNumber] = useState(0)
	function populate(){
		let compArray = [];
		let d = Math.ceil(Math.sqrt(maximum));
		setDimention(d);
		for(let i=0; i<d; i++){
			let newArray = [];
			for(let j=0; j<d; j++){
				let x = i*d+j+1;
				newArray.push(x<=maximum?x:'-');
			}
			compArray.push(newArray)
		}
		setNumbers(compArray);
		let btn = []
		for(let k=0;k<d;k++){
			btn.push(k+1);
		}
		setBtnNumbers(btn);
	}
	
	function rotateRow(row){
		console.log('rotating row: ' + row)
		const gridList = [...numbers];
		const x = gridList[row-1].shift()
		gridList[row-1].push(x);
		setNumbers(gridList);
	}
	
	function rotateColumn(col){
		console.log('rotating column: ' + col);
		const gridList = [...numbers];
		const numRows = gridList.length;

		for(let i = 0; i < numRows; i++){
			let temp = gridList[i][col - 1];
			let nextRowIndex = (i + 1) % numRows; // Calculate the index of the next row, wrapping around if necessary
			gridList[i][col - 1] = gridList[nextRowIndex][col - 1];
			gridList[nextRowIndex][col - 1] = temp;
		}
		setNumbers(gridList);
	}

	function selectNumber() {
		const x = Math.floor(Math.random() * maximum) + 1;
		const i = Math.floor(x/dimention);
		const j = x%dimention;
		setSelectedNumber(numbers[i][j]);
	}


	
	const styles={display:'grid', gridTemplateColumns:`repeat(${dimention+1},1fr)`};
	const difStyle={backgroundColor:'blue', fontWeight:'bold', color:'white'};
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
				<h4>GRID</h4>
				{btnNumbers.map((item,id)=><button onClick={()=>rotateColumn(item)}>RC{item}</button>)}
			</div>
				{numbers.map((item,id)=><div style={styles}><div><button onClick={()=>rotateRow(id+1)}>RR {id+1}</button></div>{item.map((item,id)=>{return item===selectedNumber?<p style={difStyle}>{item}</p>:<p>{item}</p>})}</div>)}
			</div>
		<hr/>
		<div className="sp">
		{myNumbers.map((item,id)=><span>{item}</span>)}{myStarNumbers.map((item,id)=><span className='sps'>{item}</span>)}
		</div>
		<div className="sp">
			<button onClick={selectNumber}>find</button>
			
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
			
			<button onClick={()=>{setMyNumbers([]);setMyStarNumbers([]);}}>reset</button>
		</div>
		
	</div>
  );
}

export default App;
