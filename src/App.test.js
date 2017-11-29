import React from 'react';
import ReactDOM from 'react-dom';
import App, { handleKeyDown } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

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
#   #   #   # #              
#############################
`
  .trim()
  .split('\n')
  .map(row => row.split(''));

it('handles keydowns by changing the x and y state', () => {
  expect(handleKeyDown({ keyCode: 37 })({ maze, x: 0, y: 1 })).toEqual({
    x: 0,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 38 })({ maze, x: 0, y: 1 })).toEqual({
    x: 0,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 39 })({ maze, x: 0, y: 1 })).toEqual({
    x: 1,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 40 })({ maze, x: 0, y: 1 })).toEqual({
    x: 0,
    y: 1
  });

  expect(handleKeyDown({ keyCode: 37 })({ maze, x: 1, y: 1 })).toEqual({
    x: 0,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 38 })({ maze, x: 1, y: 1 })).toEqual({
    x: 1,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 39 })({ maze, x: 1, y: 1 })).toEqual({
    x: 1,
    y: 1
  });
  expect(handleKeyDown({ keyCode: 40 })({ maze, x: 1, y: 1 })).toEqual({
    x: 1,
    y: 2
  });

  expect(handleKeyDown({})({ maze, x: 0, y: 1 })).toEqual({});
  expect(handleKeyDown({ keyCode: 41 })({ maze, x: 0, y: 1 })).toEqual({});
});
