import React from 'react';

const Blogs = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <div className='p-2'>
                <h3 className='font-bold'>1. How will you improve the performance of a React Application?</h3>
                <p>The concept of react is made for developing web application faster.For a small change manipulate hole document is time and resource consuming.In react every part of a web page is component.Any change of a single component,a single part of DOM will be updated not entire DOM.It makes react application faster.In here hole DOM is not re-renderd,optimizing re-rendering inproves react applications performance.Caching of component-rerender also prevent unnecessary re-render which improve the performance of a react app.  </p>
            </div>
            <div className='p-2'>
                <h3 className='font-bold'>2. What are the different ways to manage a state in a React application?</h3>
                <p>State management is one of the crutial part of react application development.There are many ways to manage state in the react app.There are 4 types of states needs to manage in a react app-<span className='font-bold'>Local state,Global state,Server state,URL state.</span>The ways to manage these state is given bellow:</p>
                <ul>
                    <li className='font-bold'>useState,useReducer</li>
                    <li>useReducer, useState is used to manage local state data. </li>
                    <li className='font-bold'>useReducer,contextAPI</li>
                    <li>useReducer,contextAPI are build in tools to manage global state data </li>
                    <li className='font-bold'>Redux,Zustand, Jotai, and Recoil</li>
                    <li>Redux,Zustand, Jotai, and Recoil are third-party tools to manage global state data </li>
                    <li className='font-bold'>SWR, React Query</li>
                    <li>SWR and React query third-party tools are used to manage server state</li>
                    <li className='font-bold'>useHistory or useLocation,useParams</li>
                    <li>useHistory or useLocation,useParams hooks are used to handle url state data.</li>
                    
                </ul>
            </div>
            <div className='p-2'>
                <h3 className='font-bold'>3.How does prototypical inheritance work?</h3>
                <p>Prototypical inheretence is a process of obtaining properties of one object to another object in Javascript.<code>__proto__</code> special property is used to inherit property of an object.The properties that are inherited from parent object, can be used to its own object.</p>
                
            </div>
            <div className='p-2'>
                <h3 className='font-bold'>4.Why you do not set the state directly in React?</h3>
                <p></p>
                
            </div>
            <div className='p-2'>
                <h3 className='font-bold'>5.You have an array of products. Each object has a name, price, description, etc. How will you implement a search to find products by name?</h3>
                
                <pre>
                    <code>
                        <span class="hljs-keyword">const</span> result=products.filter(item=&gt;item.name.includes(<span class="hljs-string">"nokia"</span>))
                        <br />
                        console.log(result)
                    </code>
                </pre>
            </div>
            <div className='p-2'>
                <h3 className='font-bold'>6.What is a unit test? Why should write unit tests?</h3>
                <p>Unit test is a method of testing software to find bugs and fix those in software development.In this testing process application's code is divide into smaller pieces- may be one line of code.piece of units can be execute and find bug easily.It simplifies the debugging process.Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.There are three unit testing techniques to test code in isolation:-Black Box Testing: Testing the user interface, input, and output White Box Testing: Testing the behavior of your functions Grey Box Testing: Executing test suites, test cases, and risk analysis.</p>
                
            </div>
        </div>
    );
};

export default Blogs;