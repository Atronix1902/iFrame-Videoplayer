# iFrame - Videoplayer

iFrame - Videoplayer is a Videoplayer for Web-applications which can be used and configurated via the <iframe>-tag

  - Easy use
  - Completely free
  - Great browser-compability

# How to use

It's easy just include the files on your server and use an iFrame to include it on a website.
This would create a clean videoplayer:
```html
<iframe height="900" width="1600" src="your_path_to_player/mp4/"></iframe>
```
It's possible to use it via my website too:
```html
<iframe height="900" width="1600" src="https://iframe/kriebel.ddnsfree.com/video/?src=<url to file>">
```
But this option only provides support of using URL as filesource.

# Configuration
This player wouldn't show anything because he doesn't know which file, so we need to configure him
The configuration is made by using a query-string:
```html
<iframe height="900" width="1600" src="mp4/?src=./media/test.mp4"></iframe>
```
This would create a player for the file "your_path_to_player/mp4/media/test.mp4" which is actually the default configuration.

There are several options to use.
| Parameter | Type          | Description                                       | Default value         |
| ---       | ---           | ---                                               | ---                   |
| src       | `String`      | path to file - can be url, absolute or relative   | `"./media/test.mp4"`  |
| dl        | `boolean`     | display of download button                        | `false`               |
| t         | `int / String`| style type that can be used more infos at styling | `1`                   | 

Example of full configurated player:
```html
<iframe height="900" width="1600" src="mp4/?src=./media/test.mp4&t=1&dl=true"></iframe>
```

and would create following mediaplayer:
![https://iframe/kriebel.ddnsfree.com/video/?src=./media/test.mp4&t=1&dl=true](https://kriebel.ddnsfree.com/media/images/other/mp4_screenshot.jpg)

# Styling

It is possible to create own CSS or edit the default.
The player gets its stylesheets from `./css/1.css` file by default.
By editing it you can edit the default styling.
Another option is to add a new CSS file into that directory and set the t-parameter to filename.

Example:
| Filename  | Query     |
| ---       | ---       |
| blabla.css| t=blabla  |
| 2.css     | t=2       |

# License
Take a look into LICENSE file
