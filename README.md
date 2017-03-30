# Rensis

## Rensis lets you create your own Likert-question-based questionnaire to plot points on a set of two-by-two diagrams. 

![Rensis screenshot](https://github.com/dantaeyoung/Rensis/blob/master/screenshot.png)




### start development server:

- `npm install`
- `npm start`
- Yay! Development server is runnning: go to http://localhost:8082
- Try editing files (in `site/`) while development server is running -- you can see it change before your eyes!

### notes on npm & webpack

- requirements should be added via `npm install --save MODULENAME`
- web files are in `site/`
- `main.js` loads all javascript & css

### to deploy:

- `npm run build`
- All files are now in `dist/`. Push this to your production web server. 
