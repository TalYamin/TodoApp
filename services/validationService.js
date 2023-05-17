const Status = require('../models/status.js');
const Filter = require('../models/filter.js');
const SortBy = require('../models/sortBy.js');


class validationService {

   
    validateStatus(status) {
        let isValid = false;
        for (let i in Status) {
            if (Status[i] === status) {
                isValid = true;
            }
        }
        return isValid;
    }


    validateFilter(filter) {
        let isValid = false;
        for (let i in Filter) {
            if (Filter[i] === filter) {
                isValid = true;
            }
        }
        return isValid;
    }

    validateSortBy(sortBy) {
        let isValid = false;
        for (let i in SortBy) {
            if (SortBy[i] === sortBy) {
                isValid = true;
            }
        }
        return isValid;
    }

}

module.exports = validationService;
