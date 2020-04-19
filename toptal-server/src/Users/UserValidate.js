const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

class UserValidate {
  constructor() {
    const update = {
      type: 'object',
      required: [
        'id',
        'userId',
        'userName',
        'role',
      ],
      properties: {
        id: {
          type: 'integer',
        },
        userId: {
          type: 'string',
        },
        userName: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
    };
    this.validateUpdate = ajv.compile(update);

    const insert = {
      type: 'object',
      required: [
        'userId',
        'userName',
        'role',
        'password',
      ],
      properties: {
        userId: {
          type: 'string',
          format: 'email',
        },
        userName: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    };
    this.validateInsert = ajv.compile(insert);

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

    const reset = {
      type: 'object',
      required: [
        'password',
      ],
      properties: {
        password: {
          type: 'string',
        },
      },
    };
    this.validateDelete = ajv.compile(reset);
  }

  isValidUpdate(user) {
    const isValid = this.validateUpdate(user);
    if (!isValid) {
      console.error(this.validateUpdate.errors);
    }
    return isValid;
  }

  isValidInsert(user) {
    const isValid = this.validateInsert(user);
    if (!isValid) {
      console.error(this.validateInsert.errors);
    }
    return isValid;
  }

  isValidDelete(user) {
    const isValid = this.validateDelete(user);
    if (!isValid) {
      console.error(this.validateDelete.errors);
    }
    return isValid;
  }

  isValidReset(user) {
    const isValid = this.validateReset(user);
    if (!isValid) {
      console.error(this.validateReset.errors);
    }
    return isValid;
  }
}

module.exports = new UserValidate();
