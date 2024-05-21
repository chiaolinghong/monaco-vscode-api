import './style.css'
import * as monaco from 'monaco-editor'
import { ExtensionHostKind, registerExtension } from 'vscode/extensions'
import { useHtmlFileSystemProvider } from './setup.common'
import './features/output'
import './features/debugger'
import './features/search'
import './features/intellisense'
import './features/notifications'
import './features/terminal'
import './features/scm'
import './features/testing'
import './features/ai'
import '@codingame/monaco-vscode-python-default-extension'
import '@codingame/monaco-vscode-theme-defaults-default-extension'
import '@codingame/monaco-vscode-theme-seti-default-extension'
import '@codingame/monaco-vscode-references-view-default-extension'
import '@codingame/monaco-vscode-search-result-default-extension'
import '@codingame/monaco-vscode-configuration-editing-default-extension'
import '@codingame/monaco-vscode-npm-default-extension'
import '@codingame/monaco-vscode-media-preview-default-extension'
import '@codingame/monaco-vscode-ipynb-default-extension'

const { getApi } = registerExtension({
  name: 'demo-main',
  publisher: 'codingame',
  version: '1.0.0',
  engines: {
    vscode: '*'
  }
}, ExtensionHostKind.LocalProcess)

void getApi().then(async vscode => {
  if (!useHtmlFileSystemProvider) {
    const mainModelUri = vscode.Uri.file('/tmp/test.js')
    await Promise.all([
      vscode.workspace.openTextDocument(mainModelUri),
      vscode.workspace.openTextDocument(monaco.Uri.file('/tmp/test_readonly.js')) // open the file so vscode sees it's locked
    ])

    const diagnostics = vscode.languages.createDiagnosticCollection('demo')
    diagnostics.set(mainModelUri, [{
      range: new vscode.Range(2, 9, 2, 12),
      severity: vscode.DiagnosticSeverity.Error,
      message: 'This is not a real error, just a demo, don\'t worry',
      source: 'Demo',
      code: 42
    }])
  }

  document.querySelector('#toggleFullWorkbench')!.addEventListener('click', async () => {
    const url = new URL(window.location.href)
    if (url.searchParams.get('mode') === 'full-workbench') {
      url.searchParams.delete('mode')
    } else {
      url.searchParams.set('mode', 'full-workbench')
    }
    window.location.href = url.toString()
  })

  document.querySelector('#resetLayout')!.addEventListener('click', async () => {
    const url = new URL(window.location.href)
    url.searchParams.set('resetLayout', 'true')
    window.location.href = url.toString()
  })

  document.querySelector('#toggleHTMLFileSystemProvider')!.addEventListener('click', async () => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('htmlFileSystemProvider')) {
      url.searchParams.delete('htmlFileSystemProvider')
    } else {
      url.searchParams.set('htmlFileSystemProvider', 'true')
    }
    window.location.href = url.toString()
  })
})
