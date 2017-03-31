# Rensis

### Rensis lets you create your own Likert-question-based questionnaire to plot points on a set of two-by-two diagrams. 

https://dantaeyoung.github.io/Rensis/

<img src="https://github.com/dantaeyoung/Rensis/blob/master/screenshot.png?raw=true" width="600px" height="600px" />

### Change the questions
- Edit `questionData.json`.
- The page can also pull from other sources: navigate to `http://localhost:8082?questions=http://URL.to/json/file.json`

### start development server:

- `npm install`
- `npm start`
- Development server is runnning: go to http://localhost:8082

### to deploy:

- `npm run build`
- All files are now in `dist/`. Push this to your production web server. 
