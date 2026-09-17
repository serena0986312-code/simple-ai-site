const el = (id) => document.getElementById(id);
const promptEl = el('prompt');
const genBtn = el('generate');
const loading = el('loading');
const errorEl = el('error');
const resultEl = el('result');

async function generate(){
  const prompt = promptEl.value.trim();
  errorEl.textContent = '';
  resultEl.textContent = '';
  if (!prompt) {
    errorEl.textContent = 'Please enter a prompt.';
    return;
  }

  genBtn.disabled = true;
  loading.classList.remove('hidden');

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || 'Server error';
    } else {
      resultEl.textContent = data.result || 'No result';
    }
  } catch (err) {
    errorEl.textContent = 'Request failed: ' + err.message;
  } finally {
    genBtn.disabled = false;
    loading.classList.add('hidden');
  }
}

genBtn.addEventListener('click', generate);
promptEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) generate();
});
