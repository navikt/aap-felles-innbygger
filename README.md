# aap-felles-innbygger
##Lokal utvikling for react-komponenter
```
npm install
npm run storybook
```
Ved push til main vil storybooken også deployes til github pages https://navikt.github.io/aap-felles-innbygger/

##Legg til dependency i riktig workspace
Pass på at dependencies legges i riktig packages/aap-felles-innbygger-****/package.json. Eksempler:
```
npm install @navikt/ds-css -w "@navikt/aap-felles-innbygger-react"
npm install pino -w "@navikt/aap-felles-innbygger-utils"
```
## aap-felles-innbygger-auth
Felles funksjoner som brukes til å logge inn og autentisere med idporten
## aap-felles-innbygger-react
Felles react-komponenter.
## aap-felles-innbygger-utils
Felles hjelpemetoder
