
import _ from 'lodash';
import $ from 'jquery';

import Question from './Question';

class Rensis {

	constructor (options) {
		this.options = options;
    this.allQuestions = [];
	}

	idifyChoices(q) {
		return q.toLowerCase().replace(/ /g,"_");
	}

  addHtml(htmlOptions) {
    $(htmlOptions.title).html(this.options.title);
    $(htmlOptions.description).html(this.options.description);
    this.allQuestions = _.map(this.options.questions, function(q) { return new Question(q); });
    _.each(this.allQuestions, function(thisQ) {
      $(htmlOptions.questions).append(thisQ.getHtml());
    });
  }


	static mergeResults(results) {

		var allResults = {};
		_.each(results, function(res) {
			_.each(Object.keys(res), function(reskey) {
				if(!(reskey in allResults)) {
					allResults[reskey] = res[reskey];
				} else {
					if(_.isArray(allResults[reskey])) { allResults[reskey] = allResults[reskey].concat(res[reskey])}
					else { allResults[reskey] += res[reskey]; }
				}
			});
		});
		return allResults;
	}

  getResults() {
	  var allResults = Rensis.mergeResults(_.map(this.allQuestions, function(q) {
		  return q.getResult();
	  }));
    return allResults;
  }

}

export default Rensis;
