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
    
to create pages in on github: `npm install gh-pages --save-dev` 
go to package.json and add

    
    "homepage": "https://mohawwadrez.github.io/tictoctoetask",
    to script:

        "predeploy": "npm run build"
        "deploy": "gh-pages -d build"

    finally npm run deploy 

## Scripts:

`yarn start` <br></br>
`npm run deploy` to update git-page

## New changes 

 1 all class component to functional component <br></br>
 2 all function componet to arrow component <br></br>
 3 add Draw option <br></br>
 4 Option to count the number of wins <br></br>
 5 css to sass <br></br>
 6 new ui desgin 



