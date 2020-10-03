Tic-Tac-Toe game

Taken from react site tutorial ("https://reactjs.org/tutorial/tutorial.html")

## Demo

("https://mohawwadrez.github.io/tictoctoetask/")

## installation:

`create repo in github`
`npx create-react-app tictoctoe`
`publish project on git`

    git init
    git add README.md
    git commit -m "first commit"
    git branch -M master
    git remote add origin https://github.com/mohawwadrez/tictoctoe.git
    git push -u origin master
    
`npm install gh-pages --save-dev` to create pages in on github
go to package.json and add
"homepage": "https://mohawwadrez.github.io/tictoctoetask",
to script:

    "predeploy": "npm run build"
    "deploy": "gh-pages -d build"

finally `npm run deploy`

## Scripts:

`yarn start`
`npm run deploy` to update git-page

## New changes to react site tutorial

`all class component to functional component`
` all function componet to arrow component`
`add Draw option`
` Option to count the number of wins`

## style

`css to sass`
`new ui desgin`
