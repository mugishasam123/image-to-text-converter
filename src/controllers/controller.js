import { createWorker } from "tesseract.js";
export const getIndexView = (req, res) => {
  res.render('index', {text: 'Text content will be displayed here', error: null});
}

export const handleImageConvert = async (req,res) => {
  const worker = await createWorker()
  if (!req.file) {
    res.render('index', { text: null, error: 'No file uploaded' });
    return;
  }
  const { path: imagePath } = req.file;
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();
  res.render('index', { text, error: null });
}
