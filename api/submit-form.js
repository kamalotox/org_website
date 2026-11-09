import { handleSubmitFormRequest } from '../server/submitForm.js';

export default async function handler(req, res) {
  return handleSubmitFormRequest(req, res);
}
