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
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;



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
        {legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd: `myProject/
├── functions.py
└── test.py
`}

      ]
    }

  ]


    
  



  function getInput(e){
    setState({...state, [e.target.name]:e.target.value})
  }

  function on_off(e) {
    const updatedList = (state.active.includes(e.target.name))
      ? state.active.filter((lng) => lng != e.target.name)
      : [...state.active, e.target.name]

    setState({ ...state, active:updatedList })
  }
  
  function parseUrl(e){
    const url = state[e.target.name]
    const match = url.match(regex);
    let username = (match) ? match[1] : '' 
    let repositoryName = (match) ? match[2] : '' 
    setState({...state, usr:username, rep: repositoryName})
  }


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

      // <div className='flx'>
      //   <label htmlFor="parseUrl" className='optn text-center badge text-bg-dark fs-6'>Enter the URL to your GitHub repo
      //     <input type="text" name="parseUrl" onChange={getInput} onKeyUp={parseUrl}  value={state.parseUrl} /> 
      //   </label>
      //   <label htmlFor="devEnv" className='optn text-center badge text-bg-dark fs-6'>URL to Development backend
      //     <input type="text" name="devEnv" onChange={getInput} value={state.devEnv}/> 
      //   </label>
      //   <label htmlFor="proEnv" className='optn text-center badge text-bg-dark fs-6'>URL to Production backend 
      //     <input type="text" name="proEnv" onChange={getInput} value={state.proEnv}/> 
      //   </label>
      // </div>

  return (
    <>



      <h1 className='text-center'>Quick Start!</h1>
      <p className='text-center'>Your <strong>one-stop-shop</strong> for unit testing frameworks!</p>

      <p>Recommended: Have your own <strong>$HOME/bin/</strong> for user-level top-priority scripts</p>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:purified('bash', `mkdir ~/bin`)}}></code></pre>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:purified('bash', `echo "export PATH=$HOME/bin:$PATH" >> ~/.bashrc`)}}></code></pre>

      
      {
        sections.map( section => <div key={section.name}> { render_section(section) } </div>)
        
      }

    </>
  )

}



      // <h1 className='text-center'>Push it to the limit!</h1>
      // <p className='text-center'> <i className="bi bi-radioactive fs-3"></i> These below can <strong>nuke</strong> some data. Use only if you're in a hurry and there's not much to lose!</p>
      // <h6 className='text-muted'> <i className="bi bi-file-code-fill fs-2"></i> One-liner with the essentials. Only thing left is to run the <strong>deploy</strong> script!</h6>
      // <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:little_boy}}></code></pre>



      // <h6 className='text-muted'> <i className="bi bi-file-code fs-2"></i> This one also includes the <strong>optional</strong> configuration. Only for those that wanna go <strong>Full Nuclear!</strong></h6>
      // <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:tsar_bomba}}></code></pre>

export default App
