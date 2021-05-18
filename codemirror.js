/* eslint-env browser */

// @ts-ignore
import CodeMirror from 'codemirror'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/python/python.js'
import sha1 from 'crypto-js/sha1'
import Base64 from 'crypto-js/enc-base64'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const room = Base64.stringify(sha1(document.location.toString()))
  const provider = new WebsocketProvider('wss://demos.yjs.dev', room, ydoc)
  console.log("room", room);
  const ytext = ydoc.getText('codemirror')
  const editorContainer = document.createElement('div')
  editorContainer.setAttribute('id', 'editor')
  document.body.insertBefore(editorContainer, null)

  const editor = CodeMirror(editorContainer, {
      mode: 'text/x-python',
      indentUnit: 4,
      theme: "monokai",
    lineNumbers: true
  })

  const binding = new CodemirrorBinding(ytext, editor, provider.awareness)

  // @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
})
