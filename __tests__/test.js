const chai = require('chai');
const expect = chai.expect;

describe('Backend Tests', () => {
    it('should return true', () => {
        const result = true;
        expect(result).to.be.true;
    });

    it('should not be null', () => {
        const result = 'Hello';
        expect(result).to.not.be.null;
    });

});














