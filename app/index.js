var Button = require('react-bootstrap/lib/Button');
var Col = require('react-bootstrap/lib/Col');
//var Panel = require('react-bootstrap/lib/Panel');
//var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var marked = require('marked');
console.log(marked('I am using __markdown__.'));
marked.setOptions({
  sanitize: true
});


class Viewer extends React.Component {
	render () {
		return (<div>
		<Col lg={1} md={1} sm={12} />
			<Col lg={5} md={5} sm={12}>					
		<h2>Markdown Viewer</h2>
		<p>Replace the text below and see it formatted live</p>
		<br />
		<InputBox />
		</Col>
			<Col lg={5} md={5} sm={12}>
		<h2>Tic-Tac-Toe</h2>
		<p>Click each button to make your move.</p>
		<br /><Game />
		</Col>	
		<Col lg={1} md={1} sm={12} />

	
		
		</div>)
	}
}

class InputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {typed: '**Welcome** to the *markdown viewer!* \n * Markdown will be properly formatted \n * Even [a link](example.com)! \n *  Try it out!'};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange (event){
		this.setState({typed: event.target.value})
	}
	render () {
		return (<div>
		
			
			<textarea style={{height:160, width:320,borderRadius:10,padding: 12}} type="text" onChange={this.handleChange} value={this.state.typed}/>
			<br />
			<div style={{background:"#d3d3d3",height:160, width:320,borderRadius:10, borderWidth: 20, padding:12}} dangerouslySetInnerHTML={{__html: marked(this.state.typed)}}>
      </div><br />
      	<div style={{background:"#d3d3d3",height:160, width:320,borderRadius:10, borderWidth: 2, padding:12}}>
			<p>Sample Markdown:</p>
			<p>**Welcome** to the *markdown viewer!*</p>
			<p>* Markdown will be properly formatted</p>
			<p>* Even [a link](example.com)! </p>
			<p>* Try it out!</p>
			</div>
      </div>)
	}
}






function Square(props) {
  if (props.value === null)
  	{return (
    <Button style={{padding: 46, margin:6}} bsSize="large" className="square" onClick={() => props.onClick()}>
      {""}
    </Button>
  )}
  else if (props.value === 'X')	{ 
  	return (
    <Button style={{padding: 40, margin:6}} bsSize="large" bsStyle="danger" className="square" onClick={() => props.onClick()}>
      {props.value}
    </Button>
  )}
  	else if (props.value === 'O')	{ 
  	return (
    <Button style={{padding: 40, margin:6}} bsSize="large" bsStyle="primary" className="square" onClick={() => props.onClick()}>
      {props.value}
    </Button>
  )}
}


class Board extends React.Component {
  
 renderSquare(i) {
  	return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;

  }
  render() {

    return (
      <div>
        <div className="board-row">
       
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          
          </div>
        <div className="board-row">
     
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
       
        </div>
        <div className="board-row">
      
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        
        </div>
             </div>
    );
  }
}

class Game extends React.Component {
	constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i) {
  const history = this.state.history;
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      squares: squares
    }]),
    xIsNext: !this.state.xIsNext,
    stepNumber: history.length

  });
}
  handleReset () {
  	this.setState({
  		  history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
  	})
  }
jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) ? false : true,
  });
}
  render() {

  	const history = this.state.history;
const current = history[this.state.stepNumber];
const winner = calculateWinner(current.squares);
let status;
if (winner) {
  status = winner + " HAS WON THE GAME!!!";
} else if (history.length == 10) {
	status = 'DRAW. Game Over.';
}
else {
  status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
};
  	const moves = history.map((step, move) => {
  const desc = move ?
    'Move #' + move :
    'Game start';
  return (
    <li key={move}>
      <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
    </li>
  );
});
    return (
      <div className="game">
              <div className="reset button"><ResetButton onClick = {() => this.handleReset()}/></div>

      <div>{status}</div>
        <div className="game-board">
          <Board
    squares={current.squares}
    onClick={(i) => this.handleClick(i)}
  />
        </div>
        <div className="game-info">
          <div >Game moves history:</div>
          <ol >{moves}</ol>
        </div>
      </div>
    );
  }
}

class ResetButton extends React.Component {
	render () {
		return <Button bsSize="large" bsStyle="warning" onClick={() => this.props.onClick()}>Reset</Button>
	}
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Viewer />,document.getElementById('app'));
