/*
Plan:
1. make a temp directory to copy all the relevant files into, ignoring those listed in ./buildignore.json
2. Manipulate the files to work on chrome
3. Zip and place in ../dist/(version number), named chrome.crx
4. Repeat for opera,firefox
5. ???
6. Profit
*/
//imports
import fs from 'fs';
import archiver from 'archiver'
import man from '../app/manifest.json';
import ignore from './buildignore.json';

//1. make temp directory
fs.mkdir('tmp', {recursive: true}, e => {
	if (e) throw e;
});
function copydir(dir, dest) {
	fs.readdir(dir, (e, f) => {
		if (e) throw e;
		f.forEach(n => {
			if (!ignore[n]) {
				fs.opendir(`${dir}/${n}`, (e, d) => {
					if (!d) {
						console.log('don\'t be racist, i am a file');
						fs.readFile(`${dir}/${n}`, (e, d) => {
							if (e) throw e;
							fs.writeFile(`${dest}/${n}`, d, e => {
								if (e) throw e;
							});
						});
					} else {
						console.log('don\'t be racist, i am a directory');
						fs.mkdir(`${dest}/${n}`, {recursive: true}, e => {
							if (e) throw e;
						});
						copydir(`${dir}/${n}`, `${dest}/${n}`);
					}
				});
			}
		});
	});
}

copydir('../app', 'tmp');

//2. manipulate files to work on chrome


//3. zip and place in ../dist/(version number), named chrome.crx
// (don't forget to make a directory for the crx file)
fs.mkdir(`../dist/${man.version}`, {recursive: true}, e => {
	if (e) throw e;
});

let out = fs.createWriteStream(`../dist/${man.version}/chrome.crx`);
let arc = archiver('zip');

arc.on('error', e => {
	throw e;
});

arc.pipe(out);
arc.glob('tmp/**/**');
arc.finalize();

//4 repeat for opera and firefox
