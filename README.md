# Energy Performance of Buildings Register - Prototypes

This is where we store our prototypes.

See:

- [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs)
- [GOV.UK Design System](https://design-system.service.gov.uk/get-started/)
  - [Styles](https://design-system.service.gov.uk/styles/)
  - [Components](https://design-system.service.gov.uk/components/)
  - [Patterns](https://design-system.service.gov.uk/patterns/)

## Getting Started

```bash
# Run locally in development mode
npm install
npm run dev
# visit http://localhost:8080/

# Run in docker in development mode
docker compose up
# visit http://localhost:8080/

# Run locally in production mode
PASSWORD=test npm start

# Run in docker in production mode
docker build . -t epb-prototypes
docker run -p 8080:8080 -e NODE_ENV=production -e PASSWORD=test epb-prototypes
```
