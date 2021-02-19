# Papio Menu
### Alexa Papillion Lunch Menu Skill
This Alexa app will read you the Papillion LaVista Elementary schools lunch menu.

## Use it
`Alexa, ask Papio Menu what's for lunch today` \
`Alexa, ask Papio Menu what is for lunch tomorrow` \
`Alexa, ask Papio Menu what are we having for lunch on Thursday`

## How does it work?
This hits the XML endpoint for the school lunch calendar, then parses it,
and Alexa reads it back to us.

It could break at any time if the schools calendar app changes, or the developer
of the current school lunch program changes their code.

### Deploy
1. `ask deploy`

### Test from local to cloud
1. `ask dialog`

### Local Debug
1. Generate a token \
   `ask util generate-lwa-tokens --scopes alexa::ask:skills:debug` \
   See https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/2.0.x/ask-sdk-local-debug#using-with-other-ides-and-debuggers
1. Setup node process to run as specified in that link
1. This now allows the `ask dialog` to hit breakpoints in your IntelliJ or VSCode

### Credits
Uses the ASK CLI from AWS for Alexa. \
Function code is inspired by https://github.com/adamgruber/alexa-lunchlady