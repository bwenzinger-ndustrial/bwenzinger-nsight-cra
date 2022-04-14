import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSorted from 'chai-sorted';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(chaiSorted);
chai.use(sinonChai);
chai.use(dirtyChai);
