# Energy Performance of Buildings Register - Prototypes

This is where we store our prototypes.

## Getting Started

### Dependencies
- [Node.js 14.x.x](https://nodejs.org)
    - _Note: Installing Node.js using the above link will automatically install Node Package Manager (NPM)._
- [Node Package Manager (NPM)](https://www.npmjs.com)

### Install

Clone the repository:

```sh
$ git clone git@github.com:communitiesuk/epb-prototypes.git
```

Change directory to `epb-prototypes`:

```bash
$ cd epb-prototypes
```

Install the Node.js modules:

```sh
$ npm i
```

## Start

Start the local server:

```sh
$ npm start
```

- Go to [localhost](https://localhost:80) in your browser
  - _Note: Some systems might have a service already listening
  on port 80. Simply read the console output from `npm start` to identify your port._

## CI/CD
You can view the deployed prototypes at https://mhclg-epb-prototypes.london.cloudapps.digital/

The login credentials are set as environment variables in the app. You can view them using the Cloud Foundry CLI:
1. Login: `cf login -u <username>`
2. Select `prototypes` space
3. List environment variables: `cf env mhclg-epb-prototypes`
4. The USERNAME and PASSWORD are listed under User-Provided variables

## Resources
- Cloned from [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs)
- [GOV.UK Design System](https://design-system.service.gov.uk/get-started/)
  - [Styles](https://design-system.service.gov.uk/styles/)
  - [Components](https://design-system.service.gov.uk/components/)
  - [Patterns](https://design-system.service.gov.uk/patterns/)
