## GeoVolume Server

This GeoVolume Server is an implementation of a simple NodeJs server that is able to receive GeoVolume API request (as describe [here](https://docs.ogc.org/per/20-029.html)).

To know more about what is the GeoVolume API, go [here](https://github.com/VCityTeam/UD-SV/blob/master/ImplementationKnowHow/Geovolumes.md)
### Geovolume collection

The collection of GeoVolume used is on assets/collections.json and represent the following geovolumes :

```bash
Lyon_Metropole 
├── 2015
    ├── Limonest_2015 : citygml, 3dtiles
        ├── Batiment_carl : 3dtiles
    ├── Bron_2015 : citygml, 3dtiles
├── 2018     
    ├── Limonest_2018 : citygml, 3dtiles
```

### Installation 

The server can be locally (on your desktop) started in the following way :
```
npm install
npm start      
```

Then, it should be accessible through your favorite web-browser on http://localhost:3000.

### Pre-requisites for installing the template application

As for any JavaScript application, the central building/running tool is [npm (Node Package Manager)](https://en.wikipedia.org/wiki/Npm_(software)) whose installation process is OS dependent: 

* **Ubuntu**

  * Installation

    ```bash
    sudo apt-get install npm    ## Will pull NodeJS
    sudo npm install -g n     
    sudo n latest
    ```

  * References: [how can I update Nodejs](https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version), and [install Ubuntu](http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/#ubuntu-package-manager)

* **Windows**
  
  * Installing from the [installer](https://nodejs.org/en/download/)
  * Installing with the [CLI](https://en.wikipedia.org/wiki/Command-line_interface)

    ```bash
    iex (new-object net.webclient).downstring(‘https://get.scoop.sh’)
    scoop install nodejs
    ```
