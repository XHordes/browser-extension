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
import fs from 'fs-extra';
import archiver from 'archiver';
import chrome from 'crx';
import man from '../app/manifest.json';
import ignore from './buildignore.json';

//1. make temp directory
fs.mkdir('tmp', {recursive: true}, e => {
	if (e) throw e;
});

/*async function rmdir(dir) {
	await fs.remove(dir, e => {
		if (e) throw e;
	});
}*/

async function tmpdir(dir, dest) {
	await fs.readdir(dir, {recursive: true}, async (e, f) => {
		if (e) throw e;
		await f.forEach(async n => {
			if (!ignore[n]) {
				await fs.opendir(`${dir}/${n}`, async (e, d) => {
					if (!d) {
						await fs.readFile(`${dir}/${n}`, async (e, d) => {
							if (e) throw e;
							await fs.writeFile(`${dest}/${n}`, d, async e => {
								if (e) throw e;
							});
						});
					} else {
						await fs.mkdir(`${dest}/${n}`, {recursive: true}, async e => {
							if (e) throw e;
						});
						await tmpdir(`${dir}/${n}`, `${dest}/${n}`);
					}
				});
			}
		});
	});
}

//2. manipulate files to work on chrome


//3. zip and place in ../dist/(version number), named chrome.crx
// (don't forget to make a directory for the crx file)
// and also make a non-distribution version for development

fs.mkdir(`../dist/${man.version}`, {recursive: true}, e => {
	if (e) throw e;
});

(async () => {
	await tmpdir('../app', 'tmp');

	await fs.mkdir(`../dist/${man.version}`, {recursive: true}, async e => {
		if (e) throw e;
	});

	let out = fs.createWriteStream(`../dist/${man.version}/dev.zip`);
	let arc = archiver('zip');

	arc.on('error', e => {
		throw e;
	});

	arc.pipe(out);
	arc.glob('**', {cwd: 'tmp'}, {prefix: ''});
	arc.finalize();

	fs.mkdir(`../dist/${man.version}`, {recursive: true}, e => {
		if (e) throw e;
	});

	const crx = new chrome({privateKey: fs.readFileSync('key.pem')});

	crx.load('tmp')
		.then(crx => crx.pack())
		.then(buffer => {
			fs.writeFile(`../dist/${man.version}/chrome.crx`, buffer, e => {
				if (e) throw e;
			});
		})
		.catch(e => {if (e) throw e;});
})();

//4 repeat for opera and firefox
