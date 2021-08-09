# Welcome to Retro Collector
Retro Collector, A One stop shop for any real gamer that wants to be able to keep tabs on their collection. The idea behind the creation of retro collector is to give the user the ability to catalog their gaming library and seperate them into seperate collections. From there The user has to ability to enter in the individual console and enter the games they have for that console to keep track of the value of the collection. In addition the User will have the ability to create wish lists of games that they may want and there current value to know uf hey are getting a good deal when they see it at a store.

<br>

[Click To try out Retro Collector](https://retro-collector.herokuapp.com/)

<br>


## Splash Page

![image](https://user-images.githubusercontent.com/79103461/128703255-7e2eeb16-5a39-4249-8563-333042c622cb.png)

<br>

# Technologies used

The backend for retro collector is managed using python and flask in order to control communication to the psql database with the help of SQLAlchemy. The front end is rendered with the use of react and the use of javascript and styled using CSS. React was chosen for this project due to its lite foot print, quick response times to maximize user experience especially when there may be multiple query's happening per page, and strong ecosystem backing and support especially around library's and other recourses to help maximize efficiency.

<br>

# Components

## Creating Collections
* Once you have created an account or logged in as a demo user, you then have the ability to access the collections page where you are able to create edit and delete any of the collections that you have created. The main intention of this page is to ensure that you are able to organize your retro library effectively.

<br>

![image](https://user-images.githubusercontent.com/79103461/128703714-25978ea1-889a-4164-932f-567f84c138d3.png)


<br>

## Adding Consoles
* Once a collection is created you can then add consoles to the collection where you can input a value and an image to render on the page. The header of the newly added console will keep track of the value of the console and all the games and tell you what the entire collection is currently worth. You also have the ability to adjust the values or images as you please.

<br>


![image](https://user-images.githubusercontent.com/79103461/128705326-2941a1b8-fecc-4dcf-ba28-de37758d5c98.png)

<br>

```javascript
   const collectionValue = (consoles, games) => {
        let value = 0
        consoles.forEach((console) => {
            value += console.value
        })
        games.forEach((game) => {
            value += game.value
        })
        return value.toFixed(2)
    }



    const valueFinder = (consoleId) => {
        let counter = 0
        for (let i = 0; i < games.length; i++) {
            let game = games[i]
            if (game.console_id === consoleId) {
                counter += game.value
            }
        }
        return counter.toFixed(2)
    }

```

<br>

## Adding games
* To complete the full functionality of keeping track of your retro game collection you then have the ability to add games to the consoles that you have created. When entering the information into the form in order to add game you have two options. You can either enter in custom information into the form and add your game to the collection that way or you can opt for the quick search function which makes a call to an API via PriceCharting which keeps track of game values and basic information. This option will then auto fill out your form for you to make the process seamless. It is also important to note that if you disagree with the information returned from the api call you can still adjust it.

<br>


![image](https://user-images.githubusercontent.com/79103461/128705414-18a1347f-22e3-4893-9640-7f63f5b5760e.png)

<br>

## WishList
* The final main feature of retro collector is the ability to create wish lists. Once on the wishlist page you are able to add games in a very similar fashion that you can add games to consoles. Again, you have the ability to make custom entries or use the api call for ease of use. Once the you find the game that you are looking for you can add it to this wishlist so when you are out shopping for games you can know right away if a listed game is a good deal or not based on its price.

<br>

![image](https://user-images.githubusercontent.com/79103461/128707223-1987ba05-00ca-465e-af18-f1c3a067b3f0.png)
