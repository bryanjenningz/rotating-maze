import React, { Component } from 'react';
import './App.css';

const maze = `
#############################
  #      #         #        #
# # #### # ####### # ###### #
# ###  # # #         #      #
#   # ##   # ######### ######
# # # #  # # #              #
# #     #  # # ############ #
# ####### #    #            #
#       # # #### ############
######### # # #   #         #
#         #   ### # ####### #
# ############# #   #       #
#               # ### #######
################# #         #
#                 # #########
################# #         #
#                 ######### #
###################         #
#                  ######## #
############# ####          #
#             #    ##########
# #################         #
#     #   #   #     ####### #
##### # # # # # #####   # # #
#       # # #    #    #   # #
# ####### # #### #### ##### #
# #     #   #       #       #
# # ### ### # ##### #########
#   #   #   # #             @
#############################
`;

const Maze = ({ maze, x, y, rotation }) => (
  <div className="maze" style={{ transform: `rotate(${rotation * 360}deg)`}}>
    {maze.map((row, i) => (
      <div key={i} className="row">
        {row.map((char, j) => (
          <div
            key={j}
            className={`box ${x === j && y === i
              ? 'player'
              : char === '#' ? 'wall' : char === '@' ? 'ending' : 'floor'}`}
          />
        ))}
      </div>
    ))}
  </div>
);

const isWithin = (array, i) => 0 <= i && i < array.length;

export const handleKeyDown = e => ({ maze, x, y }) => {
  const keys = {
    37: ({ x, y }) => ({ x: x - 1, y }),
    38: ({ x, y }) => ({ x, y: y - 1 }),
    39: ({ x, y }) => ({ x: x + 1, y }),
    40: ({ x, y }) => ({ x, y: y + 1 })
  };

  if (e.keyCode in keys) {
    const { x: newX, y: newY } = keys[e.keyCode]({ x, y });
    if (
      isWithin(maze[0], newX) &&
      isWithin(maze, newY) &&
      (maze[newY][newX] === ' ' || maze[newY][newX] === '@')
    ) {
      return { x: newX, y: newY};
    } else {
      return { x, y };
    }
  } else {
    return {};
  }
};

const changeRotation = ({ rotation }) => ({
  rotation: rotation + (Math.random() * 0.8 - 0.4)
});

class App extends Component {
  state = {
    maze: maze
      .trim()
      .split('\n')
      .map(row => row.split('')),
    x: 0,
    y: 1,
    rotation: 0
  };

  componentDidMount = () => {
    window.addEventListener('keydown', e => this.setState(handleKeyDown(e)));
    setInterval(() => this.setState(changeRotation), 3000);
  };

  render() {
    const { maze, x, y, rotation } = this.state;
    return (
      <div>
        <div className="center">
          {maze[y][x] === '@' ? 'You win!' : 'Get to the pink tile!'}
        </div>
        <Maze maze={maze} x={x} y={y} rotation={rotation} />
      </div>
    );
  }
}

export default App;
