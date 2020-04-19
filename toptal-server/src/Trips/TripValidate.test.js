const tripValidate = require('./TripValidate');

describe("TripValidate", () => {
  it('insert passes (endDate and comments)', () => {
    const trip = {
      destination: 'here',
      startDate: '2020-11-11',
      endDate: '2020-11-11',
      comments: 'comments',
    };
    const results = tripValidate.isValidUpdateInsert(trip);
    expect(results).toBe(true);
  });
  it('insert passes (endDate and comments)', () => {
    const trip = {
      destination: 'here',
      startDate: '2020-11-11',
      endDate: '2020-11-11',
      comments: 'comments',
    };
    const results = tripValidate.isValidUpdateInsert(trip);
    expect(results).toBe(true);
  });
  it('rejected', () => {
    const next = jest.fn();
    const json = jest.fn();
    const res = {status: jest.fn().mockReturnValue({json})};
    try {
      canUpdateTrips({role: 'admin'}, res, next);
    } catch (ex) {
      expect(ex.message).toEqual("Not Authorized");
    } finally {
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({error: "Not Authorized"});
    }
  });
});

