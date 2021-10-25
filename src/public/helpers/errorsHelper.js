export function showError(errText, dest, single) {
    if (single){
        const errHtml = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${errText}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `;
        dest.innerHTML = errHtml
    } else {
        const errHtml = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${errText.map(item => item.errorMsg).join(', ')}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
        dest.innerHTML = errHtml
    }
}