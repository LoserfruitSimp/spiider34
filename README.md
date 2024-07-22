# spiider34

spiider34 is a free to use [`booru`](https://booru.org/top) viewer.

Eaisly switch between sourses including [rule34](https://rule34.xxx), [hypnohub](https://hypnohub.net), [safebooru](https://safebooru.org) and [many more](#sourses).

Learn how to set it up for yourself [here](#setup)!

# Features

spiider34 booru viewer comes with a wide set of features including

- [Proxy requests](#proxy-requests)
- [Easy sourse switching](#easy-sourse-switching)
- [Easy quality switching](#easy-quality-switching)
- [Easy post switching](#easy-post-switching)
- [Video and image support](#video-and-image-support)
- [Auto complete tags (on supporting sourses)](#auto-complete-tags)
- [Tag gallery](#tag-gallery)

### Proxy requests

All requests made are piped through the express server so no unwanted connections to rule34 will be detected!

### Easy sourse switching

On the spiider34 home page which can be found by clicking the home icon in the viewer or navigating to the base url there is an easy to use drop down box labled "Toggle Sourse" which automaticly switches the search output and autocomplete to the sourse of your choosing. Supported sourses can be found [here](#sourses).

### Easy quality switching

On the spiider34 home page which can be found by clicking the home icon in the viewer or navigating to the base url there is an easy to use drop down box labled "Toggle Quality" which automaticly switches the search output to either Full quality or Sample quality.

### Easy post switching

After you search for a tag, posts will start to be loaded on the spiider34 viewer. This viewer can be navigated using the arrow keys or clicking on the top half of the screen in the direction you want to go. The viewer only loads 100 files at once but if a tag(s) exceeds 100 posts, you will automatily be sent to a new page if you are finished with the first.

### Video and image support

Booru content on spiider34 has support for both images and videos to be displayed in the viewer.

### Auto complete tags

On supported sourses spiider34 uses [`Awesomplete`](https://github.com/LeaVerou/awesomplete) for better tag navigating in the search bar. (NOTE: Some sourses do not support awesomplete)

### Tag gallery

By clicking 'M' in the viewer, you are displayed with a gallery of all posts related to the inputed tag. By clicking a post, the selected file will be displayed in the viewer and by holding the left control key and clicking, the file will be sent to a new tab. Clicking 'T' brings you to the tag viewer. This pages shows you the top tags found in your search.

# Setup

### 1. Clone this repository
```
git clone https://github.com/LoserfruitSimp/spiider34.git
```
### 2. Run npm install
```
npm install
```
### 3. Run node server.js
```
node server.js
```
### 4. Visit [http://localhost:6969](http://localhost:6969)


# Sourses

spiider34 uses many of the top booru sourses that support API requests. These include:

- [rule34](https://rule34.xxx)
- [hypnohub](https://hypnohub.net)
- [safebooru](https://safebooru.org)
- [realbooru](https://realbooru.com)
- [xbooru](https://xbooru.com)
- [gelbooru](https://gelbooru.com)
