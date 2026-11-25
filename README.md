# [dirt-wizard-distro](https://github.com/lafelabs/dirt-wizard-distro/)

dirt wizard media distribution via self-replicating web servers

 - [index.html](index.html)
 - [readme.html](readme.html)
 - [editor.html](editor.html)
 - [qrcode.html](qrcode.html)
 - [load-file.php](load-file.php)
 - [save-file.php](save-file.php)
 - [list-files.php](list-files.php)
 - [list-albums.php](list-albums.php)
 - [php.js](php.js)
 - [track-list.js](track-list.js)
 - [trashmagic.js](trashmagic.js)
 - [trashmagic.css](trashmagic.css)
 - [README.md](README.md)
 - [spore.php](spore.php)
 - [spore.json](spore.json)

## [ANDROID SERVER](https://www.kslabs.ru/)

## [WINDOWS/MACOS SERVER](https://www.apachefriends.org/)

## LINUX

```
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
cd /var/www/html
sudo rm index.html
sudo apt-get install curl
sudo curl -o spore.php https://raw.githubusercontent.com/LafeLabs/dirt-wizard-distro/refs/heads/main/spore.php
cd ..
sudo chmod -R 0777 *
cd html
php spore.php
sudo chmod -R 0777 *
```