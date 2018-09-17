import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// render在class 类继承的构造函数中至少有一个

class Square extends React.Component {
    // constructor(){
    //   super();
    //   this.state = {
    //     value:null
    //   }
    // }
    render() {
      return (
        // 这个子组件不拥有自己的状态数据，点击该组件，通知父组件来改变然后再将改变后的数据通过props传递回来
        <button className="square" onClick={()=>this.props.onClic()}>
         {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(){
        super();
// 定义初始状态
        this.state = {
              squares:Array(9).fill(null)
        }
    }
// 对状态进行修改
    handleClick(i){
      // 我们使用了 .slice() 方法来将之前的数组数据浅拷贝到了一个新的数组中，而不是修改已有的数组
      const squares = this.state.squares.slice();
      squares[i] = '山竹'
      this.setState({squares:squares})
 }
// 状态渲染在特定组件
    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClic={()=>this.handleClick(i)} />;
    }
    // 子组件上绑定事件/函数的事件名是可以随意定义的，只要它不是最终级
// 对渲染状态的组件的复用
    render() {
      const status = 'Next player: X';
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
  
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  