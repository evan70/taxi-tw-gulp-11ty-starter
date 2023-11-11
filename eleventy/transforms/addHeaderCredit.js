/* ***** ----------------------------------------------- ***** **
/* ***** Add Header Credit Transform
/* ***** ----------------------------------------------- ***** */

const markupHeader = [
  '<!DOCTYPE html>',
  '<!--',
  '**',
  '**',
  '**',
  '**',
  '**',
  '**',          
  '**              {{ @responsive }}',
  '**              {{ responsive.sk }}',
  '**',
  '**',
  '**',
  '**',
  '**',
  '**',
  '-->\n',
]

module.exports = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    return markupHeader.join('\n') + content
  }
  return content
}
