import { useState } from 'react'
import './App.css'
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [state, setState] = useState({
    active:[],
  })

  // const [state, setState] = useState({
  //   usr:"USERNAME",
  //   rep:"REPOSITORY_NAME",
  //   parseUrl:"",
  //   devEnv:"http://localhost:3000",
  //   proEnv:"https://myproject.onrender.com"
  // })
  // const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;



  const sections = [
    {
      name: "php",
      steps:[
        { legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Let\'s install PHP through <a href="https://www.apachefriends.org/es/download.html">XAMPP</a>. If needed, add it to $PATH', cmd: purified('bash', `echo "export PATH=/opt/lampp/bin:$PATH" >> ~/.bashrc`) },
        { legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> (Option 1) Install <a href="https://getcomposer.org/download/">Composer</a> and require <strong>PHPUnit</strong> as a development dependency:', cmd: purified('bash', `composer require --dev phpunit/phpunit`) },
        { legend: ' ... Run the test! Run PHPUnit from the project\'s directory', cmd:'./vendor/bin/phpunit test/test.php'},
        { legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> (Option 2) Download the <strong>PHPUnit</strong> PHAR file and move it to your user-level scripts directory:', cmd:purified('bash', 'wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && sudo mv phpunit.phar ~/bin/phpunit')},
        { legend: ' ... Run the test! Run PHPUnit from user-level scripts directory', cmd:'phpunit test/test.php'},
        { legend: '<i class="bi bi-filetype-php fs-3 pe-1"></i> Function example <strong>src/functions.php</strong>', cmd: purified('php', `<?php
function helloWorld() {
    return "Hello, World!";
}`)},
        {legend: '<i class="bi bi-filetype-php fs-3 pe-1"></i> Test example <strong>test/test.php</strong>', cmd: purified('php', `<?php
use PHPUnit\\Framework\\TestCase;

class FunctionsTest extends TestCase
{
    public function testHelloWorld()
    {
        require 'src/functions.php';
        $this->assertEquals("Hello, World!", helloWorld());
    }
}
`)},
        {legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd: `myProject/
├── src
│   └── functions.php
└── test
    └── test.php
`}

  ]}, {
      name: "python",
      steps: [
        { legend: '<i class="bi bi-filetype-py fs-3 pe-1"></i> Function example <strong>functions.py</strong>', cmd: purified('python', `#!/usr/bin/env python3
def hello_world():
    return "Hello world! =D"`)},
        { legend:  '<i class="bi bi-filetype-py fs-3 pe-1"></i> Test example <strong>test.py</strong> (Standard library already includes <strong>unittest</strong> module)', cmd: purified('python', `#!/usr/bin/env python3
import unittest
from functions import hello_world

class TestHelloWorld(unittest.TestCase):
    def test_string_match(self):
        self.assertEqual(hello_world(), "Hello world! =D")

if __name__ == '__main__':
    unittest.main()`)},
        {legend:  '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Run the test!', cmd:purified('bash','python3 test.py')},
        {legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd: `myProject/
├── functions.py
└── test.py
`}

      ]
    }, {
      name: 'javascript',
      steps: [
        {legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Install <strong>nvm</strong> to handle <strong>node</strong> and <strong>npm</strong>', cmd:purified('bash', `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`)},
        {legend:  '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Initialize your project\'s <strong>package.json</strong>', cmd:purified('bash','npm init')},
        {legend: '... Add scripts and dependencies', cmd:purified('bash', `npm pkg set 'type'='module' && npm pkg set 'scripts.test'='mocha' && npm install --save-dev mocha chai`)},
        {legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Run the test!', cmd:purified('bash', `npm test`)},
        {legend: '<i class="bi bi-filetype-js fs-3 pe-1"></i> Function example <strong>src/functions.js</strong>', cmd:purified('javascript', `export function helloWorld(){
  return "Hello World! xD"}`)},
        {legend: '<i class="bi bi-filetype-js fs-3 pe-1"></i> Test example <strong>test/test.js</strong>', cmd:purified('javascript', `import assert from 'assert';
import {helloWorld} from '../src/functions.js';

describe("A simple string comparison", ()=>{
  it("String matches", ()=>{
    assert.deepEqual(helloWorld(), "Hello World! xD")
  }) 
})`)},
        {legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd:`myProject/
├── package.json
├── src
│   └── functions.js
└── test
    └── test.js`},

      ]
    }

  ]


    
  



  // function getInput(e){
  //   setState({...state, [e.target.name]:e.target.value})
  // }

  function on_off(e) {
    const updatedList = (state.active.includes(e.target.name))
      ? state.active.filter((lng) => lng != e.target.name)
      : [...state.active, e.target.name]

    setState({ ...state, active:updatedList })
  }
  
  // function parseUrl(e){
  //   const url = state[e.target.name]
  //   const match = url.match(regex);
  //   let username = (match) ? match[1] : '' 
  //   let repositoryName = (match) ? match[2] : '' 
  //   setState({...state, usr:username, rep: repositoryName})
  // }


  function purified(lng, mrkp){
    return DOMPurify.sanitize(hljs.highlight(mrkp, {language: lng}).value)
    // return DOMPurify.sanitize(mrkp)
  }


function toClipBoard(e) {
  try {
    // await navigator.clipboard.writeText(e.target.innerText);
    navigator.clipboard.writeText(e.currentTarget.textContent);
    console.log(e.currentTarget.textContent)
    console.log(e.currentTarget.innerText)
    // console.log(e.currentTarget.textContent);
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    console.error('Failed to copy: ', err);
    /* Rejected - text failed to copy to the clipboard */
  }
}

  function render_section(section){

    return (<>
      <div className="d-grid">
        <button name={section.name} onClick={on_off} className='fs-3 btn btn-dark mb-3'>{section.name}</button>
      </div>
      {console.log(section.name)}
        {
        state.active.includes(section.name) &&
          section.steps.map((each) =>
            <div key={each.legend}>
              <h6 className='text-muted'   dangerouslySetInnerHTML={{__html:each.legend}}></h6>
              <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:each.cmd}}></code></pre>
            </div>)
        }
        </>)
  }


  return (
    <>

      <h1 className='text-center'>Quick Start!</h1>
      <p className='text-center'>Your <strong>one-stop-shop</strong> for unit testing frameworks!</p>

      <p className='text-center text-muted'>Recommended: Set-up your own <strong>$HOME/bin/</strong> for user-level top-priority scripts</p>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:purified('bash', `mkdir ~/bin`)}}></code></pre>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:purified('bash', `echo "export PATH=$HOME/bin:$PATH" >> ~/.bashrc`)}}></code></pre>

      
      {
        sections.map( section => <div key={section.name}> { render_section(section) } </div>)
      }

    </>
  )

}

export default App
