const canUpdateTrips = require('./canUpdateTrips');

describe("canUpdateTrips", () => {
  it('approved', () => {
    const next = jest.fn();
    const res = {};
    canUpdateTrips({role: 'general'}, res, next);
    expect(next).toHaveBeenCalled();
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

