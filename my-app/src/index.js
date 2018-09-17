import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// render在class 类继承的构造函数中至少有一个

// class Square extends React.Component {
//     // constructor(){
//     //   super();
//     //   this.state = {
//     //     value:null
//     //   }
//     // }
//     render() {
//       return (
//         // 这个子组件不拥有自己的状态数据，点击该组件，通知父组件来改变然后再将改变后的数据通过props传递回来
//         <button className="square" onClick={()=>this.props.onClic()}>
//          {this.props.value}
//         </button>
//       );
//     }
//   }

  //对于只含render方法的组件可以简化为下面的写法
  function Square(props){
         return (
          <button className="square" onClick={props.onClic}>
                  {props.value}
               </button>   
         )
  }

  class Board extends React.Component {
    constructor(){
        super();
// 定义初始状态
        this.state = {
              squares:Array(9).fill(null),
              xIsNext:true
        }
    }
// 对状态进行修改
    handleClick(i){
      // 我们使用了 .slice() 方法来将之前的数组数据浅拷贝到了一个新的数组中，而不是修改已有的数组
      // 不改变已有的数据内容可以让我们在需要的时候随时切换回历史数据。
      const squares = this.state.squares.slice();
      if(calculateWinner(squares)||squares[i]){  //  已经落子或者有一方已经获胜
         return  
      }

      squares[i] = this.state.xIsNext?'X':'O'
      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext
      })
 }
// 状态渲染在特定组件
    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClic={()=>this.handleClick(i)} />;
    }
    // 子组件上绑定事件/函数的事件名是可以随意定义的，只要它不是最终级
// 对渲染状态的组件的复用
    render() {
      const winner = calculateWinner(this.state.squares);
      let status ;
      if(winner){
           status = 'winner:' + winner;
      }else{
           status = 'Next player:' + (this.state.xIsNext?'X':'O');  
      }

     
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
        {/* 如何获取组件中定义的子组件 */}
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
          {/* 对含有子组件的Board组件使用 */}
            <Board />   
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares){
        const lines = [
             [0,1,2],
             [3,4,5],
             [6,7,8],
             [0,3,6],
             [1,4,7],
             [2,5,8],
             [0,4,8],
             [2,4,6]
        ];
        for(let i=0;i<lines.length;i++){
             const [a,b,c] = lines[i];
             if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
                  return squares[a];  //结束，不会执行后面的return null；
             }
        }
        return null

  }
  
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  