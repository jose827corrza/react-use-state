# Deploy site

[React Security Code](https://https://josedev-use-state-with-react.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `npm run start`

# Use of the project

The goal of this project is to ensure the understanding of the state and how to deal work with it.

First,  is used the new hooks provided by React. *useState*
this let us set and obtain values on a variable.

On the other hand the use of useReducer let us to deal with variable changes as well, but the main benefits is that is makes it easier to set different state changes at the same time, this changes are set by us.

The project works by reciving a word in an input field, if it matches with the string "paradigma" it will show a new component asking whether are we sure about deleting the component, by declining it returns to the main render, if not. A last component will be show telling us that the component has been deleted and a button to undo our choice.