# Energy Performance of Buildings Register - Prototypes

This is where we store our prototypes.

## Getting Started

Clone the repository:

```sh
$ git clone git@github.com:communitiesuk/epb-prototypes.git
```

Change directory to `epb-prototypes`:

```bash
$ cd epb-prototypes
```

### Running the app in Docker
- Build the image  
  `docker build -t epb-prototypes ./`
- Run the container 
`docker run -d -p 80:80  --name epb-prototypes-web-  epb-prototypes`
- Run in password protected mode
`docker run -d -p 80:80  -e NODE_ENV=production -e USE_HTTPS=false  -e PASSWORD=test  --name epb-prototypes-web  epb-prototypes`  

- Go to [localhost](http://localhost:80) in your browser
- Go to [localhost/get-energy-certificate-data](http://localhost:80/get-energy-certificate-data) in your browser to get
to `get-energy-certificate-data` service


### Dependencies
- [Node.js 18.x.x](https://nodejs.org)
    - _Note: Installing Node.js using the above link will automatically install Node Package Manager (NPM)._
- [Node Package Manager (NPM)](https://www.npmjs.com)

### Install natively

Install the Node.js modules:

```sh
$ npm i
```

## Start

Start the local server:

```sh
$ npm run dev
```

- Go to [localhost](http://localhost:80) in your browser
    - _Note: Some systems might have a service already listening
      on port 80. Simply read the console output from `npm start` to identify your port._
- Go to [localhost/get-energy-certificate-data](http://localhost:80/get-energy-certificate-data) in your browser to get
  to `get-energy-certificate-data` service

      
## Resources
- Cloned from [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs)
- [GOV.UK Design System](https://design-system.service.gov.uk/get-started/)
    - [Styles](https://design-system.service.gov.uk/styles/)
    - [Components](https://design-system.service.gov.uk/components/)
    - [Patterns](https://design-system.service.gov.uk/patterns/)