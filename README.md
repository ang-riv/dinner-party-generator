# Dinner Party Generator

Who’s making what??

A React app that makes deciding on what dishes to make for a dinner party a whole lot easier. It takes the guests entered, obtains a dish from the Spoonacular API to assign to each guest, and generates a simple yet elegant printable menu. 

### Built with:
 - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 - Vite
 - VSCode
 - react to PDF
 - Styling
	 - Motion (formerly Framer Motion)
	 - TailwindCSS
	 - DaisyUI
	 - reactArrows - Menu leaders
- Icons
	- Iconify - Lemon Emoji and Checkmark
	- SVG Repo - Cloche icons
 - API
	 - Spoonacular API - Random recipes
	 - Open Food Facts API - Verifying if the inputted text is an actual food or not

### Link to GH-Pages
https://ang-riv.github.io/dinner-party-generator/

## Introduction
Dinner Party Generator was designed with the indecisive in mind. It works like a potluck generator as it assigns guests a dish to make. There’s so many dishes out there and having to find something that fits everyone’s palette is daunting. This app takes care of that task and creates an aesthetic menu that can be printed out at the end.

## Features
- **Course Preference:** guests are able to choose what course they would like to make if they have a preference. If Jim wants to make the Entree, let him!
- **Food Restrictions:** a random dish is great… if your guests can eat it. The Restrictions page ensures that the dishes that are going to be fetched from the Spoonacular API accomodates your guests’ diet, allergies, and/or dislikes.
- **Is it Food:** checks if the food inputted in the Restrictions page is an actual food using the Open Food Facts API.
- **Dish Links:** links that open up in a new tab to the dish’s recipe on both the Preview page and the Menu itself.
- **Printable Menu:** user is able to print out the menu to use as an invitation or to place on the table for the guests to view.


## Challenges
- **Problem**: Printing with DaisyUI and React to PDF. DaisyUI’s default theme colors use OKLCH, which React to PDF does not support. It’s fine to use it everywhere else but when it came to using it with the final menu page, the PDF wouldn’t be generated.
	- **Solution**: Created a whole new theme using HEX codes instead.
- **Problem**: Assigning dishes to each guest. This was a major problem, but also a key feature to the whole app itself. Due to the guests being able to have a preference in what course they want to make, it was difficult to figure out how to assign the right dishes to the right guest.
	- **Solution**: Sorted the guests into two groups: guests with preferences and guests without. If a guest had a course preference, the app would match them up with a dish that was of that course. Then to ensure that that dish wouldn’t be assigned to another person, that dish’s ‘assigned’ value becomes true. Once all of the guests with preferences get matched to the course that they chose, the app looks for the guests that have no preferences and dishes that have not been assigned yet. Using indexes (since they are both arrays), the guests are given an unassigned dish. Finally, all of the guests are put into one final array with their newly assigned dishes!
## Future Updates
- Dark mode
- Give the option to just generate the menu as if the host is cooking everything instead of a potluck format
- Allowing the user to change the menu’s colors and icons
- Change one dish: if at the PreviewPage the user does not like one of the dishes, give them the option to change that dish and get another one
- Incorporate cuisines 
