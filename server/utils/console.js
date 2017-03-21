/**
 * display large text item by animated sequence in console
 * @param  {string} text info
 * @return {undefined}
 * note: might need to update per Node readline module
 */
export const flash = text => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(text);
};