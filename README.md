# Rensis

### Rensis lets you create your own Likert-question-based questionnaire to plot points on a set of two-by-two diagrams. 

https://dantaeyoung.github.io/Rensis/

<img src="https://github.com/dantaeyoung/Rensis/blob/master/screenshot.png?raw=true" width="600px" height="600px" />

### Change the questions
- Edit `questionData.json`.
- The page can also pull from other sources: navigate to `http://localhost:8082?questions=http://URL.to/json/file.json`
- Suggestion: create a pastebin/github file and use a CORS proxy to easily edit questions. Example:
  - edited pastebin here w/ modified questionsData.json: https://pastebin.com/4M2iUDzp
  - get 'raw' data: https://pastebin.com/raw/4M2iUDzp
  - put behind a CORS proxy such as `https://cors-anywhere.herokuapp.com/`
  - Navigate to: https://dantaeyoung.github.io/Rensis/?questions=https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/4M2iUDzp

### start development server:

- `npm install`
- `npm start`
- Development server is runnning: go to http://localhost:8082

### to deploy:

- `npm run build`
- All files are now in `dist/`. Push this to your production web server. 
