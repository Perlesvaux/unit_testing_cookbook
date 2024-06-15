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
        { id:1, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Let\'s install PHP through <a href="https://www.apachefriends.org/es/download.html">XAMPP</a>. If needed, add it to $PATH', cmd: purified('bash', `echo "export PATH=/opt/lampp/bin:$PATH" >> ~/.bashrc`) },
        { id:2, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> (Option 1) Install <a href="https://getcomposer.org/download/">Composer</a> and require <strong>PHPUnit</strong> as a development dependency:', cmd: purified('bash', `composer require --dev phpunit/phpunit`) },
        { id:3, legend: ' ... Run the test! Run PHPUnit from the project\'s directory', cmd:'./vendor/bin/phpunit test/test.php'},
        { id:4, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> (Option 2) Download the <strong>PHPUnit</strong> PHAR file and move it to your user-level scripts directory:', cmd:purified('bash', 'wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && sudo mv phpunit.phar ~/bin/phpunit')},
        { id:5, legend: ' ... Run the test! Run PHPUnit from user-level scripts directory', cmd:'phpunit test/test.php'},
        { id:6, legend: '<i class="bi bi-filetype-php fs-3 pe-1"></i> Function example <strong>src/functions.php</strong>', cmd: purified('php', `<?php
function helloWorld() {
    return "Hello, World!";
}`)},
        {id:7, legend: '<i class="bi bi-filetype-php fs-3 pe-1"></i> Test example <strong>test/test.php</strong>', cmd: purified('php', `<?php
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
        {id:8, legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd: `myProject/
├── src
│   └── functions.php
└── test
    └── test.php
`}

  ]}, {
      name: "python",
      steps: [
        { id:1, legend: '<i class="bi bi-filetype-py fs-3 pe-1"></i> Function example <strong>functions.py</strong>', cmd: purified('python', `#!/usr/bin/env python3
def hello_world():
    return "Hello world! =D"`)},
        { id:2, legend:  '<i class="bi bi-filetype-py fs-3 pe-1"></i> Test example <strong>test.py</strong> (Standard library already includes <strong>unittest</strong> module)', cmd: purified('python', `#!/usr/bin/env python3
import unittest
from functions import hello_world

class TestHelloWorld(unittest.TestCase):
    def test_string_match(self):
        self.assertEqual(hello_world(), "Hello world! =D")

if __name__ == '__main__':
    unittest.main()`)},
        {id:3, legend:  '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Run the test!', cmd:purified('bash','python3 test.py')},
        {id:4, legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd: `myProject/
├── functions.py
└── test.py
`}

      ]
    }, {
      name: 'javascript',
      steps: [
        {id:1, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Install <strong>nvm</strong> to handle <strong>node</strong> and <strong>npm</strong>', cmd:purified('bash', `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`)},
        {id:2, legend:  '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Initialize your project\'s <strong>package.json</strong>', cmd:purified('bash','npm init')},
        {id:3, legend: '... Add scripts and dependencies', cmd:purified('bash', `npm pkg set 'type'='module' && npm pkg set 'scripts.test'='mocha' && npm install --save-dev mocha chai`)},
        {id:4, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Run the test!', cmd:purified('bash', `npm test`)},
        {id:5, legend: '<i class="bi bi-filetype-js fs-3 pe-1"></i> Function example <strong>src/functions.js</strong>', cmd:purified('javascript', `export function helloWorld(){
  return "Hello World! xD"}`)},
        {id:6, legend: '<i class="bi bi-filetype-js fs-3 pe-1"></i> Test example <strong>test/test.js</strong>', cmd:purified('javascript', `import assert from 'assert';
import {helloWorld} from '../src/functions.js';

describe("A simple string comparison", ()=>{
  it("String matches", ()=>{
    assert.deepEqual(helloWorld(), "Hello World! xD")
  }) 
})`)},
        {id:7, legend: '<i class="bi bi-folder2-open fs-3 pe-1"></i> Assumed project structure', cmd:`myProject/
├── package.json
├── src
│   └── functions.js
└── test
    └── test.js`},

      ]
    },{
      name: ".NET",
      steps: [
        {id:1, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Install the .NET Software Development Kit & Entity Framework Core tools:' , cmd: purified('bash', `sudo apt install dotnet-host-7.0`)},
        {id:2, legend: '', cmd: purified('bash', `sudo apt install dotnet-sdk-7.0`)},
        {id:3, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Create a new solution', cmd: purified('bash', `dotnet new sln -o myProject`)},
        {id:4, legend: '', cmd: purified('bash', `cd myProject`)},
        {id:5, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Inside your project, create a new classlib and xunit', cmd: `dotnet new classlib -o Fun`},
        {id:6, legend: '', cmd: `dotnet new xunit -o Fun.Test`},
        {id:7, legend: '... Add them to your solution', cmd: `dotnet sln add Fun && dotnet sln add Fun.Test`},
        {id:8, legend: '... Inside the <strong>test</strong>, make a reference to the <strong>classlib</strong>', cmd: `dotnet add Fun.Test reference Fun`},
        {id:9, legend: '<i class="bi bi-terminal-fill fs-3 pe-1"></i> Run the test from the root of your project', cmd: purified('bash', `dotnet test`)},
        {id:10, legend: '<i class="bi bi-filetype-cs fs-3 pe-1"></i> Function example <strong>Fun/Class1.cs</strong>', cmd: purified('csharp', `namespace Fun;
public class Class1
{
  public string SayAnything() => "Hello World!";
}`)},
        {id:11, legend: '<i class="bi bi-filetype-cs fs-3 pe-1"></i> Test example <strong>Fun.Test/UnitTest1.cs</strong>', cmd: purified('csharp', `namespace Fun.Test;
using Class1;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
      string class1 = new Class1().SayAnything();
      Assert.True(class1.Equals("Hello World!"), "Both strings should be equal");

    }
}`)}
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
            <div key={each.id}>
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
