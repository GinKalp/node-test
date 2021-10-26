export function showError(errText, dest, single) {
    if (single){
        const errHtml = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${errText}
  </div>
  `;
        dest.innerHTML = errHtml
    } else {
        const errHtml = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${errText.map(item => item.errorMsg).join(', ')}
  </div>`
        dest.innerHTML = errHtml
    }
}