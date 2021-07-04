import {ReversePipe} from './reverse.pipe';

// isolated test
describe('ReversePipe', () => {

    it('should reverse the string', () => {
        const reversePipe = new ReversePipe();
        expect(reversePipe.transform('hello')).toEqual('olleh');
    });

});
