
function main () {
  const colors = getHexAndLabel();
  const translatedColors = translateColors(colors)
  translatedColors.forEach(e => {writeColors(e.hex,e.name)})
}
function translateColors(colors){
  const result = colors.map(e => {
    const translatedLabel = translateLabel(e.name)
    return {
      hex:e.hex,
      name: translatedLabel
      }
    });
  return result;
}
function getHexAndLabel() {
    const json = UrlFetchApp.fetch("https://unpkg.com/color-name-list@8.11.0/dist/colornames.json");
    // json形式で返ってくるのでパース
    const array = JSON.parse(json);
    return array;
}

function translateLabel(label){
  const sourceLanguage = "en";
  const targetLanguage = "ja";
  const output = LanguageApp.translate(label, sourceLanguage, targetLanguage);
  Utilities.sleep(1000)
  return output;
}

function writeColors(hex,label)
{
 const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('色');
 const values = sheet.getDataRange().getValues();
 const col = values.length - 1
 const row = values[col].length -1 
 let temp = [hex,label]
 values.splice(col + 1,0,temp) 
 sheet.getRange(1,1, values.length, values[0].length).setValues(values);
}
