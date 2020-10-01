Tic-Tac-Toe game
    Taken from react site training ("https://reactjs.org/tutorial/tutorial.html")

Demo:
    "https://mohawwadrez.github.io/tictoctoetask/"

installation:
    create repo and clone it
    npx create-react-app tictoctoe

Scripts:
    yarn start
    *npm run deploy to update git-page

Description:

        ///gh page
        npm install gh-pages --save-dev

            go to package.json and add

                "homepage": "https://mohawwadrez.github.io/tictoctoetask",

                to script
                "predeploy": "npm run build",
                "deploy": "gh-pages -d build",
           

            finally npm run deploy

        ///project

        By inspecting the code, you’ll notice that we have three React components:
        Square
        Board
        game

        ///new change

        all class component to functional component
        all function componet to arrow component
        
            ///style 
            css to sass
            new ui 

Env variables :

`APP_VERSION = process.env.REACT_APP_VERSION`

use it in .env file


