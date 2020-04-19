const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

class TripValidate {
  constructor() {
    const updateInsert = {
      type: 'object',
      required: [
        'destination',
        'startDate',
      ],
      properties: {
        id: {
          type: 'integer',
        },
        destination: {
          type: 'string',
          nullable: false,
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: ['string', 'null'],
          format: 'date',
        },
        comments: {
          type: ['string', 'null'],
        },
      },
    };

    this.validateUpdateInsert = ajv.compile(updateInsert);
    const deleteValidation = {
      type: 'object',
      required: [
        'id',
      ],
      properties: {
        id: {
          type: 'integer',
        },
      },
    };

    this.validateDelete = ajv.compile(deleteValidation);
  }

  isValidUpdateInsert(trip) {
    const isValid = this.validateUpdateInsert(trip);
    if (!isValid) {
      console.error(trip);
      console.error(this.validateUpdateInsert.errors);
    }
    return isValid;
  }

  isValidDelete(trip) {
    const isValid = this.validateDelete(trip);
    if (!isValid) {
      console.error(this.validateDelete.errors);
    }
    return isValid;
  }
}

module.exports = new TripValidate();
