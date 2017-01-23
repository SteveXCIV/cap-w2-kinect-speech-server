# cap-w2-kinect-speech-server

**Build Status:** [![Build Status](https://travis-ci.com/SteveXCIV/cap-w2-kinect-speech-server.svg?token=mNXcSSLvdYEyeQMicDAc&branch=master)](https://travis-ci.com/SteveXCIV/cap-w2-kinect-speech-server)

## Getting Started

This section contains everything needed to get started with the server component.

#### Requirements

> Note: NodeJS and NPM can be installed from your favorite package manager. Gulp should be installed using NPM, using, the command `npm install -g gulp@3.9.1` (or `npm install gulp@3.9.1` if you prefer **not** to globally install)

 - NodeJS, v. 7.4.0 or later
 - NPM, v. 4.0.5 or later
 - Gulp, v. 3.9.1 or later

After installing the dependencies, clone the repository (`git clone https://github.com/SteveXCIV/cap-w2-kinect-speech-server.git`) and navigate to it. Finally, run `npm install` to install all the libraries the project uses.

#### Building the Server

Run `gulp build`<sup>1</sup>, you should now have a directory in the top-level of the repository called `build/`; this contains all the build artifacts.

#### Running the Server

Run `npm start`, you should see some chatter on the console as the server comes online, you can then begin querying the API endpoints at [http://localhost:3000/](http://localhost:3000), or wherever you may have assigned the port via Environment Variables.

#### Cleaning Up

Run `gulp clean`<sup>1</sup>, this will delete the contents of the `build/` directory; this is useful if you want to ensure that everything is recompiled from ES6.

#### Environment Variables

You can assign these (either permanently or temporarily) to change some of the server behavior. Along with the variables, the default values are listed (if applicable):

  - `PORT` (default: `3000`): The port the server listens for connections on. Typically, this is `80` for a production webserver, but different for development work (since regular HTTP traffic goes over `80`)

#### Notes:

  1. If you chose **not** to install Gulp globally, you'll need to run it from `./node_modules/gulp/bin/gulp.js` instead of just using `gulp`.
