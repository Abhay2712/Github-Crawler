const dotenv = require('dotenv');
dotenv.config();
const Token = process.env.TOKEN;


//setup for the octokit github api
const { Octokit } = require("@octokit/core");
const { createPullRequest } = require("octokit-plugin-create-pull-request");
const MyOctokit = Octokit.plugin(createPullRequest);
const octokit = new MyOctokit({
    auth: Token
});


async function run(version,str,res,url,curr) {
    const { data: user } = await octokit.request('GET /user');
    // console.log(user.login);
    try {
        await octokit.createPullRequest({
            // owner: `${url.slice(19,26).trim()}`,
            owner: `Abhay2712`,
            repo: `${url.slice(27).trim()}`,
            title: `${str} updated by Github-Crawler created by ${user.login}`,
            body: "This pull request is created by Github-Crawler",
            head: `${url.slice(27).trim()}-2`,
            base: "main",
            forceFork: false /* optional: force creating fork even when user has write rights */,
            contentType: "json",
            changes: [
                {
                    files: {
                        "package.json": ({content,encoding})=>{
                            let data=(Buffer.from(content,encoding).toString('utf-8'));
                            let result=data.replace(`${str}": "${curr}"`,`${str}": "${version}"`);
                            return(result);
                        }
                    },
                    commit:
                        `Dependency updated by Github-Crawler created by ${user.login}`,
                }
            ]
        })
            .then((pr) => {
                // console.log(`${url.slice(19,26).trim()}`);
                console.log(`\nCreated pull request to update ${str} in ${url.slice(27).trim()} at`);
                console.log(`${url.trim()}/pull/${pr.data.number}\n\n`);
            });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { run };



//rough work
//check status of pull request
// await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
//     owner: 'dyte-in',
//     repo: 'javascript-sample-app',
//     pull_number: '40'
// })
// .then(function(res){
//     console.log(res.data);
// })

// const abc=
//     {
//         "name": "sample-web-integration",
//         "version": "0.0.0",
//         "private": true,
//         "scripts": {
//           "start": "node ./bin/www"
//         },
//         "dependencies": {
//           "axios": "^0.25.1",
//           "cookie-parser": "~1.4.4",
//           "debug": "~2.6.9",
//           "dotenv": "^8.2.0",
//           "ejs": "~2.6.1",
//           "express": "~4.16.1",
//           "http-errors": "~1.6.3",
//           "morgan": "~1.9.1"
//         }
//       }