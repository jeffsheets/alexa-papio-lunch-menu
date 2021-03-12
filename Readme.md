# Papio Menu
### Alexa Papillion Lunch Menu Skill
This Alexa app will speak the Papillion LaVista Elementary schools lunch menu entree options to you.

The calendar it reads from is at [PLCS School Lunch Calendar](https://family.titank12.com/menu/TC4F9D)

Alexa gets the calendar filtered for Prairie Queen Elementary, which I think should be the same for all schools?
I picked PQ as that's the school closest to my home.

## Use it
`Alexa, ask Papio Menu what's for lunch today` \
`Alexa, ask Papio Menu what is for lunch tomorrow` \
`Alexa, ask Papio Menu what are we having for lunch on Thursday` \
`Alexa, ask Papio Menu what is for lunch March 9, 2021`

## How does it work?
This hits the JSON API endpoint for the school lunch calendar, then parses it,
and Alexa reads it back to us.

It could break at any time if the schools calendar app changes, or the developer
of the current school lunch program changes their code.

### Deploy
1. See [Alexa ASK CLI Setup](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html#prerequisites)
1. `ask deploy`

### Test from local to cloud
1. `ask dialog`
1. type in `alexa ask Papio Menu what's for lunch today` to see the text response

### Test speech
1. In the Amazon Alexa Developer Console webpage, open the Test tab
1. Allow microphone for your browser (if prompted)
1. Long-press on the microphone icon and say `Alexa ask Papio Menu what's for lunch today`
1. Listen as Alexa's response is spoken to you!

### Local Debug
1. This allows the `ask dialog` to hit breakpoints in your local IntelliJ or VSCode \
   See https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/2.0.x/ask-sdk-local-debug#using-with-other-ides-and-debuggers
   1. `npm install --save-dev ask-sdk-local-debug`
   1. `npm install`
1. Generate a token \
   `ask util generate-lwa-tokens --scopes alexa::ask:skills:debug`
1. Setup node process in IntelliJ or VSCode
   ```bash
   node ./node_modules/ask-sdk-local-debug/dist/LocalDebuggerInvoker.js 
      --accessToken <FromStep2>
      --skillId <YOUR_SKILL_ID>
      --skillEntryFile index.js
      --handlerName handler
   ```
   1. `skillId` can be found in your .ask/ask-states.json file

### Create an Alexa skill for your own local school menu!
The hardest part is choosing a good name! Most of the code is auto-generated by the ASK CLI.
Really this could be a great High School or Middle School coding project.
1. Look at how your school lunch menu is displayed on the web
   1. If you're lucky like me, the calendar already has a web API that returns a JSON object structure
   1. It will be more difficult if your menu is a PDF or image or other format....
1. Read up on [Amazon Alexa ASK CLI](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/2.0.x/ask-sdk-local-debug#using-with-other-ides-and-debuggers)
1. Generate your own new skill using `ask new`
1. I selected the "Lambda" option, as I first tried the Alexa-hosted option but I was having issues deploying code with it.
The choice is up to you though, it shouldn't matter much besides the deploy steps.
1. Modify your version of skill.json, you can use this as reference: [skill-package/skill.json](skill-package/skill.json)
1. Copy the LunchMenuIntentHandler code from [lambda/index.js](lambda/index.js)
   1. Now the custom part. You'll need to modify the code that retrieves the lunch menu entrees to work for your school district
1. Test using the steps above
1. When ready, submit through the Alexa Developer Console to get published on the Alexa app store!

### Credits
Data is sourced from a calendar menu API found at [PLCS School Lunch Calendar](https://family.titank12.com/menu/TC4F9D) \
Uses the [ASK CLI from AWS](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/2.0.x/ask-sdk-local-debug) for Alexa. \
Function code is inspired by https://github.com/adamgruber/alexa-lunchlady
Apple image clipart found for free from http://clipart-library.com/free-apple-clipart.html

### TODO
- [x] Refactor the "menu retrieval" code into a service
- [x] Cache the calendar lookup results (or lambda execution by params) for an hour or two
- [ ] Unit tests
- [ ] Setup CI/CD or tryout the Alexa-hosted CI/CD process that didn't work for me the first time
- [ ] Why does Amazon have ask-resources.json in .gitignore by default? \
  https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#init-command
  