const searchParams = new URLSearchParams(window.location.search)

const mode = searchParams.get('mode')

if (mode === 'full-workbench') {
  void import('./main.workbench')
} else {
  void import('./main.views')
}

export {}
