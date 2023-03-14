import { expect } from 'chai';
import { stub, spy, restore } from 'sinon';
import { handleImageConvert } from '../src/controllers/controller.js';

describe('handleImageConvert', () => {
  let req;
  let res;
  let renderSpy;
  let worker;

  beforeEach(async () => {
    worker = { 
      loadLanguage: stub().resolves(),
      initialize: stub().resolves(),
      recognize: stub().resolves({ data: { text: 'recognized text' } }),
      terminate: stub().resolves(),
    };

    req = { file: { path: './public/assets/test.png' } };
    res = {
      render: (view, data) => {},
    };
    renderSpy = spy(res, 'render');
  });

  afterEach(() => {
    restore();
  });

  it('should return an error when no file is uploaded', async () => {
    req.file = null
    await handleImageConvert(req, res);
    expect(renderSpy.calledOnce).to.be.true;
    expect(renderSpy.args[0][0]).to.equal('index');
    expect(renderSpy.args[0][1]).to.deep.equal({ text: null, error: 'No file uploaded' });
  });

  it('should recognize text in an image and render the index view with the recognized text', async function() {
    this.timeout(5000)
    await handleImageConvert(req, res);
    expect(renderSpy.calledOnce).to.be.true;
    expect(renderSpy.args[0][0]).to.equal('index');
    expect(renderSpy.args[0][1]).to.deep.equal({ text: 'PINK persiStence\n', error: null });
  });
});
