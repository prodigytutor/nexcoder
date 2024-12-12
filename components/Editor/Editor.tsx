"use client"
import React, { ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Textarea } from '../ui/textarea'
import ReactCodeMirror from '@uiw/react-codemirror'
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import Preview from '../Preview/Preview';
import { useRoom } from '@liveblocks/react/suspense';
import { useSelf } from '@liveblocks/react';
import { useOthers } from '@liveblocks/react/suspense'
import { LoadedProject, loadProjectIntoEditors } from '@/lib/actions/project';
import { useParams } from 'next/navigation';

const Editor = () => {  
    const others = useOthers();
    const userCount= others.length;
    const [htmlCode, setHTMLCode]=useState('');
    const [cssCode, setCssCode]=useState('');
    const [jsCode, setJsCode]=useState('');
    const params = useParams();
    const [project, setProject]=useState()
    const projectId = typeof params.id === 'string' ? params.id: '';
    console.log("projectId", projectId)
    useEffect(() => {
      console.log('in use effect');
      async function fetchProject() {
        const proj = await loadProjectIntoEditors(projectId)
        console.log(proj);
      if (proj) {        
        setHTMLCode(proj.html);
        setCssCode(proj.css);
        setJsCode(proj.javascript)
      }
      }
      fetchProject()
    },[])
  //const projectId = typeof router.query.id === 'string' ? router.query.id: '';
  
  


    const room = useRoom();

     //* Html onchange55 handler
//  async function loadProjectIntoEditors(projectId: string) {
      //const project = loadProjectIntoEditors(projectId);
      //const project = projects.find((proj) => proj.id === projectId);
    
      // if (project) {
      //  setHTMLCode(project.html);
      //  setCssCode(project.css);
      //  setJsCode(project.javascript);
      // }
 //   }
  const onChangeHtml = useCallback((value: string) => {
    console.log(value);
    setHTMLCode(value);
  }, [])

  //* Css onchange handler 
  const onChangeCss = useCallback((value: string) => {
    console.log(value);
    setCssCode(value)
  }, []);

  //* JavaScript onchange handler 
  const onChangeJavaScript = useCallback((value: string) => {
    console.log(value);
    setJsCode(value)
  }, []);

    const srcCode = `
    <html>
    <body>${htmlCode}</body>
    <style>${cssCode}</style>
    <script>${jsCode}</script>
    </html>
    ` 
  return (
    <div className='flex w-screen border'>
    <section className='container'>
        <h1>NexCoder</h1>
        <div>There are {userCount} other users online11`</div>

        <div className='flex w-screen justify-between gap-3' >
            <div className='left'>
                <label>HTML</label>
                <CodeMirror
                    className=''
                    value={htmlCode} 
                    height='200px'
                    width='340px'
                    theme="dark"
                    extensions={[html()]}
                    onChange={onChangeHtml}
                    lang='html' />
                <label>CSS</label>
                <CodeMirror 
                    value={cssCode} 
                    height='200px'
                    width='340px'
                    theme="dark"
                    onChange={onChangeCss}
                    extensions={[css()]}
                    />
                <label>Javascript</label>
                <CodeMirror 
                    value={jsCode}
                    height='200px'
                    width='340px'
                    theme="dark"
                    onChange={onChangeJavaScript}
                    extensions={[javascript()]}
                    
                    />
            </div>    
            <div className='ml-360 w-screen h-screen'>
                <Preview srcCode={srcCode}/>
            </div>
        </div>     
    </section>
    </div>
  )
}

export default Editor